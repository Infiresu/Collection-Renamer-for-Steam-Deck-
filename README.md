# Collection Renamer

Decky Loader plugin for Steam Deck: rename Steam collections right in Gaming Mode.

- Adds **Rename** to the collection menu (the ☰ / Options button), next to "Delete collection".
- Works both on the Collections grid and inside an opened collection.
- All collections are also listed in the plugin's Quick Access panel for quick renaming.
- Fixes scroll jitter of the Collections grid when tiles are bigger than Steam's default
  (e.g. with the **Customizable Collections** CSS Loader theme).
- UI language follows Steam: EN, RU, UK, ES, DE, FR, PT, IT, PL, TR, ZH, JA, KO.

## Build
```
npm i
npm run build
```
Copy `plugin.json`, `main.py`, `package.json`, `LICENSE` and `dist/` to `~/homebrew/plugins/collection-renamer/`.

Author: Infiresu · License: BSD-3-Clause
