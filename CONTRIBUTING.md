# Contributing

Thanks for considering a contribution to Apple UI. This is a small static front-end project — keep changes scoped and faithful to the apple.com source values documented in `BUILD_CONTRACT.md` and `ADDENDUM.md`.

## Workflow

This repo works on a single `main` branch.

1. Fork the repo and branch off `main` (`git checkout -b your-descriptive-name`).
2. Make your change. Keep the three source files in sync — class names in `index.html` must match the selectors in `styles.css` and the hooks in `script.js`.
3. Open `index.html` and run the self-checks in the README's Development section.
4. Commit with a clear message (`feat:`, `fix:`, `docs:`, `style:`).
5. Push and open a pull request against `main`.

## Before you submit

- Open `index.html` and confirm the page still renders end to end (nav + flyouts, hero tiles, promo grid, carousel, footer).
- Check the mobile layout at <=833px.
- Toggle `prefers-reduced-motion` and confirm autoplay stops and tiles stay visible.
- Do not commit secrets, API keys, backups, or editor/OS noise (`Thumbs.db`, `.DS_Store`).
- Do not vendor Apple's assets into the repo — keep them hotlinked.

## Reporting issues

Open an [issue](https://github.com/TechTronixx/Apple-Website-Replica-Demo/issues) and use the bug report or feature request template. Include your browser, OS, and the part of the page affected.
