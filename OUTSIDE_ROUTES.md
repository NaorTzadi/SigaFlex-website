# Links that leave this domain

Every URL on this site that sends a reader somewhere we do not control is
listed here. Adding one means adding a row here, in the same change.

Declare the URL in `Constants.EXTERNAL_LINKS` and reference it from there — no
outside URL is written inline in a component.

| URL | Where we link to it | Why |
| --- | --- | --- |
| mailto:holder@gmail.com | `src/pages/Contact/Contact.tsx`, `src/pages/Privacy/Privacy.tsx`, `src/pages/Terms/Terms.tsx` | The only way to reach us. It hands the reader off to their own mail client, which is outside the site. Declared as `Constants.CONTACT_EMAIL`; the address is a placeholder until the real one is chosen. |
| https://ffmpeg.org/download.html | `src/pages/Licenses/Licenses.tsx`, "Corresponding FFmpeg source" | The LGPL obliges us to give access to the exact corresponding source of the FFmpeg build the application distributes. |
| https://www.youtube.com/@primalmachine7945 | `src/components/Footer/Footer.tsx`, the glyph under the footer brand | The channel the demonstration video is published on. Declared as `Constants.EXTERNAL_LINKS.YOUTUBE_CHANNEL`. |
| https://www.youtube-nocookie.com/embed/jgW1QeA0rug | `src/pages/Home/sections/Demo.tsx`, the "See it in action" band | The demonstration video is streamed rather than shipped, so the file stays out of the repository. The browser fetches the player from Google, which is a row here by the rule below even though the reader is never sent away from the page. The no-cookie host is used so nothing is written until the reader presses play; the frame is lazy so nothing is fetched until it is scrolled to. Declared as `Constants.EXTERNAL_LINKS.DEMO_VIDEO`. |

## Rules

- The link carries `rel="noreferrer noopener"` and, when it opens in a new tab,
  says so in its own text — a reader using a screen reader is told before they
  follow it, not after.
- A link that only *looks* external (a CDN, an analytics beacon, a font host)
  still counts. If the browser fetches from a domain that is not ours, it has a
  row here.
