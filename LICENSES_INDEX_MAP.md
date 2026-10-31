# Licence index

<!-- SAFEGUARD LIC-001, PRIV-003, PRIV-005 — see SAFEGUARDS.md -->

Updated 30 October 2026. Paths are relative to this project root. Package versions come
from the installed package metadata. The index includes build tools and dependencies;
the public /licenses page publishes the notices for components delivered to visitors.

## Fonts and copied icons

| Component | Version | License | Path |
| --- | --- | --- | --- |
| IBM Plex Sans and IBM Plex Mono | Release not recorded | SIL OFL 1.1 | [src/assets/fonts/IBM-Plex-LICENSE.txt](src/assets/fonts/IBM-Plex-LICENSE.txt) |
| Audiowide | 1.003 | SIL OFL 1.1 | [src/assets/fonts/Audiowide-OFL.txt](src/assets/fonts/Audiowide-OFL.txt) |
| LobeHub Icons (@lobehub/icons-static-svg) | 1.95.1 | MIT | [src/assets/icons/LobeHub-1.95.1-LICENSE.txt](src/assets/icons/LobeHub-1.95.1-LICENSE.txt) |

The Plex notice is the original notice supplied with the self-hosted font files.
Audiowide's copyright/author and OFL version match the local font metadata; its text
comes from the [official Google Fonts distribution](https://raw.githubusercontent.com/google/fonts/main/ofl/audiowide/OFL.txt).
The LobeHub notice comes from the [source commit recorded for npm version 1.95.1](https://raw.githubusercontent.com/lobehub/lobe-icons/49a2130df7bfa5eb1b088261bff20a37e2967789/LICENSE).
The corresponding npm archive was verified against its published SHA-512 integrity
value, and the local Claude, Codex and Gemini SVG path data matches that archive's
color icons. The monochrome variants in `src/components/Icon/glyphs.ts` are scaled
from the original 24x24 grid to 16x16. Product marks remain trademarks of their owners.

## Where third parties are used

| Name | Where it is used | Why |
| --- | --- | --- |
| React, React DOM and Scheduler | `src/main.tsx` and the website components. | Render and update the website interface. |
| React Router and React Router DOM | `src/Routing.tsx` and navigation components. | Handle client-side routes and navigation. |
| Vite and @vitejs/plugin-react | Build and development server only. | Bundle the website and transform React components. |
| TypeScript and @types packages | Build-time type checking only. | Check application types; React and Babel type packages support the toolchain. |
| IBM Plex Sans | `src/assets/fonts/ibm-plex-sans-var.woff2`, declared in `src/theme.css`. | Self-hosted body and heading font. |
| IBM Plex Mono | `src/assets/fonts/ibm-plex-mono-var.woff2`, declared in `src/theme.css`. | Self-hosted monospace font for code and inspection output. |
| Audiowide | `src/assets/fonts/Audiowide-Regular.ttf`, resolved through `FONT_PATHS` and CSS. | Self-hosted brand font by Brian J. Bonislawsky DBA Astigmatic (AOETI). |
| LobeHub Claude, Codex and Gemini icons | `src/assets/icons/`, `src/components/Icon/glyphs.ts` and the supported-agent row in `AgentTerminalDemo.tsx`. | Identify the supported AI products; the copied artwork is covered by LobeHub's MIT notice. |
| YouTube embedded player | `ProductDemoVideo.tsx`; `youtube-nocookie.com` loads only after the visitor presses Play. | Host the demonstration video without carrying it in the repository. Before playback, the site explains Google data sharing and browser storage and links the provider's notices. Stop and unload removes the iframe. Provider data and browser storage are not erased by unloading. All outside URLs are recorded in `OUTSIDE_ROUTES.md`. |

Add or update the relevant index entry and usage description when introducing a
third-party dependency, font, copied asset or provider. Browser requests to outside
domains must also be recorded in `OUTSIDE_ROUTES.md` and follow the safeguards.

## Installed packages

| Component | Version | License | Path |
| --- | --- | --- | --- |
| @babel/code-frame | 7.29.7 | MIT | [node_modules/@babel/code-frame/LICENSE](node_modules/@babel/code-frame/LICENSE) |
| @babel/compat-data | 7.29.7 | MIT | [node_modules/@babel/compat-data/LICENSE](node_modules/@babel/compat-data/LICENSE) |
| @babel/core | 7.29.7 | MIT | [node_modules/@babel/core/LICENSE](node_modules/@babel/core/LICENSE) |
| @babel/generator | 7.29.8 | MIT | [node_modules/@babel/generator/LICENSE](node_modules/@babel/generator/LICENSE) |
| @babel/helper-compilation-targets | 7.29.7 | MIT | [node_modules/@babel/helper-compilation-targets/LICENSE](node_modules/@babel/helper-compilation-targets/LICENSE) |
| @babel/helper-globals | 7.29.7 | MIT | [node_modules/@babel/helper-globals/LICENSE](node_modules/@babel/helper-globals/LICENSE) |
| @babel/helper-module-imports | 7.29.7 | MIT | [node_modules/@babel/helper-module-imports/LICENSE](node_modules/@babel/helper-module-imports/LICENSE) |
| @babel/helper-module-transforms | 7.29.7 | MIT | [node_modules/@babel/helper-module-transforms/LICENSE](node_modules/@babel/helper-module-transforms/LICENSE) |
| @babel/helper-plugin-utils | 7.29.7 | MIT | [node_modules/@babel/helper-plugin-utils/LICENSE](node_modules/@babel/helper-plugin-utils/LICENSE) |
| @babel/helper-string-parser | 7.29.7 | MIT | [node_modules/@babel/helper-string-parser/LICENSE](node_modules/@babel/helper-string-parser/LICENSE) |
| @babel/helper-validator-identifier | 7.29.7 | MIT | [node_modules/@babel/helper-validator-identifier/LICENSE](node_modules/@babel/helper-validator-identifier/LICENSE) |
| @babel/helper-validator-option | 7.29.7 | MIT | [node_modules/@babel/helper-validator-option/LICENSE](node_modules/@babel/helper-validator-option/LICENSE) |
| @babel/helpers | 7.29.7 | MIT | [node_modules/@babel/helpers/LICENSE](node_modules/@babel/helpers/LICENSE) |
| @babel/parser | 7.29.9 | MIT | [node_modules/@babel/parser/LICENSE](node_modules/@babel/parser/LICENSE) |
| @babel/plugin-transform-react-jsx-self | 7.29.7 | MIT | [node_modules/@babel/plugin-transform-react-jsx-self/LICENSE](node_modules/@babel/plugin-transform-react-jsx-self/LICENSE) |
| @babel/plugin-transform-react-jsx-source | 7.29.7 | MIT | [node_modules/@babel/plugin-transform-react-jsx-source/LICENSE](node_modules/@babel/plugin-transform-react-jsx-source/LICENSE) |
| @babel/template | 7.29.7 | MIT | [node_modules/@babel/template/LICENSE](node_modules/@babel/template/LICENSE) |
| @babel/traverse | 7.29.8 | MIT | [node_modules/@babel/traverse/LICENSE](node_modules/@babel/traverse/LICENSE) |
| @babel/types | 7.29.8 | MIT | [node_modules/@babel/types/LICENSE](node_modules/@babel/types/LICENSE) |
| @esbuild/win32-x64 | 0.25.12 | MIT | [node_modules/esbuild/LICENSE.md](node_modules/esbuild/LICENSE.md) |
| @jridgewell/gen-mapping | 0.3.13 | MIT | [node_modules/@jridgewell/gen-mapping/LICENSE](node_modules/@jridgewell/gen-mapping/LICENSE) |
| @jridgewell/remapping | 2.3.5 | MIT | [node_modules/@jridgewell/remapping/LICENSE](node_modules/@jridgewell/remapping/LICENSE) |
| @jridgewell/resolve-uri | 3.1.2 | MIT | [node_modules/@jridgewell/resolve-uri/LICENSE](node_modules/@jridgewell/resolve-uri/LICENSE) |
| @jridgewell/sourcemap-codec | 1.6.0 | MIT | [node_modules/@jridgewell/sourcemap-codec/LICENSE](node_modules/@jridgewell/sourcemap-codec/LICENSE) |
| @jridgewell/trace-mapping | 0.3.31 | MIT | [node_modules/@jridgewell/trace-mapping/LICENSE](node_modules/@jridgewell/trace-mapping/LICENSE) |
| @rolldown/pluginutils | 1.0.0-beta.27 | MIT | [node_modules/@rolldown/pluginutils/LICENSE](node_modules/@rolldown/pluginutils/LICENSE) |
| @rollup/rollup-win32-x64-gnu | 4.63.3 | MIT | [node_modules/rollup/LICENSE.md](node_modules/rollup/LICENSE.md) |
| @rollup/rollup-win32-x64-msvc | 4.63.3 | MIT | [node_modules/rollup/LICENSE.md](node_modules/rollup/LICENSE.md) |
| @types/babel__core | 7.20.5 | MIT | [node_modules/@types/babel__core/LICENSE](node_modules/@types/babel__core/LICENSE) |
| @types/babel__generator | 7.27.0 | MIT | [node_modules/@types/babel__generator/LICENSE](node_modules/@types/babel__generator/LICENSE) |
| @types/babel__template | 7.4.4 | MIT | [node_modules/@types/babel__template/LICENSE](node_modules/@types/babel__template/LICENSE) |
| @types/babel__traverse | 7.28.0 | MIT | [node_modules/@types/babel__traverse/LICENSE](node_modules/@types/babel__traverse/LICENSE) |
| @types/estree | 1.0.9 | MIT | [node_modules/@types/estree/LICENSE](node_modules/@types/estree/LICENSE) |
| @types/react | 19.3.0 | MIT | [node_modules/@types/react/LICENSE](node_modules/@types/react/LICENSE) |
| @types/react-dom | 19.3.0 | MIT | [node_modules/@types/react-dom/LICENSE](node_modules/@types/react-dom/LICENSE) |
| @vitejs/plugin-react | 4.7.0 | MIT | [node_modules/@vitejs/plugin-react/LICENSE](node_modules/@vitejs/plugin-react/LICENSE) |
| baseline-browser-mapping | 2.11.25 | Apache-2.0 | [node_modules/baseline-browser-mapping/LICENSE.txt](node_modules/baseline-browser-mapping/LICENSE.txt) |
| browserslist | 4.29.0 | MIT | [node_modules/browserslist/LICENSE](node_modules/browserslist/LICENSE) |
| caniuse-lite | 1.0.30001810 | CC-BY-4.0 | [node_modules/caniuse-lite/LICENSE](node_modules/caniuse-lite/LICENSE) |
| convert-source-map | 2.0.0 | MIT | [node_modules/convert-source-map/LICENSE](node_modules/convert-source-map/LICENSE) |
| cookie | 1.1.1 | MIT | [node_modules/cookie/LICENSE](node_modules/cookie/LICENSE) |
| csstype | 3.2.3 | MIT | [node_modules/csstype/LICENSE](node_modules/csstype/LICENSE) |
| debug | 4.4.3 | MIT | [node_modules/debug/LICENSE](node_modules/debug/LICENSE) |
| electron-to-chromium | 1.5.432 | ISC | [node_modules/electron-to-chromium/LICENSE](node_modules/electron-to-chromium/LICENSE) |
| esbuild | 0.25.12 | MIT | [node_modules/esbuild/LICENSE.md](node_modules/esbuild/LICENSE.md) |
| escalade | 3.2.0 | MIT | [node_modules/escalade/license](node_modules/escalade/license) |
| fdir | 6.5.0 | MIT | [node_modules/fdir/LICENSE](node_modules/fdir/LICENSE) |
| gensync | 1.0.0-beta.2 | MIT | [node_modules/gensync/LICENSE](node_modules/gensync/LICENSE) |
| js-tokens | 4.0.0 | MIT | [node_modules/js-tokens/LICENSE](node_modules/js-tokens/LICENSE) |
| jsesc | 3.1.0 | MIT | [node_modules/jsesc/LICENSE-MIT.txt](node_modules/jsesc/LICENSE-MIT.txt) |
| json5 | 2.2.3 | MIT | [node_modules/json5/LICENSE.md](node_modules/json5/LICENSE.md) |
| lru-cache | 5.1.1 | ISC | [node_modules/lru-cache/LICENSE](node_modules/lru-cache/LICENSE) |
| ms | 2.1.3 | MIT | [node_modules/ms/license.md](node_modules/ms/license.md) |
| nanoid | 3.3.19 | MIT | [node_modules/nanoid/LICENSE](node_modules/nanoid/LICENSE) |
| node-releases | 2.0.56 | MIT | [node_modules/node-releases/LICENSE](node_modules/node-releases/LICENSE) |
| picocolors | 1.1.1 | ISC | [node_modules/picocolors/LICENSE](node_modules/picocolors/LICENSE) |
| picomatch | 4.0.7 | MIT | [node_modules/picomatch/LICENSE](node_modules/picomatch/LICENSE) |
| postcss | 8.5.28 | MIT | [node_modules/postcss/LICENSE](node_modules/postcss/LICENSE) |
| react | 19.3.0 | MIT | [node_modules/react/LICENSE](node_modules/react/LICENSE) |
| react-dom | 19.3.0 | MIT | [node_modules/react-dom/LICENSE](node_modules/react-dom/LICENSE) |
| react-refresh | 0.17.0 | MIT | [node_modules/react-refresh/LICENSE](node_modules/react-refresh/LICENSE) |
| react-router | 7.18.4 | MIT | [node_modules/react-router/LICENSE.md](node_modules/react-router/LICENSE.md) |
| react-router-dom | 7.18.4 | MIT | [node_modules/react-router-dom/LICENSE.md](node_modules/react-router-dom/LICENSE.md) |
| rollup | 4.63.3 | MIT | [node_modules/rollup/LICENSE.md](node_modules/rollup/LICENSE.md) |
| scheduler | 0.28.0 | MIT | [node_modules/scheduler/LICENSE](node_modules/scheduler/LICENSE) |
| semver | 6.3.1 | ISC | [node_modules/semver/LICENSE](node_modules/semver/LICENSE) |
| set-cookie-parser | 2.7.2 | MIT | [node_modules/set-cookie-parser/LICENSE](node_modules/set-cookie-parser/LICENSE) |
| source-map-js | 1.2.1 | BSD-3-Clause | [node_modules/source-map-js/LICENSE](node_modules/source-map-js/LICENSE) |
| tinyglobby | 0.2.17 | MIT | [node_modules/tinyglobby/LICENSE](node_modules/tinyglobby/LICENSE) |
| typescript | 5.8.3 | Apache-2.0 | [node_modules/typescript/LICENSE.txt](node_modules/typescript/LICENSE.txt), [node_modules/typescript/ThirdPartyNoticeText.txt](node_modules/typescript/ThirdPartyNoticeText.txt) |
| update-browserslist-db | 1.3.3 | MIT | [node_modules/update-browserslist-db/LICENSE](node_modules/update-browserslist-db/LICENSE) |
| vite | 6.4.3 | MIT | [node_modules/vite/LICENSE.md](node_modules/vite/LICENSE.md) |
| yallist | 3.1.1 | ISC | [node_modules/yallist/LICENSE](node_modules/yallist/LICENSE) |

Native @esbuild/win32-x64 and @rollup/rollup-win32-x64-* packages have no separate notice
file. Their rows point to the notice in their same-version parent package. Combined
bundled-dependency notices and TypeScript's ThirdPartyNoticeText.txt are indexed in full.

## Website delivery

src/pages/Policies/Licenses.tsx imports the published notices directly from their indexed
source paths as full text and downloadable assets. Vite includes both forms in the
production build; package-owned notice files remain in node_modules.

React, React DOM and Scheduler use identical notice texts, as do React Router and React
Router DOM, so each group shares a displayed notice. The current browser bundle contains
React, React DOM, Scheduler and React Router; the DOM routing entry point is a re-export.
Build-only tools and tree-shaken dependencies such as cookie and set-cookie-parser are
indexed here and are not listed on the public page.
