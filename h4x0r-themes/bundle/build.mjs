#!/usr/bin/env node
// Build client.js for the H4X0R Themes v2 bundle.
//
// Reads the curated palette data and the runtime engine modules, injects all
// three into client.template.js at their markers, writes client.js, then runs
// a syntax check on the result.
//
// Usage:
//   node build.mjs
//   node build.mjs path/to/themes.data.json
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATE_PATH = path.join(HERE, 'client.template.js');
const OUTPUT_PATH = path.join(HERE, 'client.js');
const DATA_PATH = path.join(HERE, '..', 'themes.data.json');
const CORE_PATH = path.join(HERE, '..', 'palette-core.mjs');
const PIXEL_PATH = path.join(HERE, '..', 'pixel-theme.mjs');

const DATA_MARKER = '/*__H4X0R_THEME_DATA__*/ null';
const CORE_MARKER = '/*__H4X0R_PALETTE_CORE__*/';
const PIXEL_MARKER = '/*__H4X0R_PIXEL_THEME__*/';
const EXPORTS_MARKER = '/*__H4X0R_ENGINE_EXPORTS__*/';

function fail(message) {
  console.error('[h4x0r build] ERROR: ' + message);
  process.exit(1);
}

function readRequired(file, label) {
  if (!existsSync(file)) fail(label + ' not found at ' + file);
  try {
    return readFileSync(file, 'utf8');
  } catch (error) {
    fail('cannot read ' + label + ': ' + error.message);
  }
}

// Strip a leading `export ` and collect the declared name. The templates are
// inlined into one browser scope, so only declaration-form exports are allowed.
// A single `import ... from './palette-core.mjs'` line is allowed and removed,
// because the concatenated scope already holds those functions.
function inlineModule(source, label) {
  if (/\brequire\s*\(/.test(source)) {
    fail(label + ' must not contain require');
  }
  const strippedImports = source.replace(
    /^import\s*\{[^}]*\}\s*from\s*['"]\.\/palette-core\.mjs['"];?\s*$/gm,
    ''
  );
  if (/^\s*import\b/m.test(strippedImports)) {
    fail(label + ' may only import from ./palette-core.mjs');
  }
  const source2 = strippedImports;
  const names = [];
  const stripped = source2.replace(/^export\s+(async\s+function|function|const|let|class)\s+([A-Za-z0-9_$]+)/gm, function (
    match,
    kind,
    name
  ) {
    names.push(name);
    return kind + ' ' + name;
  });
  if (/^export\b/m.test(stripped)) {
    fail(label + ' has an export form this build cannot inline. Use export function or export const.');
  }
  if (names.length === 0) fail(label + ' declares no exports');
  return { source: stripped, names: names };
}

const dataPath = process.argv[2] ? path.resolve(process.cwd(), process.argv[2]) : DATA_PATH;
const template = readRequired(TEMPLATE_PATH, 'client.template.js');

let data;
try {
  data = JSON.parse(readRequired(dataPath, 'palette data'));
} catch (error) {
  fail('palette data is not valid JSON: ' + error.message);
}
if (!data || !Array.isArray(data.packs) || data.packs.length === 0) {
  fail('palette data must have a packs array with entries');
}
let themeCount = 0;
data.packs.forEach(function (pack, packIndex) {
  const at = 'packs[' + packIndex + ']';
  if (!pack || typeof pack.id !== 'string' || pack.id === '') fail(at + '.id must be a non-empty string');
  if (!Array.isArray(pack.themes) || pack.themes.length === 0) fail(at + '.themes must be a non-empty array');
  pack.themes.forEach(function (theme, themeIndex) {
    const themeAt = at + '.themes[' + themeIndex + ']';
    if (!theme || typeof theme.id !== 'string' || theme.id === '') fail(themeAt + '.id must be a non-empty string');
    if (theme.colorScheme !== 'light' && theme.colorScheme !== 'dark') {
      fail(themeAt + '.colorScheme must be light or dark');
    }
    if (!theme.tokens || typeof theme.tokens !== 'object' || Array.isArray(theme.tokens)) {
      fail(themeAt + '.tokens must be an object');
    }
    const count = Object.keys(theme.tokens).length;
    if (count === 0) fail(themeAt + '.tokens must not be empty');
    themeCount += 1;
  });
});

const core = inlineModule(readRequired(CORE_PATH, 'palette-core.mjs'), 'palette-core.mjs');
const pixel = inlineModule(readRequired(PIXEL_PATH, 'pixel-theme.mjs'), 'pixel-theme.mjs');

const allNames = core.names.concat(pixel.names);
const duplicates = allNames.filter(function (name, index) {
  return allNames.indexOf(name) !== index;
});
if (duplicates.length) fail('duplicate engine exports: ' + duplicates.join(', '));

const exportLines = allNames
  .map(function (name) {
    return 'api.' + name + ' = ' + name + ';';
  })
  .join('\n      ');

let generated = template;
const replacements = [
  [DATA_MARKER, JSON.stringify(data)],
  [CORE_MARKER, core.source],
  [PIXEL_MARKER, pixel.source],
  [EXPORTS_MARKER, exportLines],
];
replacements.forEach(function (entry) {
  if (generated.indexOf(entry[0]) === -1) fail('marker missing from client.template.js: ' + entry[0]);
  generated = generated.replace(entry[0], entry[1]);
});
if (generated.indexOf('__H4X0R_') !== -1) fail('a build marker survived replacement');

writeFileSync(OUTPUT_PATH, generated);

const check = spawnSync(process.execPath, ['--check', OUTPUT_PATH], { stdio: 'inherit' });
if (check.status !== 0) fail('node --check failed for ' + OUTPUT_PATH);

const bytes = Buffer.byteLength(generated, 'utf8');
console.log(
  '[h4x0r build] client.js written from ' +
    path.relative(HERE, dataPath) +
    ' (' +
    data.packs.length +
    ' packs, ' +
    themeCount +
    ' themes, ' +
    core.names.length +
    ' core exports, ' +
    pixel.names.length +
    ' pixel exports, ' +
    bytes +
    ' bytes)'
);
console.log('[h4x0r build] node --check client.js passed');
