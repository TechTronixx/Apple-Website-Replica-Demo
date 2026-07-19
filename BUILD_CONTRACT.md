# BUILD CONTRACT — Apple UI (pixel-perfect apple.com homepage replica)

This contract is the SINGLE source of truth shared by the three build agents (index.html, styles.css, script.js). All three files MUST use the exact class names, IDs, nesting, and values specified here so they interlock 1:1. Reuse Apple's REAL class names (below) so the CSS values map directly.

## Project location & files

All files live in: `G:\Projects & Development\Apple UI\`
- `index.html`  — structure + real content (nav, hero tiles, promo grid, footer)
- `styles.css`  — all styling, exact Apple values, responsive, reduced-motion
- `script.js`   — mobile nav toggle, nav scrim on scroll, scroll-reveal, reduced-motion guard
- `README.md`   — how to run (open index.html in a browser)
- `BUILD_CONTRACT.md` — this file

No build step. Open `index.html` directly.

## Source files available to read

- Real apple.com homepage HTML (for nav inline SVGs + footer content):
  `C:\Users\foxst\.local\share\opencode\tool-output\tool_f7bb77697001dkAqw0rd2cA0Fz`
  — Grep/Read this to copy the exact `<nav id="globalnav">` SVG markup and the `<footer id="ac-globalfooter">` directory columns + legal links verbatim. Do NOT invent SVGs or footer links; copy the real ones.

## Design tokens (define as CSS custom properties in styles.css :root)

Breakpoints (use exactly these):
- `--bp-large: 834px` (desktop ≥834)
- `--bp-tablet: 1068px` (≤1068)
- `--bp-small: 734px` (≤734)
- mobile = `max-width: 833px`

Colors:
- `--nav-bg-scrim: rgba(250, 250, 252, 0.8)`
- `--nav-bg-stuck: rgba(250, 250, 252, 0.92)`
- `--nav-bg-open:  rgb(250, 250, 252)`
- `--nav-blur: saturate(180%) blur(20px)`
- `--nav-link-color: rgba(0, 0, 0, 0.8)`
- `--nav-link-hover: #000000`
- `--tile-bg-light: #f5f5f7`
- `--tile-bg-dark: #000000`
- `--text-primary: rgb(29, 29, 31)`
- `--tile-copy-dark: #f5f5f7`      (text color on dark tiles)
- `--tile-callout-light: #6e6e73`
- `--tile-callout-dark: #86868b`
- `--link-blue: rgb(0, 102, 204)`
- `--btn-blue: rgb(0, 113, 227)`
- `--btn-blue-hover: #0076DF`
- `--btn-blue-active: #006EDB`
- `--footer-bg: rgb(245, 245, 247)`
- `--footer-text: rgba(0, 0, 0, 0.56)`
- `--footer-link: rgba(0, 0, 0, 0.72)`
- `--footer-title: rgba(0, 0, 0, 0.88)`
- `--footer-pipe: rgba(0, 0, 0, 0.48)`
- `--footer-border: rgba(0, 0, 0, 0.16)`

Heights:
- `--globalnav-height: 44px` (desktop) → `48px` at max-width:833px
- `--hero-content-height: 580px` → `570px` ≤1068 → `500px` ≤734 → `692px` at (min-width:1069px and min-height:776px)
- `--promo-content-height: 580px` → `490px` ≤1068 → `500px` ≤734

Fonts:
- Display: `"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif`
- Text: `"SF Pro Text", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif`
- Load Apple's real webfont in <head>: `<link rel="stylesheet" href="https://www.apple.com/wss/fonts?families=SF+Pro,v3|SF+Pro+Icons,v3">` so SF Pro renders on non-Apple devices too.
- Body base: `font-size: 17px; line-height: 1.4705882353; font-weight: 400; letter-spacing: -0.022em; font-family: SF Pro Text...; color: rgb(29,29,31); background: #fff;` (html font-size 106.25% so 17px resolves).

## <head> requirements (index.html)
- `<!DOCTYPE html>`, `<html lang="en-US" dir="ltr" class="no-js">`
- `<meta charset="utf-8">`, `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`
- `<title>Apple</title>`
- `<meta name="description" content="Discover the innovative world of Apple and shop everything iPhone, iPad, Apple Watch, Mac, and Apple TV, plus explore accessories, entertainment, and expert device support.">`
- Apple webfont <link> (above)
- `<link rel="stylesheet" href="styles.css">`
- `<script src="script.js" defer></script>`
- Remove `no-js` class on load (script.js does `document.documentElement.classList.remove('no-js')`).

## BODY element
`<body class="ac-nav-overlap globalnav-scrim globalheader-light">`  — these classes drive the scrim/light theme.

## NAV — `<nav id="globalnav" class="globalnav" lang="en-US" aria-label="Global">`

Structure (EXACT class names):
```
<nav id="globalnav" class="globalnav" lang="en-US" aria-label="Global">
  <div class="globalnav-content">
    <ul id="globalnav-list" class="globalnav-list">
      <li class="globalnav-item globalnav-item-apple"><a href="/" class="globalnav-link globalnav-link-apple" aria-label="Apple">[APPLE LOGO SVG] <span class="globalnav-link-text">Apple</span></a></li>
      <li class="globalnav-item"><a href="/us/shop/goto/store" class="globalnav-link" ...>Store</a></li>
      <li class="globalnav-item"><a href="/mac/" class="globalnav-link" ...>Mac</a></li>
      <li class="globalnav-item"><a href="/ipad/" class="globalnav-link" ...>iPad</a></li>
      <li class="globalnav-item"><a href="/iphone/" class="globalnav-link" ...>iPhone</a></li>
      <li class="globalnav-item"><a href="/watch/" class="globalnav-link" ...>Watch</a></li>
      <li class="globalnav-item"><a href="/apple-vision-pro/" class="globalnav-link" ...>Vision</a></li>
      <li class="globalnav-item"><a href="/airpods/" class="globalnav-link" ...>AirPods</a></li>
      <li class="globalnav-item"><a href="/tv-home/" class="globalnav-link" ...>TV &amp; Home</a></li>
      <li class="globalnav-item"><a href="/entertainment/" class="globalnav-link" ...>Entertainment</a></li>
      <li class="globalnav-item"><a href="/us/shop/goto/buy_accessories" class="globalnav-link" ...>Accessories</a></li>
      <li class="globalnav-item"><a href="https://support.apple.com/" class="globalnav-link" ...>Support</a></li>
      <li class="globalnav-item globalnav-item-menu">  <!-- mobile hamburger, hidden on desktop -->
        <button id="globalnav-menutrigger" class="globalnav-link globalnav-menutrigger" aria-label="Menu" aria-expanded="false" aria-controls="globalnav-list">[hamburger/chevron SVG]</button>
      </li>
      <li class="globalnav-item"><a href="/us/search" class="globalnav-link" aria-label="Search apple.com" id="globalnav-menubutton-link-search">[SEARCH SVG]</a></li>
      <li class="globalnav-item"><a href="/us/shop/goto/bag" class="globalnav-link globalnav-link-bag" aria-label="Shopping Bag">[BAG SVG]</a></li>
    </ul>
  </div>
</nav>
```
**IMPORTANT:** Copy the EXACT inline SVGs for: Apple logo, Store, Mac, iPad, iPhone, Watch, Vision, AirPods, TV & Home, Entertainment, Accessories, Support, Search, Bag — from the saved apple HTML file (search for `globalnav-link-apple`, `globalnav-link-store`, etc., and copy each `<svg ...>...</svg>` verbatim, including the `globalnav-image-regular` / `globalnav-image-compact` wrapper spans where present). The product text links (Store/Mac/iPad/.../Support) are TEXT labels wrapped in `<span class="globalnav-link-text">Label</span>` — but the real HTML actually renders each as an SVG icon + text inside a submenu trigger. For the homepage TOP ROW, the real markup shows the product links as TEXT (`.globalnav-link-text`) — the SVG icons appear in the flyout submenus. So for the top row, render Store/Mac/iPad/iPhone/Watch/Vision/AirPods/TV&Home/Entertainment/Accessories/Support as TEXT links (`<span class="globalnav-link-text">Mac</span>` etc., no icon). Render Apple-logo, Search, and Bag as SVG icons (copy those 3 SVGs from the saved HTML). Add a hamburger button for mobile (use the `.globalnav-menuback-button` chevron SVG from the saved HTML, or a simple 2-line hamburger SVG).

### Nav CSS (styles.css — exact values)
```
#globalnav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 9999;
  height: 44px; width: 100%; min-width: 320px;
  font-size: 17px;
  background: var(--nav-bg-scrim);
  -webkit-backdrop-filter: var(--nav-blur); backdrop-filter: var(--nav-blur);
}
@media (max-width: 833px){ #globalnav{ height: 48px; } }

#globalnav .globalnav-content {
  margin: 0 auto; max-width: 1024px; box-sizing: border-box; width: 100%;
  padding-inline-start: max(22px, env(safe-area-inset-left));
  padding-inline-end: max(22px, env(safe-area-inset-right));
}
@media (max-width: 833px){ #globalnav .globalnav-content{ padding-inline-start: max(16px, env(safe-area-inset-left)); padding-inline-end: max(16px, env(safe-area-inset-right)); } }

#globalnav .globalnav-list {
  margin: 0 -8px; height: 44px; display: flex; justify-content: space-between;
  align-items: center; list-style: none; padding: 0;
}
@media (max-width: 833px){ #globalnav .globalnav-list{ height: 48px; } }

#globalnav .globalnav-item { height: 44px; box-sizing: border-box; }
@media (max-width: 833px){ #globalnav .globalnav-item{ height: 48px; } }

#globalnav .globalnav-link {
  font-size: 12px; line-height: 1; font-weight: 400; letter-spacing: -0.01em;
  font-family: "SF Pro Text", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: var(--nav-link-color); text-decoration: none; white-space: nowrap;
  display: flex; align-items: center; justify-content: center;
  padding: 0 8px; height: 44px; position: relative; z-index: 1;
  transition: color 0.32s cubic-bezier(0.4, 0, 0.6, 1);
}
@media (max-width: 833px){ #globalnav .globalnav-link{ height: 48px; } }
#globalnav .globalnav-link:hover, #globalnav .globalnav-link:focus-visible { color: var(--nav-link-hover); outline: none; }
#globalnav .globalnav-link:focus-visible { outline: 2px solid #0071e3; outline-offset: -7px; }

#globalnav .globalnav-link-text { display: flex; align-items: center; height: 100%; pointer-events: none; }

#globalnav .globalnav-link-apple { display: flex; align-items: center; }
#globalnav .globalnav-link-apple svg { height: 100%; } /* logo SVG scales to 44px tall */
#globalnav .globalnav-link-apple .globalnav-link-text { display: none; } /* hide "Apple" text on desktop, logo only */

#globalnav .globalnav-link-bag svg, #globalnav .globalnav-link[aria-label="Search apple.com"] svg { height: 100%; }

/* Mobile: collapse product links into a tray, show hamburger */
#globalnav .globalnav-menutrigger { display: none; }
@media (max-width: 833px){
  #globalnav .globalnav-menutrigger { display: flex; width: 48px; }
  /* hide all product text links + apple text; keep apple logo, hamburger, search, bag visible as icons */
  #globalnav .globalnav-item:not(.globalnav-item-apple):not(.globalnav-item-menu) .globalnav-link-text { display: none; }
  /* when menu open (body.nav-open), reveal the tray */
}
```
**Mobile nav tray (script.js toggles `body.nav-open`):** When open at ≤833px, show a full-bleed panel below the bar (bg `var(--nav-bg-open)`), listing Store/Mac/iPad/iPhone/Watch/Vision/AirPods/TV&Home/Entertainment/Accessories/Support as large links: `font-size: 28px; line-height: 1.1428571429; font-weight: 600; letter-spacing: 0.007em; font-family: "SF Pro Display",...; color: #333336;` each on its own row, padding ~7.5px 0. See script.js spec.

### Nav scrim-on-scroll (script.js)
On scroll past ~8px, the nav already has the scrim bg (it's set by default via `globalnav-scrim` on body). Optionally intensify: add class `nav-stuck` → `--nav-bg-stuck` (0.92). Keep it subtle.

## MAIN — `<main class="main">` (padding-top = nav height so content starts below fixed nav)

```
main { max-width: 2560px; margin-inline: auto; padding-top: var(--globalnav-height); }
```

### Section wrapper (shared)
```
.section { display: grid; grid-template-columns: 1fr; gap: 12px; text-align: center; margin-bottom: 12px; }
```

### HERO section — `<section class="section section-hero">` — 3 FULL-WIDTH tiles stacked

Tile structure (EXACT classes). Use a `.tile-link` absolute overlay ONLY when the whole tile is a single link; otherwise CTAs carry the links. Apple uses CTAs as links, so OMIT `.tile-link` and put links on the buttons.

```
<div class="tile-wrapper" data-tile-id="bts-2026">
  <div class="tile-content">
    <div class="tile-copy-wrapper">
      <h2 class="tile-headline">College, sorted.</h2>
      <p class="tile-subhead">Get a gift card from $100 to $150* when you buy Mac or iPad with education savings.</p>
      <div class="tile-ctas">
        <a class="button" href="https://www.apple.com/us/shop/goto/edu_store">Shop</a>
      </div>
    </div>
  </div>
  <div class="tile-image-wrapper">
    <picture><img src="https://www.apple.com/v/home/images/back-to-school-2026/a/hero_back_to_school_2026__cz07tzsg14sy_largetall_2x.jpg" alt="Back to School 2026"></picture>
  </div>
</div>
```

Hero tile 2 — data-tile-id="iphone-family":
- headline: "iPhone"
- subhead: "Meet the latest iPhone lineup."
- CTAs: `<a class="button" href="https://www.apple.com/iphone/">Learn more</a>` + `<a class="button button-secondary" href="https://www.apple.com/us/shop/goto/buy_iphone">Shop iPhone</a>`
- image: `https://www.apple.com/v/home/images/iphone-family/a/hero_iphone_family__be5jkzxszb1e_largetall_2x.jpg`

Hero tile 3 — data-tile-id="macbook-air-m5":
- headline: "MacBook Air"
- subhead: "Now supercharged by M5."
- CTAs: `<a class="button" href="https://www.apple.com/macbook-air/">Learn more</a>` + `<a class="button button-secondary" href="https://www.apple.com/us/shop/goto/buy_mac/macbook_air">Buy</a>`
- image: `https://www.apple.com/v/home/images/macbook-air-m5/a/hero_macbook_air_m5__eb1idggd120y_largetall_2x.jpg`

### PROMO section — `<section class="section section-promo">` — 6 HALF-WIDTH tiles (2-col grid → 1-col mobile)

Same tile structure. Tiles with logo headlines use an `<img class="logo-image">` inside the headline (and a `.visuallyhidden` text span for a11y). DARK tiles add class `theme-dark` to `.tile-wrapper`.

Promo tile 1 — data-tile-id="ipad-air-m4" (LIGHT, logo headline):
- headline: `<h3 class="tile-headline"><span class="visuallyhidden">iPad Air</span><img class="logo-image" src="https://www.apple.com/v/home/images/logos/ipad-air-m4/a/promo_logo_ipad_air__dqdj4ni03quu_large.png" alt=""></h3>`
- subhead: "Now supercharged by M4."
- CTAs: `<a class="button" href="https://www.apple.com/ipad-air/">Learn more</a>` + `<a class="button button-secondary" href="https://www.apple.com/us/shop/goto/buy_ipad/ipad_air">Buy</a>`
- image: `https://www.apple.com/v/home/images/ipad-air-m4/a/promo_ipad_air_m4__bgcv7t286k8y_large_2x.jpg`

Promo tile 2 — data-tile-id="macbook-pro" (DARK, text headline):
- headline: `<h3 class="tile-headline">MacBook Pro</h3>`
- subhead: "Now with M5, M5 Pro, and M5 Max."
- CTAs: "Learn more" → /macbook-pro/ , "Buy" → /us/shop/goto/buy_mac/macbook_pro
- image: `https://www.apple.com/v/home/images/macbook-pro/a/promo_macbook_pro__c9td9w1mc8ia_large_2x.jpg`
- `<div class="tile-wrapper theme-dark" data-tile-id="macbook-pro">`

Promo tile 3 — data-tile-id="apple-watch-series-11" (LIGHT, logo headline):
- logo: `https://www.apple.com/v/home/images/logos/apple-watch-series-11/a/promo_logo_apple_watch_series_11__5r9c4l119tuy_large.png` (visuallyhidden: "Apple Watch Series 11")
- subhead: "The ultimate way to watch your health."
- CTAs: "Learn more" → /apple-watch-series-11/ , "Buy" → /us/shop/goto/buy_watch/apple_watch_series_11
- image: `https://www.apple.com/v/home/images/apple-watch-series-11/a/promo_apple_watch_series_11__gnlwqxe1jlu2_large_2x.jpg`

Promo tile 4 — data-tile-id="ipad-pro" (DARK, text headline):
- headline: "iPad Pro"
- subhead: "Advanced AI performance and game-changing capabilities."
- CTAs: "Learn more" → /ipad-pro/ , "Buy" → /us/shop/goto/ipad_pro/select
- image: `https://www.apple.com/v/home/images/ipad-pro/a/promo_ipad_pro__emtduc920o02_large_2x.jpg`
- `<div class="tile-wrapper theme-dark" data-tile-id="ipad-pro">`

Promo tile 5 — data-tile-id="iphone-tradein" (LIGHT, logo headline):
- logo: `https://www.apple.com/v/home/images/logos/iphone-tradein/a/promo_logo_iphone_tradein__bb7assu7ubo2_large.png` (visuallyhidden: "Apple Trade In")
- subhead: "Get up to $195–$695 in credit when you trade in iPhone 13 or higher.¹"  (render ¹ as `<sup>1</sup>`)
- CTAs: single `<a class="button" href="https://www.apple.com/us/shop/goto/trade_in">Get your estimate</a>`
- image: `https://www.apple.com/v/home/images/iphone-tradein/a/promo_iphone_tradein__e4hrjxmgmf0i_large_2x.jpg`

Promo tile 6 — data-tile-id="apple-card" (LIGHT, logo headline):
- logo: `https://www.apple.com/v/home/images/logos/apple-card/a/promo_logo_apple_card__28vxrcexz0ia_large.png` (visuallyhidden: "Apple Card")
- subhead: "Get up to 3% Daily Cash back with every purchase."
- CTAs: "Learn more" → /apple-card/ , "Apply now" → https://card.apple.com/apply/application
- image: `https://www.apple.com/v/home/images/apple-card/a/promo_apple_card__d8xz4kd4evwy_large_2x.jpg`

### Tile CSS (styles.css — exact values)
```
.tile-wrapper {
  display: flex; justify-content: center; position: relative; width: 100%;
  min-height: var(--hero-content-height); box-sizing: border-box;
  background-color: var(--tile-bg-light); overflow: clip;
  padding: 48px 0 56px;
}
@media (max-width: 1068px){ .tile-wrapper{ padding: 54px 0 61px; } }
@media (max-width: 734px){ .tile-wrapper{ padding: 39px 0 43px; } }
@media (min-width: 1069px) and (min-height: 776px){ .tile-wrapper{ padding: 56px 0 63px; } }

.tile-wrapper.theme-dark { background-color: var(--tile-bg-dark); color: var(--tile-copy-dark); }
.tile-wrapper.theme-dark .tile-callout { color: var(--tile-callout-dark); }

.tile-content { display: flex; flex-direction: column; position: relative; align-items: center; z-index: 2; }
.tile-copy-wrapper { position: relative; pointer-events: none; z-index: 2; }
.tile-copy-wrapper .button { pointer-events: auto; }   /* CTAs clickable */

.tile-headline { margin: 0 auto; color: var(--text-primary); }
.tile-wrapper.theme-dark .tile-headline { color: var(--tile-copy-dark); }

/* HERO (full-width) typography */
.section-hero .tile-headline {
  font-size: 56px; line-height: 1.0714285714; font-weight: 600; letter-spacing: -0.005em;
  font-family: "SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif;
}
@media (max-width: 1068px){
  .section-hero .tile-headline { font-size: 48px; line-height: 1.0834933333; letter-spacing: -0.002em; }
}
@media (max-width: 734px){
  .section-hero .tile-headline { font-size: 32px; line-height: 1.125; letter-spacing: 0.002em; }
}
.section-hero .tile-subhead {
  font-size: 28px; line-height: 1.1428571429; font-weight: 400; letter-spacing: 0.007em;
  font-family: "SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif;
  margin-top: 6px;
}
@media (max-width: 1068px){
  .section-hero .tile-subhead { font-size: 24px; line-height: 1.1666666667; letter-spacing: 0.009em; margin-top: 4px; }
}
@media (max-width: 734px){
  .section-hero .tile-subhead { font-size: 19px; line-height: 1.2105263158; letter-spacing: 0.012em; }
}

/* PROMO (half-width) typography */
.section-promo { box-sizing: border-box; padding-left: max(12px, env(safe-area-inset-left)); padding-right: max(12px, env(safe-area-inset-right)); }
.section-promo.section { grid-template-columns: 1fr 1fr; }
@media (max-width: 734px){ .section-promo.section { grid-template-columns: 1fr; } }
.section-promo .tile-wrapper { min-height: var(--promo-content-height); }
@media (min-width: 1069px){ .section-promo .tile-wrapper { padding: 53px 0 60px; } }
@media (min-width: 735px) and (max-width: 1068px){ .section-promo .tile-wrapper { padding: 44px 0 48px; } }

.section-promo .tile-headline {
  font-size: 40px; line-height: 1.1; font-weight: 600; letter-spacing: 0em;
  font-family: "SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif;
}
@media (max-width: 1068px){
  .section-promo .tile-headline { font-size: 32px; line-height: 1.125; letter-spacing: 0.002em; }
}
.section-promo .tile-subhead {
  font-size: 21px; line-height: 1.1904761905; font-weight: 400; letter-spacing: 0.011em;
  font-family: "SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif;
  margin-top: 4px;
}
@media (max-width: 1068px){
  .section-promo .tile-subhead { font-size: 19px; line-height: 1.2105263158; letter-spacing: 0.012em; margin-top: 4px; }
}
.section-promo .tile-callout {
  font-size: 14px; line-height: 1.2857742857; font-weight: 400; letter-spacing: -0.016em;
  font-family: "SF Pro Text", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: var(--tile-callout-light); margin-top: 8px;
}

/* logo-image headline (image as headline) */
.logo-image { margin-top: 4px; margin-bottom: -5px; position: relative; }
.logo-image + .tile-subhead { margin-top: 0; }
.section-promo [data-tile-id="ipad-air-m4"] .tile-headline,
.section-promo [data-tile-id="apple-watch-series-11"] .tile-headline,
.section-promo [data-tile-id="iphone-tradein"] .tile-headline,
.section-promo [data-tile-id="apple-card"] .tile-headline { height: 49px; }
@media (max-width: 1068px){ .section-promo [data-tile-id="ipad-air-m4"] .tile-headline, /* ...same 4... */ { height: 41px; } }

/* CTA row */
.tile-ctas { display: grid; justify-content: center; column-gap: 17px; margin-top: 17px; z-index: 3; grid-template-columns: min-content; }
.tile-ctas:has(:nth-child(2)) { grid-template-columns: min-content min-content; }
@media (max-width: 1068px){ .tile-ctas { margin-top: 16px; } }
@media (max-width: 734px){ .tile-ctas { column-gap: 14px; margin-top: 11px; } }
.section-promo .tile-ctas { column-gap: 14px; margin-top: 12px; }

/* Buttons */
.button {
  --sk-button-color: #fff; --sk-button-border-color: transparent; --sk-button-border-radius: 980px;
  --sk-button-padding-horizontal: 16px; --sk-button-padding-vertical: 9px; --sk-button-border-width: 1px;
  --sk-button-min-width-basis: 60px; --sk-button-box-sizing: content-box; --sk-button-width: auto; --sk-button-display: inline-block;
  font-size: 14px; line-height: 1.2857742857; font-weight: 400; letter-spacing: -0.016em;
  font-family: "SF Pro Text", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif;
  background: var(--btn-blue); color: var(--sk-button-color); border: 1px solid var(--sk-button-border-color);
  padding-block: calc(var(--sk-button-padding-vertical) - var(--sk-button-border-width));
  padding-inline: calc(var(--sk-button-padding-horizontal) - var(--sk-button-border-width));
  border-radius: var(--sk-button-border-radius); cursor: pointer; text-decoration: none; white-space: nowrap;
  display: inline-block; box-sizing: content-box; text-align: center;
  transition: background 0.2s ease;
}
.button:hover { background: var(--btn-blue-hover); }
.button:active { background: var(--btn-blue-active); }
.button-secondary {
  --sk-button-background: transparent; background: transparent;
  --sk-button-color: var(--link-blue); color: var(--link-blue);
  --sk-button-border-color: var(--link-blue); border-color: var(--link-blue);
}
.button-secondary:hover { background: var(--btn-blue-hover); color: #fff; border-color: var(--btn-blue-hover); }
.button:focus-visible { outline: 2px solid #0071e3; outline-offset: 3px; }

/* Hero buttons = elevated sizing (17px) */
@media (min-width: 735px){
  .section-hero .button {
    --sk-button-padding-horizontal: 22px; --sk-button-padding-vertical: 12px; --sk-button-min-width-basis: 70px;
    font-size: 17px; line-height: 1.1764805882; letter-spacing: -0.022em;
  }
}

/* Tile image */
.tile-image-wrapper { position: absolute; bottom: 0; left: 0; width: 100%; height: var(--hero-content-height); z-index: 1; }
.section-promo .tile-image-wrapper { height: var(--promo-content-height); }
.tile-image-wrapper picture { display: block; width: 100%; height: 100%; }
.tile-image-wrapper img { position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: auto; height: 100%; max-width: none; }
/* On small screens, switch to width:100% so image scales */
@media (max-width: 734px){
  .tile-image-wrapper img { width: 100%; height: auto; max-width: 100%; }
}

/* BTS tile subhead max-width */
.section-hero [data-tile-id="bts-2026"] .tile-subhead { max-width: 570px; }
@media (max-width: 1068px){ .section-hero [data-tile-id="bts-2026"] .tile-subhead { max-width: 490px; } }
@media (max-width: 734px){ .section-hero [data-tile-id="bts-2026"] .tile-subhead { max-width: 320px; } }

/* visuallyhidden */
.visuallyhidden { position: absolute; clip: rect(0 0 0 0); width: 1px; height: 1px; overflow: hidden; margin: -1px; padding: 0; border: 0; }
```

## FOOTER — `<footer id="ac-globalfooter" lang="en-US">`

**Content:** Extract the REAL footer from the saved apple HTML file — Grep for `ac-globalfooter` and copy the directory columns (4 columns: "Shop and Learn", "Apple Wallet", "Account", "Entertainment", "Apple Store", "For Business", "For Education", "For Healthcare", "Apple Values", "About Apple" — note Apple groups these across 4 `.ac-gf-directory-column` elements with multiple `.ac-gf-directory-column-section` each), the `.ac-gf-sosumi` footnotes, the `.ac-gf-footer-shop` line ("More ways to shop: Find an Apple Store or other retailer near you."), the `.ac-gf-footer-legal` copyright + legal links (Privacy Policy, Terms of Use, Sales and Refunds, Legal, Site Map), and the `.ac-gf-footer-locale` "United States" link. Copy link hrefs and text verbatim. Do NOT fabricate links.

Structure (EXACT classes):
```
<footer id="ac-globalfooter" lang="en-US">
  <div class="ac-gf-content">
    <section class="ac-gf-sosumi">[footnotes <p>...]</section>
    <section class="ac-gf-directory">
      <div class="ac-gf-directory-column">
        <div class="ac-gf-directory-column-section">
          <h3 class="ac-gf-directory-column-section-title"><span class="ac-gf-directory-column-section-title-text">Shop and Learn</span></h3>
          <ul class="ac-gf-directory-column-section-list">
            <li class="ac-gf-directory-column-section-item"><a class="ac-gf-directory-column-section-link" href="...">Store</a></li>
            ... Mac, iPad, iPhone, Watch, Vision, AirPods, TV & Home, AirTag, Accessories, Gift Cards ...
          </ul>
        </div>
        <div class="ac-gf-directory-column-section"> ... Apple Wallet ... </div>
      </div>
      <div class="ac-gf-directory-column"> ... Account ... Entertainment ... </div>
      <div class="ac-gf-directory-column"> ... Apple Store ... </div>
      <div class="ac-gf-directory-column"> ... For Business / Education / Healthcare / Government ... Apple Values ... About Apple ... </div>
    </section>
    <section class="ac-gf-footer">
      <div class="ac-gf-footer-shop">More ways to shop: <a href="/retail/">Find an Apple Store</a> or <a href="...">other retailer</a> near you. Or call 1-800-MY-APPLE.</div>
      <div class="ac-gf-footer-legal">
        <p class="ac-gf-footer-legal-copyright">Copyright &copy; 2026 Apple Inc. All rights reserved.</p>
        <ul class="ac-gf-footer-legal-links">
          <li class="ac-gf-footer-legal-links-item"><a class="ac-gf-footer-legal-link" href="...">Privacy Policy</a></li>
          <li class="ac-gf-footer-legal-links-item"><a class="ac-gf-footer-legal-link" href="...">Terms of Use</a></li>
          <li class="ac-gf-footer-legal-links-item"><a class="ac-gf-footer-legal-link" href="...">Sales and Refunds</a></li>
          <li class="ac-gf-footer-legal-links-item"><a class="ac-gf-footer-legal-link" href="...">Legal</a></li>
          <li class="ac-gf-footer-legal-links-item"><a class="ac-gf-footer-legal-link" href="...">Site Map</a></li>
        </ul>
        <div class="ac-gf-footer-locale"><a class="ac-gf-footer-locale-link" href="https://www.apple.com/choose-country-region/">United States</a></div>
      </div>
    </section>
  </div>
</footer>
```

### Footer CSS (styles.css — exact values)
```
#ac-globalfooter {
  background: var(--footer-bg); color: var(--footer-text);
  font-size: 12px; line-height: 1.3333733333; font-weight: 400; letter-spacing: -0.01em;
  font-family: "SF Pro Text", "Myriad Set Pro", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif;
  min-width: 320px; overflow: hidden;
}
@media (min-width: 834px){ #ac-globalfooter { min-width: 1024px; } }
#ac-globalfooter .ac-gf-content { margin: 0 auto; max-width: 980px; padding: 0 22px; box-sizing: border-box; }
@media (max-width: 833px){ #ac-globalfooter .ac-gf-content { padding: 0 16px; } }
#ac-globalfooter a { color: var(--footer-link); text-decoration: none; }
#ac-globalfooter a:hover { text-decoration: underline; }

#ac-globalfooter .ac-gf-sosumi { border-bottom: 1px solid var(--footer-border); padding: 17px 0 11px; }
#ac-globalfooter .ac-gf-sosumi p { margin: 0 0 0.8em; }
#ac-globalfooter .ac-gf-sosumi p:last-child { margin-bottom: 0; }
#ac-globalfooter .ac-gf-sosumi a { text-decoration: underline; }

#ac-globalfooter .ac-gf-directory { display: flex; flex-wrap: nowrap; padding-top: 20px; }
#ac-globalfooter .ac-gf-directory-column { flex-basis: 25%; }
#ac-globalfooter .ac-gf-directory-column-section ~ .ac-gf-directory-column-section { padding-top: 24px; }
@media (max-width: 833px){ #ac-globalfooter .ac-gf-directory { flex-direction: column; } #ac-globalfooter .ac-gf-directory-column { flex-basis: auto; } }

#ac-globalfooter .ac-gf-directory-column-section-title-text {
  font-size: 12px; line-height: 1.3333733333; font-weight: 600; letter-spacing: -0.01em;
  color: var(--footer-title); margin-bottom: 0.8em; margin-inline-end: 20px; display: block;
}
#ac-globalfooter .ac-gf-directory-column-section-list { list-style: none; padding: 0; margin-inline-end: 20px; }
#ac-globalfooter .ac-gf-directory-column-section-item { display: block; margin-bottom: 0.8em; }
#ac-globalfooter .ac-gf-directory-column-section-item:last-child { margin-bottom: 0; }
#ac-globalfooter .ac-gf-directory-column-section-link { color: var(--footer-link); }

#ac-globalfooter .ac-gf-directory + .ac-gf-footer { border-top: 1px solid var(--footer-border); padding: 17px 0 11px; }
#ac-globalfooter .ac-gf-footer-shop { padding-bottom: 19px; margin-bottom: 16px; border-bottom: 1px solid var(--footer-border); }
@media (max-width: 833px){ #ac-globalfooter .ac-gf-footer-shop { border-bottom: none; margin-bottom: 8px; padding-bottom: 8px; } }
#ac-globalfooter .ac-gf-footer-shop a { color: var(--link-blue); text-decoration: underline; }

#ac-globalfooter .ac-gf-footer-legal { position: relative; }
#ac-globalfooter .ac-gf-footer-legal::after { content: ""; display: table; clear: both; } /* clearfix */
#ac-globalfooter .ac-gf-footer-legal-copyright, #ac-globalfooter .ac-gf-footer-legal-links { list-style: none; margin: 0; }
#ac-globalfooter .ac-gf-footer-legal-copyright { margin-top: 5px; margin-inline-end: 30px; }
#ac-globalfooter .ac-gf-footer-legal-links { margin-top: 5px; }
@media (min-width: 834px){
  #ac-globalfooter .ac-gf-footer-legal-copyright { float: left; }
  #ac-globalfooter .ac-gf-footer-legal-links { float: left; }
}
#ac-globalfooter .ac-gf-footer-legal-links-item { position: relative; margin-inline-end: 6px; display: inline-block; margin-top: 5px; }
#ac-globalfooter .ac-gf-footer-legal-links-item::after { content: ""; position: absolute; height: 10px; width: 1px; background: var(--footer-pipe); margin: 3px 0; }
#ac-globalfooter .ac-gf-footer-legal-links-item:last-child::after { display: none; }
#ac-globalfooter .ac-gf-footer-legal-link { padding: 0 9px; margin-inline-start: -9px; display: inline-block; white-space: nowrap; }

#ac-globalfooter .ac-gf-footer-end { display: flex; justify-content: space-between; align-items: center; }
#ac-globalfooter .ac-gf-footer-locale { margin-top: 5px; white-space: nowrap; }
@media (min-width: 834px){ #ac-globalfooter .ac-gf-footer-locale { margin-inline-start: auto; } }
@media (max-width: 833px){ #ac-globalfooter .ac-gf-footer-end { display: block; } }
#ac-globalfooter .ac-gf-footer-locale-link { position: relative; margin-inline-start: 14px; display: inline-block; }
#ac-globalfooter .ac-gf-footer-locale-link::before { content: ""; position: absolute; height: 10px; width: 1px; background: var(--footer-pipe); margin-top: 3px; margin-inline-start: -9px; }
#ac-globalfooter .ac-gf-footer-locale-link:first-child::before { display: none; }
```

## script.js — behavior spec

1. On DOMContentLoaded: `document.documentElement.classList.remove('no-js')`.
2. Mobile nav toggle: clicking `#globalnav-menutrigger` toggles `body.nav-open` and sets `aria-expanded`. When open, the nav tray (a JS-built or CSS-revealed panel listing the product links) slides in below the bar; clicking the trigger again or a link closes it. Esc key closes. Trap focus simply (not required to be perfect). At >833px, ensure `body.nav-open` is removed (reset on resize).
3. Nav scrim intensify on scroll: on `scroll`, if `window.scrollY > 8`, add `nav-stuck` to `#globalnav` (bg → 0.92); else remove. Use `requestAnimationFrame` throttle. Skip the heavy work if `prefers-reduced-motion: reduce`.
4. Scroll-reveal for tiles: each `.tile-wrapper` fades+rises in when it enters viewport (IntersectionObserver, threshold 0.15). CSS: `.tile-wrapper { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; } .tile-wrapper.is-visible { opacity: 1; transform: none; }`. **But:** if `prefers-reduced-motion: reduce`, do NOT add the hidden initial state — leave tiles fully visible (no transform/opacity animation). The observer still marks them `is-visible` but the CSS reduced-motion block overrides transitions to `none` and forces `opacity:1; transform:none`.
5. Reduced-motion: query `window.matchMedia('(prefers-reduced-motion: reduce)').matches`. If true, skip scroll-reveal hidden state and skip nav scroll handler's visual class toggling (still allow mobile menu toggle, it's a state change not animation).
6. Keep it framework-free, ~80 lines, well-commented.

## Accessibility & reduced-motion (styles.css must include)
```
@media (prefers-reduced-motion: reduce){
  * { transition: none !important; animation: none !important; }
  .tile-wrapper { opacity: 1 !important; transform: none !important; }
}
@media (prefers-reduced-transparency: reduce){
  #globalnav { background: var(--nav-bg-open); backdrop-filter: none; -webkit-backdrop-filter: none; }
}
```

## README.md content
- Title: "Apple UI"
- One paragraph: a pixel-perfect replica of the apple.com homepage landing page (nav + hero tiles + promo grid + footer) built with plain HTML/CSS/JS. Real Apple marketing imagery is hotlinked from apple.com.
- How to run: open `index.html` in any modern browser. No build step, no server required.
- Notes: requires internet (fonts + images load from apple.com). Respects prefers-reduced-motion.

## Done definition
- `index.html`, `styles.css`, `script.js`, `README.md` all present in `G:\Projects & Development\Apple UI\`.
- Class names in HTML EXACTLY match the selectors in styles.css and the hooks in script.js.
- Opening index.html shows: translucent top nav with Apple logo + 11 product links + search + bag; 3 full-width hero tiles; 6-tile 2-column promo grid (dark MacBook Pro + dark iPad Pro); full Apple footer. Responsive to mobile (hamburger nav, single-column grid). Pixel values match Apple's real CSS.
