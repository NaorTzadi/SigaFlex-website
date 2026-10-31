# Legal safeguards

Every protection on this site that exists to reduce legal risk is registered here.
Each one names the behavior that must hold, where it is implemented, and why.

The implementation may be refactored, moved or improved. The protection itself may
only be weakened or removed when the owner explicitly authorizes that change.
Every implementation site carries a `SAFEGUARD <ID>` marker beside the protected code.
A new protection gets a new entry in the same change that adds it.

| ID | Protection | Implemented in |
| --- | --- | --- |
| PRIV-001 | Non-necessary cookies wait for consent | `src/core/CookiesManager.ts` |
| PRIV-002 | The consent question is answered, not dismissed | `src/components/CookieConsent/CookieConsent.tsx` |
| PRIV-003 | No tracking, analytics or third-party script | `index.html`, `src/theme.css`, `LICENSES_INDEX_MAP.md` |
| PRIV-004 | The YouTube player loads only on the visitor's click | `src/pages/Home/sections/what_it_does_section/ProductDemoVideo.tsx` |
| PRIV-005 | Disclosures match what the code does | `CookieConsent.tsx`, `RegistrationForm.tsx`, `src/pages/Policies/Privacy.tsx`, `ProductDemoVideo.tsx`, `LICENSES_INDEX_MAP.md`, `OUTSIDE_ROUTES.md` |
| PRIV-006 | The visitor can stop and unload the video player | `src/pages/Home/sections/what_it_does_section/ProductDemoVideo.tsx` |
| LIC-001 | Licence index identifies original notice sources | `LICENSES_INDEX_MAP.md`, `src/assets/fonts/`, `src/assets/icons/` |
| LIC-002 | Website licence notices ship with the production website | `src/pages/Policies/Licenses.tsx`, `src/vite-env.d.ts`, `vite.config.ts` |

## PRIV-001 — Non-necessary cookies wait for consent

**Must hold:** `CookiesManager.set` writes a cookie outside `NECESSARY` only after the
visitor accepted. A decline removes every cookie outside `NECESSARY`. Nothing else in the
site touches `document.cookie`.

A stored answer must not authorize a newly introduced optional purpose. A change
introducing a purpose that needs consent must obtain a fresh, specific choice before
that purpose is enabled.

**Why:** storage without an applicable exemption needs prior consent. The project's
gate must actually block non-necessary storage until the required choice is made.

**Changing `NECESSARY`:** a cookie belongs there only if the site cannot work without it
(the consent answer, the sign-in). Adding one needs the owner's authorization.

## PRIV-002 — The consent question is answered, not dismissed

**Must hold:** the banner offers Accept and Decline as equal choices. Escape cannot
dismiss it. It steps aside on the privacy page so the visitor can read it before answering.
It keeps asking until it is answered. Accept and Decline use the same button styling.

**Why:** consent has to be a clear, informed choice. Declining must be as easy as accepting.

## PRIV-003 — No tracking, analytics or third-party script

**Must hold:** the page loads no analytics, tracking pixel, tag manager, advertising script,
or other third-party script. Fonts are self-hosted. Every domain the browser fetches from
that is not ours has a row in `LICENSES_INDEX_MAP.md` or `OUTSIDE_ROUTES.md`. Adding any of
these is a change to this safeguard and needs the owner's authorization. When one is
authorized, it must load only after the consent it requires.

**Why:** with nothing to track, there is nothing to consent to, and the banner cannot be
undermined by a script that runs before it.

## PRIV-004 — The YouTube player loads only on the visitor's click

**Must hold:** before the visitor clicks Play, the site makes no automatic YouTube/Google
request for the video: no iframe, thumbnail, preconnect or script. The play control names
YouTube and is associated with visible data/storage information. Google privacy and
cookie-information links are available before playback; following them is a separate
visitor-requested navigation. This is independent of the cookie banner. Accepting
cookies does not load the player.

**Why:** the embedded player contacts Google and may store browser data. Information
beside the Play control ties loading to the visitor's request rather than a general
cookie answer.

## PRIV-005 — Disclosures match what the code does

**Must hold:** the cookie dialog, registration notes, Privacy page, video disclosure,
`LICENSES_INDEX_MAP.md` and `OUTSIDE_ROUTES.md` describe the actual storage and outside
connections. A change to cookies, storage or outside requests updates the relevant
disclosures in the same change.

The current first-party inventory has two cookies (`fa_consent`, `fa_remember`) and two
session-storage entries (`fa_session`, `file-analyzer.review-draft`). Privacy states
their purposes and lifetimes, including draft removal after successful posting and
browser session restoration. The notices do not describe today's answer as permission
for unspecified future optional purposes. The YouTube disclosure identifies Google
data sharing and possible browser storage before activation, links the provider notices,
and does not promise to erase provider data when the player is unloaded.

**Why:** an inaccurate privacy notice is a violation in itself, even when the behavior
is harmless.

`LICENSES_INDEX_MAP.md` records licence paths, third-party usage, font sources and
provider information. The `/licenses` page uses only local notice text and download assets;
`OUTSIDE_ROUTES.md` records the Google notice links and the current contact address.

## PRIV-006 — The visitor can stop and unload the video player

**Must hold:** while the YouTube player is loaded, a visible Stop and unload video
button removes the iframe, returns the placeholder and restores keyboard focus to
Play. Loading the player again requires another explicit Play action. Unloading does
not claim to delete data Google already received or cookies/storage already set.

**Why:** visitors need a way to end playback and remove the embedded player after
activating it, with accurate information about what that action does.

## LIC-001 — Licence index identifies original notice sources

**Must hold:** `LICENSES_INDEX_MAP.md` identifies each component's version, licence and
existing notice-file path, plus where third parties are used and why. Package-owned
notices remain intact in `node_modules`, including bundled third-party notices.
Font notices live beside the fonts and the copied-icon
notice lives beside the icons. Retrieved notices retain their official upstream source
information in the index. Where a native package has no notice of its own, its
same-version parent notice is identified explicitly.

Notice text is preserved verbatim when a file is relocated. The index covers third-party
packages, build tools, fonts and copied icons used by this website project. Public notice
delivery is covered by LIC-002.

**Why:** licence texts and copyright notices must remain attributable to the components
they cover, and indexing a notice must not be mistaken for completing the website's
distribution obligations.

## LIC-002 — Website licence notices ship with the production website

**Must hold:** the existing footer-linked `/licenses` page publishes complete copyright
and licence texts for the JavaScript libraries, fonts and copied icons shipped to
visitors. Its displayed notices and downloadable files are imported from the original
source files identified in `LICENSES_INDEX_MAP.md`. Downloads are forced into production assets rather than inlined
as data URLs; `src/vite-env.d.ts` declares those imports. `vite.config.ts` gives extensionless
`LICENSE` assets a `.txt` extension so their generated URLs and filenames stay consistent
on Windows and deployed hosts. No external fetch or script is introduced for notices.

Components share one displayed notice only where their source texts are identical.
The notice page shows installed JavaScript package versions from their package metadata.
Build tools and dependencies removed by tree shaking remain indexed without being published.
When the shipped dependency or asset set changes, update the public notices accordingly.

**Why:** storing notices only in the repository does not include them in the website
distributed to visitors. Direct imports keep public notices tied to their original
texts and include both readable notices and standalone copies in the production build.
