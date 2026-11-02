# H4X0R Themes

A theme pack for the DeepSeek Harness Web GUI. Source of record for the installed
`@local/h4x0r-themes` bundle.

Version 2 registers sixteen palettes in two packs (H4X0R and MIRAGE) plus
wallpaper auto-theming, and adds a Themes page inside Settings. A wallpaper
upload builds a full palette from the image and puts that image behind the
interface.

## Layout

- `bundle/`: the installable package. The plugin manager links this directory.
- `themes.data.json`: generated palette data for the two packs.
- `make-themes.mjs`: recipe-based generator that writes `themes.data.json`.
- `check-contrast.mjs`: independent WCAG checker, also enforces the H4X0R
  regression and the Lumen accessibility window.
- `contrast-report.txt`: last computed contrast report.
- `palette-core.mjs`: OKLCH color math, the 119-token role map, contrast gates
  and the repair loop. Runs in Node and in the browser bundle.
- `pixel-theme.mjs`: wallpaper pixel analysis, k-means clustering, wallpaper
  theme assembly and translucent surface generation.
- `test-palette-core.mjs`: engine unit tests.
- `verify-engine.mjs`: independent cross-check of the engine on 12 synthetic
  wallpapers.
- `smoke-client.mjs`: runs the built client module against stub React, theme
  service, DOM, localStorage and IndexedDB, including a wallpaper upload.
- `smoke-output.txt`, `engine-crosscheck.txt`: last run receipts.
- `token-inventory.json`: 119 override-eligible Harness theme tokens with their
  light and dark defaults, extracted from `@deepseek-ai/dsh-client-ui-theme`
  0.2.1-rc.3.
- `PLAN-v2.md`: the plan that produced this version.

## Packs

| Pack | Count | Character |
| --- | --- | --- |
| H4X0R | 6 | Phosphor, Void, Ice, Redline, Bone, Dim |
| MIRAGE | 10 | Sakura, Mecha, Ghost, Abyss, Neon Rain, Porcelain, Ink, Mochi, Ember, Lumen |

Dim is the dark accessibility palette. Lumen is its daylight counterpart. Both
keep low glare and soft contrast for light sensitivity.

## Wallpaper themes

Upload an image on the Themes page. The client downsamples it, clusters colors
in OKLCH, builds all 119 tokens, repairs contrast until the gates pass, registers
the palette, and shows the image behind the interface with a scrim derived from
the palette. The same image always produces the same theme id. Images and their
palettes live in IndexedDB, eight most recent.

## Build and verify

```sh
node make-themes.mjs
node check-contrast.mjs
node test-palette-core.mjs
node verify-engine.mjs
cd bundle
node build.mjs
cd ..
node smoke-client.mjs
```

`bundle/build.mjs` inlines `themes.data.json`, `palette-core.mjs` and
`pixel-theme.mjs` into `bundle/client.js`. Do not edit `client.js` by hand.

## Install

Installation is handled by the Harness plugin manager with
`C:/Users/jeffk/Development/dsh-plugins/h4x0r-themes/bundle` as the target.
Replacing an installed package needs a Harness restart before the new Client
module generation loads.

## Limits

- The Harness theme service persists only Light, Dark and System. The pack keeps
  its own selection in `localStorage` and reapplies it for four seconds after
  load. An Appearance pick after that window resets the pack choice.
- Wallpaper palettes and selections are per browser. No cross-device sync.
- The wallpaper backdrop depends on the app shell painting with theme tokens.
  Panels that hard-code a color stay opaque.
- Rendered pixels are verified by Jeff at the screen. This workspace has no
  browser automation.
