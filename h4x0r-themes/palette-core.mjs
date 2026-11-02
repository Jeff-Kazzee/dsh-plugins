// palette-core.mjs
// Pure color math and the 119-token palette engine for H4X0R Themes v2.
// No imports, no DOM, no module side effects. The client build strips the
// leading `export ` from each declaration and inlines this file, so every
// statement is a plain const or function declaration. All colors are derived in
// OKLCH from a compact recipe. Surface, border, label, code, diff, menu and
// sidebar roles keep the curated make-themes relationships. Alpha roles are
// literal rgba() strings.
//
// Role data: <prefix><name without prefix>=<derived slot>. Prefix 0 is
// --dsw-alias-, 1 is --dsw-specific-, 2 is --dsw-menu-.
const pcRoleData =
  '0bg-base=base,0bg-document-preview=dp,0bg-document-selection=sl,0label-document-preview=ts,0bg-layer-1=l1,0bg-layer-2=l2,0bg-layer-3=l3,0bg-mask-1=m1,0bg-mask-2=m2,0bg-mask-3=m3,0bg-mask-photo=mp,0bg-mask-drop=md,0bg-module-platform=l3,0bg-multi-select=mu,0bg-overlay=ov,0bg-skeleton=sk,0border-inverted2=bi2,0border-inverted=bi,0border-l1=b1,0border-l2-darkmode-thin=btn,0border-l2=b2,0border-l3=b3,0border-l4=b4,0brand-primary-invert=bri,0brand-primary-new-colorprimary-new-color=ac,0brand-primary=br,0brand-text=bt,0button-contrast-fill=cf,0button-elevated-fill=l3,0button-floating-fill=l2,0button-floating-hover=l3,0button-ghost-active-border=gb,0button-ghost-active-fill=l3,0button-ghost-active-hover=gh,0button-info-fill=if,0button-info-hover=ih,0button-primary-dimmed=bd,0button-primary-fill=br,0button-primary-hover=bh,0button-tool-bar-fill-invisible=ti,0button-tool-bar-fill=tf,0button-tool-bar-hover=th,0interactive-bg-active=ia,0interactive-bg-hover-accent=iac,0interactive-bg-hover-danger=iad,0interactive-bg-hover-solid=l3,0interactive-bg-hover=ihv,0label-caption=tc,0label-deep-diving=dd,0label-deep-diving-shimmer=dds,0label-dimmed=td,0label-primary-bluish=bl,0label-primary-dimmed=tpd,0label-primary-foreground=ob,0label-primary-inverted=oi,0label-primary=tp,0label-secondary=ts,0label-shimmer=ls,0label-tertiary=tt,0menu-icon=mi,0link=lk,0markdown-citation=ci,0markdown-code-block-banner=cb,0markdown-code-block=cod,0markdown-code-segment-selected=csel,0markdown-code-segment-unselected=cod,0markdown-inline-code=ic,0markdown-placeholder=l2,0markdown-tag=tag,0scrollbar-bg-l1=s1,0scrollbar-bg-l2=s2,0scrollbar-hover-l1=sh1,0scrollbar-hover-l2=sh2,0state-business-primary=bs,0state-business-tertiary=bss,0code-diff-added=dai,0code-diff-deleted=ddi,0file-diff-added-bg=dab,0file-diff-added-gutter=dag,0file-diff-added-marker=dam,0file-diff-deleted-bg=ddb,0file-diff-deleted-gutter=ddg,0file-diff-deleted-marker=ddm,0state-error-primary=er,0state-error-secondary=erb,0state-idle-primary=id,0state-success-primary=su,0state-success-secondary=sub,0state-success-tertiary=sus,0state-warn-label=wat,0state-warn-primary=wa,0state-warn-secondary=wab,0state-warn-tertiary=was,0switch-thumb=sw,0toast-bg=tbg,0toast-label=tbl,0tooltip-bg=tip,0tooltip-key-bg=tipk,0turn-trigger-bg=tr,0turn-trigger-bg-hover=trh,1bubble-highlight=buh,1bubble=bu,1input-major=inm,1login-input=lin,2surface-fill=msf,0menu-group-header-fill=mgf,1menu=msf,1selector=l3,1sidebar-fill=sbf,1sidebar-nav-item-active-accent=sba,1sidebar-nav-item-active=sact,1sidebar-nav-item-hover=sbh,1tip=l3,0settings-card-fill=scf,0settings-card-stroke=b4,0onboarding-accent=oa,0onboarding-card-fill=oc,0onboarding-secondary-fill=os,0onboarding-checkbox-border=ckb';

const pcRoles = pcRoleData.split(',').map((e) => {
  const i = e.indexOf('=');
  const prefix = e[0] === '1' ? 'specific' : e[0] === '2' ? 'menu' : 'alias';
  return ['--dsw-' + prefix + '-' + e.slice(1, i), e.slice(i + 1)];
});

/** All 119 override eligible token names, in token-inventory.json order. */
export function roleTokenNames() {
  return pcRoles.map((r) => r[0]);
}

/* ------------------------------------------------------------------ */
/* color math                                                          */
/* ------------------------------------------------------------------ */

function pcParse(v) {
  if (Array.isArray(v)) return { r: +v[0], g: +v[1], b: +v[2], a: v.length > 3 ? +v[3] : 1 };
  if (v && typeof v === 'object' && typeof v.r === 'number') return { r: +v.r, g: +v.g, b: +v.b, a: typeof v.a === 'number' ? v.a : 1 };
  const s = String(v == null ? '' : v).trim();
  let m = s.match(/^#([0-9a-f]{3,8})$/i);
  if (m) {
    let h = m[1];
    if (h.length === 3 || h.length === 4) h = h.split('').map((c) => c + c).join('');
    if (h.length === 6 || h.length === 8) {
      return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16), a: h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1 };
    }
  }
  m = s.match(/^rgba?\(([^)]+)\)$/i);
  if (m) {
    const p = m[1].split(/[\s,/]+/).filter(Boolean);
    const ch = (x) => (x.slice(-1) === '%' ? (parseFloat(x) / 100) * 255 : parseFloat(x));
    const al = (x) => (x == null ? 1 : x.slice(-1) === '%' ? parseFloat(x) / 100 : parseFloat(x));
    if (p.length >= 3) {
      const c = { r: ch(p[0]), g: ch(p[1]), b: ch(p[2]), a: p.length > 3 ? al(p[3]) : 1 };
      if ([c.r, c.g, c.b, c.a].every((n) => Number.isFinite(n))) return c;
    }
  }
  throw new Error('palette-core: not a color: ' + s);
}

const pcLin = (v) => {
  const s = clamp(v, 0, 255) / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
};
const pcDel = (v) => {
  const s = clamp(v, 0, 1);
  return s <= 0.0031308 ? s * 12.92 : 1.055 * Math.pow(s, 1 / 2.4) - 0.055;
};

function pcRgb01(o) {
  const rad = ((Number(o.h) || 0) * Math.PI) / 180;
  const a = (Number(o.c) || 0) * Math.cos(rad);
  const b = (Number(o.c) || 0) * Math.sin(rad);
  const L = clamp(Number(o.l), 0, 1);
  const l = Math.pow(L + 0.3963377774 * a + 0.2158037573 * b, 3);
  const m = Math.pow(L - 0.1055613458 * a - 0.0638541728 * b, 3);
  const s = Math.pow(L - 0.0894841775 * a - 1.291485548 * b, 3);
  return [pcDel(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s), pcDel(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s), pcDel(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s)];
}

const pcOklch = (l, c, h) => oklchToSrgb({ l: clamp(l, 0.02, 0.992), c: Math.max(0, c), h });
const pcR2 = (n) => Math.round(Number(n) * 100) / 100;

function pcRgba(color, alpha) {
  const c = pcParse(color);
  return 'rgba(' + Math.round(clamp(c.r, 0, 255)) + ', ' + Math.round(clamp(c.g, 0, 255)) + ', ' + Math.round(clamp(c.b, 0, 255)) + ', ' + Number(clamp(alpha, 0, 1).toFixed(3)) + ')';
}

function pcShiftL(color, delta, cap) {
  const o = srgbToOklch(color);
  const l = o.l + delta;
  return pcOklch(cap == null ? l : Math.min(l, cap), o.c, o.h);
}

export function luminance(color) {
  const c = pcParse(color);
  return 0.2126 * pcLin(c.r) + 0.7152 * pcLin(c.g) + 0.0722 * pcLin(c.b);
}

export function clamp(value, min, max) {
  return value < min ? min : value > max ? max : value;
}

export function hexToRgb(hex) {
  const c = pcParse(hex);
  return [Math.round(clamp(c.r, 0, 255)), Math.round(clamp(c.g, 0, 255)), Math.round(clamp(c.b, 0, 255))];
}

export function rgbToHex(rgb) {
  const c = pcParse(rgb);
  return '#' + [c.r, c.g, c.b].map((v) => Math.round(clamp(v, 0, 255)).toString(16).padStart(2, '0')).join('');
}

export function srgbToOklch(color) {
  const c = pcParse(color);
  const r = pcLin(c.r);
  const g = pcLin(c.g);
  const b = pcLin(c.b);
  const l1 = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m1 = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s1 = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l1 + 0.793617785 * m1 - 0.0040720468 * s1;
  const a = 1.9779984951 * l1 - 2.428592205 * m1 + 0.4505937099 * s1;
  const bb = 0.0259040371 * l1 + 0.7827717662 * m1 - 0.808675766 * s1;
  let hue = (Math.atan2(bb, a) * 180) / Math.PI;
  if (hue < 0) hue += 360;
  return { l: clamp(L, 0, 1), c: Math.hypot(a, bb), h: hue };
}

export function oklchToSrgb(oklch) {
  const l = clamp(Number(oklch && oklch.l), 0, 1);
  let c = Math.max(0, Number(oklch && oklch.c) || 0);
  const h = ((Number(oklch && oklch.h) || 0) % 360 + 360) % 360;
  const fits = (cc) => {
    const rgb = pcRgb01({ l, c: cc, h });
    return rgb.every((v) => v >= -0.0005 && v <= 1.0005);
  };
  if (!fits(c)) {
    let lo = 0;
    let hi = c;
    for (let i = 0; i < 24; i += 1) {
      const mid = (lo + hi) / 2;
      if (fits(mid)) lo = mid;
      else hi = mid;
    }
    c = lo;
  }
  return '#' + pcRgb01({ l, c, h }).map((v) => Math.round(clamp(v, 0, 1) * 255).toString(16).padStart(2, '0')).join('');
}

export function composite(foreground, background, alpha) {
  const fg = pcParse(foreground);
  const bg = pcParse(background);
  const a = clamp(alpha == null ? fg.a : alpha, 0, 1);
  return rgbToHex([fg.r * a + bg.r * (1 - a), fg.g * a + bg.g * (1 - a), fg.b * a + bg.b * (1 - a)]);
}

export function contrastRatio(a, b) {
  let bg = pcParse(b);
  if (bg.a < 1) bg = pcParse(composite(bg, '#808080', bg.a));
  const raw = pcParse(a);
  const fg = raw.a < 1 ? pcParse(composite(raw, rgbToHex(bg), raw.a)) : raw;
  const la = luminance(fg);
  const lb = luminance(bg);
  const hi = la >= lb ? la : lb;
  const lo = la >= lb ? lb : la;
  return (hi + 0.05) / (lo + 0.05);
}

export function mixOklch(a, b, t) {
  const A = srgbToOklch(a);
  const B = srgbToOklch(b);
  const s = clamp(Number(t), 0, 1);
  const hueA = A.c < 0.0005 ? B.h : A.h;
  const hueB = B.c < 0.0005 ? A.h : B.h;
  return oklchToSrgb({ l: A.l + (B.l - A.l) * s, c: A.c + (B.c - A.c) * s, h: hueA + (((hueB - hueA + 540) % 360) - 180) * s });
}

/* ------------------------------------------------------------------ */
/* ramp grammars and gates                                             */
/* ------------------------------------------------------------------ */

const pcNormalDark = {
  dark: true, comfort: false, cap: 0.45, liftL: 0.9, inkL: 0.04, baseBand: [0.1, 0.235],
  surfaceSteps: [0.18, 0.34, 0.485], sidebarStep: 0.15, overlayStep: 0.83, codeStep: 0.12, inlineStep: 0.29,
  labelL: [0.89, 0.735, 0.625, 0.535, 0.4], borderAlphas: [0.08, 0.13, 0.18, 0.23], maskAlphas: [0.24, 0.12, 0.48, 0.88],
  brandLum: 0.19, brandMin: 0.06, chroma: { text: 0.03, base: 0.06, brand: 0.2, support: 0.13 }, stateScale: 1,
};
const pcNormalLight = {
  dark: false, comfort: false, cap: 1, liftL: 0.985, inkL: 0.18, baseBand: [0.92, 0.975],
  surfaceSteps: [0.28, 0.46, 0.6], sidebarStep: -0.28, overlayStep: 0.78, codeStep: 0.045, inlineStep: 0.045,
  labelL: [0.24, 0.45, 0.54, 0.61, 0.745], borderAlphas: [0.09, 0.15, 0.2, 0.26], maskAlphas: [0.24, 0.12, 0.48, 0.88],
  brandLum: 0.19, brandMin: 0.06, chroma: { text: 0.035, base: 0.045, brand: 0.18, support: 0.12 }, stateScale: 1,
};
const pcComfortDark = Object.assign({}, pcNormalDark, {
  comfort: true, liftL: 0.78, baseBand: [0.245, 0.28], surfaceSteps: [0.162, 0.277, 0.393], sidebarStep: 0.162, overlayStep: 0.671,
  labelL: null, labelContrast: [9.5, 6, 4.5, 3.2, 1.9], borderAlphas: [0.1, 0.14, 0.18, 0.22], maskAlphas: [0.2, 0.1, 0.4, 0.8],
  brandLum: 0.185, brandMin: 0.05, chroma: { text: 0.02, base: 0.03, brand: 0.1, support: 0.06 }, stateScale: 0.85,
});
const pcComfortLight = Object.assign({}, pcNormalLight, {
  comfort: true, baseBand: [0.92, 0.965], labelL: null, labelContrast: [10.5, 6.5, 4.8, 3.4, 1.9],
  brandLum: 0.185, brandMin: 0.05, chroma: { text: 0.02, base: 0.03, brand: 0.1, support: 0.06 }, stateScale: 0.85,
});

/** The two ramp grammars, selectable through recipe.ramps. */
export const RAMP_SETS = { normal: { dark: pcNormalDark, light: pcNormalLight }, comfort: { dark: pcComfortDark, light: pcComfortLight } };

/** Contrast gates as [minimum, maximum] pairs. Never edit a gate to pass a case. */
export const GATES = {
  normal: { labelPrimaryOnBase: [7, null], labelSecondaryOnBase: [4.5, null], brandOnBase: [3, null], labelOnBrand: [3, null], stateOnBase: [3, null] },
  comfort: { labelPrimaryOnBase: [4.5, 12], labelSecondaryOnBase: [4.5, null], brandOnBase: [3, null], labelOnBrand: [3, null], stateOnBase: [3, null], noPure: true },
};

/* ------------------------------------------------------------------ */
/* palette derivation                                                  */
/* ------------------------------------------------------------------ */

const pcStateNames = ['error', 'success', 'warn', 'idle'];

function pcContrastToL(base, target, dark, c, h) {
  let lo = 0.02;
  let hi = 0.985;
  for (let i = 0; i < 24; i += 1) {
    const mid = (lo + hi) / 2;
    const pass = contrastRatio(pcOklch(mid, c, h), base) >= target;
    if (dark ? pass : !pass) hi = mid;
    else lo = mid;
  }
  return (lo + hi) / 2;
}

function pcLumToL(target, c, h) {
  let lo = 0.02;
  let hi = 0.985;
  for (let i = 0; i < 24; i += 1) {
    const mid = (lo + hi) / 2;
    if (luminance(pcOklch(mid, c, h)) < target) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

function pcOnBrand(brand, dark) {
  const h = srgbToOklch(brand).h;
  const light = pcOklch(0.965, 0.012, h);
  const deep = pcOklch(0.13, 0.012, h);
  return contrastRatio(light, brand) >= contrastRatio(deep, brand) ? light : deep;
}

const pcStateColor = (anchor, ramp) => {
  const o = srgbToOklch(anchor);
  return pcOklch(o.l, clamp(o.c * ramp.stateScale, 0.02, 0.22), o.h);
};

function pcCore(recipe) {
  if (!recipe || typeof recipe !== 'object') throw new Error('palette-core: recipe must be an object');
  if (recipe.scheme !== 'light' && recipe.scheme !== 'dark') throw new Error('palette-core: recipe.scheme must be "light" or "dark"');
  if (!recipe.states || typeof recipe.states !== 'object') throw new Error('palette-core: recipe.states is required');
  if (!Array.isArray(recipe.supporting) || recipe.supporting.length < 2) throw new Error('palette-core: recipe.supporting must be two colors');
  const dark = recipe.scheme === 'dark';
  const ramp = Object.assign({}, RAMP_SETS.normal[recipe.scheme], recipe.ramps || {});
  const bi = srgbToOklch(recipe.base);
  const ai = srgbToOklch(recipe.accent);
  const tint = Number.isFinite(recipe.tintHue) ? ((recipe.tintHue % 360) + 360) % 360 : bi.h;
  const baseC = Math.min(bi.c, ramp.chroma.base);
  const base = pcOklch(clamp(bi.l, ramp.baseBand[0], ramp.baseBand[1]), baseC, tint);
  const L = srgbToOklch(base).l;
  const textC = Math.min(ramp.chroma.text, 0.006 + baseC * 0.25);
  const surfC = Math.min(ramp.chroma.base, 0.006 + baseC * 0.7);
  const textTint = tint;
  const labelL = ramp.labelL || ramp.labelContrast.map((t) => pcContrastToL(base, t, dark, textC, textTint));
  const texts = labelL.map((l) => pcOklch(l, textC, textTint));
  const accentC = clamp(ai.c, ramp.brandMin, ramp.chroma.brand);
  const accentHue = ai.c > 0.01 ? ai.h : tint;
  const labelLum = luminance(texts[0]);
  const low = dark ? 3 * (luminance(base) + 0.05) - 0.05 : 3 * (labelLum + 0.05) - 0.05;
  const high = dark ? (labelLum + 0.05) / 3 - 0.05 : (luminance(base) + 0.05) / 3 - 0.05;
  const target = high - low >= 0.02 ? clamp(ramp.brandLum, low + 0.008, high - 0.008) : (low + high) / 2;
  const liftAt = (t) => L + (ramp.cap - L) * t;
  return {
    dark, ramp, base, L, tint, textC, surfC, lift: pcOklch(ramp.liftL, Math.min(0.03, 0.008 + baseC * 0.2), tint), ink: pcOklch(ramp.inkL, Math.min(0.02, textC), tint),
    l1: pcOklch(liftAt(ramp.surfaceSteps[0]), surfC, tint), l2: pcOklch(liftAt(ramp.surfaceSteps[1]), surfC, tint), l3: pcOklch(liftAt(ramp.surfaceSteps[2]), surfC, tint),
    ov: pcOklch(liftAt(ramp.overlayStep), surfC, tint), sbf: pcOklch(liftAt(ramp.sidebarStep), surfC, tint),
    tp: texts[0], ts: texts[1], tt: texts[2], tc: texts[3], td: texts[4], br: pcOklch(pcLumToL(clamp(target, 0.03, 0.9), accentC, accentHue), accentC, accentHue),
    er: pcStateColor(recipe.states.error, ramp), su: pcStateColor(recipe.states.success, ramp), wa: pcStateColor(recipe.states.warn, ramp), id: pcStateColor(recipe.states.idle, ramp),
    supporting: recipe.supporting.slice(0, 2).map((color, index) => {
      const o = srgbToOklch(color);
      return { h: o.c > 0.005 ? o.h : (tint + 45 * (index + 1)) % 360, c: clamp(Math.max(o.c, 0.04), 0.04, ramp.chroma.support) };
    }),
    alphaSurfaces: recipe.alphaSurfaces === true,
  };
}

function pcDerive(p) {
  const { dark, ramp, base: b, tint, surfC } = p;
  const L = p.L;
  const liftAt = (t) => L + (ramp.cap - L) * t;
  const inkAt = (t) => L + (ramp.inkL - L) * t;
  const tone = (t) => pcOklch(dark ? liftAt(t[0]) : inkAt(t[1]), surfC, tint);
  const lift5 = pcOklch(liftAt(0.55), surfC, tint);
  const soft = dark ? b : lift5;
  const glass = p.alphaSurfaces;
  const br = p.br;
  const brO = srgbToOklch(br);
  const bb = dark ? pcShiftL(br, 0.28, 0.92) : pcShiftL(br, 0.075, 0.82);
  const bt = dark ? pcOklch(clamp(brO.l + 0.27, 0.8, 0.9), brO.c * 0.7, brO.h) : pcOklch(brO.l - 0.09, brO.c * 0.85, brO.h);
  const s0 = p.supporting[0];
  const s1 = p.supporting[1];
  const maskInk = dark ? pcOklch(L * 0.28, surfC, tint) : pcOklch(inkAt(0.85), 0.02, tint);
  const tool = dark ? pcOklch(liftAt(0.3), surfC, tint) : pcOklch(inkAt(0.3), surfC, tint);
  const alphas = ramp.borderAlphas;

  /* tone pairs: [dark lift position, light ink position] */
  const T = {
    dp: [0, 0], mu: [0.045, 0.02], gh: [0.26, 0.12], gb: [0.5, 0.5], cb: [0.085, 0.035], cod: [ramp.codeStep, ramp.codeStep],
    tag: [0.11, 0.06], s1: [0.2, 0.16], s2: [0.3, 0.24], sh1: [0.34, 0.2], sh2: [0.44, 0.28], lin: [0.035, 0.055], ci: [0, 0.05],
  };
  for (const k in T) p[k] = k === 'dp' && dark ? b : k === 'ci' && dark ? p.l2 : tone(T[k]);
  p.tpd = dark ? mixOklch(p.tp, b, 0.12) : mixOklch(p.tp, p.lift, 0.1);
  p.oi = dark ? pcOklch(liftAt(0.14), surfC, tint) : p.lift;
  p.bri = p.tp;
  p.bh = pcShiftL(br, 0.06);
  p.bt = bt;
  p.bd = dark ? mixOklch(br, b, 0.42) : mixOklch(b, br, 0.22);
  p.ob = pcOnBrand(br, dark);
  p.if = pcOklch(dark ? 0.52 : 0.5, s0.c, s0.h);
  p.ac = pcOklch(dark ? 0.72 : 0.52, s0.c, s0.h);
  p.ih = dark ? mixOklch(p.if, p.lift, 0.2) : mixOklch(p.if, p.ink, 0.12);
  p.bs = pcOklch(dark ? 0.66 : 0.47, s1.c, s1.h);
  p.bss = pcRgba(p.bs, 0.14);
  p.dd = pcOklch(dark ? 0.78 : 0.48, s1.c, s1.h);
  p.dds = pcRgba(p.dd, 0.35);
  p.bl = dark ? p.tp : pcOklch(0.42, Math.min(0.12, s0.c), s0.h);
  p.lk = dark ? bt : p.if;
  p.sl = pcRgba(bb, 0.4);
  /* masks, borders, glass: alpha steps of one tint */
  p.m1 = pcRgba(maskInk, ramp.maskAlphas[0]);
  p.m2 = pcRgba(maskInk, ramp.maskAlphas[1]);
  p.m3 = pcRgba(maskInk, ramp.maskAlphas[2]);
  p.mp = pcRgba(maskInk, ramp.maskAlphas[3]);
  p.md = dark ? pcRgba(pcOklch(liftAt(0.28), surfC, tint), 0.7) : pcRgba(pcOklch(liftAt(0.92), surfC, tint), 0.72);
  p.sk = dark ? pcRgba(p.lift, 0.06) : pcRgba(p.ink, 0.05);
  p.cf = dark ? pcOklch(0.88, p.textC, tint) : pcOklch(0.235, 0.015, tint);
  p.ti = pcRgba(tool, glass ? 0.28 : 0.36);
  p.tf = pcRgba(tool, glass ? 0.4 : 0.5);
  p.th = pcRgba(tool, glass ? 0.5 : 0.6);
  p.ia = pcRgba(br, dark ? 0.16 : 0.14);
  p.iac = pcRgba(br, dark ? 0.22 : 0.18);
  p.iad = pcRgba(p.er, dark ? 0.12 : 0.1);
  p.ihv = dark ? pcRgba(p.lift, 0.07) : pcRgba(p.ink, 0.05);
  p.ic = dark ? pcOklch(liftAt(ramp.inlineStep), surfC, tint) : p.cod;
  p.csel = dark ? pcOklch(liftAt(0.19), surfC, tint) : pcOklch(liftAt(0.85), surfC, tint);
  p.sw = dark ? pcOklch(0.82, 0.02, tint) : pcOklch(0.97, 0.012, tint);
  p.tbg = dark ? pcOklch(liftAt(0.34), surfC, tint) : pcOklch(0.24, 0.015, tint);
  p.tbl = dark ? pcOklch(0.94, p.textC, tint) : pcOklch(0.955, 0.01, tint);
  p.tip = dark ? pcOklch(liftAt(0.36), surfC, tint) : pcOklch(0.24, 0.015, tint);
  p.tipk = mixOklch(p.tip, '#ffffff', 0.18);
  p.tr = dark ? pcRgba(p.lift, 0.07) : pcOklch(liftAt(0.4), surfC, tint);
  p.trh = dark ? pcRgba(p.lift, 0.11) : pcOklch(inkAt(0.05), surfC, tint);
  p.bu = dark ? mixOklch(p.l2, br, 0.06) : lift5;
  p.buh = dark ? mixOklch(p.l3, br, 0.1) : mixOklch(lift5, br, 0.16);
  p.inm = dark ? p.l2 : p.lift;
  const menuSurface = pcOklch(liftAt(dark ? 0.22 : 0.75), surfC, tint);
  const menuGroup = pcOklch(liftAt(dark ? 0.26 : 0.8), surfC, tint);
  p.msf = pcRgba(menuSurface, glass ? (dark ? 0.4 : 0.52) : dark ? 0.46 : 0.58);
  p.mgf = pcRgba(menuGroup, 0.94);
  p.mi = mixOklch(p.tp, p.ts, 0.55);
  p.sact = dark ? p.l3 : mixOklch(lift5, br, 0.06);
  p.sba = dark ? mixOklch(p.l2, br, 0.16) : mixOklch(b, br, 0.14);
  p.sbh = dark ? p.l2 : pcOklch(inkAt(0.05), surfC, tint);
  p.scf = p.l2;
  p.oa = pcOklch(dark ? 0.75 : 0.5, brO.c, brO.h);
  p.oc = dark ? pcRgba(pcOklch(liftAt(0.28), surfC, tint), glass ? 0.7 : 0.8) : pcRgba(pcOklch(liftAt(0.95), surfC, tint), glass ? 0.72 : 0.82);
  p.os = pcOklch(liftAt(dark ? 0.24 : 0.92), surfC, tint);
  p.ckb = dark ? pcRgba(p.lift, alphas[1]) : pcRgba(p.ink, 0.22);
  const borderTint = dark ? p.lift : p.ink;
  p.b1 = pcRgba(borderTint, alphas[0]);
  p.b2 = pcRgba(borderTint, alphas[1]);
  p.b3 = pcRgba(borderTint, alphas[2]);
  p.b4 = pcRgba(borderTint, alphas[3]);
  p.btn = dark ? p.b1 : pcRgba(p.ink, Math.max(0.06, alphas[1] - 0.04));
  p.bi = dark ? pcRgba(p.lift, 0.06) : pcRgba(p.ink, 0);
  p.bi2 = dark ? pcRgba(p.lift, 0.08) : pcRgba(p.ink, 0);
  p.ls = pcRgba(p.tp, dark ? 0.32 : 0.28);
  /* states, soft fills and diff surfaces */
  p.erb = dark ? pcShiftL(p.er, 0.09) : pcShiftL(p.er, 0.07);
  p.sub = dark ? pcShiftL(p.su, 0.09) : pcShiftL(p.su, 0.07);
  p.sus = dark ? mixOklch(b, p.su, 0.12) : mixOklch(soft, p.su, 0.12);
  p.wab = dark ? pcShiftL(p.wa, 0.09) : pcShiftL(p.wa, 0.07);
  p.wat = dark ? pcShiftL(p.wa, 0.06) : pcShiftL(p.wa, -0.1);
  p.was = dark ? mixOklch(b, p.wa, 0.12) : mixOklch(soft, p.wa, 0.12);
  const erD = dark ? pcShiftL(p.er, -0.17) : pcShiftL(p.er, -0.13);
  const suD = dark ? pcShiftL(p.su, -0.17) : pcShiftL(p.su, -0.13);
  p.dai = pcRgba(dark ? p.su : suD, 0.1);
  p.ddi = pcRgba(dark ? p.er : erD, 0.1);
  p.dab = dark ? mixOklch(b, p.su, 0.16) : mixOklch(soft, p.su, 0.14);
  p.ddb = dark ? mixOklch(b, p.er, 0.16) : mixOklch(soft, p.er, 0.14);
  p.dag = dark ? mixOklch(p.dab, b, 0.45) : mixOklch(p.dab, p.lift, 0.55);
  p.ddg = dark ? mixOklch(p.ddb, b, 0.45) : mixOklch(p.ddb, p.lift, 0.55);
  p.dam = dark ? p.sub : suD;
  p.ddm = dark ? p.erb : erD;
  return p;
}

/** Build the complete 119 token map for one scheme from a compact recipe. */
export function buildTokensFromRecipe(recipe) {
  const palette = pcDerive(pcCore(recipe));
  const tokens = {};
  for (const row of pcRoles) {
    const value = palette[row[1]];
    if (typeof value !== 'string') throw new Error('palette-core: missing derived color for token ' + row[0]);
    tokens[row[0]] = value;
  }
  return tokens;
}

/* ------------------------------------------------------------------ */
/* contrast assessment                                                 */
/* ------------------------------------------------------------------ */

const pcGatePair = (gates, key) => {
  const g = gates && gates[key];
  if (g == null) return [0, null];
  return typeof g === 'number' ? [g, null] : [g[0], g[1] == null ? null : g[1]];
};
const pcGateFail = (v, g) => v < g[0] - 1e-9 || (g[1] != null && v > g[1] + 1e-9);

function pcIsPure(value) {
  if (pcParse(value).a < 1) return false;
  const lum = luminance(value);
  return lum >= 1 - 1e-6 || lum <= 1e-6;
}

function pcMeasure(tokens, gates) {
  const b = tokens['--dsw-alias-bg-base'];
  const br = tokens['--dsw-alias-brand-primary'];
  const tp = tokens['--dsw-alias-label-primary'];
  const values = {
    labelPrimaryOnBase: contrastRatio(tp, b),
    labelSecondaryOnBase: contrastRatio(tokens['--dsw-alias-label-secondary'], b),
    brandOnBase: contrastRatio(br, b),
    labelOnBrand: contrastRatio(tp, br),
    labelOnBrandForeground: contrastRatio(tokens['--dsw-alias-label-primary-foreground'], br),
  };
  const statesOnBase = {};
  for (const name of pcStateNames) statesOnBase[name] = contrastRatio(tokens['--dsw-alias-state-' + name + '-primary'], b);
  values.stateOnBase = Math.min(statesOnBase.error, statesOnBase.success, statesOnBase.warn, statesOnBase.idle);
  const failures = [];
  const push = (gate, token, value, extra) => {
    const pair = pcGatePair(gates, gate);
    if (pcGateFail(value, pair)) failures.push(Object.assign({ gate, token, value, min: pair[0], max: pair[1] }, extra || {}));
  };
  push('labelPrimaryOnBase', '--dsw-alias-label-primary', values.labelPrimaryOnBase);
  push('labelSecondaryOnBase', '--dsw-alias-label-secondary', values.labelSecondaryOnBase);
  push('brandOnBase', '--dsw-alias-brand-primary', values.brandOnBase);
  push('labelOnBrand', '--dsw-alias-label-primary', values.labelOnBrand);
  push('labelOnBrandForeground', '--dsw-alias-label-primary-foreground', values.labelOnBrandForeground);
  for (const name of pcStateNames) push('stateOnBase', '--dsw-alias-state-' + name + '-primary', statesOnBase[name], { state: name });
  if (gates && gates.noPure) {
    for (const row of pcRoles) if (pcIsPure(tokens[row[0]])) failures.push({ gate: 'noPure', token: row[0], value: 0, min: 0, max: null });
  }
  return { values, statesOnBase, failures };
}

/** Measure every gate from a token map. Gate definitions are read only. */
export function assessContrast(tokens, scheme, gates) {
  if (!tokens || typeof tokens !== 'object') throw new Error('palette-core: assessContrast needs a token map');
  const m = pcMeasure(tokens, gates || GATES.normal);
  const statesOnBase = {};
  for (const name of pcStateNames) statesOnBase[name] = pcR2(m.statesOnBase[name]);
  return {
    labelPrimaryOnBase: pcR2(m.values.labelPrimaryOnBase),
    labelSecondaryOnBase: pcR2(m.values.labelSecondaryOnBase),
    brandOnBase: pcR2(m.values.brandOnBase),
    labelOnBrand: pcR2(m.values.labelOnBrand),
    labelOnBrandForeground: pcR2(m.values.labelOnBrandForeground),
    statesOnBase,
    stateOnBase: pcR2(m.values.stateOnBase),
    failures: m.failures.map((f) => {
      const row = { gate: f.gate };
      if (f.state) row.state = f.state;
      row.value = pcR2(f.value);
      row.min = f.min;
      row.max = f.max;
      return row;
    }),
  };
}

/* ------------------------------------------------------------------ */
/* repair loop                                                         */
/* ------------------------------------------------------------------ */

/** Named error thrown when contrast repair cannot converge. */
class pcRepairError extends Error {
  constructor(message) {
    super(message);
    this.name = 'PaletteRepairError';
  }
}

const pcGated = [
  '--dsw-alias-label-primary', '--dsw-alias-label-secondary', '--dsw-alias-brand-primary', '--dsw-alias-label-primary-foreground',
  '--dsw-alias-state-error-primary', '--dsw-alias-state-success-primary', '--dsw-alias-state-warn-primary', '--dsw-alias-state-idle-primary',
];

function pcSig(tokens) {
  return pcGated.map((n) => {
    const o = srgbToOklch(tokens[n]);
    return o.l.toFixed(4) + '/' + o.c.toFixed(4) + '/' + o.h.toFixed(1);
  }).join(',');
}

function pcFailureText(failures) {
  return failures.map((f) => f.gate + (f.state ? ':' + f.state : '') + '=' + Number(f.value).toFixed(2)).join(' | ');
}

function pcAdjustL(tokens, name, delta, lo, hi, adjustments) {
  const o = srgbToOklch(tokens[name]);
  const next = clamp(o.l + delta, lo, hi);
  if (Math.abs(next - o.l) < 1e-9) return;
  const from = tokens[name];
  tokens[name] = pcOklch(next, o.c, o.h);
  adjustments.push({ token: name, from, to: tokens[name] });
}

/**
 * Walk lightness in small steps until every gate passes. Gates are read only.
 * Throws PaletteRepairError when the gate set cannot be met by the token map.
 */
export function repairContrast(tokens, scheme, gates) {
  if (!tokens || typeof tokens !== 'object') throw new Error('palette-core: repairContrast needs a token map');
  const dark = scheme !== 'light';
  const gateSet = gates || GATES.normal;
  const out = {};
  for (const name of roleTokenNames()) {
    if (typeof tokens[name] !== 'string') throw new Error('palette-core: repairContrast token map is missing ' + name);
    out[name] = tokens[name];
  }
  const adjustments = [];
  const seen = new Set();
  let last = [];
  for (let iteration = 0; iteration < 420; iteration += 1) {
    const measured = pcMeasure(out, gateSet);
    if (measured.failures.length === 0) {
      pcRefreshGated(out, dark);
      return { tokens: out, adjustments };
    }
    last = measured.failures;
    const signature = pcFailureText(measured.failures) + '#' + pcSig(out);
    if (seen.has(signature)) throw new pcRepairError('palette-core: contrast repair stalled with ' + pcFailureText(measured.failures));
    seen.add(signature);
    const touched = {};
    for (const f of measured.failures) {
      const name = f.token;
      if (f.gate === 'noPure') {
        if (!touched[name]) {
          touched[name] = true;
          pcAdjustL(out, name, luminance(out[name]) >= 1 - 1e-6 ? -0.02 : 0.02, 0.02, 0.985, adjustments);
        }
        continue;
      }
      if (f.gate === 'labelOnBrandForeground') {
        out[name] = pcOnBrand(out['--dsw-alias-brand-primary'], dark);
        continue;
      }
      if (f.gate === 'labelOnBrand') {
        const label = '--dsw-alias-label-primary';
        const labelL = srgbToOklch(out[label]).l;
        if ((dark ? labelL < 0.979 : labelL > 0.026) && !touched[label]) {
          touched[label] = true;
          pcAdjustL(out, label, dark ? 0.01 : -0.01, 0.02, 0.985, adjustments);
        } else if (!touched['--dsw-alias-brand-primary']) {
          touched['--dsw-alias-brand-primary'] = true;
          pcAdjustL(out, '--dsw-alias-brand-primary', dark ? -0.01 : 0.01, 0.25, 0.8, adjustments);
        }
        continue;
      }
      if (touched[name]) continue;
      touched[name] = true;
      const brandGate = f.gate === 'brandOnBase';
      const maxFailure = f.max != null && f.value > f.max + 1e-9;
      const delta = brandGate ? (dark ? 0.01 : -0.01) : maxFailure ? (dark ? -0.01 : 0.01) : dark ? 0.01 : -0.01;
      const lo = brandGate || f.gate === 'stateOnBase' ? 0.25 : 0.02;
      const hi = brandGate ? 0.8 : f.gate === 'stateOnBase' ? 0.9 : 0.985;
      pcAdjustL(out, name, delta, lo, hi, adjustments);
    }
  }
  throw new pcRepairError('palette-core: contrast repair exceeded 420 iterations with ' + pcFailureText(last));
}

/* Recompute tokens that depend on the gated text, brand and state colors. */
function pcRefreshGated(t, dark) {
  const b = t['--dsw-alias-bg-base'];
  const l2 = t['--dsw-alias-bg-layer-2'];
  const l3 = t['--dsw-alias-bg-layer-3'];
  const liftProxy = dark ? t['--dsw-alias-label-primary'] : l3;
  const soft = dark ? b : l2;
  const tp = t['--dsw-alias-label-primary'];
  const br = t['--dsw-alias-brand-primary'];
  const brO = srgbToOklch(br);
  const er = t['--dsw-alias-state-error-primary'];
  const su = t['--dsw-alias-state-success-primary'];
  const wa = t['--dsw-alias-state-warn-primary'];
  t['--dsw-alias-label-primary-dimmed'] = dark ? mixOklch(tp, b, 0.12) : mixOklch(tp, liftProxy, 0.1);
  t['--dsw-alias-brand-primary-invert'] = tp;
  const bt = dark ? pcOklch(clamp(brO.l + 0.27, 0.8, 0.9), brO.c * 0.7, brO.h) : pcOklch(brO.l - 0.09, brO.c * 0.85, brO.h);
  t['--dsw-alias-brand-text'] = bt;
  const bh = pcShiftL(br, 0.06);
  const bb = dark ? pcShiftL(br, 0.28, 0.92) : pcShiftL(br, 0.075, 0.82);
  t['--dsw-alias-button-primary-fill'] = br;
  t['--dsw-alias-button-primary-hover'] = bh;
  t['--dsw-alias-button-primary-dimmed'] = dark ? mixOklch(br, b, 0.42) : mixOklch(b, br, 0.22);
  t['--dsw-alias-bg-document-selection'] = pcRgba(bb, 0.4);
  t['--dsw-alias-interactive-bg-active'] = pcRgba(br, dark ? 0.16 : 0.14);
  t['--dsw-alias-interactive-bg-hover-accent'] = pcRgba(br, dark ? 0.22 : 0.18);
  t['--dsw-alias-interactive-bg-hover-danger'] = pcRgba(er, dark ? 0.12 : 0.1);
  t['--dsw-specific-sidebar-nav-item-active-accent'] = dark ? mixOklch(l2, br, 0.16) : mixOklch(b, br, 0.14);
  const lift5 = mixOklch(l2, l3, 0.67);
  t['--dsw-specific-sidebar-nav-item-active'] = dark ? l3 : mixOklch(lift5, br, 0.06);
  t['--dsw-specific-bubble'] = dark ? mixOklch(l2, br, 0.06) : lift5;
  t['--dsw-specific-bubble-highlight'] = dark ? mixOklch(l3, br, 0.1) : mixOklch(lift5, br, 0.16);
  t['--dsw-alias-menu-icon'] = mixOklch(tp, t['--dsw-alias-label-secondary'], 0.55);
  t['--dsw-alias-label-shimmer'] = pcRgba(tp, dark ? 0.32 : 0.28);
  t['--dsw-alias-label-primary-foreground'] = pcOnBrand(br, dark);
  if (dark) t['--dsw-alias-link'] = bt;
  const erB = dark ? pcShiftL(er, 0.09) : pcShiftL(er, 0.07);
  const suB = dark ? pcShiftL(su, 0.09) : pcShiftL(su, 0.07);
  const waB = dark ? pcShiftL(wa, 0.09) : pcShiftL(wa, 0.07);
  const erD = dark ? pcShiftL(er, -0.17) : pcShiftL(er, -0.13);
  const suD = dark ? pcShiftL(su, -0.17) : pcShiftL(su, -0.13);
  t['--dsw-alias-state-error-secondary'] = erB;
  t['--dsw-alias-state-success-secondary'] = suB;
  t['--dsw-alias-state-warn-secondary'] = waB;
  t['--dsw-alias-state-warn-label'] = dark ? pcShiftL(wa, 0.06) : pcShiftL(wa, -0.1);
  t['--dsw-alias-state-success-tertiary'] = dark ? mixOklch(b, su, 0.12) : mixOklch(soft, su, 0.12);
  t['--dsw-alias-state-warn-tertiary'] = dark ? mixOklch(b, wa, 0.12) : mixOklch(soft, wa, 0.12);
  t['--dsw-alias-code-diff-added'] = pcRgba(dark ? su : suD, 0.1);
  t['--dsw-alias-code-diff-deleted'] = pcRgba(dark ? er : erD, 0.1);
  const dab = dark ? mixOklch(b, su, 0.16) : mixOklch(soft, su, 0.14);
  const ddb = dark ? mixOklch(b, er, 0.16) : mixOklch(soft, er, 0.14);
  t['--dsw-alias-file-diff-added-bg'] = dab;
  t['--dsw-alias-file-diff-deleted-bg'] = ddb;
  t['--dsw-alias-file-diff-added-gutter'] = dark ? mixOklch(dab, b, 0.45) : mixOklch(dab, liftProxy, 0.55);
  t['--dsw-alias-file-diff-deleted-gutter'] = dark ? mixOklch(ddb, b, 0.45) : mixOklch(ddb, liftProxy, 0.55);
  t['--dsw-alias-file-diff-added-marker'] = dark ? suB : suD;
  t['--dsw-alias-file-diff-deleted-marker'] = dark ? erB : erD;
}
