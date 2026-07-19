# ADDENDUM — Nav Flyouts + Endless Entertainment Carousel

This addendum extends `BUILD_CONTRACT.md` for the two features being added to the Apple UI replica.

## Important note on flyout content

Apple's global nav flyouts are loaded dynamically from a protected API (`/api-www/global-elements/global-header/v1/flyouts`) that returns 403 when fetched directly. Therefore the **flyout dropdown content is reconstructed** from Apple's standard public nav structure (the product lineups, categories, and hrefs are accurate as of mid-2026). The *behavior* (full-bleed slide-down panel on hover/focus) and the *layout* (3-column "Explore / Shop / More from") are true to the real site. The product card images inside the "Explore" column are omitted because they come from the protected API; we use text-only cards.

The carousel content is **exact** — every tile, headline, image URL, CTA, and the dotnav count was pulled from the live apple.com homepage HTML.

---

## PART A — GLOBAL NAV FLYOUTS

### Behavior
- On **desktop** (`@media (hover: hover) and (min-width: 834px)`), hovering or focusing a product nav item opens its flyout panel.
- The panel is a full-bleed dropdown below the fixed nav bar (`#globalnav`), anchored to the left/right edges of the viewport, with the content constrained to `max-width: 1024px` centered.
- Background: `#fafafc` (the real flyout bg).
- The panel starts at `height: 0` / `max-height: 0` and `visibility: hidden`, then transitions to `max-height: 100vh` (or a large value) on hover/focus with a `0.24s` `cubic-bezier(0.28, 0.11, 0.32, 1)` transition — matching Apple's nav easing.
- Only one flyout is open at a time. Moving from one product link to another closes the previous and opens the new one.
- On **mobile** (`≤833px`) the flyouts are suppressed — the mobile menu tray already lists the product links directly.
- Keyboard: `Tab` into a product link opens the flyout; `Esc` closes all flyouts (handled by JS). Keep focus inside the nav while the user tabs.

### Markup structure (one per product nav item)

Inside each `.globalnav-item` that contains a product link, add a sibling `.globalnav-flyout` immediately after the trigger link:

```html
<li class="globalnav-item" data-flyout="mac">
  <a href="https://www.apple.com/mac/" class="globalnav-link"><span class="globalnav-link-text">Mac</span></a>
  <div class="globalnav-flyout" aria-label="Mac menu" aria-hidden="true">
    <div class="globalnav-flyout-content">
      <div class="globalnav-flyout-columns">
        <section class="globalnav-flyout-column globalnav-flyout-explore">
          <h3 class="globalnav-flyout-title">Explore Mac</h3>
          <ul class="globalnav-flyout-list">
            <li><a class="globalnav-flyout-card" href="https://www.apple.com/macbook-air/">MacBook Air</a></li>
            <li><a class="globalnav-flyout-card" href="https://www.apple.com/macbook-pro/">MacBook Pro</a></li>
            <li><a class="globalnav-flyout-card" href="https://www.apple.com/imac/">iMac</a></li>
            <li><a class="globalnav-flyout-card" href="https://www.apple.com/mac-mini/">Mac mini</a></li>
            <li><a class="globalnav-flyout-card" href="https://www.apple.com/mac-studio/">Mac Studio</a></li>
            <li><a class="globalnav-flyout-card" href="https://www.apple.com/mac-pro/">Mac Pro</a></li>
            <li><a class="globalnav-flyout-card" href="https://www.apple.com/displays/">Displays</a></li>
          </ul>
        </section>
        <section class="globalnav-flyout-column globalnav-flyout-shop">
          <h3 class="globalnav-flyout-title">Shop Mac</h3>
          <ul class="globalnav-flyout-list">
            <li><a class="globalnav-flyout-link" href="https://www.apple.com/us/shop/goto/buy_mac">Shop Mac</a></li>
            <li><a class="globalnav-flyout-link" href="https://www.apple.com/us/shop/goto/help/buying">Help Buying</a></li>
            <li><a class="globalnav-flyout-link" href="https://www.apple.com/us/shop/goto/trade_in">Apple Trade In</a></li>
            <li><a class="globalnav-flyout-link" href="https://www.apple.com/shop/browse/financing">Financing</a></li>
          </ul>
        </section>
        <section class="globalnav-flyout-column globalnav-flyout-more">
          <h3 class="globalnav-flyout-title">More from Mac</h3>
          <ul class="globalnav-flyout-list">
            <li><a class="globalnav-flyout-link" href="https://www.apple.com/business/mac/">Mac for Business</a></li>
            <li><a class="globalnav-flyout-link" href="https://www.apple.com/education/mac/">Mac for Education</a></li>
            <li><a class="globalnav-flyout-link" href="https://www.apple.com/healthcare/mac/">Mac for Healthcare</a></li>
            <li><a class="globalnav-flyout-link" href="https://www.apple.com/macos/">macOS</a></li>
            <li><a class="globalnav-flyout-link" href="https://www.apple.com/apple-intelligence/">Apple Intelligence</a></li>
            <li><a class="globalnav-flyout-link" href="https://www.apple.com/continuity/">Continuity</a></li>
            <li><a class="globalnav-flyout-link" href="https://www.apple.com/airdrop/">AirDrop</a></li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</li>
```

Each product nav item gets the same structure but with its own content (see "Per-product flyout content" below). The `data-flyout` attribute is optional but useful for JS.

### CSS class reference

- `.globalnav-flyout` — the full-bleed panel (absolute, left 0, right 0, top 44px → 48px ≤833, z-index below nav bar but above content; `visibility: hidden; opacity: 0; max-height: 0; overflow: hidden; transition: max-height 0.24s cubic-bezier(0.28, 0.11, 0.32, 1), opacity 0.24s ease, visibility 0.24s; background: #fafafc;`)
- `.globalnav-flyout-content` — centered inner, `max-width: 1024px; margin: 0 auto; padding: 28px 22px 36px;`
- `.globalnav-flyout-columns` — 3-column grid on desktop (`display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 40px;`) → 1 column on mobile (but mobile flyouts are suppressed entirely)
- `.globalnav-flyout-title` — 12px/600/-0.01em SF Pro Text, color `rgba(0,0,0,0.88)`, margin-bottom 12px
- `.globalnav-flyout-list` — list-style none, padding 0, margin 0
- `.globalnav-flyout-card` — a product card in the Explore column: block, padding 6px 0, font-size 14px/1.28577/400/-.016em SF Pro Text, color `rgba(0,0,0,0.8)`, no underline, hover color `#000`
- `.globalnav-flyout-link` — a text link in Shop/More columns: block, padding 5px 0, font-size 12px/1.33337/400/-.01em SF Pro Text, color `rgba(0,0,0,0.56)`, hover color `rgba(0,0,0,0.88)`
- Open state: `.globalnav-item:hover .globalnav-flyout, .globalnav-item:focus-within .globalnav-flyout` OR a JS class `.globalnav-item.is-open` → `{ visibility: visible; opacity: 1; max-height: 100vh; }` (use `100vh` so the transition works)
- Suppress on mobile: `@media (max-width: 833px) { .globalnav-flyout { display: none !important; } }`

### JS class reference (for script.js)

Use CSS hover/focus-within for desktop opening. Add a small JS helper to:
- Close all flyouts on `Esc` press (remove focus from nav).
- Ensure mobile nav toggle (`#globalnav-menutrigger`) does not conflict with hover on touch devices.
- Optional: add `.is-open` class on `.globalnav-item` for keyboard navigation when JS is enabled; the CSS should respect both `.globalnav-item:hover .globalnav-flyout` and `.globalnav-item.is-open .globalnav-flyout`.

### Per-product flyout content

Apply the structure above, substituting the headings and links below. All links are real apple.com URLs.

#### Store
- Explore Store:  
  - Shop iPhone → `/us/shop/goto/buy_iphone`
  - Shop iPad → `/us/shop/goto/buy_ipad`
  - Shop Mac → `/us/shop/goto/buy_mac`
  - Shop Apple Watch → `/us/shop/goto/buy_watch`
  - Shop Apple Vision Pro → `/us/shop/goto/apple_vision_pro`
  - Shop AirPods → `/us/shop/goto/buy_airpods`
  - Shop TV & Home → `/us/shop/goto/buy_tv`
  - Shop Accessories → `/us/shop/goto/buy_accessories`
- Shop Store:  
  - Find a Store → `/retail/`
  - Order Status → `/us/shop/order/list`
  - Shopping Help → `/us/shop/help`
  - Returns → `/us/shop/returns`  
- More from Store:  
  - Apple Trade In → `/us/shop/goto/trade_in`
  - Financing → `/shop/browse/financing`
  - Gift Cards → `/us/shop/gift-cards/`

#### Mac
- Explore Mac: MacBook Air, MacBook Pro, iMac, Mac mini, Mac Studio, Mac Pro, Displays (same URLs as example above)
- Shop Mac: Shop Mac, Help Buying, Apple Trade In, Financing (same URLs as example above)
- More from Mac: Mac for Business, Mac for Education, Mac for Healthcare, macOS, Apple Intelligence, Continuity, AirDrop (same URLs as example above)

#### iPad
- Explore iPad:  
  - iPad Pro → `/ipad-pro/`
  - iPad Air → `/ipad-air/`
  - iPad → `/ipad-10.9/`
  - iPad mini → `/ipad-mini/`
  - Apple Pencil → `/apple-pencil/`
  - Keyboards → `/ipad-keyboards/`
- Shop iPad:  
  - Shop iPad → `/us/shop/goto/buy_ipad`
  - Help Buying → `/us/shop/goto/help/buying`
  - Apple Trade In → `/us/shop/goto/trade_in`
  - Financing → `/shop/browse/financing`
- More from iPad:  
  - iPad for Business → `/business/ipad/`
  - iPad for Education → `/education/ipad/`
  - iPad for Healthcare → `/healthcare/ipad/`
  - Apple Intelligence → `/apple-intelligence/`
  - Continuity → `/continuity/`
  - AirDrop → `/airdrop/`
  - QuickTime → `/quicktime/`

#### iPhone
- Explore iPhone:  
  - iPhone 16 Pro → `/iphone-16-pro/`
  - iPhone 16 → `/iphone-16/`
  - iPhone Air → `/iphone-air/`
  - iPhone 15 → `/iphone-15/`
  - Compare → `/iphone/compare/`
  - AirPods → `/airpods/`
  - AirTag → `/airtag/`
  - Accessories → `/us/shop/goto/buy_accessories/iphone`
- Shop iPhone:  
  - Shop iPhone → `/us/shop/goto/buy_iphone`
  - Help Buying → `/us/shop/goto/help/buying`
  - Apple Trade In → `/us/shop/goto/trade_in`
  - Financing → `/shop/browse/financing`
- More from iPhone:  
  - iPhone for Business → `/business/iphone/`
  - iPhone for Education → `/education/iphone/`
  - iPhone for Healthcare → `/healthcare/iphone/`
  - Apple Intelligence → `/apple-intelligence/`
  - iPhone Privacy → `/privacy/iphone/`
  - iPhone Accessibility → `/accessibility/iphone/`
  - iPhone Support → `https://support.apple.com/iphone`

#### Watch
- Explore Watch:  
  - Apple Watch Series 11 → `/apple-watch-series-11/`
  - Apple Watch Ultra 3 → `/apple-watch-ultra-3/`
  - Apple Watch SE → `/apple-watch-se/`
  - Compare → `/apple-watch/compare/`
  - Bands → `/shop/watch/bands`
  - Apple Watch Studio → `/us/shop/goto/watch/band_studio`
  - Accessories → `/us/shop/goto/buy_accessories/apple_watch`
- Shop Watch:  
  - Shop Apple Watch → `/us/shop/goto/buy_watch`
  - Help Buying → `/us/shop/goto/help/buying`
  - Apple Trade In → `/us/shop/goto/trade_in`
  - Financing → `/shop/browse/financing`
- More from Watch:  
  - Apple Watch for Business → `/business/apple-watch/`
  - Apple Watch for Education → `/education/apple-watch/`
  - Apple Fitness+ → `/apple-fitness-plus/`
  - Apple Health → `/healthcare/apple-watch/`
  - Apple Intelligence → `/apple-intelligence/`
  - watchOS → `/watchos/`

#### Vision
- Explore Vision:  
  - Apple Vision Pro → `/apple-vision-pro/`
  - Accessories → `/us/shop/goto/buy_accessories/apple_vision_pro`
- Shop Vision:  
  - Shop Apple Vision Pro → `/us/shop/goto/buy_apple_vision_pro`
  - Help Buying → `/us/shop/goto/help/buying`
  - Financing → `/shop/browse/financing`
- More from Vision:  
  - Apple Intelligence → `/apple-intelligence/`
  - visionOS → `/visionos/`
  - Apple Vision Pro for Business → `/business/apple-vision-pro/`
  - Accessibility → `/accessibility/vision/`

#### AirPods
- Explore AirPods:  
  - AirPods 4 → `/airpods-4/`
  - AirPods Pro 3 → `/airpods-pro/`
  - AirPods Max → `/airpods-max/`
  - Compare → `/airpods/compare/`
- Shop AirPods:  
  - Shop AirPods → `/us/shop/goto/buy_airpods`
  - Help Buying → `/us/shop/goto/help/buying`
  - Apple Trade In → `/us/shop/goto/trade_in`
  - Financing → `/shop/browse/financing`
- More from AirPods:  
  - AirPods for Business → `/business/airpods/`
  - Apple Music → `/apple-music/`
  - Apple Intelligence → `/apple-intelligence/`
  - Accessibility → `/accessibility/airpods/`

#### TV & Home
- Explore TV & Home:  
  - Apple TV 4K → `/apple-tv-4k/`
  - HomePod → `/homepod/`
  - HomePod mini → `/homepod-mini/`
  - Accessories → `/us/shop/goto/buy_accessories/tv_home`
- Shop TV & Home:  
  - Shop Apple TV → `/us/shop/goto/buy_tv`
  - Shop HomePod → `/us/shop/goto/buy_homepod`
  - Help Buying → `/us/shop/goto/help/buying`
- More from TV & Home:  
  - Apple Music → `/apple-music/`
  - Apple TV+ → `/apple-tv-plus/`
  - Apple Intelligence → `/apple-intelligence/`
  - Home App → `/home-app/`
  - AirPlay → `/airplay/`

#### Entertainment
- Explore Entertainment:  
  - Apple One → `/apple-one/`
  - Apple TV+ → `/apple-tv-plus/`
  - Apple Music → `/apple-music/`
  - Apple Arcade → `/apple-arcade/`
  - Apple Fitness+ → `/apple-fitness-plus/`
  - Apple News+ → `/apple-news-plus/`
  - Apple Podcasts → `/apple-podcasts/`
  - Apple Books → `/apple-books/`
  - App Store → `/app-store/`
- Shop Entertainment:  
  - Entertainment Plans → `/apple-one/`
  - Apple TV+ → `/apple-tv-plus/`
  - Apple Music → `/apple-music/`
- More from Entertainment:  
  - Apple One → `/apple-one/`
  - Apple TV+ → `/apple-tv-plus/`
  - Apple Music → `/apple-music/`
  - Support → `https://support.apple.com/entertainment`

#### Accessories
- Explore Accessories:  
  - All Accessories → `/us/shop/goto/buy_accessories`
  - iPhone → `/us/shop/goto/buy_accessories/iphone`
  - iPad → `/us/shop/goto/buy_accessories/ipad`
  - Mac → `/us/shop/goto/buy_accessories/mac`
  - Apple Watch → `/us/shop/goto/buy_accessories/apple_watch`
  - Apple Vision Pro → `/us/shop/goto/buy_accessories/apple_vision_pro`
  - AirPods → `/us/shop/goto/buy_accessories/airpods`
- Shop Accessories:  
  - Shop All Accessories → `/us/shop/goto/buy_accessories`
  - Help Buying → `/us/shop/goto/help/buying`
  - Apple Trade In → `/us/shop/goto/trade_in`
  - Financing → `/shop/browse/financing`
- More from Accessories:  
  - Accessories for Business → `/business/shop/accessories`
  - Find an Apple Store → `/retail/`
  - Gift Cards → `/us/shop/gift-cards/`

#### Support
- Explore Support:  
  - iPhone → `https://support.apple.com/iphone`
  - Mac → `https://support.apple.com/mac`
  - iPad → `https://support.apple.com/ipad`
  - Apple Watch → `https://support.apple.com/watch`
  - AirPods → `https://support.apple.com/airpods`
  - Apple Music → `https://support.apple.com/music`
  - Apple Account → `https://support.apple.com/apple-account`
  - Apple Vision Pro → `https://support.apple.com/apple-vision-pro`
- Get Help:  
  - Genius Bar → `/retail/geniusbar/`
  - AppleCare+ → `/support/applecare/`
  - Apple Support Communities → `https://discussions.apple.com`
  - Repair → `/support/repair/`
- More from Support:  
  - Check Coverage → `/support/`
  - Contact Apple Support → `https://support.apple.com/contact`
  - Accessibility → `/accessibility/`

---

## PART B — ENDLESS ENTERTAINMENT CAROUSEL

### Structure

Insert a new `<section>` after `.section.section-promo` (inside `<main>` but after the promo grid) and before `<footer>`:

```html
<section class="section-endless-entertainment-gallery" aria-label="Endless entertainment">
  <div class="endless-entertainment">
    <div class="media-gallery-headline-container">
      <h2 class="media-gallery-headline">Endless entertainment.</h2>
    </div>

    <div id="tv-media-gallery" class="media-gallery tv-media-gallery" role="group" aria-label="Gallery of Apple TV shows, movies, and sports">
      <div class="media-gallery-track">
        <!-- 8 main tiles generated from the list below -->
      </div>
      <div class="media-gallery-dotnav dotnav">
        <ol class="dotnav-items">
          <li class="dotnav-item"><button class="dotnav-link" aria-label="Item 1" data-slide="0"></button></li>
          ... through 9 ...
        </ol>
        <button class="media-gallery-dotnav-iconcontrol" aria-label="Pause endless entertainment gallery" aria-pressed="false">
          <!-- pause SVG / play SVG swapped by JS -->
        </button>
      </div>
    </div>

    <div id="fam-media-gallery" class="media-gallery fam-media-gallery" role="group" aria-label="Gallery of Apple services, including Fitness Plus, Apple Arcade, and Apple Music">
      <div class="fam-media-gallery-track">
        <!-- 9 fam tiles generated from the list below -->
      </div>
    </div>
  </div>
</section>
```

### Tile markup pattern (main gallery)

```html
<div class="media-gallery-item theme-dark" data-media-gallery-item="0">
  <a class="media-gallery-wrapper-link" href="TILE_HREF">
    <div class="media-gallery-bg">
      <picture>
        <img src="TILE_BG_IMAGE_2500w.jpg" alt="">
      </picture>
    </div>
    <div class="media-gallery-top-content">
      <div class="media-gallery-logo-tv-plus"><img src="https://www.apple.com/v/home/cj/images/tv-gallery/logo_hero_light__d7t8cya4x26a_small_2x.png" alt="Apple TV+"></div>
      <div class="media-gallery-logo-show"><img src="SHOW_LOGO_URL" alt="SHOW_NAME"></div>
    </div>
    <div class="media-gallery-bottom-content">
      <a class="button" href="TILE_HREF">CTA_LABEL</a>
      <p class="media-gallery-longnote"><span class="media-gallery-genre">GENRE</span> LONGNOTE_TEXT</p>
    </div>
  </a>
</div>
```

Use `aria-hidden="true"` on the show logos if the image alt already covers the name (or alt="" on the show logo if the surrounding `<a>` has the show name). The Apple TV+ logo should have `alt="Apple TV+"`.

### Tile content (main gallery)

1. **Lucky**  
   href: `https://tv.apple.com/us/show/lucky/umc.cmc.5qo7t3nngb2vj0m9dxkwebw1o?l=en-US?itscg=10000&itsct=atv-apl_hp-stream_now--220622`  
   CTA: `Stream now`  
   Genre: `Action`  
   Longnote: `Anya Taylor-Joy is a grifter running for her life after a heist goes sideways.`  
   bg: `https://is1-ssl.mzstatic.com/image/thumb/3aJOoInTKLjwSg8kv-ifDg/2500x1336sr.jpg`  
   show logo: `https://is1-ssl.mzstatic.com/image/thumb/pQdOLq_2af0BOpHwvbC6vg/440x108.png`

2. **Silo**  
   href: `https://tv.apple.com/us/show/silo/umc.cmc.3yksgc857px0k0rqe5zd4jice?l=en-US?itscg=10000&itsct=atv-apl_hp-stream_now--220622`  
   CTA: `Stream now`  
   Genre: `Sci-Fi`  
   Longnote: `The truth lies in the past.`  
   bg: `https://is1-ssl.mzstatic.com/image/thumb/hRaOrIKahRFcNlKt6UV4Ow/2500x1336sr.jpg`  
   show logo: `https://is1-ssl.mzstatic.com/image/thumb/w6iOdqXGZLugnUgKmWZp0g/440x108.png`

3. **Formula 1**  
   href: `https://tv.apple.com/us/room/formula-1/uts.room.formula-1?itscg=10000&itsct=atv-apl_hp-stream_now--220622`  
   CTA: `F1 on Apple TV`  
   Genre: none  
   Longnote: `Every Grand Prix™, live and on demand—all in one place, all year long.`  
   bg: `https://is1-ssl.mzstatic.com/image/thumb/Features/v4/11/cd/47/11cd47ca-af61-71a8-6b02-4a0af9d55077/a54b4338-9340-422f-b5c6-1420bf850b01.png/2500x1336sr.jpg`  
   show logo: `https://is1-ssl.mzstatic.com/image/thumb/Features221/v4/f0/ac/1e/f0ac1e58-0027-49d0-378e-68470edfb0ec/3b7d6fac-0061-401c-9716-742245053fd0.png/440x108.png`

4. **Trying**  
   href: `https://tv.apple.com/us/show/trying/umc.cmc.6muy4la7lj1omu5nci4bt2m66?l=en-US?itscg=10000&itsct=atv-apl_hp-stream_now--220622`  
   CTA: `Stream now`  
   Genre: `Comedy`  
   Longnote: `New season.`  
   bg: `https://is1-ssl.mzstatic.com/image/thumb/hsU_QQ029KLmMQJURx1nIQ/2500x1336sr.jpg`  
   show logo: `https://is1-ssl.mzstatic.com/image/thumb/_KPop1q8UTGLpXKQz6TPhQ/440x108.png`

5. **MLS**  
   href: `https://tv.apple.com/us/channel/mls/tvs.sbd.7000?itscg=10000&itsct=atv-apl_hp-stream_now--220622`  
   CTA: `MLS on Apple TV`  
   Genre: none  
   Longnote: `Watch every club, every match, live—all season long.`  
   bg: `https://is1-ssl.mzstatic.com/image/thumb/Features/v4/78/57/f6/7857f6ec-a4ed-87dc-dea9-a6ed02888722/ebd59c17-8e95-49b1-aec0-44aec57388ee.png/2500x1336sr.jpg`  
   show logo: `https://is1-ssl.mzstatic.com/image/thumb/Kc1Xx3Z1QBOuXe1EHDu4TA/440x108.png`

6. **Widow's Bay**  
   href: `https://tv.apple.com/us/show/widows-bay/umc.cmc.1zzly0vah46bnvnwf0qkrjhh2?l=en-US?itscg=10000&itsct=atv-apl_hp-stream_now--220622`  
   CTA: `Stream now`  
   Genre: `Mystery`  
   Longnote: `19 Emmy® Nominations Including Best Comedy`  
   bg: `https://is1-ssl.mzstatic.com/image/thumb/CqMFl0CvUAUE1axxV4k-ew/2500x1336sr.jpg`  
   show logo: `https://is1-ssl.mzstatic.com/image/thumb/vXNv4MQ8aLXIkWQTZxw-BQ/440x108.png`

7. **Friday Night Baseball**  
   href: `https://tv.apple.com/us/room/friday-night-baseball/edt.item.62327df1-6874-470e-98b2-a5bbeac509a2?itscg=10000&itsct=atv-apl_hp-stream_now--220622`  
   CTA: `See the schedule`  
   Genre: none  
   Longnote: `Live MLB games, every Friday.`  
   bg: `https://is1-ssl.mzstatic.com/image/thumb/Features/v4/33/9e/cf/339ecfe7-f515-8594-2e48-d991803409ea/5a944fdc-acd7-47a8-89e7-274d84cf4276.png/2500x1336sr.jpg`  
   show logo: `https://is1-ssl.mzstatic.com/image/thumb/Features211/v4/6f/41/7c/6f417c01-dbf7-6cdc-df62-f014aa88a673/e452926f-7b52-4c05-a07f-8e4939b1bf6b.png/440x108.png`

8. **Pluribus**  
   href: `https://tv.apple.com/us/show/pluribus/umc.cmc.37axgovs2yozlyh3c2cmwzlza?l=en-US?itscg=10000&itsct=atv-apl_hp-stream_now--220622`  
   CTA: `Stream now`  
   Genre: `Drama`  
   Longnote: `18 Emmy® Nominations Including Best Drama`  
   bg: `https://is1-ssl.mzstatic.com/image/thumb/S9dLxU_nCvhomqGnI3-d_g/2500x1336sr.jpg`  
   show logo: `https://is1-ssl.mzstatic.com/image/thumb/BxM84eq3qmaQrTcELLWAPQ/440x108.png`

### Tile markup pattern (fam sub-row)

```html
<div class="fam-media-gallery-item" data-fam-gallery-item="0">
  <a class="fam-media-gallery-wrapper-link" href="FAM_HREF">
    <div class="fam-media-gallery-bg-wrapper" style="background-color: #f4f8fb;">
      <picture><img src="FAM_BG_IMAGE" alt=""></picture>
    </div>
    <div class="fam-media-gallery-top-content">
      <span class="fam-media-gallery-logo">SERVICE</span> <!-- Arcade / Fitness / Music — use an SVG/wordmark or plain text if the SVG isn't available; text is acceptable -->
    </div>
    <div class="fam-media-gallery-bottom-content">
      <a class="button" href="FAM_HREF">FAM_CTA</a>
      <p class="fam-media-gallery-longnote">FAM_TITLE</p>
    </div>
  </a>
</div>
```

For the service logo, use a simple text label (`Apple Arcade`, `Apple Fitness+`, `Apple Music`) styled small and dark; the real site uses inline SVGs but those aren't in our assets. The title/longnote is sufficient for a faithful replica.

### Tile content (fam sub-row)

1. **Hello Kitty Island Adventure** — Apple Arcade  
   href: `https://apps.apple.com/us/app/hello-kitty-island-adventure/id1553505132?itscg=10000&itsct=aa-apl_hp-play_now--240326`  
   CTA: `Play now`  
   Title: `Hello Kitty Island Adventure`  
   bg: `https://is1-ssl.mzstatic.com/image/thumb/Features211/v4/5b/b3/4a/5bb34a60-695c-a96f-75ec-8a957fc2a20b/45899847-e52c-44a1-9ce5-09aedebb7a78.png/940x528.jpg`  
   bg color: `#f4f8fb`

2. **Programs** — Apple Fitness+  
   href: `https://fitness.apple.com/us/studio-collection/programs/1896349052?itscg=10000&itsct=afp-apl_hp-watch_now--240326`  
   CTA: `Watch now`  
   Title: `Programs`  
   bg: `https://is1-ssl.mzstatic.com/image/thumb/Features211/v4/2a/75/df/2a75df27-703b-4712-6d95-9c9e29ca1dc6/fa77ffdb-61aa-47e7-920a-7da1876f3929.png/940x528.jpg`  
   bg color: `#524617`

3. **Sabrina Carpenter: The Zane Lowe Interview** — Apple Music  
   href: `https://music.apple.com/us/station/sabrina-carpenter-the-zane-lowe-interview/ra.1837392419?itscg=10000&itsct=am-apl_hp-listen_now--240326`  
   CTA: `Listen now`  
   Title: `Sabrina Carpenter: The Zane Lowe Interview`  
   bg: `https://is1-ssl.mzstatic.com/image/thumb/Features211/v4/55/2b/5f/552b5f86-46e6-d848-ee06-5395bf09c206/83e0ed3d-c824-4ed9-9572-ae9e784568cb.png/226x226sr.jpg`  
   bg color: `#000000`

4. **PowerWash Simulator** — Apple Arcade  
   href: `https://apps.apple.com/us/app/powerwash-simulator/id6477445344?itscg=10000&itsct=aa-apl_hp-play_now--240326`  
   CTA: `Play now`  
   Title: `PowerWash Simulator`  
   bg: `https://is1-ssl.mzstatic.com/image/thumb/Features211/v4/53/55/d7/5355d758-e5b7-b406-f004-bb98d03ecb38/9388d284-2a0b-43e8-86e0-5852e8559d18.png/940x528.jpg`  
   bg color: `#9fc6f4`

5. **Morning Yoga with Jessica** — Apple Fitness+  
   href: `https://fitness.apple.com/us/workout/morning-yoga-with-jessica/1896834550?itscg=10000&itsct=afp-apl_hp-watch_now--240326`  
   CTA: `Watch now`  
   Title: `Morning Yoga with Jessica`  
   bg: `https://is1-ssl.mzstatic.com/image/thumb/Video221/v4/b7/8e/69/b78e693a-4a05-67f7-b144-af3b368df5fa/YO_JS_0304_artwork_en_ID335381_0.png/940x528.jpg`  
   bg color: `#432b16`

6. **A-List Pop** — Apple Music  
   href: `https://music.apple.com/us/playlist/a-list-pop/pl.5ee8333dbe944d9f9151e97d92d1ead9?itscg=10000&itsct=am-apl_hp-listen_now--240326`  
   CTA: `Listen now`  
   Title: `A-List Pop`  
   bg: `https://is1-ssl.mzstatic.com/image/thumb/Features/v4/0e/3e/4c/0e3e4ce2-e5ff-45d8-d4d8-0821233ce59c/952c77af-ffb4-4f40-b65a-256e406a6374.png/226x226SC.DN01.jpg?l=en-US`  
   bg color: `#ea33c0`

7. **Balatro+** — Apple Arcade  
   href: `https://apps.apple.com/us/app/balatro/id6502451661?itscg=10000&itsct=aa-apl_hp-play_now--240326`  
   CTA: `Play now`  
   Title: `Balatro+`  
   bg: `https://is1-ssl.mzstatic.com/image/thumb/Features221/v4/89/07/9c/89079c5b-29da-cd1f-4ce3-ad68f3d28a68/f0346506-4c9f-4be1-b275-11fa4004b103.png/940x528.jpg`  
   bg color: `#002c66`

8. **Get Your Glutes in Great Shape** — Apple Fitness+  
   href: `https://fitness.apple.com/us/studio-collection/get-your-glutes-in-great-shape/1710038259?itscg=10000&itsct=afp-apl_hp-watch_now--240326`  
   CTA: `Watch now`  
   Title: `Get Your Glutes in Great Shape`  
   bg: `https://is1-ssl.mzstatic.com/image/thumb/Features211/v4/1d/e7/0b/1de70bac-4e88-e8f9-bac3-7824757058fb/dbf14aec-bece-4ea1-b898-393cbb07c77f.png/940x528.jpg`  
   bg color: `#ec893c`

9. **New Music Daily** — Apple Music  
   href: `https://music.apple.com/us/playlist/new-music-daily/pl.2b0e6e332fdf4b7a91164da3162127b5?itscg=10000&itsct=am-apl_hp-listen_now--240326`  
   CTA: `Listen now`  
   Title: `New Music Daily`  
   bg: `https://is1-ssl.mzstatic.com/image/thumb/Features/v4/6d/db/8b/6ddb8bc8-054c-d9f5-4518-1945e550b7b5/6f885998-2c85-4627-8ff6-1c02b4746588.png/226x226SC.DN01.jpg?l=en-US`  
   bg color: `#de9444`

### Carousel CSS reference

```css
/* Section shell */
.section-endless-entertainment-gallery { background: #f5f5f7; }
.endless-entertainment { padding-top: 53px; padding-bottom: 53px; }
@media (max-width: 1068px){ .endless-entertainment { padding-top: 36px; padding-bottom: 36px; } }

.media-gallery-headline-container { text-align: center; margin-bottom: 26px; }
@media (max-width: 1068px){ .media-gallery-headline-container { margin-bottom: 17px; } }
.media-gallery-headline {
  font-size: 56px; line-height: 1.0714285714; font-weight: 600; letter-spacing: -0.005em;
  font-family: "SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: rgb(29, 29, 31); margin: 0;
}
@media (max-width: 1068px){ .media-gallery-headline { font-size: 32px; line-height: 1.125; letter-spacing: 0.002em; } }

/* Main gallery slider */
.tv-media-gallery { position: relative; width: 100%; max-width: calc(var(--media-gallery-tile-width) + 40px); margin: 0 auto; }
:root { --media-gallery-tile-width: 930px; --media-gallery-tile-height: 523px; --media-gallery-tile-gap: 13px; }
@media (min-width: 1441px){ :root { --media-gallery-tile-width: 1250px; --media-gallery-tile-height: 668px; } }
@media (max-width: 1068px){ :root { --media-gallery-tile-width: 688px; --media-gallery-tile-height: 367px; } }
@media (max-width: 734px){ :root { --media-gallery-tile-width: 275px; --media-gallery-tile-height: 496px; } }

.media-gallery-track { display: flex; gap: var(--media-gallery-tile-gap); transition: transform 0.8s ease; }
.media-gallery-item { flex: 0 0 var(--media-gallery-tile-width); height: var(--media-gallery-tile-height); position: relative; border-radius: 18px; overflow: hidden; }

.media-gallery-wrapper-link { display: block; width: 100%; height: 100%; position: relative; color: #f5f5f7; text-decoration: none; }
.media-gallery-bg { position: absolute; inset: 0; z-index: 1; }
.media-gallery-bg img { width: 100%; height: 100%; object-fit: cover; }
.media-gallery-top-content { position: absolute; top: 0; left: 0; right: 0; z-index: 2; padding: 48px 48px 0; text-align: center; }
.media-gallery-bottom-content { position: absolute; bottom: 0; left: 0; right: 0; z-index: 2; padding: 0 48px 40px; text-align: center; }
@media (min-width: 1441px){ .media-gallery-top-content { padding: 70px 70px 0; } .media-gallery-bottom-content { padding: 0 70px 58px; } }
@media (max-width: 1068px){ .media-gallery-top-content { padding: 43px 43px 0; } .media-gallery-bottom-content { padding: 0 43px 34px; } }
@media (max-width: 734px){ .media-gallery-top-content { padding: 15px 15px 0; } .media-gallery-bottom-content { padding: 0 15px 30px; } }

.media-gallery-logo-tv-plus img { height: 24px; width: auto; margin: 0 auto; }
.media-gallery-logo-show { margin-top: 16px; }
.media-gallery-logo-show img { max-width: 240px; height: auto; max-height: 60px; margin: 0 auto; }
.media-gallery-longnote {
  font-size: 21px; line-height: 1.1904761905; font-weight: 400; letter-spacing: 0.011em;
  font-family: "SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #f5f5f7; text-shadow: 0 0 5px rgba(0,0,0,0.6); margin: 13px 0 0;
}
@media (max-width: 1068px){ .media-gallery-longnote { font-size: 19px; line-height: 1.2105263158; letter-spacing: 0.012em; } }
.media-gallery-genre { display: block; font-weight: 600; margin-bottom: 2px; }

/* Dotnav */
.media-gallery-dotnav { display: flex; justify-content: center; align-items: center; gap: 10px; margin-top: 26px; }
.dotnav-items { display: flex; gap: 10px; list-style: none; padding: 0; margin: 0; }
.dotnav-link { width: 8px; height: 8px; border-radius: 50%; border: none; padding: 0; background: rgba(0,0,0,0.2); cursor: pointer; }
.dotnav-link.is-active { background: rgba(0,0,0,0.6); }
.media-gallery-dotnav-iconcontrol { width: 24px; height: 24px; border: none; background: transparent; cursor: pointer; display: flex; align-items: center; justify-content: center; color: rgba(0,0,0,0.6); }

/* Fam sub-row */
.fam-media-gallery { margin-top: 13px; }
.fam-media-gallery-track { display: grid; grid-template-columns: repeat(3, 1fr); gap: 13px; max-width: calc(var(--media-gallery-tile-width) + 40px); margin: 0 auto; }
@media (max-width: 1068px){ .fam-media-gallery-track { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 734px){ .fam-media-gallery-track { grid-template-columns: 1fr; } }

.fam-media-gallery-item { height: 234px; border-radius: 18px; overflow: hidden; position: relative; }
@media (min-width: 1441px){ .fam-media-gallery-item { height: 264px; } }
@media (max-width: 1068px){ .fam-media-gallery-item { height: 254px; } }
.fam-media-gallery-wrapper-link { display: block; width: 100%; height: 100%; position: relative; color: #f5f5f7; text-decoration: none; }
.fam-media-gallery-bg-wrapper { position: absolute; inset: 0; z-index: 1; }
.fam-media-gallery-bg-wrapper img { width: 100%; height: 100%; object-fit: cover; }
.fam-media-gallery-top-content { position: absolute; top: 0; left: 0; right: 0; z-index: 2; padding: 20px 20px 0; text-align: left; }
.fam-media-gallery-logo { font-size: 12px; font-weight: 600; letter-spacing: -0.01em; color: rgba(0,0,0,0.8); }
.fam-media-gallery-bottom-content { position: absolute; bottom: 0; left: 0; right: 0; z-index: 2; padding: 0 20px 20px; text-align: left; }
.fam-media-gallery-longnote {
  font-size: 17px; line-height: 1.23536; font-weight: 400; letter-spacing: -0.022em;
  font-family: "SF Pro Text", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #f5f5f7; text-shadow: 0 0 5px rgba(0,0,0,0.6); margin: 8px 0 0;
}

/* Pause autoplay under reduced motion */
@media (prefers-reduced-motion: reduce){
  .media-gallery-track { transition: none; }
}
```

### Carousel JS reference

- Main gallery has 8 tiles. Initialize current index = 0.
- Autoplay every `4160ms` (4.16s) — matches the real `data-ac-gallery-item-duration`. On each tick, increment index (wrap 0→7), move `.media-gallery-track` with `transform: translateX(calc(-1 * var(--media-gallery-tile-width) * index - var(--media-gallery-tile-gap) * index))` and update active dot.
- Dots 1–8 map to tiles 0–7. Dot 9 (index 8) smooth-scrolls the page to the `.fam-media-gallery` element (the fam row) and pauses autoplay.
- Play/Pause button toggles autoplay. Label flips between "Pause endless entertainment gallery" and "Play endless entertainment gallery". SVG swaps (pause = two bars; play = triangle). Default state: playing.
- Pause on hover over the main gallery.
- Reduced motion: disable autoplay entirely and do not transform; just show all tiles in a static grid? Actually, for reduced motion, a reasonable accessible behavior is to disable autoplay and show the first tile, with dots still functional for manual navigation. Or skip the sliding entirely. Keep it simple: stop autoplay under reduced motion, keep manual dot navigation working.
- Touch swipe is optional; nice to have but not required. If easy, add a simple touch handler to swipe between tiles.
- Keyboard: left/right arrow keys move to previous/next tile when focus is inside the gallery.

### Button styling inside carousel

Use the same `.button` class from the rest of the page, but with a dark-mode variant for the dark tiles. Add a `.button-dark` modifier or just use a contextual rule:
```css
.media-gallery-item .button { background: #fff; color: #000; }
.media-gallery-item .button:hover { background: #f5f5f7; }
```
For the fam row, the button color depends on the tile background (some are dark, some light). Default to a light button on dark-ish backgrounds. Simpler: use a neutral `.button` (white bg, black text) across all carousel CTAs.

### Done definition

After adding these two features, the page must:
- Open full-bleed nav flyouts on hover/focus of each product link (desktop only).
- Display the Endless Entertainment section with an autoplaying 8-tile main gallery + 9-tile fam sub-row + 9-dot dotnav + play/pause button.
- Still pass the existing interlock checks (no broken class names, responsive nav/tiles/footer unchanged).
