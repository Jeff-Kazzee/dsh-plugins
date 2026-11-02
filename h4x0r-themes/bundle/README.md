# H4X0R Themes

A theme pack for the DeepSeek Harness Web GUI. It registers sixteen full palettes
in two packs and adds its own Themes page inside Settings. Uploading a wallpaper
builds a seventeenth palette from the image and puts that image behind the
interface.

## Packs

H4X0R, six hacker palettes:

- Phosphor: green CRT terminal, near-black base, phosphor green accent.
- Void: obsidian surfaces with an electric violet accent.
- Ice: cold cyan and steel for a cyberdeck feel.
- Redline: red-team charcoal with ember red and amber states.
- Bone: declassified blueprint parchment with ink text and a rust accent.
- Dim: low-luminance, low-saturation dark palette for light sensitivity.

MIRAGE, ten anime-minimal moods:

- Sakura: blush and cream with a plum ink tone.
- Mecha: gunmetal frame, hazard orange.
- Ghost: low-chroma blue-gray with a pale signal accent.
- Abyss: deep water and bioluminescent teal.
- Neon Rain: midnight street and coral signage.
- Porcelain: cool glaze and cobalt detail.
- Ink: paper, black ink, vermilion seal.
- Mochi: cocoa and mauve pastels.
- Ember: amber lamplight for late reading.
- Lumen: soft daylight, green accent, built for light sensitivity.

Every palette covers the same 119 theme tokens, so surfaces, borders, menus,
code blocks and states all change together.

## Wallpaper themes

- Drop a PNG, JPEG, WebP or AVIF image on the Themes page, up to 25 MB.
- The client downsamples the image, clusters its colors in OKLCH, picks a canvas
  and an accent, builds all 119 tokens, then repairs contrast until the gates
  pass. A palette that cannot pass is refused with a message.
- The same image always produces the same theme id.
- The image and its palette are stored in IndexedDB on this machine. The last
  eight wallpapers stay available on the page.
- Comfort mode regenerates the palette under the accessibility constraints used
  by Dim.
- While a wallpaper theme is active, the image sits behind the interface. The
  page derives a scrim from the palette so text keeps its contrast, and surface
  tokens become translucent.

## Files

- `package.json`: bundle manifest and `dsh` client metadata.
- `cordis.patch.yml`: inserts the `h4x0r-themes` row.
- `index.js`: Host half. It is inert. The Client module owns rendering.
- `client.template.js`: Client source with build markers.
- `client.js`: build output. Do not edit by hand.
- `build.mjs`: inlines the palette data, `../palette-core.mjs` and
  `../pixel-theme.mjs`, writes `client.js`, then runs `node --check`.
- `locale/en.json`: Plugin Manager title and description.
- `icon.svg`: plugin icon.

## Rebuild

```sh
cd bundle
node build.mjs
```

The palette data lives at `../themes.data.json`. Regenerate it with
`node make-themes.mjs` and verify it with `node check-contrast.mjs`. The engine
has its own tests at `../test-palette-core.mjs`.

## Limits

- The Harness theme service persists only Light, Dark and System, so the pack
  keeps its own selection in `localStorage` and reapplies it for four seconds
  after load. An Appearance pick after that window resets the pack choice.
- Wallpaper palettes are per browser. There is no cross-device sync.
- The wallpaper backdrop depends on the app shell painting with the theme
  tokens. Panels that hard-code a color stay opaque.
