# Collection Renamer (for Steam Deck)
<img width="1920" height="1080" alt="Collection Renamer" src="https://github.com/user-attachments/assets/25c4e87b-0b1f-4b3a-8f25-fbbf411130b0" />

**Disclaimer: AI was actively used in the development process.**
Tested several times in various situations, and no issues were observed.
Should any problems arise, please let me know. And, if possible, describe the scenario in which they occurred.

Decky Loader plugin for Steam Deck: rename Steam collections right in Gaming Mode.
- Adds **Rename** to the collection menu (the ☰ / Options button), next to "Delete collection".
- All collections are also listed in the plugin's Quick Access panel for quick renaming.
- Fixes scroll jitter of the Collections grid when tiles are bigger than Steam's default **(for Customizable Collections CSS Loader theme).**

## Installation
Use developer mode in Decky Loader and install the plugin via a .zip file in the corresponding tab.
<img width="1280" height="800" alt="image" src="https://github.com/user-attachments/assets/3a413bd0-1acd-4f34-9fd4-4e1df9a98abb" />
<img width="1280" height="800" alt="image" src="https://github.com/user-attachments/assets/748264a2-ad6a-4cb9-8140-c82dde9ad68b" />

## Build
```
npm i
npm run build
```
Copy `plugin.json`, `main.py`, `package.json`, `LICENSE` and `dist/` to `~/homebrew/plugins/collection-renamer/`.


Author: Infiresu · License: BSD-3-Clause
