# Apple UI

![HTML5](https://img.shields.io/badge/HTML5-markup-e34f26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-vanilla-1572b6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-vanilla-f7df1e?logo=javascript&logoColor=black)
![Issues](https://img.shields.io/github/issues/TechTronixx/Apple-Website-Replica-Demo)
![Stars](https://img.shields.io/github/stars/TechTronixx/Apple-Website-Replica-Demo)
![Last commit](https://img.shields.io/github/last-commit/TechTronixx/Apple-Website-Replica-Demo)

A 1:1, pixel-perfect replica of the [apple.com](https://www.apple.com/) homepage landing page, built with plain HTML, CSS, and JavaScript — no frameworks, no build step, no dependencies. Every value (nav height, scrim blur, headline sizes, button radius, footer pipe separators, breakpoints) was extracted from Apple's production stylesheets, and the marketing imagery and SF Pro webfont load directly from `www.apple.com`. It renders as the real page, not an "Apple-ish" homage.

## Features

- **Translucent global nav with flyouts** — Apple logo, Store / Mac / iPad / iPhone / Watch / Vision / AirPods / TV & Home / Entertainment / Accessories / Support, plus search and bag icons, behind the signature `backdrop-filter: saturate(180%) blur(20px)` scrim. Hovering or focusing a product link opens a full-bleed `#fafafc` dropdown with Explore / Shop / More from columns.
- **Three full-width hero tiles** — Back to School 2026, iPhone, MacBook Air M5.
- **Six-tile promo grid** — iPad Air, MacBook Pro, Apple Watch Series 11, iPad Pro, Apple Trade In, Apple Card (MacBook Pro and iPad Pro on dark tiles).
- **Endless Entertainment carousel** — autoplaying 8-tile Apple TV+ gallery with 9-dot dotnav, play/pause, hover pause, and keyboard arrow controls, plus a 9-tile sub-row for Arcade / Fitness+ / Music.
- **Full Apple footer** — all directory columns with real links, footnotes, shop line, legal bar with pipe separators, and locale selector.
- **Responsive** — hamburger nav, single-column tile grid, carousel reflow, and stacked footer down to mobile (<=833px).
- **Accessible** — respects `prefers-reduced-motion` and `prefers-reduced-transparency`; keyboard-focusable nav and flyouts; semantic headings; autoplay disabled under reduced motion.

## Quick start

Open `index.html` in any modern browser. No server or build step required.

```sh
# macOS
open index.html
# Windows
start index.html
# Linux
xdg-open index.html
```

## Requirements

- A modern browser: Chrome, Safari, Firefox, or Edge.
- An internet connection — the fonts and images load from `www.apple.com`. For offline use, vendor the assets locally.

## Install (manual)

```sh
git clone https://github.com/TechTronixx/Apple-Website-Replica-Demo.git
cd Apple-Website-Replica-Demo
# then open index.html — see Quick start
```

## Project structure

```
Apple UI/
├── index.html          # Page structure + real content (nav, tiles, footer)
├── styles.css          # All styling — exact Apple values, responsive, a11y guards
├── script.js           # Mobile nav toggle, scroll scrim, scroll-reveal, carousel, reduced-motion
├── BUILD_CONTRACT.md   # Internal spec (source of truth for class names & values)
├── ADDENDUM.md         # Internal spec for nav flyouts + carousel
└── README.md           # This file
```

`BUILD_CONTRACT.md` and `ADDENDUM.md` are the internal specs that keep the three source files in sync — safe to ignore if you're just browsing, useful if you want to extend the page.

## Notes

- Tile assets and the SF Pro webfont are hotlinked from Apple and may rotate over time; if an image 404s, re-pull the current URLs from apple.com.
- Flyout dropdown product-card images in the Explore column are text-only cards. Apple serves the actual artwork from a protected API (`/api-www/global-elements/global-header/v1/flyouts`), so the structure, links, and typography are faithful but the images are omitted.
- The carousel uses Apple's real tile artwork and headlines; autoplay is disabled automatically under `prefers-reduced-motion`.

## Development

There is no test suite. To self-check a change, open `index.html` and verify:

- The translucent nav with hover/focus flyouts, three hero tiles, six-tile promo grid, carousel, and footer all render.
- Resize to <=833px: hamburger nav, single-column grid, carousel reflow, stacked footer.
- Toggle `prefers-reduced-motion`: autoplay stops, scroll-reveal stays visible.

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for the branch workflow and pre-submit checks, and [Issues](https://github.com/TechTronixx/Apple-Website-Replica-Demo/issues) to report bugs or request features.

## Disclaimer

This is an unofficial, educational front-end clone created for learning purposes. It is not affiliated with, endorsed by, or connected to Apple Inc. Apple, the Apple logo, iPhone, iPad, Mac, Apple Watch, and all related product names are trademarks of Apple Inc. All marketing imagery and the SF Pro typeface are served from Apple's servers and remain the property of Apple Inc. No ownership is claimed.
