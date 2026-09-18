# Third parties used by this website

Anything that is not our own code goes in this table before it is installed.
Name it, say where it is used, say why it is here.

This is the website's own record. It is not the same thing as the
**Third-Party Licenses page** the site must publish for the components the
*application* distributes — that page is a route (`/licenses`) and its contents
come from the product, not from this file.

| Name | Where it is used | Why |
| --- | --- | --- |
| react, react-dom | Everywhere. `src/main.tsx` mounts it. | The UI library the site is built in. |
| react-router-dom | `src/Routing.tsx` only. | Client-side routing for the pages reached from the one-page home. |
| vite, @vitejs/plugin-react | Build and dev server. Not shipped to the browser. | Bundler and dev server. |
| typescript, @types/react, @types/react-dom | Build only. Not shipped to the browser. | The language and its React type definitions. |
| IBM Plex Sans (variable, Latin-1) | `src/assets/fonts/ibm-plex-sans-var.woff2`, declared in `theme.css`. | Body and heading face. SIL OFL 1.1; licence text kept beside the font as `IBM-Plex-LICENSE.txt`. Self-hosted, so no request leaves our domain. |
| IBM Plex Mono (variable, Latin-1) | `src/assets/fonts/ibm-plex-mono-var.woff2`, declared in `theme.css`. | Monospace face for disassembly, hex, strings and pattern output. Same licence and licence file. |

## Rule

A new dependency needs a row here in the same change that adds it to
`package.json`. If you cannot fill in the "Why" column in one sentence, do not
add the dependency.
