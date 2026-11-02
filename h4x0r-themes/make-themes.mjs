#!/usr/bin/env node
/**
 * make-themes.mjs
 *
 * Generates themes.data.json for the H4X0R theme plugin, two packs:
 * H4X0R (six v1 palettes, byte-identical regression) and MIRAGE (ten new moods).
 * Dependency free ESM. Run: node make-themes.mjs
 *
 * Each recipe supplies a handful of designed anchor colors (canvas, elevation
 * tint, text ramp, accent, two supporting hues, state colors). The rest of the
 * 119 override-eligible tokens are derived by role: surfaces are mixed up the
 * elevation ramp, borders are alpha steps of one tint, soft fills are alpha
 * steps of the state colors. Coverage is validated against token-inventory.json
 * in both directions, so a missing or misspelled token fails the build.
 *
 * The six H4X0R recipes and the role map are frozen. H4X0R_BASELINE holds the
 * v1 sha256 of every H4X0R theme object. If a generated H4X0R theme no longer
 * matches, the build refuses to write themes.data.json and exits non-zero.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const inventory = JSON.parse(readFileSync(join(HERE, 'token-inventory.json'), 'utf8'));
const INVENTORY_NAMES = inventory.tokens.map((t) => t.name);
const INVENTORY = new Set(INVENTORY_NAMES);

/* v1 frozen fingerprints, canonical JSON (object keys sorted) sha256. */
const H4X0R_BASELINE = {
  'h4x0r-phosphor': 'd53a217c5c11edbb658f4ff886cd32b9d3c62855acfd693f707384a45aacc791',
  'h4x0r-void': 'c06a23287c7a91946df477c3004e1652c6910b1380a99060e90891c7ecd0dc59',
  'h4x0r-ice': '44321d40a24f01234d6424929eeffd1da36c19f1a1e4377f77ed06346bae9421',
  'h4x0r-redline': '568d109c045960035fcfe5ef1fe1e61888f7db02caf4b73f48be08b7d69703da',
  'h4x0r-bone': 'a8ecefe49fcc3242d33f9496cc793d9424f88f9ff813749527e1cf9503377c35',
  'h4x0r-dim': 'c99a4da9bd48e8dfb8fa9c3f7f28bc9e2bc70ba378a2b063b204bd1d1604d3f9',
};

/* ------------------------------------------------------------------ */
/* color helpers                                                       */
/* ------------------------------------------------------------------ */

function toRgb(hex) {
  const raw = String(hex).replace('#', '');
  const full = raw.length === 3 ? [...raw].map((c) => c + c).join('') : raw;
  if (!/^[0-9a-f]{6}$/i.test(full)) throw new Error(`bad hex color: ${hex}`);
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
}

function toHex(rgb) {
  return '#' + rgb.map((v) => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, '0')).join('');
}

/** Channel mix in sRGB space. t=0 gives a, t=1 gives b. */
function mix(a, b, t) {
  const A = toRgb(a);
  const B = toRgb(b);
  return toHex(A.map((v, i) => v + (B[i] - v) * t));
}

/** rgba() string from an opaque hex and an alpha. */
function rgba(hex, alpha) {
  const [r, g, b] = toRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${Number(alpha.toFixed(3))})`;
}

function channelLum(v) {
  const s = v / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

function luminance(hex) {
  const [r, g, b] = toRgb(hex);
  return 0.2126 * channelLum(r) + 0.7152 * channelLum(g) + 0.0722 * channelLum(b);
}

function contrast(a, b) {
  const la = luminance(a);
  const lb = luminance(b);
  const [hi, lo] = la >= lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

const round2 = (n) => Math.round(n * 100) / 100;

/* ------------------------------------------------------------------ */
/* recipes                                                             */
/* ------------------------------------------------------------------ */

const H4X0R_RECIPES = [
  {
    id: 'h4x0r-phosphor',
    name: 'Phosphor',
    colorScheme: 'dark',
    tagline: 'Phosphor green CRT terminal',
    description: 'Green phosphor CRT terminal with a near-black green canvas and soft non-white text.',
    base: '#070f0a',
    lift: '#cfe8d7',
    brand: '#1b8549',
    brandHover: '#2fa864',
    brandBright: '#62e08f',
    brandText: '#7ce6a0',
    link: '#6ee094',
    textPrimary: '#c4dfcb',
    textSecondary: '#93ab99',
    textTertiary: '#748c7a',
    textCaption: '#5b7261',
    textDimmed: '#3a4c40',
    onBrand: '#04140a',
    contrastFill: '#d8ead9',
    switchThumb: '#b9d8c0',
    infoFill: '#23857a',
    infoAccent: '#4fd0a2',
    warn: '#c08a2e',
    warnBright: '#e8b455',
    warnText: '#d9a441',
    error: '#cf5347',
    errorBright: '#f07a6c',
    errorDeep: '#8f2f27',
    success: '#35b06a',
    successBright: '#62e08f',
    successDeep: '#1c7f4d',
    business: '#3fc47c',
    onboardingAccent: '#59d99a',
    deepDiving: '#67e3a2',
    toastBg: '#1f2f25',
    toastLabel: '#e2f2e6',
    tooltipBg: '#223329',
    selectTint: '#62e08f',
  },
  {
    id: 'h4x0r-void',
    name: 'Void',
    colorScheme: 'dark',
    tagline: 'Obsidian glass, electric violet',
    description: 'Obsidian dark tech with electric violet as the single accent and cool neutral text.',
    base: '#0a0910',
    lift: '#d9d2ff',
    brand: '#7448dd',
    brandHover: '#8a63f0',
    brandBright: '#b39aff',
    brandText: '#c3b2ff',
    link: '#b49cff',
    textPrimary: '#e4e0f2',
    textSecondary: '#a9a4c0',
    textTertiary: '#827d99',
    textCaption: '#6a647e',
    textDimmed: '#46425a',
    onBrand: '#efeaff',
    contrastFill: '#e9e5f7',
    switchThumb: '#c9c3de',
    infoFill: '#4a68c4',
    infoAccent: '#8a7bff',
    warn: '#c79a45',
    warnBright: '#e8bf6a',
    warnText: '#d8ad55',
    error: '#d4506a',
    errorBright: '#f27a92',
    errorDeep: '#8f2f45',
    success: '#2fa47f',
    successBright: '#5fd6ac',
    successDeep: '#176a51',
    business: '#8a63f0',
    onboardingAccent: '#a98cff',
    deepDiving: '#a98cff',
    toastBg: '#262233',
    toastLabel: '#ece8f8',
    tooltipBg: '#2a2538',
    selectTint: '#b39aff',
  },
  {
    id: 'h4x0r-ice',
    name: 'Ice',
    colorScheme: 'dark',
    tagline: 'Cold cyan cyberdeck',
    description: 'Cold cyan cyberdeck with steel blue supports and crisp frost surfaces.',
    base: '#070d12',
    lift: '#cfe4f2',
    brand: '#17789b',
    brandHover: '#1f93bd',
    brandBright: '#63d3ef',
    brandText: '#9fdcf0',
    link: '#7ad4ee',
    textPrimary: '#d3e7f2',
    textSecondary: '#9db6c6',
    textTertiary: '#7b95a5',
    textCaption: '#637c8b',
    textDimmed: '#40525e',
    onBrand: '#e9f6fc',
    contrastFill: '#dcecf5',
    switchThumb: '#b4cfdf',
    infoFill: '#2f5f88',
    infoAccent: '#5f9fe0',
    warn: '#c29540',
    warnBright: '#e6bb66',
    warnText: '#d3a850',
    error: '#cf5548',
    errorBright: '#ef7d6f',
    errorDeep: '#8c2f27',
    success: '#2f9e78',
    successBright: '#57d6a8',
    successDeep: '#176a52',
    business: '#3fa9cf',
    onboardingAccent: '#57b6e8',
    deepDiving: '#7fd0e8',
    toastBg: '#1c2c36',
    toastLabel: '#e4f0f7',
    tooltipBg: '#1e303b',
    selectTint: '#7ad4ee',
  },
  {
    id: 'h4x0r-redline',
    name: 'Redline',
    colorScheme: 'dark',
    tagline: 'Red-team ops, ember light',
    description: 'Red-team operations console with ember red accent and amber warning states.',
    base: '#0c0a0a',
    lift: '#e6d6cf',
    brand: '#c24532',
    brandHover: '#d95a41',
    brandBright: '#ff8f6e',
    brandText: '#ffb09a',
    link: '#ff9d80',
    textPrimary: '#eed9d2',
    textSecondary: '#b9a49d',
    textTertiary: '#947f79',
    textCaption: '#7a6660',
    textDimmed: '#4d3e3a',
    onBrand: '#f8e6df',
    contrastFill: '#f0ddd6',
    switchThumb: '#cdb8b0',
    infoFill: '#4a6b8f',
    infoAccent: '#e0a13f',
    warn: '#d69b3a',
    warnBright: '#f0bd63',
    warnText: '#e6ac4a',
    error: '#e8524a',
    errorBright: '#ff7a6e',
    errorDeep: '#96271f',
    success: '#4f9e6a',
    successBright: '#79c98f',
    successDeep: '#2c6b45',
    business: '#e0a13f',
    onboardingAccent: '#e8a54a',
    deepDiving: '#ff9f7f',
    toastBg: '#332420',
    toastLabel: '#f6e8e2',
    tooltipBg: '#35251f',
    selectTint: '#ff8f6e',
  },
  {
    id: 'h4x0r-bone',
    name: 'Bone',
    colorScheme: 'light',
    tagline: 'Declassified parchment daylight',
    description: 'Declassified blueprint and parchment light theme with ink text and rust accent.',
    base: '#efe9dc',
    lift: '#fffdf7',
    ink: '#211d17',
    layerSteps: [0.34, 0.55, 0.72],
    borderAlphas: [0.09, 0.15, 0.2, 0.26],
    brand: '#a95526',
    brandHover: '#b96432',
    brandBright: '#c9764a',
    brandText: '#8a3a16',
    link: '#2f5c9e',
    bluish: '#1c3a63',
    textPrimary: '#211d17',
    textSecondary: '#5a5349',
    textTertiary: '#746c60',
    textCaption: '#8a8175',
    textDimmed: '#b3ab9c',
    onBrand: '#fbf5e8',
    contrastFill: '#2b251d',
    switchThumb: '#fcf9f2',
    infoFill: '#3a6cb5',
    infoAccent: '#325ea8',
    warn: '#a8741f',
    warnBright: '#c08a2e',
    warnText: '#8c5f14',
    error: '#ab3b2f',
    errorBright: '#c85a48',
    errorDeep: '#7a241b',
    success: '#5c7a34',
    successBright: '#7a9e4a',
    successDeep: '#3f5620',
    business: '#325ea8',
    onboardingAccent: '#325ea8',
    deepDiving: '#2f6fa8',
    toastBg: '#2b251d',
    toastLabel: '#f7efe0',
    tooltipBg: '#2b251d',
    selectTint: '#3a6cb5',
  },
  {
    id: 'h4x0r-dim',
    name: 'Dim',
    colorScheme: 'dark',
    tagline: 'Low light for sore eyes',
    description: 'Low-luminance, low-saturation theme for migraine and light sensitivity.',
    base: '#26282d',
    lift: '#b9bcc0',
    layerSteps: [0.045, 0.08, 0.115],
    borderAlphas: [0.1, 0.14, 0.18, 0.22],
    maskAlphas: [0.2, 0.1, 0.4, 0.8],
    overlayStep: 0.2,
    brand: '#527d68',
    brandHover: '#628c76',
    brandBright: '#7fa890',
    brandText: '#9fbfae',
    link: '#8fb8a4',
    textPrimary: '#d4d6d8',
    textSecondary: '#999da1',
    textTertiary: '#878b90',
    textCaption: '#71757a',
    textDimmed: '#4a4d52',
    onBrand: '#1a2420',
    contrastFill: '#cfd2d5',
    switchThumb: '#b6b9bd',
    infoFill: '#526d82',
    infoAccent: '#8fa9b8',
    warn: '#9c7d45',
    warnBright: '#b09258',
    warnText: '#b39458',
    error: '#a4665e',
    errorBright: '#c07f76',
    errorDeep: '#6e3a34',
    success: '#6b8f74',
    successBright: '#86ab8f',
    successDeep: '#47604f',
    business: '#5f7d93',
    onboardingAccent: '#7f9bb0',
    deepDiving: '#93b3a1',
    toastBg: '#33363b',
    toastLabel: '#dfe2e5',
    tooltipBg: '#363a3f',
    selectTint: '#7f9bb0',
  },
];

/* ------------------------------------------------------------------ */
/* MIRAGE recipes: ten new moods, six dark and four light              */
/* ------------------------------------------------------------------ */

const MIRAGE_RECIPES = [
  {
    id: 'mirage-sakura',
    name: 'Sakura',
    colorScheme: 'light',
    tagline: 'Blush and cream, plum ink',
    description: 'Warm blush off-white, deep plum ink and a muted rose accent.',
    base: '#f7efec',
    lift: '#fffaf8',
    ink: '#3a2530',
    layerSteps: [0.3, 0.52, 0.72],
    borderAlphas: [0.09, 0.15, 0.2, 0.26],
    brand: '#b85c78',
    brandHover: '#c56f89',
    brandBright: '#d98aa0',
    brandText: '#8f3f57',
    link: '#9c4a66',
    bluish: '#3c2a56',
    textPrimary: '#3a2530',
    textSecondary: '#6b5762',
    textTertiary: '#8a7681',
    textCaption: '#a08d96',
    textDimmed: '#d4c4c9',
    onBrand: '#fdf7f4',
    contrastFill: '#3a2530',
    switchThumb: '#fdf9f7',
    infoFill: '#6b5570',
    infoAccent: '#7a5f86',
    warn: '#a06a20',
    warnBright: '#bd8536',
    warnText: '#8a5c14',
    error: '#b83a4e',
    errorBright: '#cf5a68',
    errorDeep: '#7f2634',
    success: '#5d7a3a',
    successBright: '#78963f',
    successDeep: '#425a26',
    business: '#6b5570',
    onboardingAccent: '#7a5f86',
    deepDiving: '#8a5f8a',
    toastBg: '#3a2530',
    toastLabel: '#fbf2f4',
    tooltipBg: '#3a2530',
    selectTint: '#8a5f8a',
  },
  {
    id: 'mirage-mecha',
    name: 'Mecha',
    colorScheme: 'dark',
    tagline: 'Gunmetal frame, hazard orange',
    description: 'Cool graphite near-black with a hazard orange accent and red alert states.',
    base: '#111417',
    lift: '#d5dde6',
    brand: '#b37012',
    brandHover: '#c98420',
    brandBright: '#ff9d3d',
    brandText: '#ffb45e',
    link: '#ff9d3d',
    textPrimary: '#dfe6ec',
    textSecondary: '#a4afb9',
    textTertiary: '#7f8a94',
    textCaption: '#68727b',
    textDimmed: '#454d54',
    onBrand: '#1a0d02',
    contrastFill: '#e8edf2',
    switchThumb: '#b8c2cb',
    infoFill: '#4a6f9e',
    infoAccent: '#6f98c9',
    warn: '#d19a3a',
    warnBright: '#f0bc63',
    warnText: '#e2aa50',
    error: '#e0564f',
    errorBright: '#ff7a72',
    errorDeep: '#8f2a26',
    success: '#3f9e6e',
    successBright: '#63c98f',
    successDeep: '#25684a',
    business: '#4a6f9e',
    onboardingAccent: '#6f98c9',
    deepDiving: '#7fb2e0',
    toastBg: '#1d242b',
    toastLabel: '#e8eef3',
    tooltipBg: '#202830',
    selectTint: '#ff9d3d',
  },
  {
    id: 'mirage-ghost',
    name: 'Ghost',
    colorScheme: 'dark',
    tagline: 'Low-chroma blue-gray, pale signal',
    description: 'Low-chroma blue-black surfaces with a pale cyan signal accent.',
    base: '#0d1116',
    lift: '#c9d4dd',
    brand: '#3d7684',
    brandHover: '#4a8695',
    brandBright: '#7fb6c4',
    brandText: '#a8cfd8',
    link: '#9dc4cf',
    textPrimary: '#c9d1d8',
    textSecondary: '#8f99a3',
    textTertiary: '#6f7982',
    textCaption: '#5b646c',
    textDimmed: '#3c4349',
    onBrand: '#0a1116',
    contrastFill: '#d2dae1',
    switchThumb: '#aab4bd',
    infoFill: '#4a6d8f',
    infoAccent: '#7aa7c4',
    warn: '#b08a4a',
    warnBright: '#cfae6f',
    warnText: '#c09a58',
    error: '#b8625c',
    errorBright: '#cf817b',
    errorDeep: '#7a322d',
    success: '#4f8f72',
    successBright: '#74b596',
    successDeep: '#2f5f4b',
    business: '#5a86a6',
    onboardingAccent: '#7aa7c4',
    deepDiving: '#8fbcc8',
    toastBg: '#1a2026',
    toastLabel: '#d8e0e6',
    tooltipBg: '#1d252c',
    selectTint: '#7aa7c4',
  },
  {
    id: 'mirage-abyss',
    name: 'Abyss',
    colorScheme: 'dark',
    tagline: 'Deep water, bioluminescent teal',
    description: 'Near-black indigo water with a bioluminescent teal accent.',
    base: '#0a0c16',
    lift: '#c6d6df',
    brand: '#2a7d6c',
    brandHover: '#348f7c',
    brandBright: '#57c4a8',
    brandText: '#8ad8c2',
    link: '#6fc9b4',
    textPrimary: '#c6d3dd',
    textSecondary: '#8b98a8',
    textTertiary: '#6b7888',
    textCaption: '#586474',
    textDimmed: '#3a4353',
    onBrand: '#04120f',
    contrastFill: '#d0d8e4',
    switchThumb: '#aab4c9',
    infoFill: '#5c6fc4',
    infoAccent: '#7f8fe0',
    warn: '#c39a4a',
    warnBright: '#dcb96a',
    warnText: '#d3ab5c',
    error: '#cf5a6b',
    errorBright: '#e87c8c',
    errorDeep: '#8a3340',
    success: '#34a07f',
    successBright: '#5cc9a6',
    successDeep: '#1d6b55',
    business: '#5c6fc4',
    onboardingAccent: '#7f8fe0',
    deepDiving: '#7fb8e0',
    toastBg: '#151a2a',
    toastLabel: '#d5dcea',
    tooltipBg: '#181e30',
    selectTint: '#7f8fe0',
  },
  {
    id: 'mirage-neon-rain',
    name: 'Neon Rain',
    colorScheme: 'dark',
    tagline: 'Midnight street, coral signage',
    description: 'Blue-teal midnight black with warm coral signage light.',
    base: '#0a1216',
    lift: '#cfdce2',
    brand: '#a35f44',
    brandHover: '#b56f52',
    brandBright: '#ff9a72',
    brandText: '#ffb59a',
    link: '#ff9a72',
    textPrimary: '#c5d4dc',
    textSecondary: '#8aa0aa',
    textTertiary: '#6c828c',
    textCaption: '#596d76',
    textDimmed: '#3a4a52',
    onBrand: '#fbede7',
    contrastFill: '#d6e2e8',
    switchThumb: '#b0bfc7',
    infoFill: '#3f7f96',
    infoAccent: '#6fa9c4',
    warn: '#c59a4a',
    warnBright: '#e3ba6a',
    warnText: '#d6a959',
    error: '#d0595a',
    errorBright: '#ea7d7e',
    errorDeep: '#8c3536',
    success: '#3f9e7f',
    successBright: '#63c9a8',
    successDeep: '#246a54',
    business: '#4a8aa3',
    onboardingAccent: '#6fa9c4',
    deepDiving: '#7fc4d8',
    toastBg: '#17242a',
    toastLabel: '#d8e4e9',
    tooltipBg: '#1a292f',
    selectTint: '#ff9a72',
  },
  {
    id: 'mirage-porcelain',
    name: 'Porcelain',
    colorScheme: 'light',
    tagline: 'Cool glaze, cobalt detail',
    description: 'Cool near-white glaze with ink text and a cobalt detail accent.',
    base: '#eef1f4',
    lift: '#fbfdfe',
    ink: '#1c2430',
    layerSteps: [0.32, 0.55, 0.74],
    borderAlphas: [0.09, 0.15, 0.2, 0.26],
    brand: '#5678b2',
    brandHover: '#6587c0',
    brandBright: '#7f9ed4',
    brandText: '#2f5f9e',
    link: '#2f5f9e',
    bluish: '#1c3a63',
    textPrimary: '#1c2430',
    textSecondary: '#55606c',
    textTertiary: '#737e8b',
    textCaption: '#8b95a1',
    textDimmed: '#c2c9d1',
    onBrand: '#f7fbff',
    contrastFill: '#1c2430',
    switchThumb: '#fcfdff',
    infoFill: '#2f5f9e',
    infoAccent: '#4a78b8',
    warn: '#a0701c',
    warnBright: '#bd8a35',
    warnText: '#8a5f14',
    error: '#b0423a',
    errorBright: '#c95f55',
    errorDeep: '#7a2a25',
    success: '#5b7f5a',
    successBright: '#769874',
    successDeep: '#3f5c3e',
    business: '#2f5f9e',
    onboardingAccent: '#4a78b8',
    deepDiving: '#3f6fb0',
    toastBg: '#1c2430',
    toastLabel: '#f2f6fa',
    tooltipBg: '#1c2430',
    selectTint: '#4a78b8',
  },
  {
    id: 'mirage-ink',
    name: 'Ink',
    colorScheme: 'light',
    tagline: 'Paper, ink, vermilion seal',
    description: 'Neutral paper white, near-black ink and a vermilion seal accent.',
    base: '#f4f2ee',
    lift: '#fffefb',
    ink: '#17181a',
    layerSteps: [0.3, 0.52, 0.72],
    borderAlphas: [0.09, 0.16, 0.22, 0.3],
    brand: '#cc4b30',
    brandHover: '#da5a3d',
    brandBright: '#e87a5c',
    brandText: '#a83420',
    link: '#a83420',
    bluish: '#2a3a52',
    textPrimary: '#17181a',
    textSecondary: '#565b60',
    textTertiary: '#74787d',
    textCaption: '#8c9095',
    textDimmed: '#c5c2bc',
    onBrand: '#fbf7f0',
    contrastFill: '#17181a',
    switchThumb: '#fffefb',
    infoFill: '#4a6a9a',
    infoAccent: '#5f7fb0',
    warn: '#9a7016',
    warnBright: '#b88a30',
    warnText: '#7f5b10',
    error: '#a83a32',
    errorBright: '#c2574d',
    errorDeep: '#75241f',
    success: '#55704f',
    successBright: '#728c6a',
    successDeep: '#3a4f35',
    business: '#4a6a9a',
    onboardingAccent: '#5f7fb0',
    deepDiving: '#3f5f95',
    toastBg: '#17181a',
    toastLabel: '#f5f2ec',
    tooltipBg: '#17181a',
    selectTint: '#4a6a9a',
  },
  {
    id: 'mirage-mochi',
    name: 'Mochi',
    colorScheme: 'dark',
    tagline: 'Cocoa and mauve pastels',
    description: 'Warm dark cocoa surfaces with a dusty mauve accent and pastel text.',
    base: '#1a1415',
    lift: '#e0cdd3',
    brand: '#a06c80',
    brandHover: '#b47e92',
    brandBright: '#cf9fb0',
    brandText: '#e2b9c7',
    link: '#d3a3b3',
    textPrimary: '#e8dcde',
    textSecondary: '#b09c9f',
    textTertiary: '#8d787b',
    textCaption: '#776669',
    textDimmed: '#4d3f41',
    onBrand: '#201014',
    contrastFill: '#ead9de',
    switchThumb: '#cbb4ba',
    infoFill: '#64748a',
    infoAccent: '#8a9cb2',
    warn: '#b08a50',
    warnBright: '#cfae76',
    warnText: '#c39a62',
    error: '#b35f5a',
    errorBright: '#cd7f79',
    errorDeep: '#7d3733',
    success: '#7f9270',
    successBright: '#a0b08f',
    successDeep: '#57664b',
    business: '#7a6a94',
    onboardingAccent: '#c58ca3',
    deepDiving: '#c58ca3',
    toastBg: '#2a2122',
    toastLabel: '#f0e4e4',
    tooltipBg: '#2e2425',
    selectTint: '#c58ca3',
  },
  {
    id: 'mirage-ember',
    name: 'Ember',
    colorScheme: 'dark',
    tagline: 'Amber lamplight for late reading',
    description: 'Warm near-black with amber lamplight and soft cream text for late reading.',
    base: '#14100b',
    lift: '#e8d6bd',
    brand: '#9c6f16',
    brandHover: '#b0811e',
    brandBright: '#e8b75a',
    brandText: '#f0c876',
    link: '#e8b25a',
    textPrimary: '#e6d7c2',
    textSecondary: '#b3a189',
    textTertiary: '#8f7e69',
    textCaption: '#786957',
    textDimmed: '#4e4437',
    onBrand: '#1c1206',
    contrastFill: '#efe0c8',
    switchThumb: '#cdb99d',
    infoFill: '#5a7088',
    infoAccent: '#8aa0b8',
    warn: '#c07a2e',
    warnBright: '#dd9a4f',
    warnText: '#d18f45',
    error: '#c05a45',
    errorBright: '#dc7c66',
    errorDeep: '#84382a',
    success: '#6f9256',
    successBright: '#90b578',
    successDeep: '#4a6538',
    business: '#8a7a4a',
    onboardingAccent: '#c9a052',
    deepDiving: '#d9b06a',
    toastBg: '#2a2118',
    toastLabel: '#f2e6d4',
    tooltipBg: '#2e2419',
    selectTint: '#e8b75a',
  },
  {
    id: 'mirage-lumen',
    name: 'Lumen',
    colorScheme: 'light',
    tagline: 'Soft daylight, green accent',
    description: 'Soft green-tinted daylight with no pure white, low glare and a leaf green accent.',
    base: '#eaf1e8',
    lift: '#f7fbf3',
    ink: '#2f352e',
    layerSteps: [0.35, 0.58, 0.76],
    borderAlphas: [0.07, 0.11, 0.15, 0.19],
    brand: '#4f8f4f',
    brandHover: '#5d9f5d',
    brandBright: '#78b878',
    brandText: '#386f38',
    link: '#3d7a4d',
    bluish: '#33523f',
    textPrimary: '#2f352e',
    textSecondary: '#59635a',
    textTertiary: '#727c70',
    textCaption: '#8a9286',
    textDimmed: '#c2c9bd',
    onBrand: '#f7faf2',
    contrastFill: '#2f352e',
    switchThumb: '#f9fbf6',
    infoFill: '#4a6a86',
    infoAccent: '#3f7a6a',
    warn: '#9a7420',
    warnBright: '#b98f38',
    warnText: '#7f5f14',
    error: '#a84a3a',
    errorBright: '#c06350',
    errorDeep: '#783428',
    success: '#4f8f4f',
    successBright: '#6ba96b',
    successDeep: '#386f38',
    business: '#4a6a86',
    onboardingAccent: '#3f7a6a',
    deepDiving: '#3f7a6a',
    toastBg: '#2f352e',
    toastLabel: '#f2f7ee',
    tooltipBg: '#2f352e',
    selectTint: '#4a6a86',
  },
];

/* ------------------------------------------------------------------ */
/* palette builder: anchors in, every derived color out                */
/* ------------------------------------------------------------------ */

function buildPalette(r) {
  const dark = r.colorScheme === 'dark';
  const base = r.base;
  const lift = r.lift;
  const ink = r.ink || mix(base, '#000000', 0.8);

  /* elevation ramp: base is the canvas, each layer sits above the last */
  const steps = r.layerSteps || (dark ? [0.055, 0.105, 0.155] : [0.34, 0.55, 0.72]);
  const layer1 = mix(base, lift, steps[0]);
  const layer2 = mix(base, lift, steps[1]);
  const layer3 = mix(base, lift, steps[2]);

  /* borders: one tint, four progressively stronger alpha steps */
  const alphas = r.borderAlphas || (dark ? [0.08, 0.13, 0.18, 0.23] : [0.09, 0.15, 0.2, 0.26]);
  const borderTint = dark ? lift : ink;
  const borderL1 = rgba(borderTint, alphas[0]);
  const borderL2 = rgba(borderTint, alphas[1]);
  const borderL3 = rgba(borderTint, alphas[2]);
  const borderL4 = rgba(borderTint, alphas[3]);

  /* scrims */
  const maskInk = dark ? mix(base, '#000000', 0.72) : mix(base, ink, 0.85);
  const maskAlphas = r.maskAlphas || [0.24, 0.12, 0.48, 0.88];
  const mask1 = rgba(maskInk, maskAlphas[0]);
  const mask2 = rgba(maskInk, maskAlphas[1]);
  const mask3 = rgba(maskInk, maskAlphas[2]);
  const maskPhoto = rgba(maskInk, maskAlphas[3]);
  const maskDrop = dark ? rgba(mix(base, lift, 0.28), 0.7) : rgba(mix(base, lift, 0.92), 0.72);

  /* held surfaces */
  const deep = dark ? mix(base, lift, 0.035) : mix(base, ink, 0.055);
  const overlay = mix(base, lift, r.overlayStep ?? (dark ? 0.28 : 0.78));
  const multiSelect = dark ? mix(base, lift, 0.04) : mix(base, ink, 0.02);
  const codeBanner = dark ? mix(base, lift, 0.075) : mix(base, ink, 0.035);
  const codeSelected = dark ? mix(base, lift, 0.19) : mix(base, lift, 0.85);
  const inlineCode = dark ? mix(base, lift, 0.09) : mix(base, ink, 0.055);
  const citation = dark ? layer2 : mix(base, ink, 0.05);
  const tagFill = dark ? mix(base, lift, 0.1) : mix(base, ink, 0.06);
  const menuSurface = dark ? mix(base, lift, 0.22) : mix(base, lift, 0.75);
  const menuGroupTint = dark ? mix(base, lift, 0.26) : mix(base, lift, 0.8);

  /* scrollbars and hovers */
  const scrollL1 = dark ? mix(base, lift, 0.2) : mix(base, ink, 0.16);
  const scrollL2 = dark ? mix(base, lift, 0.3) : mix(base, ink, 0.24);
  const scrollHoverL1 = dark ? mix(base, lift, 0.34) : mix(base, ink, 0.2);
  const scrollHoverL2 = dark ? mix(base, lift, 0.44) : mix(base, ink, 0.28);
  const ghostBorder = dark ? mix(base, lift, 0.5) : mix(base, ink, 0.5);
  const ghostHover = dark ? mix(base, lift, 0.24) : mix(base, ink, 0.12);
  const idle = dark ? mix(base, lift, 0.34) : mix(base, ink, 0.26);

  /* soft state fills */
  const successSoft = dark ? mix(base, r.success, 0.13) : mix(mix(base, lift, 0.55), r.success, 0.13);
  const warnSoft = dark ? mix(base, r.warn, 0.13) : mix(mix(base, lift, 0.55), r.warn, 0.13);
  const diffAddedBg = dark ? mix(base, r.success, 0.16) : mix(mix(base, lift, 0.55), r.success, 0.14);
  const diffDeletedBg = dark ? mix(base, r.error, 0.16) : mix(mix(base, lift, 0.55), r.error, 0.14);
  const diffAddedGutter = dark ? mix(diffAddedBg, base, 0.45) : mix(diffAddedBg, lift, 0.55);
  const diffDeletedGutter = dark ? mix(diffDeletedBg, base, 0.45) : mix(diffDeletedBg, lift, 0.55);

  /* identity derivations */
  const brandDimmed = dark ? mix(r.brand, base, 0.42) : mix(base, r.brand, 0.22);
  const infoHover = dark ? mix(r.infoFill, lift, 0.2) : mix(r.infoFill, ink, 0.12);
  const textPrimaryDimmed = dark ? mix(r.textPrimary, base, 0.12) : mix(r.textPrimary, lift, 0.1);
  const onInverted = dark ? mix(base, lift, 0.14) : lift;
  /* scheme-agnostic neutral glass: same alphas as the default sheets, tinted per theme */
  const toolTint = dark ? mix(base, lift, 0.3) : mix(base, ink, 0.3);
  const toolbarInvisible = rgba(toolTint, 0.36);
  const toolbarFill = rgba(toolTint, 0.5);
  const toolbarHover = rgba(toolTint, 0.6);

  return {
    base,
    docPreview: dark ? base : mix(base, ink, 0.04),
    selection: rgba(r.selectTint, 0.4),
    layer1,
    layer2,
    layer3,
    mask1,
    mask2,
    mask3,
    maskPhoto,
    maskDrop,
    multiSelect,
    overlay,
    skeleton: dark ? rgba(lift, 0.06) : rgba(ink, 0.05),
    contrastFill: r.contrastFill,
    ghostHover,
    ghostBorder,
    infoFill: r.infoFill,
    infoHover,
    brandDimmed,
    toolbarInvisible,
    toolbarFill,
    toolbarHover,
    interactiveActive: rgba(r.brand, dark ? 0.16 : 0.14),
    interactiveAccent: rgba(r.brand, dark ? 0.22 : 0.18),
    interactiveDanger: rgba(r.error, dark ? 0.12 : 0.1),
    interactiveHover: dark ? rgba(lift, 0.07) : rgba(ink, 0.05),
    citation,
    codeBanner,
    codeBlock: deep,
    codeSelected,
    inlineCode,
    tagFill,
    scrollL1,
    scrollL2,
    scrollHoverL1,
    scrollHoverL2,
    switchThumb: r.switchThumb,
    toastBg: r.toastBg,
    toastLabel: r.toastLabel,
    tooltipBg: r.tooltipBg,
    tooltipKey: mix(r.tooltipBg, '#ffffff', 0.18),
    turnResting: dark ? rgba(lift, 0.07) : mix(base, lift, 0.4),
    turnHover: dark ? rgba(lift, 0.11) : mix(base, ink, 0.05),
    bubble: dark ? mix(layer2, r.brand, 0.06) : mix(base, lift, 0.55),
    bubbleHighlight: dark ? mix(layer3, r.brand, 0.1) : mix(mix(base, lift, 0.55), r.brand, 0.16),
    inputMajor: dark ? layer2 : lift,
    loginInput: deep,
    menuSurfaceFill: rgba(menuSurface, dark ? 0.46 : 0.58),
    menuGroupFill: rgba(menuGroupTint, 0.94),
    menuIcon: mix(r.textPrimary, r.textSecondary, 0.55),
    sidebarFill: dark ? mix(base, lift, 0.045) : mix(base, ink, 0.03),
    sidebarActive: dark ? layer3 : mix(mix(base, lift, 0.55), r.brand, 0.06),
    sidebarAccent: dark ? mix(layer2, r.brand, 0.16) : mix(base, r.brand, 0.14),
    sidebarHover: dark ? layer2 : mix(base, ink, 0.05),
    settingsCardFill: layer2,
    onboardingAccent: r.onboardingAccent,
    onboardingCard: dark ? rgba(mix(base, lift, 0.28), 0.8) : rgba(mix(base, lift, 0.95), 0.82),
    onboardingSecondary: dark ? mix(base, lift, 0.24) : mix(base, lift, 0.92),
    checkboxBorder: dark ? borderL2 : rgba(ink, 0.22),
    menuSurfaceTint: menuSurface,
    borderL1,
    borderL2,
    borderL3,
    borderL4,
    borderThin: dark ? borderL1 : rgba(ink, Math.max(0.06, alphas[1] - 0.04)),
    borderInverted1: dark ? rgba(lift, 0.06) : rgba(ink, 0),
    borderInverted2: dark ? rgba(lift, 0.08) : rgba(ink, 0),
    brand: r.brand,
    brandHover: r.brandHover,
    brandBright: r.brandBright,
    brandText: r.brandText,
    link: r.link,
    brandInvert: r.textPrimary,
    bluish: r.bluish || r.textPrimary,
    infoAccent: r.infoAccent,
    business: r.business,
    businessSoft: rgba(r.business, 0.14),
    textPrimary: r.textPrimary,
    textPrimaryDimmed,
    textSecondary: r.textSecondary,
    textTertiary: r.textTertiary,
    textCaption: r.textCaption,
    textDimmed: r.textDimmed,
    onBrand: r.onBrand,
    onInverted,
    labelShimmer: rgba(r.textPrimary, dark ? 0.32 : 0.28),
    deepDiving: r.deepDiving,
    deepDivingShimmer: rgba(r.deepDiving, 0.35),
    error: r.error,
    errorBright: r.errorBright,
    errorDeep: r.errorDeep,
    errorSoft: dark ? mix(base, r.error, 0.12) : mix(mix(base, lift, 0.55), r.error, 0.12),
    success: r.success,
    successBright: r.successBright,
    successDeep: r.successDeep,
    successSoft,
    warn: r.warn,
    warnBright: r.warnBright,
    warnText: r.warnText,
    warnSoft,
    idle,
    diffAddedInline: rgba(dark ? r.success : r.successDeep, 0.1),
    diffDeletedInline: rgba(dark ? r.error : r.errorDeep, 0.1),
    diffAddedBg,
    diffAddedGutter,
    diffAddedMarker: dark ? r.successBright : r.successDeep,
    diffDeletedBg,
    diffDeletedGutter,
    diffDeletedMarker: dark ? r.errorBright : r.errorDeep,
  };
}

/* ------------------------------------------------------------------ */
/* token role map: every one of the 119 inventory tokens               */
/* ------------------------------------------------------------------ */

function tokenMap(p) {
  return {
    /* surface */
    '--dsw-alias-bg-base': p.base,
    '--dsw-alias-bg-document-preview': p.docPreview,
    '--dsw-alias-bg-document-selection': p.selection,
    '--dsw-alias-bg-layer-1': p.layer1,
    '--dsw-alias-bg-layer-2': p.layer2,
    '--dsw-alias-bg-layer-3': p.layer3,
    '--dsw-alias-bg-mask-1': p.mask1,
    '--dsw-alias-bg-mask-2': p.mask2,
    '--dsw-alias-bg-mask-3': p.mask3,
    '--dsw-alias-bg-mask-photo': p.maskPhoto,
    '--dsw-alias-bg-mask-drop': p.maskDrop,
    '--dsw-alias-bg-module-platform': p.layer3,
    '--dsw-alias-bg-multi-select': p.multiSelect,
    '--dsw-alias-bg-overlay': p.overlay,
    '--dsw-alias-bg-skeleton': p.skeleton,
    '--dsw-alias-button-contrast-fill': p.contrastFill,
    '--dsw-alias-button-elevated-fill': p.layer3,
    '--dsw-alias-button-floating-fill': p.layer2,
    '--dsw-alias-button-floating-hover': p.layer3,
    '--dsw-alias-button-ghost-active-fill': p.layer3,
    '--dsw-alias-button-ghost-active-hover': p.ghostHover,
    '--dsw-alias-button-info-fill': p.infoFill,
    '--dsw-alias-button-info-hover': p.infoHover,
    '--dsw-alias-button-primary-dimmed': p.brandDimmed,
    '--dsw-alias-button-primary-fill': p.brand,
    '--dsw-alias-button-primary-hover': p.brandHover,
    '--dsw-alias-button-tool-bar-fill-invisible': p.toolbarInvisible,
    '--dsw-alias-button-tool-bar-fill': p.toolbarFill,
    '--dsw-alias-button-tool-bar-hover': p.toolbarHover,
    '--dsw-alias-interactive-bg-active': p.interactiveActive,
    '--dsw-alias-interactive-bg-hover-accent': p.interactiveAccent,
    '--dsw-alias-interactive-bg-hover-danger': p.interactiveDanger,
    '--dsw-alias-interactive-bg-hover-solid': p.layer3,
    '--dsw-alias-interactive-bg-hover': p.interactiveHover,
    '--dsw-alias-markdown-citation': p.citation,
    '--dsw-alias-markdown-placeholder': p.layer2,
    '--dsw-alias-markdown-tag': p.tagFill,
    '--dsw-alias-scrollbar-bg-l1': p.scrollL1,
    '--dsw-alias-scrollbar-bg-l2': p.scrollL2,
    '--dsw-alias-scrollbar-hover-l1': p.scrollHoverL1,
    '--dsw-alias-scrollbar-hover-l2': p.scrollHoverL2,
    '--dsw-alias-switch-thumb': p.switchThumb,
    '--dsw-alias-toast-bg': p.toastBg,
    '--dsw-alias-toast-label': p.toastLabel,
    '--dsw-alias-tooltip-bg': p.tooltipBg,
    '--dsw-alias-tooltip-key-bg': p.tooltipKey,
    '--dsw-alias-turn-trigger-bg': p.turnResting,
    '--dsw-alias-turn-trigger-bg-hover': p.turnHover,
    '--dsw-specific-bubble-highlight': p.bubbleHighlight,
    '--dsw-specific-bubble': p.bubble,
    '--dsw-specific-input-major': p.inputMajor,
    '--dsw-specific-login-input': p.loginInput,
    '--dsw-specific-menu': p.menuSurfaceFill,
    '--dsw-specific-selector': p.layer3,
    '--dsw-specific-tip': p.layer3,
    '--dsw-specific-sidebar-fill': p.sidebarFill,
    '--dsw-alias-settings-card-fill': p.settingsCardFill,
    '--dsw-alias-onboarding-accent': p.onboardingAccent,
    '--dsw-alias-onboarding-card-fill': p.onboardingCard,
    '--dsw-alias-onboarding-secondary-fill': p.onboardingSecondary,
    '--dsw-alias-settings-card-stroke': p.borderL4,
    '--dsw-alias-onboarding-checkbox-border': p.checkboxBorder,
    '--dsw-menu-surface-fill': p.menuSurfaceFill,
    '--dsw-alias-menu-group-header-fill': p.menuGroupFill,
    '--dsw-alias-menu-icon': p.menuIcon,
    '--dsw-alias-state-business-primary': p.business,
    '--dsw-alias-state-business-tertiary': p.businessSoft,
    '--dsw-alias-link': p.link,

    /* label */
    '--dsw-alias-label-document-preview': p.textSecondary,
    '--dsw-alias-label-caption': p.textCaption,
    '--dsw-alias-label-deep-diving': p.deepDiving,
    '--dsw-alias-label-deep-diving-shimmer': p.deepDivingShimmer,
    '--dsw-alias-label-dimmed': p.textDimmed,
    '--dsw-alias-label-primary-bluish': p.bluish,
    '--dsw-alias-label-primary-dimmed': p.textPrimaryDimmed,
    '--dsw-alias-label-primary-foreground': p.onBrand,
    '--dsw-alias-label-primary-inverted': p.onInverted,
    '--dsw-alias-label-primary': p.textPrimary,
    '--dsw-alias-label-secondary': p.textSecondary,
    '--dsw-alias-label-shimmer': p.labelShimmer,
    '--dsw-alias-label-tertiary': p.textTertiary,

    /* border */
    '--dsw-alias-border-inverted2': p.borderInverted2,
    '--dsw-alias-border-inverted': p.borderInverted1,
    '--dsw-alias-border-l1': p.borderL1,
    '--dsw-alias-border-l2-darkmode-thin': p.borderThin,
    '--dsw-alias-border-l2': p.borderL2,
    '--dsw-alias-border-l3': p.borderL3,
    '--dsw-alias-border-l4': p.borderL4,
    '--dsw-alias-button-ghost-active-border': p.ghostBorder,

    /* accent */
    '--dsw-alias-brand-primary-invert': p.brandInvert,
    '--dsw-alias-brand-primary-new-colorprimary-new-color': p.infoAccent,
    '--dsw-alias-brand-primary': p.brand,
    '--dsw-alias-brand-text': p.brandText,

    /* code */
    '--dsw-alias-markdown-code-block-banner': p.codeBanner,
    '--dsw-alias-markdown-code-block': p.codeBlock,
    '--dsw-alias-markdown-code-segment-selected': p.codeSelected,
    '--dsw-alias-markdown-code-segment-unselected': p.codeBlock,
    '--dsw-alias-markdown-inline-code': p.inlineCode,

    /* diff */
    '--dsw-alias-code-diff-added': p.diffAddedInline,
    '--dsw-alias-code-diff-deleted': p.diffDeletedInline,
    '--dsw-alias-file-diff-added-bg': p.diffAddedBg,
    '--dsw-alias-file-diff-added-gutter': p.diffAddedGutter,
    '--dsw-alias-file-diff-added-marker': p.diffAddedMarker,
    '--dsw-alias-file-diff-deleted-bg': p.diffDeletedBg,
    '--dsw-alias-file-diff-deleted-gutter': p.diffDeletedGutter,
    '--dsw-alias-file-diff-deleted-marker': p.diffDeletedMarker,

    /* state */
    '--dsw-alias-state-error-primary': p.error,
    '--dsw-alias-state-error-secondary': p.errorBright,
    '--dsw-alias-state-idle-primary': p.idle,
    '--dsw-alias-state-success-primary': p.success,
    '--dsw-alias-state-success-secondary': p.successBright,
    '--dsw-alias-state-success-tertiary': p.successSoft,
    '--dsw-alias-state-warn-label': p.warnText,
    '--dsw-alias-state-warn-primary': p.warn,
    '--dsw-alias-state-warn-secondary': p.warnBright,
    '--dsw-alias-state-warn-tertiary': p.warnSoft,

    /* sidebar */
    '--dsw-specific-sidebar-fill': p.sidebarFill,
    '--dsw-specific-sidebar-nav-item-active-accent': p.sidebarAccent,
    '--dsw-specific-sidebar-nav-item-active': p.sidebarActive,
    '--dsw-specific-sidebar-nav-item-hover': p.sidebarHover,
  };
}

/* ------------------------------------------------------------------ */
/* contrast gates (mirrored independently by check-contrast.mjs)       */
/* ------------------------------------------------------------------ */

/* Accessibility palettes trade peak contrast for comfort. Windows are fixed. */
const ACCESSIBILITY = {
  'h4x0r-dim': { labelPrimaryOnBase: [4.5, 12.0], labelSecondaryOnBase: [4.0, null] },
  'mirage-lumen': { labelPrimaryOnBase: [4.5, 14.0], labelSecondaryOnBase: [4.5, null] },
};

function gatesFor(recipe) {
  const accessibility = ACCESSIBILITY[recipe.id] || {};
  return {
    labelPrimaryOnBase: accessibility.labelPrimaryOnBase || [7.0, null],
    labelSecondaryOnBase: accessibility.labelSecondaryOnBase || [4.5, null],
    brandOnBase: [3.0, null],
    labelOnBrand: [3.0, null],
    stateOnBase: [3.0, null],
  };
}

function gateLimited(name, value, gate) {
  const [min, max] = gate;
  if (value < min - 1e-9) return `${name} ${value} below ${min}`;
  if (max != null && value > max + 1e-9) return `${name} ${value} above ${max}`;
  return null;
}

function scoreTokens(tokens, recipe) {
  const get = (k) => tokens[k];
  const gates = gatesFor(recipe);
  const labelPrimaryOnBase = contrast(get('--dsw-alias-label-primary'), get('--dsw-alias-bg-base'));
  const labelSecondaryOnBase = contrast(get('--dsw-alias-label-secondary'), get('--dsw-alias-bg-base'));
  const brandOnBase = contrast(get('--dsw-alias-brand-primary'), get('--dsw-alias-bg-base'));
  const labelOnBrand = contrast(get('--dsw-alias-label-primary'), get('--dsw-alias-brand-primary'));
  const stateOnBase = Math.min(
    contrast(get('--dsw-alias-state-error-primary'), get('--dsw-alias-bg-base')),
    contrast(get('--dsw-alias-state-success-primary'), get('--dsw-alias-bg-base')),
    contrast(get('--dsw-alias-state-warn-primary'), get('--dsw-alias-bg-base')),
  );
  const check = {
    labelPrimaryOnBase: round2(labelPrimaryOnBase),
    labelSecondaryOnBase: round2(labelSecondaryOnBase),
    brandOnBase: round2(brandOnBase),
    labelOnBrand: round2(labelOnBrand),
    stateOnBase: round2(stateOnBase),
  };
  const failures = [];
  for (const [key, value] of Object.entries(check)) {
    const failure = gateLimited(key, value, gates[key]);
    if (failure) failures.push(failure);
  }
  return { check: { ...check, failures }, raw: { labelPrimaryOnBase, labelSecondaryOnBase, brandOnBase, labelOnBrand, stateOnBase } };
}

/* ------------------------------------------------------------------ */
/* build                                                              */
/* ------------------------------------------------------------------ */

const problems = [];

function buildTheme(recipe) {
  const palette = buildPalette(recipe);
  const raw = tokenMap(palette);
  const ordered = {};
  for (const name of INVENTORY_NAMES) {
    if (!(name in raw)) throw new Error(`no role mapping for token: ${name}`);
    ordered[name] = raw[name];
  }
  const extra = Object.keys(raw).filter((name) => !INVENTORY.has(name));
  if (extra.length) throw new Error(`mapping names not in inventory: ${extra.join(', ')}`);

  const { check } = scoreTokens(ordered, recipe);
  if (check.failures.length) problems.push(`${recipe.name}: ${check.failures.join(' | ')}`);

  return {
    id: recipe.id,
    name: recipe.name,
    colorScheme: recipe.colorScheme,
    tagline: recipe.tagline,
    description: recipe.description,
    tokens: ordered,
    check,
  };
}

const h4x0rThemes = H4X0R_RECIPES.map(buildTheme);
const mirageThemes = MIRAGE_RECIPES.map(buildTheme);

/* canonical JSON fingerprint, object keys sorted, so key order cannot mask a value change */
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

const regressions = h4x0rThemes.filter((theme) => fingerprint(theme) !== H4X0R_BASELINE[theme.id]).map((theme) => theme.id);

const data = {
  packs: [
    { id: 'h4x0r', name: 'H4X0R', tagline: 'Six hacker palettes', themes: h4x0rThemes },
    { id: 'mirage', name: 'MIRAGE', tagline: 'Anime-minimal moods in ten palettes', themes: mirageThemes },
  ],
};

const tokenCount = Object.keys(h4x0rThemes[0].tokens).length;

if (!regressions.length) {
  writeFileSync(join(HERE, 'themes.data.json'), JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`make-themes: ${h4x0rThemes.length} H4X0R + ${mirageThemes.length} MIRAGE themes, ${tokenCount}/${INVENTORY_NAMES.length} tokens each -> themes.data.json`);
  for (const theme of [...h4x0rThemes, ...mirageThemes]) {
    const c = theme.check;
    console.log(
      `  ${theme.id.padEnd(18)} primary ${c.labelPrimaryOnBase.toFixed(2).padStart(5)}  secondary ${c.labelSecondaryOnBase.toFixed(2).padStart(5)}  brand ${c.brandOnBase.toFixed(2).padStart(5)}  onBrand ${c.labelOnBrand.toFixed(2).padStart(5)}  state ${c.stateOnBase.toFixed(2).padStart(5)}`,
    );
  }
  console.log(`  H4X0R regression: ${h4x0rThemes.length - regressions.length}/${h4x0rThemes.length} theme objects match the v1 baseline`);
} else {
  console.error('REGRESSION: existing H4X0R palettes changed: ' + regressions.join(', '));
  console.error('Refusing to write themes.data.json. Restore the v1 recipes and role map.');
  process.exitCode = 1;
}

if (tokenCount !== INVENTORY_NAMES.length) {
  console.error(`coverage failure: ${tokenCount}/${INVENTORY_NAMES.length}`);
  process.exitCode = 1;
}
if (problems.length) {
  console.error('gate failures:');
  for (const problem of problems) console.error('  ' + problem);
  process.exitCode = 1;
}
