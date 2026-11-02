# H4X0R Themes v2 plan: ten more palettes and wallpaper auto-theming

Draft plan from the 2026-10-28 session. Not implemented yet. Jeff decides the open
questions at the end before any code changes.

## Where v1 stands

- One installed bundle, `@local/h4x0r-themes` 1.0.0, linked from
  `Development/dsh-plugins/h4x0r-themes/bundle`.
- Six registered palettes, each covering all 119 override-eligible Harness theme
  tokens, with computed contrast in `contrast-report.txt`.
- One Themes row in Settings, General at order 11.5.
- Selection lives in `localStorage` and is reapplied for four seconds after
  load, because the Harness persists only light, dark and system.
- Shared generator `make-themes.mjs` and checker `check-contrast.mjs` already
  produce and gate palettes from compact recipes.

## Goal

1. Ten more curated palettes with a coherent identity, delivered without
   changing any existing palette.
2. A wallpaper ingestion path: upload an image, derive a full 119-token palette
   from it, apply it, and keep it across reloads.
3. Optional wallpaper display behind the app, gated on a feasibility check.

## Naming

Recommended shape: one plugin, three groups in one picker.

- `H4X0R` keeps the existing six hacker palettes unchanged.
- `MIRAGE` is the new ten-palette pack (anime-minimal moods, plus one light
  accessibility palette).
- `WALLPAPER` holds palettes generated from uploaded images, named from the
  image.

The bundle stays `@local/h4x0r-themes` and moves to version 2.0.0. A separate
plugin was considered and rejected: the two packs share the generator, the
contrast repair loop, and one settings page. Splitting them would duplicate that
code and give two places to keep in step.

## The ten MIRAGE palettes

All ten use the same role map and the same contrast gates as v1. Values below are
starting directions, not final hex, and the generator owns the final result.

| Id | Scheme | Concept | Base direction | Accent direction |
| --- | --- | --- | --- | --- |
| `sakura` | light | Blush and cream, deep plum ink | warm off-white with a pink cast | muted rose |
| `mecha` | dark | Gunmetal frame, hazard red, warning amber | cool graphite near-black | safety red |
| `ghost` | dark | Desaturated blue-gray, pale cyan signal | blue-black, low chroma | pale ice cyan |
| `abyss` | dark | Deep indigo water, bioluminescent aqua | near-black indigo | aqua teal |
| `neon-rain` | dark | Midnight teal street, coral signage | blue-teal black | warm coral |
| `porcelain` | light | Cool white glaze, cobalt detail | cool near-white | cobalt blue |
| `ink` | light | Stark paper, black ink, vermilion seal | neutral paper white | vermilion red |
| `mochi` | dark | Cocoa and mauve pastels | warm dark cocoa | dusty mauve |
| `ember` | dark | Dim amber lamplight for late reading | warm near-black | amber gold |
| `lumen` | light | Soft daylight, no glare whites, green accent | soft green-tinted white | leaf green |

Scheme balance is six dark and four light. `lumen` is the light counterpart to
`dim`: low glare and soft borders for daytime light sensitivity.

## Wallpaper auto-theming

### Pipeline

1. Accept an image by file picker or drag and drop. Accept JPEG, PNG, WebP, AVIF
   under 20 MB, reject anything else with a stated reason.
2. Decode into an offscreen canvas, downscale to 96 by 96, and drop transparent
   pixels.
3. Convert sRGB to OKLCH and cluster with k-means, k = 6, fixed seed for
   determinism. Weight by chroma so a small vivid region still becomes the
   accent.
4. Choose roles. Dark or light scheme follows the image's mean luminance unless
   the user forces one. Canvas is the largest low-chroma cluster nearest the
   scheme end. Accent is the highest-chroma cluster. Two supporting hues are
   taken from remaining clusters by largest hue distance.
5. Build the 119-token palette with the shared role map: surface ramp in OKLCH
   lightness steps, border ramp by alpha, label ramp by lightness, state hues
   fixed per scheme, menu and sidebar derived from the ramp.
6. Repair contrast, never loosen gates. Walk lightness in small steps until
   label-primary on base is at least 7:1, secondary at least 4.5:1, brand and
   state colors at least 3:1. Log each adjustment.
7. Register the result as `wall-<8 char hash of the image bytes>` with its
   scheme, apply it, and store the palette plus a thumbnail.
8. Comfort mode runs the same pipeline under the `dim` constraints: primary
   contrast between 4.5 and 12, chroma clamp, no pure white or black.

### Naming and storage

- Name is `Wallpaper · <hue name>`, for example `Wallpaper · Dusk Rose`, with
  the source file name in the card subtitle.
- Image bytes go to IndexedDB as re-encoded WebP at 1920 px wide, capped at
  1.5 MB per image. Palette JSON and the selected id go to `localStorage`.
- Keep the eight most recent wallpapers. Older ones are evicted with their
  palettes. A Clear action removes all of them.
- Same image bytes always produce the same palette id and the same colors.

### Failure and edge cases

- Near-monochrome images become a neutral palette with a small hue nudge from
  the mean hue, and the card says so.
- Very bright hero images that force a light scheme still pass light-scheme
  gates.
- A theme whose source image is missing still applies from the stored palette.

## Displaying the wallpaper (gated)

The open question is whether the app shell can show an image behind its panels.
Plan a bounded check before building it.

- Set surface tokens to translucent values and add a fixed background layer from
  the plugin, then look at the result.
- If the shell paints an opaque root, keep display out of scope and make the
  feature palette-only.
- No DOM scraping to find a layer to paint. Use a plugin-owned fixed element or
  a body background rule.

## Settings surface

Replace the single General row with a dedicated `settings.section` page, and keep
a short General row that jumps to it.

Page layout, top to bottom:

1. Pack switcher: H4X0R, MIRAGE, WALLPAPER.
2. Palette cards in the current pack, three to a row, each with the three-chip
   preview, name, tagline, and selection state.
3. Wallpaper panel: drop zone, thumbnail, Generate, Comfort mode toggle, saved
   wallpaper strip, Clear.
4. Reset to Light or Dark.

Wallpaper generation is a user-only action. No agent tool is exposed for it, so
the authority boundary stays clear.

## Work phases and acceptance

| Phase | Work | Acceptance |
| --- | --- | --- |
| 0 | Display feasibility check | A written yes or no with the evidence used, and Jeff looks at one probe |
| 1 | Extract `palette-core.mjs`, reuse it from `make-themes.mjs` and the client build | Existing six themes regenerate byte-identical, contrast report unchanged |
| 2 | Ten MIRAGE palettes | 119 of 119 tokens each, all gates pass, contrast report committed |
| 3 | Themes settings page with pack groups | Live slot inspection shows the page, all 16 cards render, switching works |
| 4 | Wallpaper upload, analysis, repair, apply, preview | Ten sample wallpapers produce valid palettes, ids are deterministic, gates pass |
| 5 | Wallpaper display, only if phase 0 says yes | Jeff accepts the look, panels stay readable at 100 percent and 125 percent zoom |
| 6 | Persistence, saved strip, Clear, docs, install 2.0.0 | Reload keeps the chosen palette, docs updated, board row updated |

## Risks

- No browser control in this session, so every visual check needs Jeff at the
  screen. That gates phases 0, 3 and 5 hardest.
- Wallhaven and similar sites host third-party images. Never bundle a wallpaper
  with the plugin. Only user uploads are stored, and only locally.
- Generated palettes must never bypass the contrast checker. An automatic
  repair loop that fails should refuse to create the theme, not apply a weak
  one.
- IndexedDB quota and image memory on very large uploads. Downscale before
  storing.
- Selection persistence remains per browser until a Host settings scope is
  added.

## Wallpaper sources to start from

Personal use only. Each site's terms keep the image with its owner. Do not ship
any of these files inside the plugin.

| Source | Use | Note |
| --- | --- | --- |
| [Wallhaven](https://wallhaven.cc/help/api) | API search, filters, and each result carries a `colors` array | Anime category, SFW filter, minimum resolution. All images remain property of their original owners |
| [Sweezy minimalist anime](https://sweezy-wallpapers.com/tags/minimalist-anime) | Curated 4K minimalist anime sets | Check the site terms before reuse |
| [backiee minimal anime](https://backiee.com/wallpaper/minimal-anime-cloudscape/367519) | Single-piece minimal anime art | Terms per uploader |
| [4kwallpapers minimal art](https://4kwallpapers.com/minimal-art?page=2) | Broader minimal art, some anime adjacent | Site terms apply |
| [Pixabay](https://pixabay.com/vectors/search/wallpaper%20hd%20anime/) | Anime-adjacent vectors with a permissive licence | Licence does not cover anime characters or studio art |

A first Wallhaven query for personal sourcing:

```
https://wallhaven.cc/api/v1/search?q=+minimal+anime&categories=010&purity=100&atleast=3840x2160&sorting=toplist&topRange=1M
```

Categories `010` selects anime only. Purity `100` keeps it SFW. The `colors`
field on each result can seed a palette before analysis.

### Starter picks for personal use, checked against the API on 2026-10-28

All are SFW anime, 16:9, at least 3840 by 2160. Colours are Wallhaven's own
five-colour signature, so use them as a hint, not as the final palette.

| Pick | Size | Signature | Suits |
| --- | --- | --- | --- |
| [3qwqld](https://wallhaven.cc/w/3qwqld) | 3840x2160 | black, blue-gray, red | mecha, ghost |
| [e88r8o](https://wallhaven.cc/w/e88r8o) | 3840x2160 | black, gray, red, yellow | mecha, ember |
| [rqez2j](https://wallhaven.cc/w/rqez2j) | 3840x2160 | blush pink, cream | sakura |
| [lyd7oy](https://wallhaven.cc/w/lyd7oy) | 3840x2160 | pink, red, black | sakura, neon-rain |
| [lyykvy](https://wallhaven.cc/w/lyykvy) | 6400x3600 | cyan, blue, white | porcelain, ghost |
| [pom729](https://wallhaven.cc/w/pom729) | 3840x2162 | deep blue, black | porcelain, abyss |
| [ogjlop](https://wallhaven.cc/w/ogjlop) | 3840x2160 | periwinkle, violet, cream | mochi, abyss |
| [jeerxp](https://wallhaven.cc/w/jeerxp) | 3840x2160 | gold, brown, gray | ember, ink |

The query that produced them, plus its looser sibling for more volume:

```
https://wallhaven.cc/api/v1/search?q=+minimal&categories=010&purity=100&atleast=3840x2160&ratios=16x9&sorting=toplist&topRange=1y
https://wallhaven.cc/api/v1/search?q=anime+minimal&categories=010&purity=100&atleast=2560x1440&ratios=16x9&sorting=toplist&topRange=3M
```

The API allows 45 calls per minute. Fetch a thumbnail before applying a
wallpaper so a bad crop is caught early.

## Open decisions for Jeff

1. Palette only first, or wallpaper visible behind the UI too?
2. MIRAGE as a group inside H4X0R Themes, or its own plugin and settings page?
3. Keep the ten concepts above, or swap some for a specific anime mood you want
   represented?

## Estimated effort

Four to six focused sessions. Phases 1 and 2 are low risk and mostly generator
work. Phase 4 carries the algorithm risk. Phases 0, 3 and 5 need Jeff at the
screen for acceptance, which is the real schedule constraint.
