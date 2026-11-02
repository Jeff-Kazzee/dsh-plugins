// H4X0R Themes v2, browser half.
// Built into client.js by `node build.mjs`. The markers below are replaced at
// build time with the palette data, palette-core.mjs and pixel-theme.mjs.
window.__ModuleLoader__.load({
  id: '@local/h4x0r-themes',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const THEME_DATA = /*__H4X0R_THEME_DATA__*/ null;

    // Runtime palette engine. Inlined by the build in one scope: palette-core
    // first, pixel-theme second, so pixel-theme can call core helpers directly.
    const ENGINE = (function () {
      /*__H4X0R_PALETTE_CORE__*/
      /*__H4X0R_PIXEL_THEME__*/
      var api = {};
      /*__H4X0R_ENGINE_EXPORTS__*/
      return api;
    })();

    const PACKS = THEME_DATA && Array.isArray(THEME_DATA.packs) ? THEME_DATA.packs : [];
    const CURATED = PACKS.reduce(function (all, pack) {
      return all.concat(Array.isArray(pack.themes) ? pack.themes : []);
    }, []);
    const THEME_IDS = CURATED.map(function (theme) {
      return theme.id;
    });

    const STORAGE_KEY = 'dsh.h4x0r.theme';
    const COMFORT_KEY = 'dsh.h4x0r.comfort';
    const DB_NAME = 'h4x0r-themes';
    const DB_STORE = 'wallpapers';
    const MAX_SAVED = 8;
    const BOOT_GRACE_MS = 4000;

    // ---------------------------------------------------------------- storage

    function readStored(key) {
      try {
        return window.localStorage.getItem(key);
      } catch (error) {
        return null;
      }
    }

    function writeStored(key, value) {
      try {
        window.localStorage.setItem(key, value);
      } catch (error) {
        // Storage can be unavailable. The applied theme still stands.
      }
    }

    function removeStored(key) {
      try {
        window.localStorage.removeItem(key);
      } catch (error) {
        // Storage can be unavailable. Nothing to remove.
      }
    }

    function readSavedTheme() {
      return readStored(STORAGE_KEY);
    }

    function readComfort() {
      return readStored(COMFORT_KEY) === 'on';
    }

    function writeComfort(on) {
      if (on) writeStored(COMFORT_KEY, 'on');
      else removeStored(COMFORT_KEY);
    }

    // ------------------------------------------------------------- wallpaper DB

    function openDb() {
      return new Promise(function (resolve, reject) {
        if (!window.indexedDB) {
          reject(new Error('IndexedDB is unavailable in this browser.'));
          return;
        }
        const request = window.indexedDB.open(DB_NAME, 1);
        request.onupgradeneeded = function () {
          const db = request.result;
          if (!db.objectStoreNames.contains(DB_STORE)) {
            db.createObjectStore(DB_STORE, { keyPath: 'id' });
          }
        };
        request.onsuccess = function () {
          resolve(request.result);
        };
        request.onerror = function () {
          reject(request.error || new Error('Cannot open the wallpaper store.'));
        };
      });
    }

    function dbRequest(mode, run) {
      return openDb().then(function (db) {
        return new Promise(function (resolve, reject) {
          const tx = db.transaction(DB_STORE, mode);
          const store = tx.objectStore(DB_STORE);
          let value;
          try {
            value = run(store);
          } catch (error) {
            reject(error);
            return;
          }
          tx.oncomplete = function () {
            resolve(value && value.result !== undefined ? value.result : value);
          };
          tx.onerror = function () {
            reject(tx.error || new Error('Wallpaper store failed.'));
          };
        });
      });
    }

    function dbPut(record) {
      return dbRequest('readwrite', function (store) {
        store.put(record);
      });
    }

    function dbGet(id) {
      return dbRequest('readonly', function (store) {
        return store.get(id);
      });
    }

    function dbDelete(id) {
      return dbRequest('readwrite', function (store) {
        store.delete(id);
      });
    }

    function dbAll() {
      return dbRequest('readonly', function (store) {
        return store.getAll();
      });
    }

    function trimSaved() {
      return dbAll().then(function (records) {
        const sorted = (records || []).sort(function (a, b) {
          return (b.createdAt || 0) - (a.createdAt || 0);
        });
        const extra = sorted.slice(MAX_SAVED);
        return Promise.all(
          extra.map(function (record) {
            return dbDelete(record.id).catch(function () {});
          })
        );
      });
    }

    // ------------------------------------------------------------- theme runtime

    let runtime = null;
    let bootAt = 0;
    let reapplying = false;
    const wallDisposers = new Map();

    function createRuntime(ctx) {
      const listeners = new Set();
      let snapshot = ctx.theme.getTheme();
      return {
        ctx: ctx,
        getSnapshot: function () {
          return snapshot;
        },
        subscribe: function (listener) {
          listeners.add(listener);
          return function () {
            listeners.delete(listener);
          };
        },
        publish: function (next) {
          snapshot = next;
          listeners.forEach(function (listener) {
            listener();
          });
        },
        persist: function (id) {
          writeStored(STORAGE_KEY, id);
        },
      };
    }

    function isCuratedId(id) {
      return THEME_IDS.indexOf(id) !== -1;
    }

    function isWallId(id) {
      return typeof id === 'string' && id.indexOf('wall-') === 0;
    }

    function isKnownId(id) {
      return isCuratedId(id) || wallDisposers.has(id);
    }

    function schemeOf(theme) {
      return theme && theme.colorScheme === 'light' ? 'light' : 'dark';
    }

    function tokenColor(theme, shortName) {
      const tokens = theme && theme.tokens ? theme.tokens : {};
      const value = tokens['--dsw-alias-' + shortName];
      return typeof value === 'string' && value !== '' ? value : null;
    }

    function cardAccent(theme) {
      return (
        tokenColor(theme, 'brand-primary') ||
        tokenColor(theme, 'link') ||
        tokenColor(theme, 'state-business-primary') ||
        'var(--dsw-alias-brand-primary)'
      );
    }

    // ------------------------------------------------------------ wallpaper state

    let wallState = {
      status: 'idle',
      message: '',
      activeId: null,
      activeName: null,
      activeDataUrl: null,
      saved: [],
      comfort: false,
    };
    const wallListeners = new Set();

    function patchWall(patch) {
      wallState = Object.assign({}, wallState, patch);
      wallListeners.forEach(function (listener) {
        listener();
      });
    }

    function getWall() {
      return wallState;
    }

    function subscribeWall(listener) {
      wallListeners.add(listener);
      return function () {
        wallListeners.delete(listener);
      };
    }

    function setStatus(status, message) {
      patchWall({ status: status, message: message || '' });
    }

    function refreshSaved() {
      return dbAll()
        .then(function (records) {
          const sorted = (records || []).sort(function (a, b) {
            return (b.createdAt || 0) - (a.createdAt || 0);
          });
          patchWall({ saved: sorted });
          return sorted;
        })
        .catch(function () {
          patchWall({ saved: [] });
          return [];
        });
    }

    // ------------------------------------------------------- wallpaper background

    const BACKGROUND_CSS = [
      'html[data-h4x0r-wallpaper="on"]{background-color:var(--dsw-alias-bg-base)}',
      'html[data-h4x0r-wallpaper="on"] body{background-color:transparent !important;background-image:var(--h4x0r-wallpaper-image) !important;background-size:cover !important;background-position:center center !important;background-attachment:fixed !important;background-repeat:no-repeat !important}',
    ].join('\n');

    function hexToRgba(color, alpha) {
      if (typeof color !== 'string') return 'rgba(8,8,10,' + alpha + ')';
      const text = color.trim();
      const hex = /^#([0-9a-f]{6})$/i.exec(text);
      if (hex) {
        const value = parseInt(hex[1], 16);
        return (
          'rgba(' +
          ((value >> 16) & 255) +
          ',' +
          ((value >> 8) & 255) +
          ',' +
          (value & 255) +
          ',' +
          alpha +
          ')'
        );
      }
      const short = /^#([0-9a-f]{3})$/i.exec(text);
      if (short) {
        const part = short[1];
        return (
          'rgba(' +
          parseInt(part[0] + part[0], 16) +
          ',' +
          parseInt(part[1] + part[1], 16) +
          ',' +
          parseInt(part[2] + part[2], 16) +
          ',' +
          alpha +
          ')'
        );
      }
      const rgb = /^rgba?\(([^)]+)\)$/i.exec(text);
      if (rgb) {
        const parts = rgb[1].split(/[, ]+/).filter(Boolean).map(Number);
        return 'rgba(' + parts[0] + ',' + parts[1] + ',' + parts[2] + ',' + alpha + ')';
      }
      return 'rgba(8,8,10,' + alpha + ')';
    }

    function buildScrim(theme) {
      const base = tokenColor(theme, 'bg-base') || (schemeOf(theme) === 'light' ? '#f2f2ef' : '#0b0b0d');
      const light = schemeOf(theme) === 'light';
      const top = hexToRgba(base, light ? 0.5 : 0.42);
      const mid = hexToRgba(base, light ? 0.28 : 0.2);
      const low = hexToRgba(base, light ? 0.4 : 0.34);
      return 'linear-gradient(180deg,' + top + ' 0%,' + mid + ' 34%,' + low + ' 100%)';
    }

    function showWallpaper(theme, dataUrl) {
      const root = document.documentElement;
      const scrim = buildScrim(theme);
      root.style.setProperty('--h4x0r-wallpaper-image', scrim + ', url("' + dataUrl + '")');
      root.setAttribute('data-h4x0r-wallpaper', 'on');
    }

    function hideWallpaper() {
      const root = document.documentElement;
      root.removeAttribute('data-h4x0r-wallpaper');
      root.style.removeProperty('--h4x0r-wallpaper-image');
    }

    // ------------------------------------------------------------ image pipeline

    function hashBytes(bytes) {
      let hash = 0x811c9dc5;
      const step = bytes.length > 65536 ? Math.floor(bytes.length / 65536) : 1;
      for (let index = 0; index < bytes.length; index += step) {
        hash ^= bytes[index];
        hash = Math.imul(hash, 0x01000193) >>> 0;
      }
      hash ^= bytes.length;
      hash = Math.imul(hash, 0x01000193) >>> 0;
      return hash.toString(16).padStart(8, '0');
    }

    function decodeImage(source) {
      return new Promise(function (resolve, reject) {
        if (typeof window.createImageBitmap === 'function' && source instanceof Blob) {
          window.createImageBitmap(source).then(resolve, function () {
            fallback();
          });
          return;
        }
        fallback();

        function fallback() {
          const image = new window.Image();
          const url = typeof source === 'string' ? source : window.URL.createObjectURL(source);
          image.onload = function () {
            if (typeof source !== 'string') window.URL.revokeObjectURL(url);
            resolve(image);
          };
          image.onerror = function () {
            if (typeof source !== 'string') window.URL.revokeObjectURL(url);
            reject(new Error('That file is not an image this browser can decode.'));
          };
          image.src = url;
        }
      });
    }

    function drawToData(image, maxSide) {
      const width = image.width || image.naturalWidth;
      const height = image.height || image.naturalHeight;
      const scale = Math.min(1, maxSide / Math.max(width, height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(width * scale));
      canvas.height = Math.max(1, Math.round(height * scale));
      const context = canvas.getContext('2d');
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      return canvas;
    }

    function canvasToDataUrl(image, maxSide) {
      const canvas = drawToData(image, maxSide);
      const webp = canvas.toDataURL('image/webp', 0.82);
      if (webp.indexOf('data:image/webp') === 0) return webp;
      return canvas.toDataURL('image/jpeg', 0.86);
    }

    // The engine gates wallpaper surfaces against a worst-case photo, which
    // pushes its alphas near opaque. For a visible backdrop we instead bake a
    // scrim into the stored image, so the pixels that show through the UI are
    // already dark (or light) enough to keep text readable.
    const WALL_SURFACE_ALPHA = {
      dark: {
        '--dsw-alias-bg-base': 0.54,
        '--dsw-alias-bg-layer-1': 0.68,
        '--dsw-alias-bg-layer-2': 0.8,
        '--dsw-alias-bg-module-platform': 0.74,
        '--dsw-specific-sidebar-fill': 0.6,
      },
      light: {
        '--dsw-alias-bg-base': 0.6,
        '--dsw-alias-bg-layer-1': 0.74,
        '--dsw-alias-bg-layer-2': 0.86,
        '--dsw-alias-bg-module-platform': 0.8,
        '--dsw-specific-sidebar-fill': 0.66,
      },
    };

    function rgbaTokens(tokens, scheme) {
      const alphas = WALL_SURFACE_ALPHA[scheme] || WALL_SURFACE_ALPHA.dark;
      const out = {};
      Object.keys(alphas).forEach(function (name) {
        out[name] = hexToRgba(tokens[name], alphas[name]);
      });
      return out;
    }

    function bakeWallpaper(image, baseColor, scheme) {
      const canvas = drawToData(image, 1920);
      const context = canvas.getContext('2d');
      const light = scheme === 'light';
      if (typeof context.filter === 'string') {
        context.filter = light
          ? 'brightness(1.04) saturate(0.86)'
          : 'brightness(0.38) saturate(1.06)';
      }
      context.drawImage(canvas, 0, 0);
      context.filter = 'none';
      context.fillStyle = hexToRgba(baseColor, light ? 0.26 : 0.45);
      context.fillRect(0, 0, canvas.width, canvas.height);
      const webp = canvas.toDataURL('image/webp', 0.82);
      if (webp.indexOf('data:image/webp') === 0) return webp;
      return canvas.toDataURL('image/jpeg', 0.86);
    }

    function themeSurfaces(opaqueTokens, scheme) {
      return Object.assign({}, opaqueTokens, rgbaTokens(opaqueTokens, scheme));
    }

    function samplePixels(image) {
      const canvas = drawToData(image, 96);
      const context = canvas.getContext('2d');
      const data = context.getImageData(0, 0, canvas.width, canvas.height);
      return { pixels: data.data, width: canvas.width, height: canvas.height };
    }

    function readFileBytes(file) {
      if (file.arrayBuffer) {
        return file.arrayBuffer().then(function (buffer) {
          return new Uint8Array(buffer);
        });
      }
      return new Promise(function (resolve, reject) {
        const reader = new window.FileReader();
        reader.onload = function () {
          resolve(new Uint8Array(reader.result));
        };
        reader.onerror = function () {
          reject(new Error('Cannot read that file.'));
        };
        reader.readAsArrayBuffer(file);
      });
    }

    function buildRecord(bytes, image, options) {
      const sample = samplePixels(image);
      const analysis = ENGINE.buildWallpaperTheme(sample.pixels, sample.width, sample.height, {
        fileName: options.fileName,
        comfort: options.comfort,
        wallpaper: true,
        forceScheme: options.forceScheme,
      });
      const hash = hashBytes(bytes);
      const id = 'wall-' + hash + (options.comfort ? '-c' : '');
      const scheme = analysis.colorScheme === 'light' ? 'light' : 'dark';
      return {
        id: id,
        hash: hash,
        name: analysis.name,
        fileName: options.fileName || 'wallpaper',
        colorScheme: scheme,
        tokens: themeSurfaces(analysis.tokens, scheme),
        opaqueTokens: analysis.tokens,
        check: analysis.check || null,
        comfort: !!options.comfort,
        dataUrl: bakeWallpaper(image, analysis.tokens['--dsw-alias-bg-base'], scheme),
        sourceDataUrl: canvasToDataUrl(image, 1920),
        createdAt: Date.now(),
      };
    }

    // --------------------------------------------------------------- theme wiring

    function registerWallTheme(ctx, record) {
      const scheme = record.colorScheme === 'light' ? 'light' : 'dark';
      if (wallDisposers.has(record.id)) {
        try {
          wallDisposers.get(record.id)();
        } catch (error) {
          // Already disposed.
        }
        wallDisposers.delete(record.id);
      }
      const disposer = ctx.theme.register({
        id: record.id,
        colorScheme: scheme,
        tokens: record.tokens,
      });
      wallDisposers.set(record.id, disposer);
      return disposer;
    }

    function applyCurated(ctx, id) {
      try {
        ctx.theme.setTheme(id);
      } catch (error) {
        return false;
      }
      runtime.persist(id);
      hideWallpaper();
      patchWall({ activeId: null, activeName: null, activeDataUrl: null });
      return true;
    }

    function applyWallRecord(ctx, record) {
      try {
        registerWallTheme(ctx, record);
        ctx.theme.setTheme(record.id);
      } catch (error) {
        setStatus('error', error && error.message ? error.message : 'Cannot apply that palette.');
        return false;
      }
      runtime.persist(record.id);
      showWallpaper({ tokens: record.tokens, colorScheme: record.colorScheme }, record.dataUrl);
      patchWall({
        activeId: record.id,
        activeName: record.name,
        activeDataUrl: record.dataUrl,
        status: 'ready',
        message: record.name,
      });
      return true;
    }

    function dropWallRecord(ctx, id) {
      const disposer = wallDisposers.get(id);
      if (disposer) {
        try {
          disposer();
        } catch (error) {
          // Already disposed.
        }
        wallDisposers.delete(id);
      }
    }

    function removeWallpaper(ctx, id) {
      const wallId = id || wallState.activeId;
      if (wallId) {
        dropWallRecord(ctx, wallId);
        dbDelete(wallId).catch(function () {});
      }
      hideWallpaper();
      patchWall({ activeId: null, activeName: null, activeDataUrl: null, status: 'idle', message: '' });
      const fallback = THEME_IDS.indexOf('h4x0r-void') !== -1 ? 'h4x0r-void' : THEME_IDS[0];
      if (fallback) {
        try {
          ctx.theme.setTheme(fallback);
          runtime.persist(fallback);
        } catch (error) {
          // The service resets to its own default when the backing theme goes.
        }
      } else {
        removeStored(STORAGE_KEY);
      }
      refreshSaved();
    }

    async function ingestFile(ctx, file) {
      if (!file) return;
      if (!/^image\//.test(file.type || '')) {
        setStatus('error', 'That file is not an image. Use PNG, JPEG, WebP or AVIF.');
        return;
      }
      if (file.size > 25 * 1024 * 1024) {
        setStatus('error', 'That image is larger than 25 MB. Pick a smaller file.');
        return;
      }
      setStatus('working', 'Reading ' + (file.name || 'image') + '.');
      try {
        const bytes = await readFileBytes(file);
        const image = await decodeImage(file);
        setStatus('working', 'Deriving a palette from the image.');
        const record = buildRecord(bytes, image, {
          fileName: file.name,
          comfort: wallState.comfort,
        });
        await dbPut(record).catch(function () {});
        await trimSaved().catch(function () {});
        const applied = applyWallRecord(ctx, record);
        if (applied) {
          setStatus('ready', record.name + '. ' + describeCheck(record.check));
          refreshSaved();
        }
      } catch (error) {
        setStatus('error', error && error.message ? error.message : 'Cannot read that image.');
      }
    }

    function describeCheck(check) {
      if (!check) return '';
      const parts = [];
      if (typeof check.labelPrimaryOnBase === 'number') {
        parts.push('Text contrast ' + check.labelPrimaryOnBase.toFixed(1) + ':1');
      }
      if (check.scheme) parts.push(check.scheme + ' scheme');
      return parts.join('. ');
    }

    async function regenerateActive(ctx, comfort) {
      const active = wallState.activeId ? await dbGet(wallState.activeId) : null;
      if (!active) return;
      setStatus('working', 'Rebuilding the palette.');
      try {
        const source = active.sourceDataUrl || active.dataUrl;
        const image = await decodeImage(source);
        const sample = samplePixels(image);
        const analysis = ENGINE.buildWallpaperTheme(sample.pixels, sample.width, sample.height, {
          fileName: active.fileName,
          comfort: comfort,
          wallpaper: true,
        });
        const scheme = analysis.colorScheme === 'light' ? 'light' : 'dark';
        const record = {
          id: active.id,
          hash: active.hash,
          name: analysis.name,
          fileName: active.fileName,
          colorScheme: scheme,
          tokens: themeSurfaces(analysis.tokens, scheme),
          opaqueTokens: analysis.tokens,
          check: analysis.check || null,
          comfort: !!comfort,
          dataUrl: bakeWallpaper(image, analysis.tokens['--dsw-alias-bg-base'], scheme),
          sourceDataUrl: canvasToDataUrl(image, 1920),
          createdAt: active.createdAt || Date.now(),
        };
        await dbPut(record).catch(function () {});
        dropWallRecord(ctx, active.id);
        applyWallRecord(ctx, record);
        setStatus('ready', record.name + '. ' + describeCheck(record.check));
        refreshSaved();
      } catch (error) {
        setStatus('error', error && error.message ? error.message : 'Cannot rebuild that palette.');
      }
    }

    // ---------------------------------------------------------------- page views

    function ThemeCard(props) {
      const theme = props.theme;
      return h(
        'button',
        {
          type: 'button',
          className: 'h4x0r-card',
          'aria-pressed': props.selected,
          title: theme.description || theme.tagline || theme.name,
          onClick: props.onPick,
        },
        h(
          'span',
          { className: 'h4x0r-preview', 'aria-hidden': 'true' },
          h('span', {
            className: 'h4x0r-chip',
            style: { background: tokenColor(theme, 'bg-base') || 'var(--dsw-alias-bg-base)' },
          }),
          h('span', {
            className: 'h4x0r-chip h4x0r-chip-label',
            style: { background: tokenColor(theme, 'label-primary') || 'var(--dsw-alias-label-primary)' },
          }),
          h('span', {
            className: 'h4x0r-chip h4x0r-chip-brand',
            style: { background: cardAccent(theme) },
          })
        ),
        h('span', { className: 'h4x0r-name' }, theme.name || theme.id),
        h(
          'span',
          { className: 'h4x0r-meta' },
          h('span', { className: 'h4x0r-dot', style: { background: cardAccent(theme) } }),
          theme.colorScheme === 'light' ? 'Light' : 'Dark'
        ),
        h('span', { className: 'h4x0r-tagline' }, theme.tagline || '')
      );
    }

    function WallpaperPanel(props) {
      const wall = props.wall;
      const inputRef = React.useRef(null);
      const [dragging, setDragging] = React.useState(false);
      const busy = wall.status === 'working';
      return h(
        'section',
        { className: 'h4x0r-panel' },
        h(
          'div',
          { className: 'h4x0r-panel-head' },
          h('h3', { className: 'h4x0r-h3' }, 'Wallpaper themes'),
          h('p', { className: 'h4x0r-sub' }, 'Drop an anime wallpaper and the pack builds a full palette from it, then sets it behind the interface. The image stays on this machine.')
        ),
        h(
          'div',
          {
            className: 'h4x0r-drop' + (dragging ? ' is-dragging' : '') + (wall.activeDataUrl ? ' has-image' : ''),
            onDragOver: function (event) {
              event.preventDefault();
              setDragging(true);
            },
            onDragLeave: function () {
              setDragging(false);
            },
            onDrop: function (event) {
              event.preventDefault();
              setDragging(false);
              const file = event.dataTransfer && event.dataTransfer.files ? event.dataTransfer.files[0] : null;
              if (file) props.onFile(file);
            },
          },
          wall.activeDataUrl
            ? h('img', { className: 'h4x0r-thumb', src: wall.activeDataUrl, alt: wall.activeName || 'Active wallpaper' })
            : h('div', { className: 'h4x0r-drop-hint' }, h('span', { className: 'h4x0r-drop-title' }, 'Drop a wallpaper here'), h('span', { className: 'h4x0r-tagline' }, 'PNG, JPEG, WebP or AVIF up to 25 MB')),
          h('input', {
            ref: inputRef,
            type: 'file',
            accept: 'image/*',
            className: 'h4x0r-file',
            onChange: function (event) {
              const file = event.target.files && event.target.files[0];
              if (file) props.onFile(file);
              event.target.value = '';
            },
          })
        ),
        h(
          'div',
          { className: 'h4x0r-actions' },
          h(
            'button',
            {
              type: 'button',
              className: 'h4x0r-button',
              disabled: busy,
              onClick: function () {
                if (inputRef.current) inputRef.current.click();
              },
            },
            wall.activeDataUrl ? 'Replace image' : 'Choose image'
          ),
          wall.activeDataUrl
            ? h(
                'button',
                {
                  type: 'button',
                  className: 'h4x0r-button is-quiet',
                  disabled: busy,
                  onClick: props.onRemove,
                },
                'Remove wallpaper'
              )
            : null,
          h(
            'label',
            { className: 'h4x0r-check' },
            h('input', {
              type: 'checkbox',
              checked: wall.comfort,
              onChange: function (event) {
                props.onComfort(event.target.checked);
              },
            }),
            'Comfort mode'
          )
        ),
        wall.message
          ? h('p', { className: 'h4x0r-status' + (wall.status === 'error' ? ' is-error' : '') }, wall.message)
          : null,
        wall.saved && wall.saved.length
          ? h(
              'div',
              { className: 'h4x0r-saved' },
              h('span', { className: 'h4x0r-label' }, 'Recent wallpapers'),
              h(
                'div',
                { className: 'h4x0r-strip' },
                wall.saved.map(function (record) {
                  return h(
                    'button',
                    {
                      key: record.id,
                      type: 'button',
                      className: 'h4x0r-saved-item' + (wall.activeId === record.id ? ' is-active' : ''),
                      title: record.name,
                      onClick: function () {
                        props.onApplySaved(record);
                      },
                    },
                    h('img', { src: record.dataUrl, alt: '', className: 'h4x0r-saved-thumb' })
                  );
                })
              )
            )
          : null
      );
    }

    function ThemesPage() {
      const snapshot = React.useSyncExternalStore(runtime.subscribe, runtime.getSnapshot, runtime.getSnapshot);
      const wall = React.useSyncExternalStore(subscribeWall, getWall, getWall);
      const activeId = snapshot.preference;
      const ctx = runtime.ctx;

      return h(
        'div',
        { className: 'h4x0r-page' },
        h(
          'header',
          { className: 'h4x0r-header' },
          h('h2', { className: 'h4x0r-h2' }, 'Themes'),
          h('p', { className: 'h4x0r-sub' }, 'Full palettes for the whole interface. Appearance in General still switches the built-in Light and Dark.')
        ),
        h(WallpaperPanel, {
          wall: wall,
          onFile: function (file) {
            ingestFile(ctx, file);
          },
          onRemove: function () {
            removeWallpaper(ctx);
          },
          onComfort: function (next) {
            writeComfort(next);
            patchWall({ comfort: next });
            if (wall.activeId) {
              regenerateActive(ctx, next);
            }
          },
          onApplySaved: function (record) {
            applyWallRecord(ctx, record);
            refreshSaved();
          },
        }),
        PACKS.map(function (pack) {
          return h(
            'section',
            { className: 'h4x0r-panel', key: pack.id },
            h(
              'div',
              { className: 'h4x0r-panel-head' },
              h('h3', { className: 'h4x0r-h3' }, pack.name || pack.id),
              pack.tagline ? h('p', { className: 'h4x0r-sub' }, pack.tagline) : null
            ),
            h(
              'div',
              { className: 'h4x0r-grid' },
              (pack.themes || []).map(function (theme) {
                return h(ThemeCard, {
                  key: theme.id,
                  theme: theme,
                  selected: activeId === theme.id,
                  onPick: function () {
                    applyCurated(ctx, theme.id);
                  },
                });
              })
            )
          );
        }),
        h(
          'p',
          { className: 'h4x0r-footnote' },
          'Palette choice is stored in this browser. The Harness persists only Light, Dark and System.'
        ),
        h('style', { 'data-h4x0r-themes': 'page' }, PAGE_CSS)
      );
    }

    // ---------------------------------------------------------------------- CSS

    const PAGE_CSS = [
      '.h4x0r-page{display:flex;flex-direction:column;gap:20px;padding:4px 0 24px;color:var(--dsw-alias-label-primary)}',
      '.h4x0r-header{display:flex;flex-direction:column;gap:4px}',
      '.h4x0r-h2{margin:0;font-size:18px;line-height:26px;font-weight:500}',
      '.h4x0r-h3{margin:0;font-size:14px;line-height:22px;font-weight:500}',
      '.h4x0r-sub{margin:0;font-size:12px;line-height:18px;color:var(--dsw-alias-label-secondary)}',
      '.h4x0r-panel{display:flex;flex-direction:column;gap:12px;padding:16px;border:.5px solid var(--dsw-alias-border-l2);border-radius:14px;background:var(--dsw-alias-bg-layer-1)}',
      '.h4x0r-panel-head{display:flex;flex-direction:column;gap:2px}',
      '.h4x0r-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(148px,1fr));gap:8px}',
      '.h4x0r-card{box-sizing:border-box;display:flex;flex-direction:column;gap:6px;padding:12px;border:.5px solid var(--dsw-alias-border-l2);border-radius:12px;background:transparent;font:inherit;font-size:13px;line-height:20px;color:var(--dsw-alias-label-primary);text-align:left;cursor:pointer;transition:background .12s ease,border-color .12s ease}',
      '.h4x0r-card:hover{background:var(--dsw-alias-interactive-bg-hover)}',
      '.h4x0r-card[aria-pressed="true"]{border-color:var(--dsw-alias-brand-primary);background:var(--dsw-alias-interactive-bg-hover)}',
      '.h4x0r-card:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}',
      '.h4x0r-preview{display:flex;flex-direction:column;gap:3px;width:100%;padding:6px;border-radius:8px;background:transparent}',
      '.h4x0r-chip{display:block;height:6px;border-radius:3px}',
      '.h4x0r-chip-label{width:62%}',
      '.h4x0r-chip-brand{width:36%}',
      '.h4x0r-name{font-size:13px;font-weight:500;line-height:20px}',
      '.h4x0r-meta{display:flex;align-items:center;gap:6px;font-size:11px;line-height:16px;color:var(--dsw-alias-label-tertiary)}',
      '.h4x0r-dot{width:6px;height:6px;border-radius:50%}',
      '.h4x0r-tagline{font-size:11px;line-height:16px;color:var(--dsw-alias-label-tertiary)}',
      '.h4x0r-drop{position:relative;display:flex;align-items:center;justify-content:center;min-height:132px;border:1px dashed var(--dsw-alias-border-l3);border-radius:12px;background:var(--dsw-alias-bg-layer-2);overflow:hidden}',
      '.h4x0r-drop.is-dragging{border-color:var(--dsw-alias-brand-primary)}',
      '.h4x0r-drop.has-image{border-style:solid}',
      '.h4x0r-drop-hint{display:flex;flex-direction:column;align-items:center;gap:4px;padding:20px;text-align:center}',
      '.h4x0r-drop-title{font-size:13px;line-height:20px}',
      '.h4x0r-thumb{display:block;width:100%;max-height:220px;object-fit:cover}',
      '.h4x0r-file{display:none}',
      '.h4x0r-actions{display:flex;flex-wrap:wrap;align-items:center;gap:8px}',
      '.h4x0r-button{font:inherit;font-size:13px;line-height:20px;padding:6px 12px;border-radius:8px;border:.5px solid var(--dsw-alias-border-l3);background:var(--dsw-alias-bg-module-platform);color:var(--dsw-alias-label-primary);cursor:pointer}',
      '.h4x0r-button:hover{background:var(--dsw-alias-interactive-bg-hover)}',
      '.h4x0r-button:disabled{color:var(--dsw-alias-label-caption);cursor:default}',
      '.h4x0r-button.is-quiet{background:transparent}',
      '.h4x0r-check{display:flex;align-items:center;gap:6px;font-size:12px;line-height:18px;color:var(--dsw-alias-label-secondary);cursor:pointer}',
      '.h4x0r-status{margin:0;font-size:12px;line-height:18px;color:var(--dsw-alias-label-secondary)}',
      '.h4x0r-status.is-error{color:var(--dsw-alias-state-error-primary)}',
      '.h4x0r-saved{display:flex;flex-direction:column;gap:6px}',
      '.h4x0r-label{font-size:11px;line-height:16px;color:var(--dsw-alias-label-tertiary)}',
      '.h4x0r-strip{display:flex;gap:6px;overflow-x:auto;padding-bottom:2px}',
      '.h4x0r-saved-item{flex:0 0 auto;width:72px;height:44px;padding:0;border:.5px solid var(--dsw-alias-border-l2);border-radius:8px;overflow:hidden;background:transparent;cursor:pointer}',
      '.h4x0r-saved-item.is-active{border-color:var(--dsw-alias-brand-primary)}',
      '.h4x0r-saved-thumb{display:block;width:100%;height:100%;object-fit:cover}',
      '.h4x0r-footnote{margin:0;font-size:11px;line-height:16px;color:var(--dsw-alias-label-tertiary)}',
    ].join('\n');

    // --------------------------------------------------------------------- apply

    function apply(ctx) {
      runtime = createRuntime(ctx);
      bootAt = Date.now();
      patchWall({ comfort: readComfort() });

      // Page and wallpaper stylesheet. Owned by the plugin fiber.
      ctx.effect(function () {
        const style = document.createElement('style');
        style.setAttribute('data-h4x0r-themes', 'background');
        style.textContent = BACKGROUND_CSS;
        document.head.appendChild(style);
        return function () {
          if (style.parentNode) style.parentNode.removeChild(style);
        };
      });

      ctx.effect(function () {
        return ctx.on('theme/change', function (snapshot) {
          runtime.publish(snapshot);
          if (reapplying) return;
          if (isKnownId(snapshot.preference)) return;
          const saved = readSavedTheme();
          if (saved !== null && isWallId(saved) && !wallDisposers.has(saved)) return;
          if (Date.now() - bootAt < BOOT_GRACE_MS) {
            if (saved !== null && isKnownId(saved)) {
              reapplying = true;
              try {
                ctx.theme.setTheme(saved);
              } catch (error) {
                removeStored(STORAGE_KEY);
              } finally {
                reapplying = false;
              }
            }
            return;
          }
          removeStored(STORAGE_KEY);
        });
      });

      ctx.effect(function () {
        const disposers = CURATED.map(function (theme) {
          return ctx.theme.register({
            id: theme.id,
            colorScheme: schemeOf(theme),
            tokens: theme.tokens,
          });
        });
        return function () {
          for (let index = disposers.length - 1; index >= 0; index -= 1) {
            try {
              disposers[index]();
            } catch (error) {
              // Already disposed.
            }
          }
          wallDisposers.forEach(function (dispose) {
            try {
              dispose();
            } catch (error) {
              // Already disposed.
            }
          });
          wallDisposers.clear();
        };
      });

      ctx.effect(function () {
        const saved = readSavedTheme();
        if (saved === null) return;
        if (isCuratedId(saved)) {
          try {
            ctx.theme.setTheme(saved);
          } catch (error) {
            removeStored(STORAGE_KEY);
          }
          return;
        }
        if (!isWallId(saved)) return;
        dbGet(saved)
          .then(function (record) {
            if (!record) {
              removeStored(STORAGE_KEY);
              return;
            }
            applyWallRecord(ctx, record);
            refreshSaved();
          })
          .catch(function () {
            // Storage failed. Keep the current palette.
          });
      });

      ctx.effect(function () {
        refreshSaved();
      });

      ctx.effect(function () {
        return ctx.slots.inject('settings.section', function () {
          return ctx.slots.register(
            {
              name: 'settings.section',
              id: 'h4x0r-themes',
              order: 5,
              label: function () {
                return 'Themes';
              },
            },
            ThemesPage
          );
        });
      });
    }

    return { inject: ['theme', 'slots'], apply: apply };
  },
});
