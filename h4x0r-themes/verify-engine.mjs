// Independent verification of the runtime palette engine, written by the Lead
// as a cross-check of engine-smith's own tests.
import { readFileSync } from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import * as core from './palette-core.mjs';
import * as pixel from './pixel-theme.mjs';

const here = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));
const inventory = JSON.parse(readFileSync(path.join(here, 'token-inventory.json'), 'utf8'));
const expected = new Set(inventory.tokens.map((token) => token.name));

const names = core.roleTokenNames();
assert.equal(names.length, expected.size, 'role token count');
for (const name of names) assert.ok(expected.has(name), 'unknown token ' + name);
for (const name of expected) assert.ok(names.includes(name), 'missing token ' + name);

function field(size, colorFn) {
  const data = new Uint8ClampedArray(size * size * 4);
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const offset = (y * size + x) * 4;
      const [r, g, b] = colorFn(x / (size - 1), y / (size - 1));
      data[offset] = r;
      data[offset + 1] = g;
      data[offset + 2] = b;
      data[offset + 3] = 255;
    }
  }
  return data;
}

const cases = [
  { name: 'phosphor green', pixels: field(64, (x, y) => [10 + 20 * x, 40 + 120 * y, 20 + 30 * x]) },
  { name: 'cyan field', pixels: field(64, (x, y) => [10 * x, 120 + 80 * y, 160 + 60 * x]) },
  { name: 'sakura pink', pixels: field(64, (x, y) => [230 + 20 * x, 170 + 40 * y, 190 + 30 * x]) },
  { name: 'ember orange', pixels: field(64, (x, y) => [150 + 90 * x, 70 + 60 * y, 20 + 30 * x]) },
  { name: 'deep blue', pixels: field(64, (x, y) => [8 + 20 * x, 14 + 30 * y, 60 + 80 * x]) },
  { name: 'monochrome gray', pixels: field(64, () => [128, 128, 128]) },
  { name: 'near black', pixels: field(64, (x, y) => [6 + 6 * x, 6 + 6 * y, 8 + 6 * x]) },
  { name: 'near white', pixels: field(64, () => [246, 245, 243]) },
  { name: 'high contrast two tone', pixels: field(64, (x, y) => (x < 0.5 ? [250, 250, 248] : [8, 10, 14])) },
  { name: 'noisy low saturation', pixels: field(64, (x, y) => [110 + 30 * ((x * 7 + y * 3) % 1), 112, 116]) },
  { name: 'gradient dusk', pixels: field(64, (x, y) => [40 + 120 * y, 20 + 60 * y, 90 + 100 * x]) },
  { name: 'tiny vivid accent', pixels: field(64, (x, y) => (x > 0.42 && x < 0.58 && y > 0.42 && y < 0.58 ? [240, 40, 60] : [34, 36, 40])) },
];

const GATES = [
  ['labelPrimaryOnBase', 7],
  ['labelSecondaryOnBase', 4.5],
  ['brandOnBase', 3],
];

let checked = 0;
for (const testCase of cases) {
  const first = pixel.buildWallpaperTheme(testCase.pixels, 64, 64, { wallpaper: true, fileName: testCase.name });
  const second = pixel.buildWallpaperTheme(testCase.pixels, 64, 64, { wallpaper: true, fileName: testCase.name });
  assert.equal(JSON.stringify(first), JSON.stringify(second), 'determinism for ' + testCase.name);
  assert.ok(first.tokens && typeof first.tokens === 'object', 'tokens for ' + testCase.name);
  const tokenNames = Object.keys(first.tokens);
  for (const name of expected) assert.ok(tokenNames.includes(name), testCase.name + ' missing ' + name);
  assert.equal(tokenNames.length, expected.size, testCase.name + ' token count');
  for (const [name, value] of Object.entries(first.tokens)) {
    assert.equal(typeof value, 'string', testCase.name + ' token type ' + name);
    assert.ok(!value.includes('var('), testCase.name + ' var reference ' + name);
  }
  assert.ok(first.surfaces && first.surfaces['--dsw-alias-bg-base'], testCase.name + ' surfaces');
  assert.ok(
    String(first.surfaces['--dsw-alias-bg-base']).startsWith('rgba('),
    testCase.name + ' translucent canvas'
  );
  const check = first.check;
  for (const [key, gate] of GATES) {
    const value = check && typeof check[key] === 'number' ? check[key] : null;
    assert.ok(value !== null, testCase.name + ' missing check ' + key);
    assert.ok(value >= gate, testCase.name + ' gate ' + key + ' ' + value);
  }
  const comfort = pixel.buildWallpaperTheme(testCase.pixels, 64, 64, { wallpaper: true, comfort: true });
  const comfortCheck = comfort.check;
  assert.ok(comfortCheck.labelPrimaryOnBase >= 4.5, testCase.name + ' comfort primary lower bound');
  assert.ok(comfortCheck.labelPrimaryOnBase <= 13, testCase.name + ' comfort primary upper bound');
  checked += 1;
}

const analysis = pixel.analyzePixels(cases[0].pixels, 64, 64, {});
assert.ok(analysis && analysis.colorScheme, 'analysis output');

console.log(
  'ENGINE CROSS-CHECK OK: ' +
    checked +
    ' synthetic wallpapers, ' +
    expected.size +
    ' tokens each, determinism, gates, comfort mode'
);
