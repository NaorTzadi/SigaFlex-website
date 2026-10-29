# SigaFlex: pre-launch legal risk review

Review date: **29 October 2026**. Intended audience: **worldwide**, as confirmed by the owner.

## Launch assessment

**Changes are needed before public launch.** The clearest issues are unfinished operator/policy details, inaccurate privacy disclosures, incomplete website license notices, unverified rights to screenshot content, and overly broad product claims. Accounts, software downloads, and payments create additional obligations at different stages.

This is a source-based risk review, not legal clearance or a guarantee against lawsuits. A worldwide launch cannot be cleared against every country's laws from a repository review. The operating country, legal owner, hosting arrangements, and paid-launch plan remain unconfirmed. Have a lawyer use this report to finalize the applicable policies and market coverage; do not treat adding legal pages as sufficient by itself.

**Only this report was added. No production code or policies were changed.**

## Scope and evidence

Reviewed the website's routes, account and review forms, browser storage, file detector, video embed, marketing copy, policy pages, dependencies, fonts, icons, public files, existing `dist/` output, and all five product screenshots. Also read relevant source in the adjacent `../file-analyzer-server` module to check the website's server-related promises.

Online references below are legislation, regulators, standards bodies, official project licenses, or the apparent asset publisher. Sources were checked on the review date. Some government pages blocked direct retrieval; where relevant, their official indexed text was available. The Porsche asset match is an inference, identified explicitly below.

The application was not run; no live browser/network, accessibility, penetration, payment, or deployed-host checks were performed. The desktop application's complete code, installer, native dependencies, and runtime behavior were not audited. The existing `dist/` directory was inspected as an existing artifact, not certified as a fresh build. Secret environment values were not read or reproduced. No tests or builds were run for this documentation-only change.

Evidence labels used below:

- **Confirmed:** directly visible in reviewed source or assets.
- **Conditional:** depends on a feature being enabled or a law applying.
- **Unverified:** needs operational evidence, provenance, or jurisdiction-specific review.

## Priorities

These are recommended release gates, not a claim that each item is universally required by law.

| ID | Finding | Recommended gate | Evidence |
| --- | --- | --- | --- |
| L01 | Operator, jurisdiction, and domain are placeholders; policies remain drafts | Before public launch | Confirmed |
| L02 | Privacy notice lacks important disclosures and operational detail | Before collecting visitor/account data | Confirmed omissions; applicability varies |
| L03 | Server logging exceeds the notice; retention is incomplete | Before enabling the public API | Confirmed |
| L04 | Consent text anticipates future purposes; withdrawal and storage inventory need work | Before public launch/account activation | Confirmed; storage exemptions need assessment |
| L05 | YouTube activation needs fuller information | Before enabling the public embed | Confirmed disclosure gap; legal result conditional |
| L06 | Website JavaScript and copied-icon license notices are incomplete | Before distributing the website bundle | Confirmed in inspected output/source |
| L07 | Font license delivery and Audiowide documentation need completion | Before public launch | Confirmed documentation/output gaps |
| L08 | Rights and attribution for screenshot content are unverified | Before publishing those images/video | Unverified, with a specific likely licensed model |
| L09 | Absolute offline, disk-write, safety, and coverage claims need qualification | Before public launch | Confirmed copy; desktop behavior unverified |
| L10 | Accessibility statement is missing; conformance remains unverified | Before public launch unless a valid exemption applies | Confirmed missing statement; technical assessment pending |
| L11 | Terms need final scope, acceptance evidence, and consumer-rights review | Before accounts/downloads; revisit before sales | Confirmed gaps; enforceability is jurisdiction-specific |
| L12 | Reviews need clearer publication/privacy information and moderation arrangements | Before enabling public reviews | Confirmed UI/backend gaps |
| L13 | Desktop license/source compliance is unfinished, especially FFmpeg | Before publishing any installer | Confirmed placeholders; binary compliance unverified |
| L14 | Trial and paid terms are unfinished | Before presenting an active trial or accepting payment | Confirmed; no checkout found |
| L15 | Deployment security and privacy operations need evidence | Before public accounts/API | Confirmed code concerns; deployment unverified |
| L16 | Worldwide availability needs a regional applicability and localization plan | Before claiming worldwide readiness | Unverified country coverage |

## Protections already present

- `FileFormatDetector.tsx` reads a bounded file slice with browser APIs; no file-upload call was found in that flow.
- No analytics SDK, advertising tag, remote font request, or directly loaded third-party script was found in the reviewed website source. This does not establish what a hosting provider or activated iframe does.
- `ProductDemoVideo.tsx` creates the YouTube iframe only after a click. It does not request a remote thumbnail or preconnect before activation.
- Privacy, terms, licenses, and contact routes exist and are linked from the footer.
- Registration has an unchecked terms box; the adjacent server enforces acceptance and records a timestamp. Review ownership and deletion also have server-side support.
- Relevant server source uses bcrypt, hashed authentication-link tokens, expiry, lockout, and account deletion with review deletion through a database foreign key.
- Accessibility features include a skip link, input labels, error announcements, page titles/focus handling, image alternatives, reduced-motion handling, and carousel pause controls. These are useful evidence, but not proof of full conformance.

## Detailed findings and changes

### L01 — Publish real operator details and finalized policies

**Confirmed evidence:** `src/core/Constants.ts` defines `SITE_OPERATOR = "Holder"`, `SITE_JURISDICTION = "Holder"`, and `SITE_URL = "https://holder.com"`. `PolicyDraftNotice.tsx` explicitly labels both privacy and terms as placeholder drafts. The footer attributes copyright to `Holder`. `index.html`, `public/robots.txt`, and `public/sitemap.xml` also contain the placeholder domain.

**Change:** identify the actual individual or entity operating SigaFlex, its country, a working contact address, and the business/address/registration details required in its markets. Set the real domain throughout. Finalize the documents and their actual effective/update dates before removing the draft warning. `CONTACT_EMAIL` already contains a non-placeholder address; verify control of it rather than replacing it just because `OUTSIDE_ROUTES.md` is stale.

Controller identification is part of Israel's collection notice requirements. EU consumer-facing distance sales can also require trader identity and contact details. A brand name alone does not settle who the responsible operator is. [Israel PPA: collection-notice guidance](https://www.gov.il/BlobFolder/legalinfo/duty_to_notify/he/notify13.pdf), [EU: distance-selling information](https://europa.eu/youreurope/business/selling-in-eu/selling-goods-services/ecommerce-distance-selling/index_en.htm).

### L02 — Complete the privacy notice against the actual data lifecycle

**Confirmed evidence:** `src/pages/Policies/Privacy.tsx` describes accounts, reviews, selected security logs, browser tokens, and YouTube. It omits the review draft in `sessionStorage`, accepted-request logs, support correspondence, actual service providers, and many retention periods. Its heading promises to explain how long data is kept, but most server-held categories have no period or criterion.

**Change:** make a data inventory first, then publish an accurate notice. For each relevant activity, identify data, purpose, recipients, storage location, retention/deletion rule, and the user's choices. Include website/CDN/API hosting, database/backups, email delivery, support email, and administrative access. These providers are unconfirmed; do not invent their names or countries. Explain whether information is optional and what happens if it is withheld. Provide an accessible notice at registration, reviews, and relevant support collection points.

For EU/UK coverage, address applicable lawful bases, legitimate interests, transfers/safeguards, rights and complaints, consent withdrawal, and any representative/DPO details that are actually required. A privacy-policy acknowledgment is not blanket consent for unrelated processing. The ICO's notice checklist covers these disclosures; its page is marked under review, so verify UK updates when finalizing. [ICO: right to be informed](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/individual-rights/right-to-be-informed/).

For Israel, the collection notice also needs the controller/contact, purpose, recipients and purpose of disclosure, whether provision is mandatory or voluntary and the consequence of refusal, and access/correction rights. The form currently links a draft instead of supplying a complete arrangement. [Israel PPA: controller duties, section 11](https://www.gov.il/BlobFolder/generalpage/manager_duties/he/InfoDuties_new.pdf).

Do not promise unlimited deletion or instantaneous removal from all backups unless that is the real process. Explain lawful retention exceptions and the backup lifecycle accurately.

### L03 — Correct the logging disclosure and implement a retention schedule

**Confirmed evidence in the adjacent server:**

- `ServerSecurity/RequestsFilter.java#doFilter` logs both accepted and rejected requests, including IP, method, and path. The privacy notice only discusses requests turned away.
- `Users/AuthController.java` logs email addresses for registration, login, and account-related requests. `CustomLogger.dev` uses INFO logging when enabled; its name does not mean development-only.
- `EmailService.java` logs delivery addresses. With no mail transport configured, its fallback can log the full confirmation/reset link, including a live token.
- `Daemon.java#dropExpired` cleans expired blocks/tokens and unconfirmed accounts. `UsersService.UNCONFIRMED_LIFETIME` is seven days. No security-event purge was found in the reviewed security service/daemon.

**Change:** inventory and minimize application, infrastructure, email, and security logs; suppress raw live tokens; set appropriate access restrictions and retention/deletion jobs. Disclose ordinary request logging and relevant account/support logs. Distinguish six-hour IP-block expiry from retention of the event and log records behind that block. Check whether the deployed proxy records real client IPs or only the proxy address.

Select defensible retention periods based on actual purposes and legal obligations; do not invent a universal number of days. Privacy transparency and data-security duties continue beyond the database table. [Israel PPA: security-regulations FAQ](https://www.gov.il/he/pages/data_security_fqa?chapterIndex=1), [ICO: privacy-information checklist](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/individual-rights/right-to-be-informed/).

### L04 — Make storage disclosures and consent accurate and specific

**Confirmed evidence:**

- `CookiesManager.ts` defines `fa_consent` for 365 days and `fa_remember` for 30 days. `ServerBridge.ts` stores `fa_session` in `sessionStorage`.
- `Reviews.tsx` stores `file-analyzer.review-draft` in `sessionStorage` without going through `CookiesManager`. The privacy notice omits it.
- The registration sidebar says the site sets one cookie, only after agreement. The actual implementation can set two, and treats both as necessary.
- The banner and privacy notice say future preferences/measurement will be governed by today's answer. There is no visible mechanism to reopen cookie choices after answering.
- A successful login automatically accepts the server's persistent remember token; `LoginForm.tsx` has no separate remember-me choice.

**Change:** publish a complete cookie/storage table, with purpose, provider, lifetime, and the applicable exemption or consent approach. Correct the one-cookie claim. Explain and assess the review draft as part of the user-requested review flow; using session storage does not itself avoid storage rules. Assess whether automatic 30-day sign-in is necessary for what the user requested, or offer an informed persistence choice.

Delete the promise that acceptance now authorizes unspecified future measurement. If a future purpose requires consent, obtain it before activating that purpose and make withdrawal as easy as acceptance. Do not let a new tracker bypass the system through storage APIs outside `CookiesManager`. [ICO: storage/access technologies include web storage](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/what-are-storage-and-access-technologies/), [ICO: specific consent, changes, and withdrawal](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/how-do-we-manage-consent-in-practice/).

There is **no universal requirement for every website to display an Accept/Decline cookie modal**. Properly exempt storage may need information rather than consent. Current UK guidance includes newer purpose-specific exceptions; EU member-state rules require separate assessment. Do not assume UK exceptions apply worldwide. [ICO: current exceptions](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/what-are-the-exceptions/).

Changing this area must preserve the protections registered in `SAFEGUARDS.md`. The modal's refusal to close on Escape is a project design choice, not a universal legal requirement. Also review equal prominence: Accept has primary styling while Decline does not; visual fairness was not measured.

### L05 — Finish the YouTube activation disclosure

**Confirmed evidence:** `ProductDemoVideo.tsx` warns that pressing play connects to YouTube/Google. The fuller privacy text mentions IP/browser/page information and potential browser storage, but the activation control does not mention storage or provide Google's relevant privacy/storage information. No player-deactivation control is provided after activation.

**Change:** retain the click-before-load design. At activation, give clear, accessible information about the provider, browser storage/data sharing, and the relevant provider notice; assess whether the actual player needs additional consent for its purposes. Provide a way to stop/unload the embed where appropriate, and verify any consent withdrawal stops further optional activity. An external video link is another possible design, subject to updating the safeguards consistently.

The ICO specifically addresses embedded videos and just-in-time information. Its treatment depends on purposes and configuration; `youtube-nocookie.com` alone does not establish that no data processing occurs or that every jurisdiction's consent rules are satisfied. [ICO: embedded content and exceptions](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/what-are-the-exceptions/).

Recheck the broad “no third-party script” and “opening a page tells nobody but us” wording for the activated iframe and the actual hosting providers. Separate scripts directly added by this site from activity inside a loaded third-party player.

### L06 — Ship the website's own open-source notices

**Confirmed evidence:** the public `/licenses` page reserves desktop-app notices. `THIRD_PARTIES.md` explicitly distinguishes itself from that page, and is not copied into the inspected `dist/`. Production dependencies include MIT-licensed React, React DOM, React Router, and Scheduler. Their installed license files include permission-notice obligations.

The existing minified bundle retains abbreviated copyright/license comments, but refers to root `LICENSE`/`LICENSE.md` files that are not in the deployed output. It does not contain the full MIT permission text. Copied LobeHub icons have no accompanying full LobeHub notice in the website assets/page or inspected output.

**Change:** inventory the actual shipped dependency graph and copied components, preserve the exact applicable copyright lines, and include complete required license texts in the distributed website. A public notice file and a website section of `/licenses` are practical options; no specific page name is mandated. Check the fresh production artifact, rather than relying on `node_modules` or private Markdown records.

MIT permits commercial use subject to its conditions; it does not generally require disclosure of this site's proprietary source. [MIT license text](https://opensource.org/license/mit), [LobeHub's published license](https://raw.githubusercontent.com/lobehub/lobe-icons/master/LICENSE). Confirm the license for the exact copied icon version recorded as 1.95.1.

### L07 — Complete font notices and their delivery

**Confirmed evidence:** `FONT_PATHS` and CSS ship `Audiowide-Regular.ttf`, IBM Plex Sans, and IBM Plex Mono. `THIRD_PARTIES.md` documents Plex but not Audiowide. `IBM-Plex-LICENSE.txt` exists in source but is absent from the inspected `dist/`.

Audiowide's inspected font metadata includes copyright and a reference to OFL 1.1, not its full license text. Google's published font directory identifies Audiowide under OFL 1.1. The compressed Plex fonts' embedded license metadata was not fully inspected, so absence of a separate deployed TXT file alone is not proof those fonts violate the license.

**Change:** document Audiowide's origin, author, and license; ensure each distributed font carries the required copyright and full license in an allowed, accessible form. Shipping notice files explicitly is a straightforward way to remove uncertainty. If the Plex files were subsetted or otherwise modified, check the license's reserved-name conditions for that exact modification and internal font naming.

Commercial website use is allowed under OFL subject to its conditions; paying for these fonts is not a general requirement. [Audiowide's official distributed OFL text](https://raw.githubusercontent.com/google/fonts/main/ofl/audiowide/OFL.txt). The local `src/assets/fonts/IBM-Plex-LICENSE.txt` contains the applicable Plex text.

### L08 — Establish rights to the content inside screenshots and the video

**Confirmed evidence:** `colors-photo.png` prominently displays a landscape photograph; `display-3d-model.png` displays `free_porsche_911_carrera_4s.glb`, a branded car model, and a visible creator credit. Other screenshots show a third-party executable's content, an archive tree, AI interfaces, and local Windows user/workspace paths. No media-rights/provenance record was found in the reviewed website documents.

**Specific lead, not a proven asset identity:** the model title and appearance suggest Lionsharp Studios' published **(FREE) Porsche 911 Carrera 4S**. Its publisher's indexed page lists **CC Attribution-ShareAlike**. Confirm the original downloaded asset, creator, and exact license version; do not assume every similarly named upload has the same license. [Apparent original publisher page](https://sketchfab.com/3d-models/free-porsche-911-carrera-4s-d01b254483794de3819786d93e0e1ebf).

**Change:** record the source, copyright owner, license/permission, required credits, and permitted promotional use for every photo, model, icon, screenshot subject, and demo-video element, including music. Add attribution/license/change notices where required, obtain permission, or replace uncertain material with cleared examples. A creator credit rendered inside an image may not provide every required notice. Determine whether the model render/screenshot is adapted material and what ShareAlike requires for that material; do not assume it forces the whole proprietary application to be open sourced. A BY-SA license permits commercial use but has conditions. [Creative Commons: BY-SA 4.0 summary, subject to confirming the actual version](https://creativecommons.org/licenses/by-sa/4.0/).

Owning the screenshot does not automatically establish rights to the photograph/model visible inside it. Conversely, this review does not establish infringement: ownership, permission, or a legal exception may exist outside the repository. [US Copyright Office: photographs and permissions](https://www.copyright.gov/engage/photographers/).

Replace unnecessary personal paths/account details with sanitized examples. Check the video for the same exposure and rights issues.

### L09 — Narrow and substantiate the marketing claims

**Confirmed evidence:**

- The hero states “0 bytes written to disk” and “0 network calls.”
- `Faq.tsx` says nothing leaves the machine and no temporary copies are left on disk.
- `AgentTerminalDemo.tsx` advertises exporting files/screenshots and AI tools, and says a file never leaves the box. It separately acknowledges that agents may contact a model.
- The tagline promises to open any file and show everything inside it. The website's format catalog is a manually defined list; the desktop implementation was not verified against it.
- `Download.tsx` says the installer is unpublished but also says Windows ships today; pricing advertises a trial as open now.

**Change:** distinguish the website's requests, built-in local parsing, explicit exports/conversions, external commands, and optional AI-agent activity. State that external agents can transmit inspected content under their own configuration/provider terms. Qualify disk-write claims so they do not cover exports, application state, converters, or OS behavior without evidence. Keep a feature/format evidence list for the release actually offered. Clearly label illustrative terminal sessions where appropriate.

Review statements about opening untrusted files: read-only parsing and not intentionally executing the inspected file do not establish immunity to parser vulnerabilities. Keep the existing “not a virus scanner” explanation and give users accurate scope near relevant claims.

Advertising claims should be truthful and supported; a footer disclaimer does not establish that an absolute headline is accurate. [FTC: advertising basics](https://www.ftc.gov/business-guidance/advertising-marketing/advertising-marketing-basics), [Israel Consumer Protection Authority: misleading advertising and related complaints](https://www.gov.il/he/service/filing_a_complaint_to_fair_trade_authority).

### L10 — Resolve accessibility applicability and verify the actual site

**Confirmed evidence:** there is no accessibility statement route or footer link in `Routing.tsx`/`Footer.tsx`. The local project notes request WCAG compliance, but no conformance assessment was supplied. Video captions/audio description and actual keyboard, screen-reader, contrast, zoom/reflow, and dialog behavior remain unverified.

**Change:** assess the whole site and public media against the legally applicable standard; fix barriers; publish an accurate accessibility statement with implemented measures, known limitations, assistance/contact information, and coordinator details if required. Include registration, cookie/policy dialogs, file picking, reviews, menus, motion, and the video. For moving content, check pause/stop requirements; reduced-motion handling is useful but does not establish every applicable criterion is met. [W3C: WCAG 2.2](https://www.w3.org/TR/WCAG22/).

Israel's guidance addresses commercial information as well as sales, new-site accessibility, and conditional exemptions. Document the current exemption criteria and actual business figures if relying on one; an unfinished or free website is not by itself evidence of exemption. Check the applicable Israeli Standard 5568 requirements rather than treating WCAG 2.2 as the automatically mandated version. [Israel: public-service/commerce scope](https://www.gov.il/he/pages/website_accessibility?chapterIndex=3), [new-site timing](https://www.gov.il/he/pages/website_accessibility?chapterIndex=6), [exemptions](https://www.gov.il/he/pages/website_accessibility?chapterIndex=8), [service-accessibility regulations, including statement provisions](https://www.gov.il/BlobFolder/guide/accommodating_service_providing_rules/he/sitedocs_service_acessibility_regulations.pdf).

For US business coverage, DOJ guidance describes ADA obligations, but the exact application to an overseas software-only business requires legal assessment. Do not assume the public-sector technical rule automatically governs this private site. [US DOJ: web accessibility](https://www.ada.gov/resources/web-guidance/).

EU e-commerce accessibility requirements have applied to covered new services since 28 June 2025, with exceptions including qualifying microenterprises providing services. Assess the future checkout and relevant national implementation. [EU: accessibility requirements and exceptions](https://europa.eu/youreurope/business/selling-in-eu/selling-goods-services/accessibility/index_en.htm).

### L11 — Finalize contract scope and retain meaningful acceptance evidence

**Confirmed evidence:** the terms rely on website use/continued use as acceptance, license the application only “for your own use,” exclude liability broadly, and allow terms to change. The registration checkbox is a stronger affirmative step, but the client sends only `termsAccepted: boolean`; the server's `User` records `termsAcceptedAt` without the accepted policy version.

**Change:** distinguish website terms, account/review rules, and the desktop license. Define permitted personal/commercial use, redistribution and restrictions, support/update obligations, and the status of the free release consistently. Present the actual software license at a meaningful point before installation/use where needed. Preserve the accepted terms version and its text, date, and relevant acceptance event. Treat version records as an evidence recommendation, not a universal statutory database schema requirement.

Have counsel review liability limits, changes/notification, termination, dispute terms, and governing law for the operator and worldwide consumers. Explicitly preserve mandatory consumer rights and third-party license rights. Do not assume “as is,” a checkbox, continued browsing, or a chosen jurisdiction prevents claims. EU guidance identifies several one-sided liability/change provisions as potentially unfair. [EU: unfair contract terms](https://europa.eu/youreurope/citizens/consumers/unfair-treatment/unfair-contract-terms/index_en.htm).

Keep contract acceptance distinct from any optional privacy/marketing consent. A separate checkbox consenting to the entire privacy policy is not a universal fix.

### L12 — Make public reviews transparent and manageable

**Confirmed evidence:** `Reviews.tsx` offers a public name, rating, and body, but does not explain public visibility next to the posting controls or link the review rules there. It derives a default display name from the email prefix. The terms/privacy pages elsewhere explain publication and ownership. User withdrawal exists; no complaint/report UI or moderator-facing removal endpoint was found in the reviewed website/review controller.

**Change:** add a clear just-in-time publication notice and link the relevant rules/privacy information. Prefer an explicitly chosen pseudonym to an email-derived default. Establish a monitored route and internal process for privacy complaints, copyright complaints, defamation/unlawful material, impersonation, and moderation. An administrator can use an appropriate internal workflow; a particular public report button is not a universal legal requirement. Assess intermediary obligations for the actual launch markets and service classification before enabling reviews.

Publish genuine feedback fairly. Do not fabricate reviews, condition incentives on positive sentiment, conceal material connections, or remove legitimate negative reviews merely because they are negative. No fabricated seed reviews were found. The FTC's rules distinguish merely hosting reviews from creating or disseminating false testimonials; do not misread them as requiring investigation of every ordinary reviewer. [FTC: consumer-review rule Q&A](https://www.ftc.gov/business-guidance/resources/consumer-reviews-testimonials-rule-questions-answers).

The server returns only the newest 100 reviews; the client calculates the count/average over that response. If the total later exceeds 100, label the summary as the displayed subset or return an accurate overall aggregate. This is a future presentation issue, not evidence that the current ratings are fabricated.

### L13 — Complete desktop distribution compliance before any installer goes live

**Confirmed evidence:** `Download.tsx` has `BUILD = null`. `/licenses` expressly reserves version, copyright, configuration, and license text. `EXTERNAL_LINKS.FFMPEG_SOURCE` points to FFmpeg's generic download page, although its label says corresponding source.

**Change before enabling a download:** identify every exact bundled binary/library/version and its applicable license; ship the required notices with the installer and provide source/relinking materials where required. Cover the JRE/JavaFX distribution and native components, not just the names in the placeholder list.

For FFmpeg, inspect the actual build flags, libraries, modifications, and distribution arrangement. It is not safe to describe every FFmpeg binary as LGPL: GPL/nonfree options can change the result. Provide the exact corresponding source and build information through a compliant arrangement. A generic upstream download page is not evidence of this. FFmpeg's own checklist describes one route to compliance, including matching source, notices, configuration, and source hosting. [FFmpeg: legal considerations and compliance checklist](https://ffmpeg.org/legal.html).

For UnRAR, zlib, LZMA SDK, Zstandard, stb_image, Capstone, JavaFX/JRE, and remaining Java libraries, check the exact artifact's terms and any special restrictions/exceptions. Do not infer all are interchangeable permissive licenses. Whether the desktop application may remain proprietary depends on the actual combination and compliance approach; no conclusion was reached from the website placeholders. Assess codec/patent and distribution-country issues separately where relevant.

This gate applies to free downloads too. An informational site with no distributed installer does not itself prove a desktop distribution violation.

### L14 — Finish trial and consumer-sale terms before monetization

**Confirmed evidence:** the pricing page clearly labels `$X`/`$XX` as placeholders and says nothing can be bought. No checkout, card collection, or active subscription flow was found. The free-trial card nevertheless says “Open now,” sends users to a nonexistent download, and does not specify the trial duration. Other copy calls development use free without that limit.

**Change now:** state one accurate availability/development/free-trial position and remove misleading active-trial wording until there is a real offer.

**Before charging:** settle final prices/currency/taxes, duration, commercial-use rights, recurring billing/renewal, trial conversion, cancellation, refunds, functionality/compatibility, support, and trader contact details. Present key terms before the customer commits and supply the required confirmation. Do not assume every digital download is automatically nonrefundable; applicable consent/acknowledgment and consumer-law exceptions matter. [EU: online selling and digital-content rules](https://europa.eu/youreurope/business/selling-in-eu/selling-goods-services/ecommerce-distance-selling/index_en.htm).

If Israeli online consumer cancellation duties apply, implement the required prominent cancellation route and disclosures; do not treat account deletion as subscription cancellation. [Knesset: consumer cancellation amendment](https://main.knesset.gov.il/Activity/Legislation/Laws/Pages/LawBill.aspx?lawitemid=2002974).

Reassess payment-provider contracts, privacy disclosures, tax/invoicing, and country-specific subscription rules when the commercial model is known. These are conditional launch requirements, not missing active payment functionality in this version.

### L15 — Verify deployment security and privacy operations

**Confirmed code concerns:** `CookiesManager.ts` writes the remember token without `Secure`; JavaScript-set cookies cannot be `HttpOnly`. The session token is readable through `sessionStorage`. `ServerBridge.ts` accepts its configured API URL without requiring HTTPS. Confirmation/reset tokens remain in the browser query string. Host-level security configuration was not supplied.

**Change/verify before real accounts:** use HTTPS for the website/API, protect authentication cookies in production, and review a server-set HttpOnly remember-token design with the necessary transport/CSRF implications. Review XSS defenses, CSP, session expiry/revocation, and token removal/redaction from URLs/logs where practical. These are risk-based engineering recommendations, not a statement that a law prescribes one specific token architecture. [OWASP: session management](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html).

Document the hosting/provider arrangements, administrative permissions, backup protection/restoration, deletion schedule, supplier access, and incident response. Verify the live service rather than assuming the Vite development configuration establishes deployment security. Data-security duties can apply even if a database is exempt from registration. [Israel PPA: security-regulations FAQ](https://www.gov.il/he/pages/data_security_fqa?chapterIndex=1).

Have a real privacy-request procedure: monitored contact, proportionate identity checks, coverage of database/logs/suppliers/backups, applicable deadlines, and documented responses. A self-service account-delete button alone does not cover every privacy right. Classify incidents and prepare the applicable notification process; Israeli serious-incident reporting depends on the regulations and database classification. [Israel PPA: serious data-breach reporting](https://www.gov.il/he/service/report-of-data-breach).

Deploy the intended production output only, with direct navigation to `/privacy`, `/terms`, and other legal routes working. Confirm secrets, environment files, private notes, source maps with sensitive material, and unrelated directories are not published. The absence of deployment configuration is an unverified item, not proof those files are currently exposed.

### L16 — Treat worldwide coverage as a separate workstream

The user confirmed a global audience. Accessibility of a site from a country does not by itself settle every law's territorial reach, but intentionally offering services globally creates a stronger reason to assess destination-country requirements. EU guidance expressly distinguishes mere accessibility from offering services to people in the Union. [EDPB: territorial scope guidance](https://www.edpb.europa.eu/sites/default/files/files/file1/edpb_guidelines_3_2018_territorial_scope_after_public_consultation_en_0.pdf).

The following is an applicability screen, not country-by-country clearance:

| Market/topic | Required follow-up for SigaFlex | Authoritative starting point |
| --- | --- | --- |
| EU/EEA | Determine GDPR scope, any representative obligation, provider/transfer arrangements, national cookie rules, consumer protections, accessibility, and required local disclosures/languages. Do not assume a free service is outside privacy rules. | [EDPB territorial scope](https://www.edpb.europa.eu/sites/default/files/files/file1/edpb_guidelines_3_2018_territorial_scope_after_public_consultation_en_0.pdf) |
| UK | Assess UK privacy scope/representation separately, and use current PECR rules rather than an old universal cookie checklist. The ICO storage guidance was updated in April 2026. | [ICO: storage/access guidance](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/) |
| Israel, if operating there or otherwise within scope | Confirm controller/security duties and whether database registration/notification or a DPO is required. Amendment 13 narrowed registration; ordinary accounts do not automatically mean a database must be registered. | [PPA: registration after Amendment 13](https://www.gov.il/he/service/registration_in_the_database), [PPA: Amendment 13 Q&A](https://www.gov.il/he/pages/tikun13_qa?chapterIndex=6) |
| US/California | Screen state-specific privacy and consumer rules. CCPA has coverage criteria; do not assume every small site needs a sale/share opt-out link. Conversely, being below CCPA thresholds does not settle other laws such as CalOPPA's privacy-policy requirements. Assess actual tracking before writing DNT disclosures. | [California AG: CCPA coverage](https://oag.ca.gov/privacy/ccpa), [California AG: privacy-policy/CalOPPA guidance](https://oag.ca.gov/sites/all/files/agweb/pdfs/cybersecurity/making_your_privacy_practices_public.pdf) |
| Canada | Assess PIPEDA/provincial scope and establish meaningful, understandable consent and privacy practices where required; a generic EU lawful-basis paragraph is not a substitute. | [Canada OPC: meaningful consent](https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/p_principle/principles/p_consent/) |
| Quebec language requirements | The website is English-only. Determine whether offering the product in Quebec triggers French-language website/commercial-document requirements and implement the required localized content. Do not assume every foreign site is covered merely because it is reachable. | [OQLF: websites, social media, and commercial publications](https://www.oqlf.gouv.qc.ca/francisation/entreprises/memo-assistant-francisation/publications/fiche-medias-sociaux-sites-web-doc-publicitaires.pdf) |
| Australia | Assess Australian connection and Privacy Act coverage, including small-business exceptions and exceptions to those exceptions. Do not assume either automatic coverage or automatic exemption. Consumer-law obligations need separate assessment for sales. | [OAIC: small-business coverage](https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/organisations/small-business) |
| New Zealand | Assess whether the global offer amounts to carrying on business there. The regulator expressly addresses overseas organizations, privacy officers, and privacy statements. | [NZ Privacy Commissioner: overseas organizations](https://www.privacy.org.nz/resources-and-learning/knowledge-base/view/154/) |
| Brazil | Assess LGPD applicability, appropriate processing grounds, rights/contact arrangements, and transfers for the actual service. This review has not completed a Brazilian compliance assessment. | [ANPD: official LGPD FAQ](https://www.gov.br/anpd/pt-br/acesso-a-informacao/perguntas-frequentes) |
| India | Check the DPDP Act/Rules provisions and commencement dates applicable on the actual launch date. Official material describes an 18-month phased implementation following the 2025 Rules; do not assume every provision commenced simultaneously. | [MeitY: 2025–26 annual report, DPDP implementation](https://www.meity.gov.in/static/uploads/2026/04/46face7d48c8f6a97030f713ad5fdab4.pdf) |
| Other destinations | Additional national privacy, transfer/localization, accessibility, consumer, language, software-distribution, and tax requirements remain unassessed. Maintain a launch-country applicability list; obtain local advice or limit transactional availability where requirements are unresolved. | No claim of clearance is made for unassessed countries. |

Cross-border handling must follow the actual transfer route, not a generic statement that data might go anywhere. Identify where hosting, support email, backups, and providers operate; assess contractual safeguards and applicable transfer mechanisms. Israeli transfer regulations and New Zealand's overseas-disclosure guidance illustrate why one global paragraph is insufficient. [Israel: overseas database-transfer regulations](https://www.gov.il/BlobFolder/news/post_schrems_update/he/TakanotHul.pdf), [NZ: sending information overseas](https://www.privacy.org.nz/responsibilities/disclosing-personal-information-outside-new-zealand/).

## Additional conditional checks

- **Children:** choose an intended age audience and establish what happens if an underage user is identified. The forms currently have no stated age policy. US COPPA can cover child-directed services or general-audience services with actual knowledge of under-13 collection; it does not universally require every website to collect birth dates. Other markets need separate age/capacity assessment. [FTC: COPPA FAQ](https://www.ftc.gov/business-guidance/resources/complying-coppa-frequently-asked-questions).
- **Email marketing:** current source implements account messages, not a newsletter signup. Do not reuse account emails for promotional campaigns on the assumption that registration authorized them. Review applicable consent/opt-out rules before adding campaigns. US CAN-SPAM distinguishes messages by their primary purpose; adding promotion can change treatment. [FTC: CAN-SPAM business guide](https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business).
- **Third-party brands:** check the exact Claude, Codex, Gemini, YouTube, Instagram, and other marks used against the owners' current rules and truthful compatibility claims. LobeHub's copyright license does not establish trademark permission. Clarify independence where presentation could imply sponsorship; verify the compatibility advertised. OpenAI's official guide, for example, limits mark use to its guidelines. [OpenAI: brand guidelines](https://openai.com/brand/). Anthropic/Google permissions for these specific uses remain unverified.
- **SigaFlex name/logo:** record ownership and perform trademark clearance for relevant software/services and launch markets, including similar marks and unregistered uses where relevant. A domain/social handle or copyright footer does not establish clearance. No comprehensive registry clearance was performed in this review. Registration is not automatically required simply to launch. [USPTO: comprehensive clearance guidance](https://www.uspto.gov/trademarks/search/comprehensive-clearance-search-similar-trademarks).

## Release checklist

- [ ] Confirm operator country/entity, target-market treatment, hosting/providers, and whether launch is informational, free download, or paid.
- [ ] Resolve L01; publish final, accurate legal notices and real contact/business information.
- [ ] Resolve L02–L05 for the actual enabled storage, account, email, logging, and video behavior.
- [ ] Resolve L06–L08; make license notices available in the deployed artifact and retain media permissions/credits.
- [ ] Resolve L09; match claims and availability to the actual release.
- [ ] Resolve L10; verify accessibility and document any valid exemption.
- [ ] Resolve L11–L12 before accepting accounts/reviews; retain final acceptance evidence and establish complaint handling.
- [ ] Resolve L13 before adding an installer; check its actual binary/dependency inventory.
- [ ] Resolve L14 before any paid/trial offer becomes active.
- [ ] Resolve L15 in the production deployment; confirm operational privacy/security procedures.
- [ ] Complete L16's market review and remaining children/email/brand decisions.
- [ ] Rebuild the intended release and verify the deployed pages, artifacts, network/storage behavior, and legal links after fixes. A successful build alone does not establish legal compliance.

When implementing fixes, keep `SAFEGUARDS.md`, `THIRD_PARTIES.md`, and `OUTSIDE_ROUTES.md` consistent with the actual behavior. In particular, `OUTSIDE_ROUTES.md` still names a placeholder contact email and old policy paths. Do not weaken the existing file-locality, consent-gating, or click-to-load protections while correcting their disclosures.
