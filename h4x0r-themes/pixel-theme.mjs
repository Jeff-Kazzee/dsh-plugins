// pixel-theme.mjs
// Pixel analysis and wallpaper theme assembly for H4X0R Themes v2.
// Imports the palette-core helpers it uses. The client build removes this one
// import line and inlines both files into one scope, palette-core first, so the
// browser bundle never sees a module import. Deterministic: no clock, no
// randomness, no locale sensitive formatting.
import { assessContrast, buildTokensFromRecipe, clamp, composite, GATES, hexToRgb, luminance, oklchToSrgb, RAMP_SETS, repairContrast, srgbToOklch } from './palette-core.mjs';

const PX_SIDE = 96;
const PX_K = 6;
const PX_ITERS = 20;
const PX_LIGHT_LUMA = 0.5;
const PX_MONOTONE = 0.05;
const PX_SCRIM = '#808080';
const PX_HUES = 'Rose Amber Citron Fern Jade Aqua Cyan Azure Cobalt Iris Orchid Plum'.split(' ');
const PX_SURF = ['--dsw-alias-bg-base', '--dsw-alias-bg-layer-1', '--dsw-alias-bg-layer-2', '--dsw-alias-bg-module-platform', '--dsw-specific-sidebar-fill'];
const PX_ALPHA = {
  normal: { dark: [0.9, 0.92, 0.93, 0.94, 0.91], light: [0.84, 0.88, 0.9, 0.91, 0.87] },
  comfort: { dark: [0.93, 0.94, 0.95, 0.955, 0.935], light: [0.88, 0.9, 0.92, 0.93, 0.9] },
};

function pxError(message) {
  const error = new Error('pixel-theme: ' + message);
  error.name = 'PixelImageError';
  return error;
}

const pxRound = (v, d) => Math.round(Number(v) * Math.pow(10, d)) / Math.pow(10, d);

function pxHueDistance(a, b) {
  const d = Math.abs(a - b) % 360;
  return d > 180 ? 360 - d : d;
}

function pxHueName(hue) {
  return PX_HUES[Math.floor((((hue % 360) + 360) % 360) / 30) % PX_HUES.length];
}

function pxValidate(rgba, width, height) {
  if (!rgba || typeof rgba.length !== 'number') throw pxError('rgba must be a byte array');
  if (!(width > 0) || !(height > 0) || width !== Math.floor(width) || height !== Math.floor(height)) throw pxError('width and height must be positive integers');
  if (rgba.length < width * height * 4) throw pxError('rgba is shorter than width * height * 4 bytes');
}

/* Box sample to at most PX_SIDE per side, keeping a deterministic pixel order. */
function pxSample(rgba, width, height) {
  const stride = Math.max(1, Math.ceil(Math.max(width, height) / PX_SIDE));
  const points = [];
  let lumaSum = 0;
  for (let top = 0; top < height; top += stride) {
    const bottom = Math.min(height, top + stride);
    for (let left = 0; left < width; left += stride) {
      const right = Math.min(width, left + stride);
      let r = 0;
      let g = 0;
      let b = 0;
      let n = 0;
      for (let y = top; y < bottom; y += 1) {
        for (let x = left; x < right; x += 1) {
          const i = (y * width + x) * 4;
          if (rgba[i + 3] < 8) continue;
          r += rgba[i];
          g += rgba[i + 1];
          b += rgba[i + 2];
          n += 1;
        }
      }
      if (n === 0) continue;
      const pixel = [Math.round(r / n), Math.round(g / n), Math.round(b / n)];
      const lum = luminance(pixel);
      const o = srgbToOklch(pixel);
      const rad = (o.h * Math.PI) / 180;
      points.push({ L: o.l, A: o.c * Math.cos(rad), B: o.c * Math.sin(rad), c: o.c, h: o.h, lum, w: 1 + 10 * Math.min(o.c, 0.3) });
      lumaSum += lum;
    }
  }
  if (points.length === 0) throw pxError('image has no opaque pixels');
  return { points, meanLuma: lumaSum / points.length };
}

function pxMeanHue(points) {
  let sin = 0;
  let cos = 0;
  for (const p of points) {
    const rad = (p.h * Math.PI) / 180;
    sin += Math.sin(rad) * p.c;
    cos += Math.cos(rad) * p.c;
  }
  if (Math.abs(sin) < 1e-9 && Math.abs(cos) < 1e-9) return 0;
  const hue = (Math.atan2(sin, cos) * 180) / Math.PI;
  return hue < 0 ? hue + 360 : hue;
}

const pxDist = (a, b) => (a.L - b.L) ** 2 + (a.A - b.A) ** 2 + (a.B - b.B) ** 2;

/* Deterministic seeds: most vivid, darkest, lightest, then farthest points. */
function pxSeeds(points) {
  const seeds = [];
  const pick = (score) => {
    let best = 0;
    let bestScore = -Infinity;
    for (let i = 0; i < points.length; i += 1) {
      const value = score(points[i]);
      if (value > bestScore) {
        bestScore = value;
        best = i;
      }
    }
    seeds.push(points[best]);
  };
  pick((p) => p.c * 2 - p.L);
  pick((p) => -p.L);
  pick((p) => p.L);
  while (seeds.length < PX_K) {
    let bestIndex = 0;
    let bestDistance = -1;
    for (let i = 0; i < points.length; i += 1) {
      let nearest = Infinity;
      for (const seed of seeds) nearest = Math.min(nearest, pxDist(points[i], seed));
      if (nearest > bestDistance) {
        bestDistance = nearest;
        bestIndex = i;
      }
    }
    seeds.push(points[bestIndex]);
  }
  return seeds;
}

/* Weighted k-means in OKLab, chroma weighted so a small vivid region can win. */
function pxCluster(points) {
  let centers = pxSeeds(points).map((p) => ({ L: p.L, A: p.A, B: p.B }));
  const assignment = new Array(points.length).fill(0);
  for (let iteration = 0; iteration < PX_ITERS; iteration += 1) {
    const sums = centers.map(() => ({ L: 0, A: 0, B: 0, w: 0 }));
    let changed = false;
    for (let i = 0; i < points.length; i += 1) {
      let best = 0;
      let bestDistance = Infinity;
      for (let k = 0; k < centers.length; k += 1) {
        const d = pxDist(points[i], centers[k]);
        if (d < bestDistance) {
          bestDistance = d;
          best = k;
        }
      }
      if (assignment[i] !== best) {
        assignment[i] = best;
        changed = true;
      }
      const s = sums[best];
      s.L += points[i].L * points[i].w;
      s.A += points[i].A * points[i].w;
      s.B += points[i].B * points[i].w;
      s.w += points[i].w;
    }
    centers = centers.map((old, i) => (sums[i].w > 0 ? { L: sums[i].L / sums[i].w, A: sums[i].A / sums[i].w, B: sums[i].B / sums[i].w } : old));
    if (!changed && iteration > 0) break;
  }
  const masses = new Array(centers.length).fill(0);
  for (let i = 0; i < points.length; i += 1) masses[assignment[i]] += points[i].w;
  const total = masses.reduce((a, b) => a + b, 0);
  return centers.map((center, i) => {
    const c = Math.hypot(center.A, center.B);
    let h = (Math.atan2(center.B, center.A) * 180) / Math.PI;
    if (h < 0) h += 360;
    return { l: center.L, c, h, mass: total > 0 ? masses[i] / total : 0, color: oklchToSrgb({ l: center.L, c, h }) };
  });
}

/** Analyze RGBA bytes into a compact palette description. Large input is box sampled. */
export function analyzePixels(rgba, width, height, options) {
  const opts = options || {};
  pxValidate(rgba, width, height);
  if (opts.forceScheme != null && opts.forceScheme !== 'light' && opts.forceScheme !== 'dark') throw pxError('options.forceScheme must be "light" or "dark"');
  const sampled = pxSample(rgba, width, height);
  const points = sampled.points;
  const meanHue = pxMeanHue(points);
  const colorScheme = opts.forceScheme || (sampled.meanLuma >= PX_LIGHT_LUMA ? 'light' : 'dark');
  const clusters = pxCluster(points).sort((a, b) => (Math.abs(b.mass - a.mass) > 1e-12 ? b.mass - a.mass : Math.abs(b.c - a.c) > 1e-12 ? b.c - a.c : a.color < b.color ? -1 : a.color > b.color ? 1 : 0));
  const target = colorScheme === 'dark' ? 0.12 : 0.93;
  let baseIndex = 0;
  let baseScore = -Infinity;
  for (let i = 0; i < clusters.length; i += 1) {
    const score = clusters[i].mass * 2.4 - Math.abs(clusters[i].l - target) * 2.2 - Math.min(clusters[i].c, 0.4) * 1.2;
    if (score > baseScore) {
      baseScore = score;
      baseIndex = i;
    }
  }
  let accentIndex = 0;
  for (let i = 1; i < clusters.length; i += 1) {
    if (clusters[i].c > clusters[accentIndex].c + 1e-12 || (Math.abs(clusters[i].c - clusters[accentIndex].c) <= 1e-12 && clusters[i].mass > clusters[accentIndex].mass + 1e-12)) accentIndex = i;
  }
  const base = clusters[baseIndex];
  const accent = clusters[accentIndex];
  const monotone = Math.max.apply(null, clusters.map((c) => c.c)) < PX_MONOTONE;
  const baseHue = base.c > 0.008 ? base.h : meanHue;
  const accentHue = accent.c > 0.008 ? accent.h : meanHue;
  const tintHue = monotone ? meanHue : baseHue;
  const supporting = [];
  const candidates = clusters.filter((c, i) => i !== baseIndex && i !== accentIndex && c.c >= 0.015);
  const pickSupport = (hueA, hueB) => {
    let best = null;
    let bestScore = -Infinity;
    for (const c of candidates) {
      const score = pxHueDistance(c.h, hueA) + pxHueDistance(c.h, hueB) * 0.5 + c.mass * 90;
      if (score > bestScore) {
        bestScore = score;
        best = c;
      }
    }
    return best;
  };
  const first = pickSupport(accentHue, accentHue);
  const second = first ? pickSupport(accentHue, first.h) : null;
  for (const c of [first, second]) if (c) supporting.push(oklchToSrgb({ l: colorScheme === 'dark' ? 0.6 : 0.5, c: clamp(c.c, 0.03, 0.12), h: c.h }));
  for (let i = supporting.length; i < 2; i += 1) supporting.push(oklchToSrgb({ l: colorScheme === 'dark' ? 0.6 : 0.48, c: 0.05, h: (accentHue + 140 + 75 * i) % 360 }));
  return {
    colorScheme,
    meanLuma: pxRound(sampled.meanLuma, 6),
    baseColor: monotone ? oklchToSrgb({ l: base.l, c: Math.max(base.c, 0.014), h: meanHue }) : base.color,
    accentColor: monotone ? oklchToSrgb({ l: colorScheme === 'dark' ? 0.6 : 0.55, c: 0.06, h: meanHue }) : accent.color,
    supporting,
    monotone,
    clusters: clusters.map((c) => ({ color: c.color, weight: pxRound(c.mass, 6), chroma: pxRound(c.c, 4) })),
  };
}

function pxStates(dark, comfort, tintHue) {
  const s = comfort ? 0.85 : 1;
  return {
    error: oklchToSrgb({ l: dark ? 0.6 : 0.51, c: (dark ? 0.16 : 0.15) * s, h: 27 }),
    success: oklchToSrgb({ l: dark ? 0.65 : 0.54, c: (dark ? 0.125 : 0.1) * s, h: dark ? 152 : 150 }),
    warn: oklchToSrgb({ l: dark ? 0.68 : 0.6, c: (dark ? 0.12 : 0.115) * s, h: 78 }),
    idle: oklchToSrgb({ l: 0.58, c: 0.012, h: tintHue }),
  };
}

function pxAlphaSet(scheme, comfort) {
  const list = PX_ALPHA[comfort ? 'comfort' : 'normal'][scheme];
  const out = {};
  PX_SURF.forEach((name, i) => {
    out[name] = list[i];
  });
  return out;
}

function pxSurfaces(tokens, scheme, comfort) {
  const alphas = pxAlphaSet(scheme, comfort);
  const surfaces = {};
  for (const name of PX_SURF) {
    const rgb = hexToRgb(tokens[name]);
    surfaces[name] = 'rgba(' + rgb[0] + ', ' + rgb[1] + ', ' + rgb[2] + ', ' + Number(alphas[name].toFixed(3)) + ')';
  }
  return surfaces;
}

/** Worst case photo canvas: the alpha surface composited over a mid gray scrim. */
const pxEffectiveBase = (surfaces) => composite(surfaces['--dsw-alias-bg-base'], PX_SCRIM);

function pxSupporting(analysis, dark, ramp) {
  return [0, 1].map((i) => {
    const o = srgbToOklch(analysis.supporting[i]);
    const hue = o.c > 0.005 ? o.h : (srgbToOklch(analysis.accentColor).h + 140 * (i + 1)) % 360;
    return oklchToSrgb({ l: dark ? 0.6 : 0.5, c: clamp(Math.max(o.c, 0.03), 0.03, ramp.chroma.support), h: hue });
  });
}

/** Build a full 119 token wallpaper theme from RGBA bytes. */
export function buildWallpaperTheme(rgba, width, height, options) {
  const opts = options || {};
  const analysis = analyzePixels(rgba, width, height, opts);
  const scheme = analysis.colorScheme;
  const dark = scheme === 'dark';
  const comfort = opts.comfort === true;
  const wallpaper = opts.wallpaper === true;
  const ramp = RAMP_SETS[comfort ? 'comfort' : 'normal'][scheme];
  const gates = comfort ? GATES.comfort : GATES.normal;
  const baseO = srgbToOklch(analysis.baseColor);
  const accentO = srgbToOklch(analysis.accentColor);
  const tintHue = baseO.c > 0.008 ? baseO.h : accentO.c > 0.008 ? accentO.h : 0;
  const accentHue = accentO.c > 0.008 ? accentO.h : tintHue;
  const recipe = {
    scheme,
    base: oklchToSrgb({ l: clamp(baseO.l, ramp.baseBand[0], ramp.baseBand[1]), c: Math.min(baseO.c, ramp.chroma.base), h: tintHue }),
    tintHue,
    accent: oklchToSrgb({ l: clamp(accentO.l, dark ? 0.48 : 0.44, dark ? 0.64 : 0.58), c: clamp(accentO.c, ramp.brandMin, ramp.chroma.brand), h: accentHue }),
    supporting: pxSupporting(analysis, dark, ramp),
    states: pxStates(dark, comfort, tintHue),
    ramps: ramp,
    alphaSurfaces: wallpaper,
  };
  const built = buildTokensFromRecipe(recipe);
  let tokens = built;
  let surfaces = {};
  let effectiveBase = built['--dsw-alias-bg-base'];
  if (wallpaper) {
    surfaces = pxSurfaces(built, scheme, comfort);
    effectiveBase = pxEffectiveBase(surfaces);
    const gateView = Object.assign({}, built);
    gateView['--dsw-alias-bg-base'] = effectiveBase;
    tokens = repairContrast(gateView, scheme, gates).tokens;
    tokens['--dsw-alias-bg-base'] = built['--dsw-alias-bg-base'];
  } else {
    tokens = repairContrast(built, scheme, gates).tokens;
  }
  const check = assessContrast(wallpaper ? Object.assign({}, tokens, { '--dsw-alias-bg-base': effectiveBase }) : tokens, scheme, gates);
  if (check.failures.length) throw pxError('generated palette failed the contrast gates: ' + JSON.stringify(check.failures));
  const meta = {
    fileName: typeof opts.fileName === 'string' ? opts.fileName : '',
    width,
    height,
    meanLuma: analysis.meanLuma,
    monotone: analysis.monotone,
    comfort,
    wallpaper,
    clusterCount: analysis.clusters.length,
    baseHue: pxRound(tintHue, 1),
    accentHue: pxRound(accentHue, 1),
    scrim: PX_SCRIM,
  };
  if (wallpaper) meta.surfaceAlphas = pxAlphaSet(scheme, comfort);
  return {
    name: 'Wallpaper · ' + pxHueName(tintHue),
    colorScheme: scheme,
    tokens,
    check,
    surfaces,
    monotone: analysis.monotone,
    meta,
  };
}
