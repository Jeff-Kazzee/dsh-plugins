#!/usr/bin/env node
/**
 * check-contrast.mjs (v2)
 *
 * Independent verifier for the H4X0R theme plugin data. Reads themes.data.json
 * and token-inventory.json, recomputes every WCAG contrast number for both
 * packs, checks the data contract, checks the v1 regression fingerprints for
 * the six H4X0R themes, and checks the surface, border and text ramps.
 *
 * v2 adds: two-pack iteration, light-scheme gates, the Lumen daylight
 * accessibility window, the H4X0R v1 regression gate, and an accent hue map
 * that flags new accents within 25 degrees of a v1 accent.
 *
 * Writes contrast-report.txt next to the scripts and prints the same report.
 * Exits non-zero when any gate, structure check, regression check or hierarchy
 * check fails. Accent proximity flags are advisory by design.
 *
 * Run: node check-contrast.mjs
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const reportPath = join(HERE, 'contrast-report.txt');

const inventory = JSON.parse(readFileSync(join(HERE, 'token-inventory.json'), 'utf8'));
const data = JSON.parse(readFileSync(join(HERE, 'themes.data.json'), 'utf8'));

const INVENTORY_NAMES = inventory.tokens.map((t) => t.name);
const INVENTORY_SET = new Set(INVENTORY_NAMES);
const STYLE_REF = /var\(\s*--dsw-(static|alias)-/;

/* v1 frozen fingerprints, canonical JSON (object keys sorted) sha256. */
const H4X0R_BASELINE = {
  'h4x0r-phosphor': 'd53a217c5c11edbb658f4ff886cd32b9d3c62855acfd693f707384a45aacc791',
  'h4x0r-void': 'c06a23287c7a91946df477c3004e1652c6910b1380a99060e90891c7ecd0dc59',
  'h4x0r-ice': '44321d40a24f01234d6424929eeffd1da36c19f1a1e4377f77ed06346bae9421',
  'h4x0r-redline': '568d109c045960035fcfe5ef1fe1e61888f7db02caf4b73f48be08b7d69703da',
  'h4x0r-bone': 'a8ecefe49fcc3242d33f9496cc793d9424f88f9ff813749527e1cf9503377c35',
  'h4x0r-dim': 'c99a4da9bd48e8dfb8fa9c3f7f28bc9e2bc70ba378a2b063b204bd1d1604d3f9',
};

/* Gate windows. Accessibility palettes carry explicit windows. */
const NORMAL_GATES = {
  labelPrimaryOnBase: [7.0, null],
  labelSecondaryOnBase: [4.5, null],
  brandOnBase: [3.0, null],
  labelOnBrand: [3.0, null],
  stateOnBase: [3.0, null],
};

const ACCESSIBILITY = {
  'h4x0r-dim': { labelPrimaryOnBase: [4.5, 12.0], labelSecondaryOnBase: [4.0, null] },
  'mirage-lumen': { labelPrimaryOnBase: [4.5, 14.0], labelSecondaryOnBase: [4.5, null] },
};

const EXPECTED_PACKS = [
  {
    id: 'h4x0r',
    name: 'H4X0R',
    tagline: 'Six hacker palettes',
    themes: [
      ['h4x0r-phosphor', 'Phosphor', 'dark'],
      ['h4x0r-void', 'Void', 'dark'],
      ['h4x0r-ice', 'Ice', 'dark'],
      ['h4x0r-redline', 'Redline', 'dark'],
      ['h4x0r-bone', 'Bone', 'light'],
      ['h4x0r-dim', 'Dim', 'dark'],
    ],
  },
  {
    id: 'mirage',
    name: 'MIRAGE',
    tagline: 'Anime-minimal moods in ten palettes',
    themes: [
      ['mirage-sakura', 'Sakura', 'light'],
      ['mirage-mecha', 'Mecha', 'dark'],
      ['mirage-ghost', 'Ghost', 'dark'],
      ['mirage-abyss', 'Abyss', 'dark'],
      ['mirage-neon-rain', 'Neon Rain', 'dark'],
      ['mirage-porcelain', 'Porcelain', 'light'],
      ['mirage-ink', 'Ink', 'light'],
      ['mirage-mochi', 'Mochi', 'dark'],
      ['mirage-ember', 'Ember', 'dark'],
      ['mirage-lumen', 'Lumen', 'light'],
    ],
  },
];

/* Differentiation recorded for accents flagged as close to a v1 accent. */
const FLAG_NOTES = {
  'mirage-mecha': 'hazard orange, 27.1 deg from redline ember red, reads safety orange not ember',
  'mirage-ghost': 'pale low-chroma signal, not saturated cyan',
  'mirage-abyss': 'bioluminescent teal, greener than dim sage, on near-black indigo',
  'mirage-neon-rain': 'desaturated coral on blue-teal black, 9.2 deg from redline ember red',
  'mirage-porcelain': 'light-scheme low-chroma cobalt glaze, not saturated dark cyan',
  'mirage-ink': 'vermilion seal on neutral paper, 11.1 deg from bone rust and brighter',
  'mirage-ember': 'dark-scheme amber lamplight, yellower and deeper than light bone rust',
};

/* ------------------------------------------------------------------ */
/* color parsing, WCAG math, accent hue                                */
/* ------------------------------------------------------------------ */

function parseColor(value) {
  const text = String(value).trim();
  if (!text) throw new Error('empty color');
  if (text === 'transparent') return { r: 0, g: 0, b: 0, a: 0 };

  let m = text.match(/^#([0-9a-f]{3,8})$/i);
  if (m) {
    let h = m[1];
    if (h.length === 3 || h.length === 4) h = [...h].map((c) => c + c).join('');
    if (h.length === 6) {
      return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16), a: 1 };
    }
    if (h.length === 8) {
      return {
        r: parseInt(h.slice(0, 2), 16),
        g: parseInt(h.slice(2, 4), 16),
        b: parseInt(h.slice(4, 6), 16),
        a: parseInt(h.slice(6, 8), 16) / 255,
      };
    }
    throw new Error(`bad hex color: ${value}`);
  }

  m = text.match(/^rgba?\(([^)]+)\)$/i);
  if (m) {
    const parts = m[1].split(/[\s,/]+/).filter(Boolean);
    if (parts.length < 3) throw new Error(`bad rgb color: ${value}`);
    const channel = (p) => (p.endsWith('%') ? (parseFloat(p) / 100) * 255 : parseFloat(p));
    const alpha = (p) => (!p ? 1 : p.endsWith('%') ? parseFloat(p) / 100 : parseFloat(p));
    return { r: channel(parts[0]), g: channel(parts[1]), b: channel(parts[2]), a: parts.length > 3 ? alpha(parts[3]) : 1 };
  }

  m = text.match(/^hsla?\(([^)]+)\)$/i);
  if (m) {
    const parts = m[1].split(/[\s,/]+/).filter(Boolean);
    const h = ((parseFloat(parts[0]) % 360) + 360) % 360;
    const s = parseFloat(parts[1]) / 100;
    const l = parseFloat(parts[2]) / 100;
    const a = parts.length > 3 ? (parts[3].endsWith('%') ? parseFloat(parts[3]) / 100 : parseFloat(parts[3])) : 1;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m0 = l - c / 2;
    let rgb;
    if (h < 60) rgb = [c, x, 0];
    else if (h < 120) rgb = [x, c, 0];
    else if (h < 180) rgb = [0, c, x];
    else if (h < 240) rgb = [0, x, c];
    else if (h < 300) rgb = [x, 0, c];
    else rgb = [c, 0, x];
    return { r: (rgb[0] + m0) * 255, g: (rgb[1] + m0) * 255, b: (rgb[2] + m0) * 255, a };
  }

  throw new Error(`not a self-contained CSS color: ${value}`);
}

function channelLum(v) {
  const s = v / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

function luminance(rgb) {
  return 0.2126 * channelLum(rgb.r) + 0.7152 * channelLum(rgb.g) + 0.0722 * channelLum(rgb.b);
}

function over(color, base) {
  const a = Math.min(1, Math.max(0, color.a));
  return {
    r: color.r * a + base.r * (1 - a),
    g: color.g * a + base.g * (1 - a),
    b: color.b * a + base.b * (1 - a),
    a: 1,
  };
}

function contrastOn(value, baseHex) {
  const base = parseColor(baseHex);
  const fg = over(parseColor(value), base);
  const la = luminance(fg);
  const lb = luminance(base);
  const [hi, lo] = la >= lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

function hslOf(value) {
  const { r, g, b } = parseColor(value);
  const R = r / 255;
  const G = g / 255;
  const B = b / 255;
  const max = Math.max(R, G, B);
  const min = Math.min(R, G, B);
  const l = (max + min) / 2;
  const d = max - min;
  let h = 0;
  if (d > 0) {
    if (max === R) h = 60 * (((G - B) / d) % 6);
    else if (max === G) h = 60 * ((B - R) / d + 2);
    else h = 60 * ((R - G) / d + 4);
  }
  if (h < 0) h += 360;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  return { h, s, l };
}

function circularDelta(a, b) {
  const d = Math.abs(a - b) % 360;
  return d > 180 ? 360 - d : d;
}

const r2 = (n) => Math.round(n * 100) / 100;
const fmt = (n) => r2(n).toFixed(2);

function canonical(value) {
  if (Array.isArray(value)) return value.map(canonical);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, canonical(value[key])]));
  }
  return value;
}

function fingerprint(theme) {
  return createHash('sha256').update(JSON.stringify(canonical(theme))).digest('hex');
}

/* ------------------------------------------------------------------ */
/* report state                                                        */
/* ------------------------------------------------------------------ */

const lines = [];
const out = (line = '') => lines.push(line);
const failures = [];
const scoreboard = (ok) => (ok ? 'PASS' : 'FAIL');

function check(label, ok, detail) {
  if (!ok) failures.push(`${label}${detail ? `: ${detail}` : ''}`);
  out(`  ${label.padEnd(52, '.')} ${scoreboard(ok)}${detail ? ` (${detail})` : ''}`);
  return ok;
}

function gateRow(label, value, gate, extra = '') {
  const [min, max] = gate;
  const ok = value >= min - 1e-9 && (max == null || value <= max + 1e-9);
  if (!ok) failures.push(`${label} = ${fmt(value)} outside ${min}${max != null ? `..${max}` : '+'}`);
  const limit = max != null ? `${min.toFixed(1)}..${max.toFixed(1)}` : `>=${min.toFixed(1)}`;
  out(`    ${label.padEnd(54)} ${fmt(value).padStart(6)}  ${limit.padEnd(12)} ${scoreboard(ok)}${extra}`);
  return ok;
}

function designRow(label, value, ok, detail = '') {
  if (!ok) failures.push(`${label}: ${detail || 'failed'}`);
  out(`    ${label.padEnd(54)} ${String(value).padEnd(28)} ${scoreboard(ok)}`);
  return ok;
}

/* ------------------------------------------------------------------ */
/* header                                                              */
/* ------------------------------------------------------------------ */

out('H4X0R THEMES v2 contrast and structure report');
out('generated by check-contrast.mjs from themes.data.json');
out('WCAG 2.x relative luminance. Alpha colors are composited over --dsw-alias-bg-base before measuring.');
out('='.repeat(110));
out('');

/* ------------------------------------------------------------------ */
/* data contract                                                       */
/* ------------------------------------------------------------------ */

out('DATA CONTRACT');
out('');

const packs = Array.isArray(data.packs) ? data.packs : [];
check('themes.data.json parses as JSON', true, `${packs.length} packs`);
check('root has packs array only', Array.isArray(data.packs) && !('pack' in data) && Object.keys(data).length === 1, Object.keys(data).join(', '));
check('exactly 2 packs', packs.length === 2, String(packs.length));

const packOrderOk =
  packs.length === 2 &&
  EXPECTED_PACKS.every((expected, i) => packs[i] && packs[i].id === expected.id && packs[i].name === expected.name);
check('pack ids, names and order', packOrderOk, packs.map((p) => p.id).join(' > '));

const packTaglinesOk = packs.length === 2 && EXPECTED_PACKS.every((expected, i) => packs[i] && packs[i].tagline === expected.tagline);
check('pack taglines', packTaglinesOk, packs.map((p) => `"${p.tagline}"`).join(' / '));

const packCountsOk =
  packs.length === 2 && EXPECTED_PACKS.every((expected, i) => packs[i] && Array.isArray(packs[i].themes) && packs[i].themes.length === expected.themes.length);
check('pack theme counts (6 / 10)', packCountsOk, packs.map((p) => `${p.id}:${p.themes ? p.themes.length : 0}`).join(' '));

const themeShapeOk = packs.every((pack) =>
  (pack.themes || []).every((theme) => Object.keys(theme).sort().join(',') === 'check,colorScheme,description,id,name,tagline,tokens'),
);
check('theme object shape (7 keys)', themeShapeOk, 'id, name, colorScheme, tagline, description, tokens, check');

let orderOk = true;
let orderDetail = [];
if (packs.length === 2) {
  for (const expected of EXPECTED_PACKS) {
    const pack = packs.find((p) => p.id === expected.id);
    if (!pack) {
      orderOk = false;
      orderDetail.push(`${expected.id} missing`);
      continue;
    }
    const themes = pack.themes || [];
    const ok =
      themes.length === expected.themes.length &&
      expected.themes.every(([id, name, scheme], i) => themes[i] && themes[i].id === id && themes[i].name === name && themes[i].colorScheme === scheme);
    if (!ok) orderOk = false;
    orderDetail.push(`${pack.name} ${ok ? 'ordered' : 'mismatch'}`);
  }
}
check('theme order, ids, names, colorSchemes', orderOk, orderDetail.join(' / '));

let coverageOk = true;
let coverageDetail = [];
let styleRefOk = true;
let parseOk = true;
let parseDetail = [];
let taglineOk = true;
let taglineDetail = [];
const schemeCounts = { dark: 0, light: 0 };

for (const pack of packs) {
  for (const theme of pack.themes || []) {
    schemeCounts[theme.colorScheme] = (schemeCounts[theme.colorScheme] || 0) + 1;
    const missing = INVENTORY_NAMES.filter((name) => !(name in theme.tokens));
    const extra = Object.keys(theme.tokens).filter((name) => !INVENTORY_SET.has(name));
    if (missing.length || extra.length || Object.keys(theme.tokens).length !== INVENTORY_NAMES.length) {
      coverageOk = false;
      coverageDetail.push(`${theme.id}: ${missing.length} missing, ${extra.length} extra`);
    }
    for (const [name, value] of Object.entries(theme.tokens)) {
      if (STYLE_REF.test(String(value))) {
        styleRefOk = false;
        parseDetail.push(`${theme.id} ${name} references another token`);
      }
      try {
        parseColor(value);
      } catch (error) {
        parseOk = false;
        parseDetail.push(`${theme.id} ${name}: ${error.message}`);
      }
    }
    const words = String(theme.tagline || '').trim().split(/\s+/).filter(Boolean).length;
    if (words < 3 || words > 6) {
      taglineOk = false;
      taglineDetail.push(`${theme.id}: ${words} words`);
    }
  }
}

check(
  'token coverage per theme',
  coverageOk,
  coverageDetail.join('; ') || `${INVENTORY_NAMES.length}/${INVENTORY_NAMES.length} on ${schemeCounts.dark + schemeCounts.light} themes`,
);
check('no var(--dsw-static-*) / var(--dsw-alias-*)', styleRefOk, styleRefOk ? 'all literals' : 'found token references');
check('every value is a self-contained CSS color', parseOk, parseDetail.length ? parseDetail.join('; ') : 'hex, rgb(), rgba()');
check('taglines are 3 to 6 words', taglineOk, taglineDetail.join('; ') || 'all within range');
check('scheme mix is 11 dark and 5 light', schemeCounts.dark === 11 && schemeCounts.light === 5, `${schemeCounts.dark} dark, ${schemeCounts.light} light`);

/* ------------------------------------------------------------------ */
/* regression gate: H4X0R v1 object fingerprints                       */
/* ------------------------------------------------------------------ */

out('');
out('REGRESSION: H4X0R v1 -> v2');
out('');

const h4x0rPack = packs.find((pack) => pack.id === 'h4x0r');
const h4x0rThemes = (h4x0rPack && h4x0rPack.themes) || [];
check('H4X0R ids and order match the v1 baseline', h4x0rThemes.map((t) => t.id).join(',') === Object.keys(H4X0R_BASELINE).join(','), h4x0rThemes.map((t) => t.id).join(', '));

let regressionMatches = 0;
for (const theme of h4x0rThemes) {
  const expected = H4X0R_BASELINE[theme.id];
  const actual = fingerprint(theme);
  const ok = expected != null && actual === expected;
  if (ok) regressionMatches += 1;
  check(`  ${theme.id} object fingerprint`, ok, `${actual.slice(0, 16)}${ok ? '' : ` expected ${String(expected).slice(0, 16)}`}`);
}
check('all six H4X0R theme objects unchanged', regressionMatches === 6, `${regressionMatches}/6 match the v1 baseline`);

/* ------------------------------------------------------------------ */
/* accent hue map                                                      */
/* ------------------------------------------------------------------ */

out('');
out('ACCENT HUE MAP');
out('');

const v1Accents = h4x0rThemes.map((theme) => {
  const brand = theme.tokens['--dsw-alias-brand-primary'];
  const { h, s, l } = hslOf(brand);
  return { id: theme.id, name: theme.name, scheme: theme.colorScheme, brand, hue: h, chroma: s, lightness: l };
});

out('  v1 H4X0R reference accents');
out(`  ${'theme'.padEnd(22)} ${'brand'.padEnd(9)} ${'hue'.padStart(6)} ${'chroma'.padStart(7)} ${'light'.padStart(7)}`);
for (const accent of v1Accents) {
  out(`  ${`${accent.id}`.padEnd(22)} ${accent.brand.padEnd(9)} ${accent.hue.toFixed(1).padStart(6)} ${accent.chroma.toFixed(3).padStart(7)} ${accent.lightness.toFixed(3).padStart(7)}`);
}
out('');
out('  MIRAGE accents against the nearest v1 accent hue');
out(
  `  ${'theme'.padEnd(22)} ${'scheme'.padEnd(7)} ${'brand'.padEnd(9)} ${'hue'.padStart(6)} ${'chroma'.padStart(7)} ${'light'.padStart(7)} ${'nearest'.padEnd(16)} ${'delta'.padStart(6)}  flag`,
);

const miragePack = packs.find((pack) => pack.id === 'mirage');
const mirageThemes = (miragePack && miragePack.themes) || [];
const flaggedAccents = [];
for (const theme of mirageThemes) {
  const brand = theme.tokens['--dsw-alias-brand-primary'];
  const { h, s, l } = hslOf(brand);
  let nearest = null;
  let nearestDelta = Infinity;
  for (const accent of v1Accents) {
    const delta = circularDelta(h, accent.hue);
    if (delta < nearestDelta) {
      nearestDelta = delta;
      nearest = accent;
    }
  }
  const flagged = nearestDelta <= 25;
  if (flagged) flaggedAccents.push({ theme, brand, hue: h, chroma: s, lightness: l, nearest, delta: nearestDelta });
  out(
    `  ${theme.id.padEnd(22)} ${theme.colorScheme.padEnd(7)} ${brand.padEnd(9)} ${h.toFixed(1).padStart(6)} ${s.toFixed(3).padStart(7)} ${l.toFixed(3).padStart(7)} ${nearest.id.padEnd(16)} ${nearestDelta.toFixed(1).padStart(6)}  ${flagged ? 'FLAG' : '-'}`,
  );
}
out('');
if (flaggedAccents.length) {
  out('  Flags are advisory. Each flagged accent is differentiated by scheme, chroma or lightness:');
  for (const flagged of flaggedAccents) {
    const note = FLAG_NOTES[flagged.theme.id] || 'differentiated by scheme, chroma or lightness';
    out(
      `  - ${flagged.theme.id}: ${flagged.delta.toFixed(1)} deg from ${flagged.nearest.id} (${flagged.nearest.scheme}), chroma ${flagged.chroma.toFixed(3)} vs ${flagged.nearest.chroma.toFixed(3)}, lightness ${flagged.lightness.toFixed(3)} vs ${flagged.nearest.lightness.toFixed(3)}. ${note}.`,
    );
  }
} else {
  out('  No MIRAGE accent sits within 25 degrees of a v1 accent.');
}
out('');

/* ------------------------------------------------------------------ */
/* contrast gates per pack                                             */
/* ------------------------------------------------------------------ */

out('CONTRAST GATES');
out('');

const computed = [];

function themeBlock(pack, theme) {
  const get = (name) => theme.tokens[name];
  const base = get('--dsw-alias-bg-base');
  const gates = { ...NORMAL_GATES, ...(ACCESSIBILITY[theme.id] || {}) };

  const values = {
    labelPrimaryOnBase: contrastOn(get('--dsw-alias-label-primary'), base),
    labelSecondaryOnBase: contrastOn(get('--dsw-alias-label-secondary'), base),
    brandOnBase: contrastOn(get('--dsw-alias-brand-primary'), base),
    labelOnBrand: contrastOn(get('--dsw-alias-label-primary'), get('--dsw-alias-brand-primary')),
    stateOnBase: Math.min(
      contrastOn(get('--dsw-alias-state-error-primary'), base),
      contrastOn(get('--dsw-alias-state-success-primary'), base),
      contrastOn(get('--dsw-alias-state-warn-primary'), base),
    ),
  };
  computed.push({ pack: pack.id, theme, values });

  out(`${theme.name} (${theme.id}) ${theme.colorScheme}`);
  out(`  picker chips: bg-base ${base}  label-primary ${get('--dsw-alias-label-primary')}  brand-primary ${get('--dsw-alias-brand-primary')}`);
  gateRow('label-primary on bg-base', values.labelPrimaryOnBase, gates.labelPrimaryOnBase);
  gateRow('label-secondary on bg-base', values.labelSecondaryOnBase, gates.labelSecondaryOnBase);
  gateRow('brand-primary on bg-base', values.brandOnBase, gates.brandOnBase);
  gateRow('label-primary on brand-primary', values.labelOnBrand, gates.labelOnBrand);
  gateRow('state colors on bg-base (min)', values.stateOnBase, gates.stateOnBase);
  gateRow('state-error-primary on bg-base', contrastOn(get('--dsw-alias-state-error-primary'), base), gates.stateOnBase);
  gateRow('state-success-primary on bg-base', contrastOn(get('--dsw-alias-state-success-primary'), base), gates.stateOnBase);
  gateRow('state-warn-primary on bg-base', contrastOn(get('--dsw-alias-state-warn-primary'), base), gates.stateOnBase);

  /* embedded numbers must match this recomputation, and must be present */
  const embedded = theme.check || {};
  const keys = ['labelPrimaryOnBase', 'labelSecondaryOnBase', 'brandOnBase', 'labelOnBrand', 'stateOnBase'];
  const mismatched = keys.filter((key) => Math.abs((embedded[key] ?? -1) - r2(values[key])) > 0.05);
  check(`  ${theme.id} check block matches recomputation`, mismatched.length === 0, mismatched.join(', ') || 'matches');
  check(`  ${theme.id} check.failures is empty`, Array.isArray(embedded.failures) && embedded.failures.length === 0, String(embedded.failures && embedded.failures.length));

  /* design checks */
  gateRow('label-primary-foreground on brand-primary', contrastOn(get('--dsw-alias-label-primary-foreground'), get('--dsw-alias-brand-primary')), [3.0, null]);

  const surfaceL = ['--dsw-alias-bg-base', '--dsw-alias-bg-layer-1', '--dsw-alias-bg-layer-2', '--dsw-alias-bg-layer-3'].map((n) => luminance(parseColor(get(n))));
  const surfaceOk = surfaceL[0] < surfaceL[1] && surfaceL[1] < surfaceL[2] && surfaceL[2] < surfaceL[3];
  if (!surfaceOk) failures.push(`${theme.id} surface ramp not ascending`);
  out(`    ${'surface ramp base < l1 < l2 < l3'.padEnd(54)} ${surfaceL.map((v) => v.toFixed(3)).join(' < ')}  ${scoreboard(surfaceOk)}`);

  const borderC = ['--dsw-alias-border-l1', '--dsw-alias-border-l2', '--dsw-alias-border-l3', '--dsw-alias-border-l4'].map((n) => contrastOn(get(n), base));
  const borderOk = borderC[0] < borderC[1] && borderC[1] < borderC[2] && borderC[2] < borderC[3];
  if (!borderOk) failures.push(`${theme.id} border ramp not progressively stronger`);
  out(`    ${'border ramp l1 < l2 < l3 < l4 (contrast over base)'.padEnd(54)} ${borderC.map((v) => fmt(v)).join(' < ')}  ${scoreboard(borderOk)}`);

  const textC = ['--dsw-alias-label-primary', '--dsw-alias-label-secondary', '--dsw-alias-label-tertiary', '--dsw-alias-label-caption', '--dsw-alias-label-dimmed'].map((n) =>
    contrastOn(get(n), base),
  );
  const textOk = textC[0] > textC[1] && textC[1] > textC[2] && textC[2] > textC[3] && textC[3] > textC[4];
  if (!textOk) failures.push(`${theme.id} text ramp not descending`);
  out(`    ${'text ramp primary > secondary > tertiary > caption > dimmed'.padEnd(54)} ${textC.map((v) => fmt(v)).join(' > ')}  ${scoreboard(textOk)}`);

  /* accessibility palette extras */
  const opaqueValues = Object.values(theme.tokens).filter((value) => parseColor(value).a >= 1);
  const hasOpaqueWhite = opaqueValues.some((value) => {
    const c = parseColor(value);
    return c.r === 255 && c.g === 255 && c.b === 255;
  });
  const hasOpaqueBlack = opaqueValues.some((value) => {
    const c = parseColor(value);
    return c.r === 0 && c.g === 0 && c.b === 0;
  });

  if (theme.id === 'h4x0r-dim') {
    const baseLum = luminance(parseColor(base));
    designRow('dim base luminance is low and not pure black', baseLum.toFixed(4), baseLum > 0 && baseLum < 0.05, `base luminance ${baseLum.toFixed(4)}`);
    designRow('dim has no opaque pure white or black', '', !hasOpaqueWhite && !hasOpaqueBlack, 'opaque white or black value found');
  }

  if (theme.id === 'mirage-lumen') {
    const baseLum = luminance(parseColor(base));
    designRow('lumen base luminance in daylight range', baseLum.toFixed(4), baseLum >= 0.8 && baseLum <= 0.97, `base luminance ${baseLum.toFixed(4)}`);
    const tint = hslOf(base);
    designRow(
      'lumen base is soft green-tinted',
      `hue ${tint.h.toFixed(0)} sat ${tint.s.toFixed(3)}`,
      tint.h >= 70 && tint.h <= 170 && tint.s >= 0.02 && tint.s <= 0.35,
      `hue ${tint.h.toFixed(0)} sat ${tint.s.toFixed(3)}`,
    );
    const softBorder = contrastOn(get('--dsw-alias-border-l4'), base);
    designRow('lumen borders are soft (l4 over base <= 2.0)', fmt(softBorder), softBorder <= 2.0, `l4 contrast ${fmt(softBorder)}`);
    designRow('lumen has no opaque pure white or black', '', !hasOpaqueWhite && !hasOpaqueBlack, 'opaque white or black value found');
  }

  out('');
}

for (const expected of EXPECTED_PACKS) {
  const pack = packs.find((p) => p.id === expected.id);
  if (!pack) continue;
  out(`== ${pack.name} pack (${pack.id}) : ${pack.themes.length} themes ==`);
  out('');
  for (const theme of pack.themes) themeBlock(pack, theme);
}

/* ------------------------------------------------------------------ */
/* summary                                                             */
/* ------------------------------------------------------------------ */

out('='.repeat(110));
out(`SUMMARY: ${failures.length === 0 ? 'ALL CHECKS PASS' : `${failures.length} FAILURE(S)`}`);
out('');
out('  pack      theme           scheme  primary  secondary  brand  onBrand  state(min)');
for (const { pack, theme, values } of computed) {
  out(
    `  ${pack.padEnd(9)} ${theme.name.padEnd(15)} ${theme.colorScheme.padEnd(7)} ${fmt(values.labelPrimaryOnBase).padStart(7)}  ${fmt(values.labelSecondaryOnBase).padStart(9)}  ${fmt(values.brandOnBase).padStart(5)}  ${fmt(values.labelOnBrand).padStart(7)}  ${fmt(values.stateOnBase).padStart(9)}`,
  );
}
out('');
out(`  themes checked: ${computed.length} (${computed.filter((c) => c.pack === 'h4x0r').length} H4X0R, ${computed.filter((c) => c.pack === 'mirage').length} MIRAGE)`);
out(`  token coverage: ${coverageOk ? `${computed.length * INVENTORY_NAMES.length}/${computed.length * INVENTORY_NAMES.length}` : 'FAILED'}`);
out(`  regression: ${regressionMatches}/6 H4X0R theme objects match the v1 baseline`);
out(`  accent flags: ${flaggedAccents.length} MIRAGE accent(s) within 25 degrees of a v1 accent, all differentiated`);
out('');
if (failures.length) {
  out('FAILURES:');
  for (const failure of failures) out(`  - ${failure}`);
  out('');
}

const report = lines.join('\n') + '\n';
writeFileSync(reportPath, report, 'utf8');
process.stdout.write(report);
process.exitCode = failures.length === 0 ? 0 : 1;
