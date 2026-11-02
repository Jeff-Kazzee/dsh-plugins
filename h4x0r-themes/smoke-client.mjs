// Lead-side smoke test for the built H4X0R Themes v2 client module.
// Runs the generated bundle in a vm sandbox with stub React, theme service,
// slot service, DOM, localStorage and IndexedDB. It does not replace browser
// verification of the rendered page.
import { readFileSync } from 'node:fs';
import { createContext, runInContext } from 'node:vm';
import path from 'node:path';
import assert from 'node:assert/strict';

const here = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));
const source = readFileSync(path.join(here, 'bundle', 'client.js'), 'utf8');

let now = 1_000_000;
class FakeDate extends Date {
  static now() {
    return now;
  }
}

const storage = new Map();

// Minimal in-memory IndexedDB stand-in.
const dbRecords = new Map();
function fakeDb() {
  return {
    objectStoreNames: { contains: () => true },
    transaction: () => {
      const tx = { oncomplete: null, onerror: null, error: null };
      const store = {
        put(record) {
          dbRecords.set(record.id, record);
          queueMicrotask(() => tx.oncomplete && tx.oncomplete());
          return {};
        },
        get(id) {
          const handle = { result: dbRecords.get(id) };
          queueMicrotask(() => tx.oncomplete && tx.oncomplete());
          return handle;
        },
        getAll() {
          const handle = { result: Array.from(dbRecords.values()) };
          queueMicrotask(() => tx.oncomplete && tx.oncomplete());
          return handle;
        },
        delete(id) {
          dbRecords.delete(id);
          queueMicrotask(() => tx.oncomplete && tx.oncomplete());
          return {};
        },
      };
      tx.objectStore = () => store;
      return tx;
    },
  };
}
const indexedDB = {
  open: () => {
    const request = { result: fakeDb(), onupgradeneeded: null, onsuccess: null, onerror: null };
    queueMicrotask(() => request.onsuccess && request.onsuccess());
    return request;
  },
};

function fakeCanvas() {
  return {
    width: 0,
    height: 0,
    getContext: () => ({
      filter: 'none',
      fillStyle: '',
      drawImage: () => {},
      fillRect: () => {},
      getImageData: (x, y, w, h) => {
        const data = new Uint8ClampedArray(w * h * 4);
        for (let row = 0; row < h; row += 1) {
          for (let column = 0; column < w; column += 1) {
            const offset = (row * w + column) * 4;
            const t = column / Math.max(1, w - 1);
            const u = row / Math.max(1, h - 1);
            data[offset] = Math.round(20 + 60 * t);
            data[offset + 1] = Math.round(30 + 120 * u);
            data[offset + 2] = Math.round(80 + 90 * (1 - t));
            data[offset + 3] = 255;
          }
        }
        return { data, width: w, height: h };
      },
    }),
    toDataURL: () => 'data:image/webp;base64,AAAA',
  };
}

const documentElement = {
  style: {
    props: new Map(),
    setProperty(name, value) {
      this.props.set(name, value);
    },
    removeProperty(name) {
      this.props.delete(name);
    },
  },
  attributes: new Map(),
  setAttribute(name, value) {
    this.attributes.set(name, value);
  },
  removeAttribute(name) {
    this.attributes.delete(name);
  },
};

const html = { children: [] };
const window = {
  localStorage: {
    getItem: (key) => (storage.has(key) ? storage.get(key) : null),
    setItem: (key, value) => storage.set(key, String(value)),
    removeItem: (key) => storage.delete(key),
  },
  indexedDB,
  createImageBitmap: () => Promise.resolve({ width: 64, height: 64 }),
  Image: class {
    constructor() {
      this.width = 640;
      this.height = 360;
      this.naturalWidth = 640;
      this.naturalHeight = 360;
    }
    set src(value) {
      this._src = value;
      queueMicrotask(() => this.onload && this.onload());
    }
  },
  FileReader: class {},
  URL: { createObjectURL: () => 'blob:fake', revokeObjectURL: () => {} },
  document: {
    documentElement,
    head: {
      appendChild: (node) => html.children.push(node),
    },
    body: {},
    createElement: (tag) => (tag === 'canvas' ? fakeCanvas() : { setAttribute() {}, textContent: '', parentNode: null }),
  },
};
window.window = window;

class SandboxBlob {
  constructor(parts, options) {
    this.parts = parts || [];
    this.type = (options && options.type) || '';
    this.size = this.parts.reduce((total, part) => total + (part.byteLength || part.length || 0), 0);
  }
  arrayBuffer() {
    return Promise.resolve(new Uint8Array(this.size || 2048).fill(7).buffer);
  }
}

const document = window.document;
const sandboxGlobal = { window, document, Date: FakeDate, console, Math, Object, Array, JSON, Set, Map, String, Number, Error, RegExp, Promise, Uint8ClampedArray, Uint8Array, Blob: SandboxBlob, parseInt, parseFloat, isNaN, setTimeout, clearTimeout, queueMicrotask };

let loaded = null;
window.__ModuleLoader__ = { load: (definition) => { loaded = definition; } };

const react = {
  createElement(type, props, ...children) {
    const node = { type, props: props || {}, children: children.flat() };
    if (typeof type === 'function') return type(node.props);
    return node;
  },
  useSyncExternalStore(subscribe, getSnapshot) {
    return getSnapshot();
  },
  useState(initial) {
    return [typeof initial === 'function' ? initial() : initial, () => {}];
  },
  useRef(value) {
    return { current: value };
  },
  useEffect() {},
};

const slotRegistrations = [];
const effects = [];
const listeners = [];
const ctx = {
  effect(factory) {
    effects.push(factory());
  },
  on(event, listener) {
    listeners.push({ event, listener });
    return () => {};
  },
  theme: {
    snapshot: { preference: 'dark', active: { id: 'dark', colorScheme: 'dark', tokens: {} }, themes: [], revision: 0 },
    registered: new Map(),
    getTheme() {
      return this.snapshot;
    },
    register(definition) {
      if (definition.id === 'system') throw new Error('system is not registrable');
      if (this.registered.has(definition.id)) throw new Error('duplicate id: ' + definition.id);
      this.registered.set(definition.id, definition);
      return () => this.registered.delete(definition.id);
    },
    setTheme(id) {
      if (id !== 'system' && !this.registered.has(id) && !['light', 'dark'].includes(id)) {
        throw new Error('unknown theme id: ' + id);
      }
      this.snapshot = { ...this.snapshot, preference: id, revision: this.snapshot.revision + 1 };
      for (const entry of listeners) {
        if (entry.event === 'theme/change') entry.listener(this.snapshot);
      }
    },
    adoptBuiltin(id) {
      this.snapshot = { ...this.snapshot, preference: id, revision: this.snapshot.revision + 1 };
      for (const entry of listeners) {
        if (entry.event === 'theme/change') entry.listener(this.snapshot);
      }
    },
  },
  slots: {
    inject(key, callback) {
      assert.ok(key === 'settings.section', 'unexpected slot ' + key);
      return callback();
    },
    register(options, component) {
      slotRegistrations.push({ options, component });
      return () => {};
    },
  },
};

const sandbox = sandboxGlobal;
createContext(sandbox);
runInContext(source, sandbox, { filename: 'client.js' });

assert.equal(loaded.id, '@local/h4x0r-themes');
const exportsObject = loaded.factory((name) => {
  assert.equal(name, 'react');
  return react;
});
assert.equal(exportsObject.inject.join(','), 'theme,slots');

// A stale saved theme that no longer exists must not crash the boot.
storage.set('dsh.h4x0r.theme', 'h4x0r-void');
exportsObject.apply(ctx);

const packCount = 2;
const registeredIds = Array.from(ctx.theme.registered.keys());
assert.equal(registeredIds.length, 16, 'sixteen curated themes register');
assert.equal(slotRegistrations.length, 1, 'one settings section registers');
assert.equal(slotRegistrations[0].options.id, 'h4x0r-themes');
assert.equal(slotRegistrations[0].options.order, 5);
assert.equal(slotRegistrations[0].options.name, 'settings.section');
assert.equal(slotRegistrations[0].options.label(), 'Themes');
assert.equal(ctx.theme.snapshot.preference, 'h4x0r-void', 'saved curated theme restored');

// Background stylesheet is owned by the plugin fiber.
assert.equal(html.children.length, 1, 'background stylesheet injected');
assert.ok(String(html.children[0].textContent).includes('data-h4x0r-wallpaper'));
assert.equal(effects.length >= 4, true);

// Render the page.
const Page = slotRegistrations[0].component;
const tree = Page({ close: () => {} });
const flat = [];
(function walk(node) {
  if (!node || typeof node !== 'object') return;
  flat.push(node);
  (node.children || []).forEach(walk);
})(tree);
const sections = flat.filter((node) => node.type === 'section');
assert.equal(sections.length, packCount + 1, 'wallpaper panel plus two pack panels');
const cards = flat.filter((node) => node.type === 'button' && String(node.props.className || '').includes('h4x0r-card'));
assert.equal(cards.length, 16, 'sixteen palette cards render');
assert.equal(cards.filter((card) => card.props['aria-pressed'] === true).length, 1, 'one card selected');
const drop = flat.find((node) => String(node.props.className || '').startsWith('h4x0r-drop'));
assert.ok(drop, 'drop zone renders');

// Picking a card applies and persists.
const target = cards.find((card) => card.props['aria-pressed'] !== true);
target.props.onClick();
assert.notEqual(ctx.theme.snapshot.preference, 'h4x0r-void');
assert.equal(storage.get('dsh.h4x0r.theme'), ctx.theme.snapshot.preference);

// A late built-in adoption inside the boot window reapplies the pack choice.
const chosen = ctx.theme.snapshot.preference;
now += 500;
ctx.theme.adoptBuiltin('dark');
assert.equal(ctx.theme.snapshot.preference, chosen, 'choice survives late built-in adoption');

// After the window, an Appearance pick resets the pack choice.
now += 10_000;
ctx.theme.adoptBuiltin('light');
assert.equal(storage.has('dsh.h4x0r.theme'), false, 'built-in pick clears the stored choice');

// Wallpaper ingestion through the page's file input.
const fileInput = flat.find((node) => node.type === 'input' && node.props.type === 'file');
assert.ok(fileInput, 'file input renders on the page');
const fakeFile = new SandboxBlob([new Uint8Array(2048).fill(7)], { type: 'image/png' });
fakeFile.name = 'gradient.png';
fileInput.props.onChange({ target: { files: [fakeFile], value: '' } });

async function waitFor(predicate, label) {
  const started = Date.now();
  while (Date.now() - started < 3000) {
    if (predicate()) return;
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
  throw new Error('timed out waiting for ' + label);
}

await waitFor(
  () => Array.from(ctx.theme.registered.keys()).some((id) => id.startsWith('wall-')),
  'a wallpaper theme to register'
);
const wallId = Array.from(ctx.theme.registered.keys()).find((id) => id.startsWith('wall-'));
assert.ok(wallId, 'wallpaper theme id');
assert.equal(ctx.theme.snapshot.preference, wallId, 'wallpaper theme applied');
assert.equal(documentElement.attributes.get('data-h4x0r-wallpaper'), 'on', 'wallpaper background enabled');
assert.equal(storage.get('dsh.h4x0r.theme'), wallId, 'wallpaper choice persisted');
assert.ok(
  String(documentElement.style.props.get('--h4x0r-wallpaper-image') || '').includes('url('),
  'wallpaper layer points at the image'
);
assert.equal(dbRecords.size >= 1, true, 'wallpaper record stored');

const wallTheme = ctx.theme.registered.get(wallId);
const wallBase = String(wallTheme.tokens['--dsw-alias-bg-base'] || '');
assert.ok(wallBase.startsWith('rgba('), 'wallpaper theme uses a translucent canvas, got ' + wallBase);
const wallAlpha = Number(wallBase.replace(/^rgba\([^)]*,\s*([\d.]+)\)$/, '$1'));
assert.ok(wallAlpha > 0.45 && wallAlpha < 0.75, 'canvas alpha keeps the wallpaper visible, got ' + wallAlpha);
assert.ok(
  String(documentElement.style.props.get('--h4x0r-wallpaper-image') || '').includes('linear-gradient'),
  'wallpaper layer carries a scrim gradient'
);

console.log('SMOKE OK: 16 themes in 2 packs, section page, 16 cards, wallpaper panel, upload, restore, grace window, reset');
