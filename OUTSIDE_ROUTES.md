# Links that leave this domain

<!-- SAFEGUARD PRIV-005 — see SAFEGUARDS.md -->

Every URL on this site that sends a reader somewhere we do not control is
listed here. Adding one means adding a row here, in the same change.

Declare the URL in `Constants.EXTERNAL_LINKS` and reference it from there — no
outside URL is written inline in a component.

| URL | Where we link to it | Why |
| --- | --- | --- |
| mailto:naorprojects1@gmail.com | `src/pages/Contact/Contact.tsx`, `src/pages/Policies/Privacy.tsx`, `src/pages/Policies/Terms.tsx` | Support, privacy requests and security reports through the visitor's own mail client. Declared as `Constants.CONTACT_EMAIL`. |
| https://www.youtube.com/@SigaFlex | `src/components/Footer/Footer.tsx`, the YouTube glyph | The official SigaFlex YouTube channel. Declared as `Constants.EXTERNAL_LINKS.YOUTUBE_CHANNEL`. |
| https://www.instagram.com/sigaflex/ | `src/components/Footer/Footer.tsx`, the Instagram glyph beside YouTube | The SigaFlex Instagram profile. Declared as `Constants.EXTERNAL_LINKS.INSTAGRAM_PROFILE`. |
| https://policies.google.com/privacy | `ProductDemoVideo.tsx` before playback, and `src/pages/Policies/Privacy.tsx` | Google's privacy notice explains the provider's data handling before the visitor chooses to load the video. Opens a new tab only when the visitor follows the link. Declared as `Constants.EXTERNAL_LINKS.GOOGLE_PRIVACY_POLICY`. |
| https://policies.google.com/technologies/cookies | `ProductDemoVideo.tsx` before playback, and `src/pages/Policies/Privacy.tsx` | Google's explanation of cookies and similar storage technologies used by its services. Opens a new tab only when the visitor follows the link. Declared as `Constants.EXTERNAL_LINKS.GOOGLE_COOKIES`. |
| https://www.youtube-nocookie.com/embed/hunAcThQbF4 | `src/pages/Home/sections/what_it_does_section/ProductDemoVideo.tsx`, the demonstration video | The video player loads only after Play, independently of the cookie answer. The visitor sees data/storage information first and can stop and unload the player afterward. Unloading removes the iframe; it does not erase provider data or storage. Safeguards PRIV-004 and PRIV-006 apply. Declared as `Constants.EXTERNAL_LINKS.DEMO_VIDEO`. |
| https://accounts.google.com/o/oauth2/v2/auth | "Continue with Google" in `src/pages/LoginForm/LoginForm.tsx` and `src/pages/RegistrationForm/RegistrationForm.tsx`, through the server's `/auth/google/start` | Google's account picker for signing in or registering with a Google account. The server builds this URL and redirects to it, so it is not declared in `Constants.EXTERNAL_LINKS`. Google sends the reader back to the server, which returns them to `/login`. |

## Rules

- The `/licenses` page displays local notice texts and links local download assets;
  it does not navigate to the upstream URLs reproduced as plain text in those notices.
- The link carries `rel="noreferrer noopener"` and, when it opens in a new tab,
  says so in its own text — a reader using a screen reader is told before they
  follow it, not after.
- A link that only *looks* external (a CDN, an analytics beacon, a font host)
  still counts. If the browser fetches from a domain that is not ours, it has a
  row here.
