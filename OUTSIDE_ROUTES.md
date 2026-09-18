# Links that leave this domain

Every URL on this site that sends a reader somewhere we do not control is
listed here. Adding one means adding a row here, in the same change.

Declare the URL in `Constants.EXTERNAL_LINKS` and reference it from there — no
outside URL is written inline in a component.

| URL | Where we link to it | Why |
| --- | --- | --- |
| https://ffmpeg.org/download.html | `src/pages/Licenses/Licenses.tsx`, "Corresponding FFmpeg source" | The LGPL obliges us to give access to the exact corresponding source of the FFmpeg build the application distributes. |

## Rules

- The link carries `rel="noreferrer noopener"` and, when it opens in a new tab,
  says so in its own text — a reader using a screen reader is told before they
  follow it, not after.
- A link that only *looks* external (a CDN, an analytics beacon, a font host)
  still counts. If the browser fetches from a domain that is not ours, it has a
  row here.
