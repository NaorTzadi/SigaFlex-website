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
| PRIV-003 | No tracking, analytics or third-party script | `index.html`, `src/theme.css`, `THIRD_PARTIES.md` |
| PRIV-004 | The YouTube player loads only on the visitor's click | `src/pages/Home/sections/what_it_does_section/ProductDemoVideo.tsx` |
| PRIV-005 | Disclosures match what the code does | `CookieConsent.tsx`, `src/pages/Policies/Privacy.tsx`, `THIRD_PARTIES.md`, `OUTSIDE_ROUTES.md` |

## PRIV-001 — Non-necessary cookies wait for consent

**Must hold:** `CookiesManager.set` writes a cookie outside `NECESSARY` only after the
visitor accepted. A decline removes every cookie outside `NECESSARY`. Nothing else in the
site touches `document.cookie`.

**Why:** EU ePrivacy and UK PECR require prior consent for storage that is not strictly
necessary. A banner that does not actually block storage is no protection.

**Changing `NECESSARY`:** a cookie belongs there only if the site cannot work without it
(the consent answer, the sign-in). Adding one needs the owner's authorization.

## PRIV-002 — The consent question is answered, not dismissed

**Must hold:** the banner offers Accept and Decline as equal choices. Escape cannot
dismiss it. It steps aside on the privacy page so the visitor can read it before answering.
It keeps asking until it is answered.

**Why:** consent has to be a clear, informed choice. Declining must be as easy as accepting.

## PRIV-003 — No tracking, analytics or third-party script

**Must hold:** the page loads no analytics, tracking pixel, tag manager, advertising script,
or other third-party script. Fonts are self-hosted. Every domain the browser fetches from
that is not ours has a row in `THIRD_PARTIES.md` or `OUTSIDE_ROUTES.md`. Adding any of
these is a change to this safeguard and needs the owner's authorization. When one is
authorized, it must load only after the consent it requires.

**Why:** with nothing to track, there is nothing to consent to, and the banner cannot be
undermined by a script that runs before it.

## PRIV-004 — The YouTube player loads only on the visitor's click

**Must hold:** before the visitor clicks play, nothing is fetched from YouTube or Google:
no iframe, thumbnail, preconnect, or script. The play control says that playing connects
to YouTube. This is independent of the cookie banner. Accepting cookies does not load the
player.

**Why:** the embedded player contacts Google and stores data in the browser. The ICO's
guidance treats a feature-specific choice as the consent for a third-party embed; a general
banner acceptance may not be informed consent for it.

## PRIV-005 — Disclosures match what the code does

**Must hold:** the banner text, the Privacy page, `THIRD_PARTIES.md` and `OUTSIDE_ROUTES.md`
describe exactly what is stored and which outside domains are contacted. A change to
cookies, storage, or outside requests updates them in the same change.

**Why:** an inaccurate privacy notice is a violation in itself, even when the behavior
is harmless.
