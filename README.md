# Apple UI

A pixel-perfect, 1:1 replica of the [apple.com](https://www.apple.com/) homepage landing page, built with plain HTML, CSS, and JavaScript — no frameworks, no build step, no dependencies.

Every value in this project (nav height, scrim blur, headline font sizes, button radius, footer pipe separators, breakpoints) was extracted from Apple's production stylesheets, and all marketing imagery + the SF Pro webfont are loaded directly from `www.apple.com`. The result renders as the real page, not an "Apple-ish" homage.

## Features

- **Translucent global nav with flyouts** — Apple logo + Store / Mac / iPad / iPhone / Watch / Vision / AirPods / TV & Home / Entertainment / Accessories / Support + search and bag icons, with the signature `backdrop-filter: saturate(180%) blur(20px)` scrim. Hovering/focusing a product link opens a full-bleed `#fafafc` dropdown panel with "Explore / Shop / More from" columns.
- **Three full-width hero tiles** — Back to School 2026, iPhone, MacBook Air M5.
- **Six-tile promo grid** — iPad Air, MacBook Pro, Apple Watch Series 11, iPad Pro, Apple Trade In, Apple Card (MacBook Pro and iPad Pro on dark tiles).
- **Endless Entertainment carousel** — autoplaying 8-tile Apple TV+ gallery with 9-dot dotnav, play/pause, hover pause, and keyboard arrow controls; plus a 9-tile sub-row for Arcade / Fitness+ / Music.
- **Full Apple footer** — all five directory columns with real links, footnotes, shop line, legal bar with pipe separators, and locale selector.
- **Responsive** — hamburger nav, single-column tile grid, carousel reflow, and stacked footer down to mobile (≤833px).
- **Accessible** — respects `prefers-reduced-motion` and `prefers-reduced-transparency`; keyboard-focusable nav + flyouts; semantic headings; reduced-motion disables autoplay.

## Tech stack

- HTML5 (semantic, single file)
- Vanilla CSS (custom properties, no preprocessor, no `@import`)
- Vanilla JS (IIFE, no frameworks, no dependencies)
- Apple's SF Pro webfont (loaded via `<link>` from apple.com)

## How to run

Open `index.html` in any modern browser (Chrome, Safari, Firefox, Edge). No server or build step is required.

An internet connection is needed because the fonts and images load from `www.apple.com`. For offline use you'd need to vendor the assets locally.

## Project structure

```
Apple UI/
├── index.html          # Page structure + real content (nav, tiles, footer)
├── styles.css          # All styling — exact Apple values, responsive, a11y guards
├── script.js           # Mobile nav toggle, scroll scrim, scroll-reveal, reduced-motion
├── BUILD_CONTRACT.md   # Internal spec (source of truth for the class names & values)
└── README.md           # This file
```

`BUILD_CONTRACT.md` is the internal spec used to keep the three source files in sync — safe to ignore if you're just browsing, useful if you want to extend the page.

## How it was built

The exact CSS values (pixel sizes, line-heights, letter-spacing, colors, paddings, breakpoints) were mined from Apple's live stylesheets (`globalheader.css`, `home.built.css`, `main.built.css`, `home_39piecuw.built.css`, `ac-globalfooter.built.css`) and the real tile content/headlines/image URLs from the apple.com homepage HTML. `BUILD_CONTRACT.md` captures the full spec.

## Notes & limitations

- The flyout dropdown **product-card images** in the "Explore" column are text-only cards. Apple serves the actual product-card artwork from a protected API (`/api-www/global-elements/global-header/v1/flyouts`), so the structure, links, and typography are faithful but the images are omitted.
- Tile assets are hotlinked from Apple and may rotate over time; if an image 404s, re-pull the current URLs from apple.com.
- The carousel uses Apple's real tile artwork and headlines; autoplay is disabled automatically under `prefers-reduced-motion`.

## Disclaimer

This is an unofficial, educational front-end clone created for learning purposes. It is not affiliated with, endorsed by, or connected to Apple Inc. Apple, the Apple logo, iPhone, iPad, Mac, Apple Watch, and all related product names are trademarks of Apple Inc. All marketing imagery and the SF Pro typeface are served from Apple's servers and remain the property of Apple Inc. No ownership is claimed.
