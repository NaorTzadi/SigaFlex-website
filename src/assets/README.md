# Where assets go

Two folders, and the difference is not cosmetic.

## `src/assets/` — almost everything

```
src/assets/images/   screenshots, photographs, illustrations
src/assets/icons/    svg glyphs
src/assets/fonts/    self-hosted woff2
src/assets/video/    short clips that ship with the site
```

Anything a component or a stylesheet refers to belongs here. Import it:

```tsx
import treeView from "../../assets/images/tree-view.png";
<img src={treeView} alt="The tree view with a nested archive expanded" />
```

```css
.hero_media {
  background-image: url("../../assets/images/tree-view.png");
}
```

What that buys, and why it is the default:

- **The build fails if the file is missing.** A typo is caught at build time, not by a reader seeing a broken image.
- **The filename gets a content hash.** `tree-view.Bx7f2k.png` — so a browser can cache it forever, and a new version is picked up instantly instead of being served stale.
- **Small files are inlined** into the CSS or JS, saving a request.
- Unused files are left out of `dist/` entirely.

## `public/` — files that need an exact, permanent URL

```
public/favicon.ico
public/robots.txt
public/sitemap.xml
public/og-image.png        the preview image a link unfurls into
public/FileAnalyzer-Setup.exe
```

Copied to the site root untouched, referenced with a leading slash: `/favicon.ico`.
No hash, no processing, no check that it exists.

Use it only when something outside our code has to know the URL — a browser
convention, a crawler, a social-media scraper, a download link you have already
published. If you are unsure, it goes in `src/assets/`.

## Video

Short, decorative, ships with the site → `src/assets/video/`.

Anything long or heavy does not belong in the repository at all. A 40 MB demo
clip in git is a 40 MB clone for everyone, forever, and a static host will serve
it without range requests or adaptive quality. Put those on a video host or a
CDN and embed them — and that embed then needs a row in `OUTSIDE_ROUTES.md`.

## Fonts

Self-hosted `woff2` in `src/assets/fonts/`, declared with `@font-face` in
`theme.css` — the font is part of the theme, so it lives with the theme.

A font loaded from Google Fonts or any other host is a third party and a request
leaving our domain: it needs a row in `LICENSES_INDEX_MAP.md` **and** one in
`OUTSIDE_ROUTES.md`.

## Licensing

Every font, icon set, stock image or clip that we did not make ourselves needs a
row in `LICENSES_INDEX_MAP.md` saying where it is used and under what licence. Some
licences also require attribution visible on the site itself — check before
using, not after.
