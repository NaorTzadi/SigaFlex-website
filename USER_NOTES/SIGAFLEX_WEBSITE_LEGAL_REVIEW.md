# SigaFlex: website-only pre-launch legal review

Review date: **29 October 2026**. Intended audience: **worldwide**, as confirmed by the owner.

Operator status: **an individual, not a registered business**. Operating country: **Israel**. Both confirmed by the owner on **31 October 2026**. The installer is not currently hosted or offered for download. Worldwide is the intended audience, not a change to the operator's country or evidence of clearance in every market.

Outstanding findings and current source rechecked **31 October 2026**. Scope separation and future-page readiness plan updated **31 October 2026**.

**Current scope only:** the live/pending informational SigaFlex website promoting an *upcoming* desktop product, including the website's existing or enabled account, review, marketing, video, file-detector, and website/API features. **No SigaFlex desktop installer, download, active desktop trial, or payment/checkout is available.** A present-tense promise about any of those features is a website-copy issue now, but implementing their legal/operational terms belongs to the separate [future product release review](../../../../Downloads/FUTURE_SIGAFLEX_RELEASE_LEGAL_REVIEW.md). A future-facing mention here is a placeholder, not a current launch gate.

**Legal-minimum rule for this review:** label each item **current legal duty (where applicable)**, **applicability to determine**, **current inaccurate claim to fix**, **optional preparation**, or **future-only**. Link mandatory items to a legal provision or regulator guidance and the specific site behavior/market that triggers them. Unknown applicability means *unresolved*, not *mandatory by default*. A recommended security pattern, extra website page, process, or lawyer review is not automatically a statutory requirement. Do the least needed to meet an obligation once established; do not promise complete legal clearance or zero lawsuit risk.

This file lists outstanding work only. Completed findings are removed; remaining IDs retain their original numbering. Conditional work applies only when the relevant feature or market is in scope; it is not automatically a blocker for an informational launch.

## Launch assessment

**Website issues remain to be resolved before enabling the affected features or making the affected claims.** The principal issues identified by the review are unfinished operator/policy details for covered data collection, inaccurate privacy disclosures, and overly broad or premature marketing claims. Payment and desktop-software matters are deferred to the future product review; they are not current website launch gates. Individual applicability assessments remain necessary before classifying any item as legally mandatory.

This is a source-based risk review, not legal clearance or a guarantee against lawsuits. A worldwide launch cannot be cleared against every country's laws from a repository review. The owner will operate as an individual in Israel; the name to publish where identification is required remains unresolved. Deployment files now identify several providers, but their live settings, contracts, retention and backup arrangements still need verification. Professional advice is optional unless some specific applicable rule requires it; this review does not establish a universal requirement to hire a lawyer before publishing the current website.

The current scope is the website and any enabled accounts, reviews, email and request logging. Applicable identification/privacy duties, data security and accessibility may concern that scope even without a hosted installer; determine actual applicability rather than assuming each rule covers every site. This report does not establish a requirement to register a business, publish a home address or identity number, or display Israel as a standalone mandatory country notice for the current site. Naming the responsible person for covered personal-data collection is a separate issue from business registration. Website operational arrangements mean who handles website data, access, retention, backups and privacy requests; they are internal practices whose legally required effects must be described accurately, not a requirement to publish every implementation detail.

**Future readiness:** preserve an identifiable place in the website structure for later download, desktop licence, trial, paid subscription, cancellation and any required sales disclosures. Known behavior and fill-in fields are specified in **Future website placeholders** below and expanded in [FUTURE_SIGAFLEX_RELEASE_LEGAL_REVIEW.md](../../../../Downloads/FUTURE_SIGAFLEX_RELEASE_LEGAL_REVIEW.md). This is **design preparation**, not a direction to activate, publish binding future contracts, or build billing now.

## Future website placeholders — specific design, not current obligations

**Purpose.** Make future website integration simple, without silently treating future software/commerce duties as current duties. The text and route names below are *proposed content slots*, not confirmation that a route/component exists, and not a legal ruling that each page must exist separately. Reuse existing `Pricing`, `Download`, `Terms`, and `/licenses` routes where appropriate; a separate route is only needed if applicable law or the chosen product flow makes it necessary. An inactive component may be planned in documentation without being built today.

### Confirmed product decisions to preserve

- **Now:** SigaFlex is an upcoming desktop product. No installer, download, active trial, purchase, subscription or payment is offered. Free website account registration may exist; registration alone is not a purchase or subscription.
- **When downloads launch:** one installer, downloadable and installable by anyone **without account or payment**. Limited-functionality **free tier requires no account**.
- **Trial after activation launches:** a **free account is required** to activate temporary expanded/full functionality. Trial length and whether a payment method is requested are **not settled**; do not imply automatic conversion to a paid subscription.
- **Paid after commerce launches:** account and successful payment required; an annual, automatically renewing subscription is the planned default. **The first paid entitlement runs for one year beginning at the moment of successful payment**. On an ordinary successful annual renewal, paid access continues for the next yearly period. Cancelling future automatic renewal **does not remove the already paid period**. If a paid period expires without a successful renewal extending it, the same installed application **falls back to the limited free tier**, without a reinstall or perpetual paid-version access.
- Users move between free, trial and paid **without reinstalling**. Activated use must function **offline without ongoing login or continuous licence-server access**. Final handling of offline subscription expiry and renewal synchronization must match those promises before release.

### Prepared content/structure slots

| Slot / possible route | Current public behavior | Ready for later; fill only when the feature actually launches | Legal status |
| --- | --- | --- | --- |
| Download (`/download`) | “SigaFlex is coming soon. Downloads are not yet available.” No operative download button. | Installer link, supported Windows versions/requirements, free-tier availability, and other disclosures if legally required. One installer serves all tiers. | Future; no obligation to distribute now. |
| Pricing / access (`/pricing` or existing Pricing) | Upcoming product; no “Start trial,” “Buy,” “Ships today,” or active price/checkout claim. | Explain free/accountless tier, account-based trial, paid annual tier; add final price/currency/taxes and the pre-purchase renewal/cancellation information required in applicable markets. | Correct present false availability now; sales details future. |
| Desktop software licence (proposed `/software-license`, or a clearly separated section of existing `/licenses`) | No operative grant of a desktop licence for a nonexistent download. A labelled “Software licence — to be published at release” placeholder may be internal only. | Identity of licensor, rights and restrictions, personal/commercial usage, distribution, third-party notices, software scope, updates/support if promised, and non-waivable rights. Decide later whether a click-through, in-installer notice or another presentation is required/appropriate. | A distinct EULA page/clickbox is **not presumed universally mandatory**. |
| Trial terms (section of Pricing or separate page if needed) | Inactive. No countdown or trial CTA. | Actual duration `[TRIAL_LENGTH]`, eligibility, access limitations, start/end event, and whether a trial ever converts to a paid offer. Do not insert an automatic charge without explicit actual agreement and legally required disclosures. | Future, conditional on real trial. |
| Paid subscription terms (Pricing/checkout plus linked full terms) | Inactive. Website account registration never implies payment or auto-renewal. | Annual fee `[PRICE] [CURRENCY]`, taxes, billing start, renewal date/time and cadence, automatic-renewal notice where applicable, payment failures, cancellation mechanism, continued paid access until paid end, fallback to free, refund/cancellation rights and any required confirmation/records. | Future; exact presentation and notices depend on market. |
| Subscription management / cancellation (possible account area) | No payment management controls for a non-existent subscription. | A way to stop **future renewals** without deleting the account; display paid-until date and entitlement; add any jurisdiction-required online cancellation method. Refunds are separate and cannot be assumed categorically unavailable for digital software. | Future, conditional on selling subscriptions. |
| Future trader/sales privacy details | No checkout, payment collection, or sales-trader details falsely presented as currently active. | Insert legally required operator/trader identification and contact/address information (which may differ from current privacy notice), payment-provider/checkout data disclosures, invoicing and any required market-specific information. | Future; do not invent a company, private street address or a current registration duty. |

**Reference wording allowed now (only if the website actually wants to describe the plan):** “SigaFlex is an upcoming Windows desktop application. Downloads, trials and paid subscriptions are not yet available. At release, a limited free version is planned without an account; expanded trial and paid access will require an account.” This is an *optional sample of truthful planned-feature messaging*, not required legal text, and it should be revised if plans change.

### Activation triggers — do not treat as current checklist tasks

1. **Before publishing the installer:** replace coming-soon copy, verify advertised functions and any actual software-use/legal notices, and audit applicable included third-party licences. Decide the user-facing desktop licence mechanism, if needed.
2. **Before enabling a real trial:** complete `[TRIAL_LENGTH]` and actual activation/end/paid-conversion behavior; display any legally necessary trial disclosures **before** activation.
3. **Before offering/charging the annual subscription:** fill every unresolved price, renewal, cancellation, refund, trader and checkout slot; implement the legally required disclosures, approvals and controls for the markets served. Test one-year entitlement, offline operation, cancellation and free fallback.
4. **If the software/commerce feature changes the website's data flows, jurisdictions or accessibility scope:** reassess the *additional* obligations caused by that specific change, not the whole future checklist as a blanket current obligation.

**Not a promise that future work is only text replacement:** Routes, page sections and static text can be prepared now. Actual checkout consent, billing records, renewal/cancellation mechanics, entitlement transitions, legally required notice timing and market-specific rules may also require working implementation and testing when activated. Do not fake those capabilities with placeholders.

## Scope and evidence

Reviewed the website's routes, account and review forms, browser storage, file detector, video embed, marketing copy, policy pages, dependencies, fonts, icons, public files, existing `dist/` output, and all five product screenshots. Also read relevant source in the adjacent `../file-analyzer-server` module to check the website's server-related promises.

The 31 October recheck compared the remaining findings with current website/server source and the deployment files, including `wrangler.toml`, `../file-analyzer-server/deploy/wrangler.toml`, `cloudflare-worker.js` and `DEPLOY.md`. Desktop-application dependency licensing is deferred to the future product review.

Online references below are legislation, regulators, standards bodies, or official project licenses. Sources were checked on the original review date; the FTC advertising guidance, ICO privacy-notice/storage guidance and OWASP session guidance were rechecked on 31 October. The remaining country references were not revalidated in this source recheck. Some government pages blocked direct retrieval during the original review; where relevant, their official indexed text was available.

Neither the original review nor this recheck ran the application or performed live browser/network, accessibility, penetration, payment, or deployed-host checks. The desktop application's complete code, installer, native dependencies, and runtime behavior were not audited; such auditing is not a condition for merely publishing a website, although currently published claims must remain accurate. The original `dist/` directory was inspected as an existing artifact, not certified as a fresh build; this recheck did not certify the current output. Secret environment values were not read or reproduced. No tests or builds were run for these documentation-only reviews.

Evidence labels used below:

- **Confirmed:** directly visible in reviewed source or assets.
- **Conditional:** depends on a feature being enabled or a law applying.
- **Unverified:** needs operational evidence, provenance, or jurisdiction-specific review.

## Current website: smallest useful implementation batch (once applicable)

| Order | Item | Work to start with | Effort |
| --- | --- | --- | --- |
| 1 | L14 and L09: current availability and product claims | Align Pricing, Download and related claims with the unpublished installer; remove active-trial and available-download claims. | Small |
| 2 | L01–L03: privacy information for active website collection | Verify current data flows; publish only the disclosures actually required and ensure they are accurate. Individual operator identity and live service/provider facts remain unresolved. | Depends on evidence |
| 3 | L12: public review publication notice, *if posting is enabled* | Resolve whether the visible name/contents are disclosed appropriately under applicable law. No specific report button or dashboard is presumed mandatory. | Small if applicable |

These are focused **current-site issues**, not a declaration that every design suggestion in the detailed review is legally required. L04 remains a cookie applicability assessment; L10 is an accessibility coverage/exemption decision; L15 is a security-duties check, not a mandatory checklist of every OWASP pattern. Do not build future product/checkout pages as an immediate legal task.
Finalizing L01/L02 for public data collection still requires the individual's name to publish and verification of the
configured providers, data locations, contracts and retention rules.

## Priorities

These are **website-only** suggested checkpoints, **not** a claim that each is mandatory by law. Apply a checkpoint only if the underlying feature is active and an applicable legal requirement or a presently inaccurate statement actually needs correcting.

| ID | Finding | Recommended gate | Evidence |
| --- | --- | --- | --- |
| L01 | Individual operator is confirmed; identification/policy text remains unfinished | Before covered account/review collection; finalize published placeholders | Confirmed; individual based in Israel |
| L02 | Privacy notice lacks important disclosures and operational detail | Before collecting visitor/account data | Confirmed omissions; applicability varies |
| L03 | Server logging exceeds the notice; retention is incomplete | Before enabling the public API | Confirmed |
| L04 | Automatic persistent sign-in needs assessment or an informed choice | Before public account activation | Confirmed behavior; exemptions depend on the requested purpose |
| L09 | Remaining disk-write, safety, coverage and AI-data claims need qualification | Before public launch | Confirmed copy; desktop behavior unverified |
| L10 | Accessibility obligations/exemption must be established; missing statement alone is not proof of a legal violation | Check scope and potential lawful small-operator exemption first | Confirmed no statement; applicability and turnover unverified |
| L11 | Website/account/review terms need correct current scope; desktop licence wording is premature | If website terms are used or accounts/reviews are enabled | Confirmed gaps; enforceability is jurisdiction-specific |
| L12 | Reviews need clearer publication/privacy information and moderation arrangements | Before enabling public reviews | Confirmed UI/backend gaps |
| L14 | Current website falsely implies an available download/active free trial | Correct existing public copy now; actual trial/payment terms deferred | Confirmed; no installer/checkout found |
| L15 | Deployment security and privacy operations need evidence | Before public accounts/API | Confirmed code concerns; deployment unverified |
| L16 | Worldwide availability needs a regional applicability and localization plan | Before claiming worldwide readiness | Unverified country coverage |

## Detailed findings and changes

### L01 — Publish real operator details and finalized policies

**Confirmed evidence:** `src/core/Constants.ts` still defines `SITE_OPERATOR = "Holder"` and `SITE_JURISDICTION = "Holder"`. `PolicyDraftNotice.tsx` explicitly labels both privacy and terms as placeholder drafts. The footer attributes copyright to `Holder`.

**Confirmed owner information:** the owner operates SigaFlex personally from Israel, without a registered business, and intends to serve a worldwide audience. Do not ask again whether the operator is a company. The remaining identification detail is the individual's name to publish where required for personal-data collection. Israel is the operating country; `SITE_JURISDICTION` is used for a chosen governing-law clause, not a mandatory country field that every personal website must display.

**Change for covered personal-data collection:** identify the responsible individual and provide working contact details in the collection/privacy information. Showing that the operator is based in Israel is a transparency recommendation, not a separately established universal country-notice duty. Do not require company details for an individual, or infer a present duty to publish a home address or identity number. Finalize relevant documents and their actual effective/update dates before removing the draft warning. `CONTACT_EMAIL` already contains a non-placeholder address; verify control of the published contact address. Do not invent a company name or treat sales-stage disclosures as an instruction to register a business, add checkout or host an installer now.

**Verified rule and scope:** Israel's section 11 collection notice for covered personal-data processing includes the controller's name and contact details, alongside purpose, voluntariness/consequences, recipients and access/correction rights. This concerns the person responsible for the data, not incorporation. The database definition has exclusions, including personal nonbusiness collections; an individual is not automatically exempt merely because no company is registered. Assess the actual public account/review activity rather than claiming every personal website must display its author's legal name. [Israel PPA: collection-notice guidance](https://www.gov.il/BlobFolder/legalinfo/duty_to_notify/he/notify13.pdf), [Israel PPA: database scope and duties](https://www.gov.il/BlobFolder/generalpage/manager_duties/he/InfoDuties_new.pdf).

**Future placeholder:** sales-stage trader/address disclosures are tracked in [the future product review](../../../../Downloads/FUTURE_SIGAFLEX_RELEASE_LEGAL_REVIEW.md); they are not an established requirement for the current no-sale website.

### L02 — Complete the privacy notice against the actual data lifecycle

**Confirmed evidence:** `src/pages/Policies/Privacy.tsx` omits accepted-request logs, support correspondence, the configured hosting/database/email providers, server-side session records, email-rate-limit records, and many retention periods. Its heading promises to explain how long data is kept, but most server-held categories have no period or criterion.

**Change:** make a data inventory first, then publish an accurate notice. For each relevant activity, identify data, purpose, recipients, storage location, retention/deletion rule, and the user's choices. Include website/CDN/API hosting, database/backups, email delivery, support email, and administrative access. Current configuration/documentation identifies Cloudflare for the website/API proxy, Google Cloud Run in `europe-west4`, Aiven MySQL in `ams`, and Gmail SMTP; the support address is also Gmail. The server deployment guide calls the website Cloudflare Pages, while the website now has a Workers static-assets configuration, so confirm the actual deployment. Verify the active services, contractual arrangements, backup locations and access; a configured compute/database region does not establish where every provider processes data. Explain whether information is optional and what happens if it is withheld. Complete the registration notice and add notices at reviews and relevant support collection points.

Use existing retention behavior rather than inventing missing jobs: server sessions expire after 30 minutes idle or 12 hours absolute, unconfirmed accounts are eligible for removal after seven days, and hashed-recipient email-budget records after one day, with periodic cleanup. Disclose those rules and the remaining account, review, security-log, support and backup lifecycles accurately.

For EU/UK coverage, address applicable lawful bases, legitimate interests, transfers/safeguards, rights and complaints, consent withdrawal, and any representative/DPO details that are actually required. A privacy-policy acknowledgment is not blanket consent for unrelated processing. The ICO's notice checklist covers these disclosures; its page is marked under review, so verify UK updates when finalizing. [ICO: right to be informed](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/individual-rights/right-to-be-informed/).

For Israel, the collection notice also needs the controller/contact, purpose, recipients and purpose of disclosure, whether provision is mandatory or voluntary and the consequence of refusal, and access/correction rights. The form currently links a draft instead of supplying a complete arrangement. [Israel PPA: controller duties, section 11](https://www.gov.il/BlobFolder/generalpage/manager_duties/he/InfoDuties_new.pdf).

Do not promise unlimited deletion or instantaneous removal from all backups unless that is the real process. Explain lawful retention exceptions and the backup lifecycle accurately.

### L03 — Correct the logging disclosure and implement a retention schedule

**Confirmed evidence in the adjacent server:**

- `ServerSecurity/RequestsFilter.java#doFilter` logs both accepted and rejected requests, including IP, method, and path. The privacy notice only discusses requests turned away.
- `Users/AuthController.java` logs email addresses for registration, login, and account-related requests. `CustomLogger.dev` uses INFO logging when enabled; its name does not mean development-only.
- `EmailService.java` logs delivery addresses.
- No security-event purge was found in the reviewed `ServerSecurityService`/`Daemon`; application/infrastructure log retention and access are not established by the checked files.

**Change:** inventory and minimize application, infrastructure, email, and security logs; set appropriate access restrictions and retention/deletion jobs for the remaining categories. Disclose ordinary request logging and relevant account/support logs. Distinguish six-hour IP-block expiry from retention of the event and log records behind that block. The Worker now forwards Cloudflare's client IP through a secret-protected header, and `RequestsFilter` uses it when configured, grouping IPv6 addresses by /64. Verify that this configuration is active and describe the actual logged identifier; do not assume all requests are recorded only under the proxy address.

Select defensible retention periods based on actual purposes and legal obligations; do not invent a universal number of days. Privacy transparency and data-security duties continue beyond the database table. [Israel PPA: security-regulations FAQ](https://www.gov.il/he/pages/data_security_fqa?chapterIndex=1), [ICO: privacy-information checklist](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/individual-rights/right-to-be-informed/).

### L04 — Assess automatic persistent sign-in

**Remaining evidence:** a successful login automatically accepts a persistent remember token for up to thirty days; `LoginForm.tsx` has no separate remember-me choice.

**Remaining work:** assess whether automatic persistent sign-in is necessary for the service the visitor requested, or offer an informed persistence choice. Assess browser storage against the applicable exemptions; session storage is not automatically outside storage rules. No optional first-party purpose currently depends on the cookie answer, so reopening that answer is not treated as a missing current consent control. If a new purpose requires consent, implement its choice and withdrawal controls before enabling it.

There is no universal requirement for every website to display an Accept/Decline modal. Exempt storage may need information rather than consent, and UK exceptions must not be assumed to apply worldwide. [ICO: current exceptions](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/what-are-the-exceptions/), [ICO: specific consent and withdrawal](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/how-do-we-manage-consent-in-practice/).

Preserve the existing safeguards when changing sign-in or consent behavior.

### L09 — Substantiate the remaining product claims

The owner confirmed that the application can be used without an internet connection,
while account connections make network requests. Website wording should preserve
that distinction.

**Confirmed evidence:**

- `Faq.tsx` still says that no temporary copies are left on disk.
- `AgentTerminalDemo.tsx` advertises exporting files/screenshots and AI tools, and says a file never leaves the box. It separately acknowledges that agents may contact a model.
- The tagline promises to open any file and show everything inside it. The website's format catalog is a manually defined list; the desktop implementation was not verified against it.
- `Download.tsx` says the installer is unpublished but also says Windows ships today; pricing advertises a trial as open now.

**Change:** distinguish the website's requests, built-in local parsing, explicit exports/conversions, external commands, and optional AI-agent activity. State that external agents can transmit inspected content under their own configuration/provider terms. Qualify disk-write claims so they do not cover exports, application state, converters, or OS behavior without evidence. Clearly label illustrative terminal sessions where appropriate.

Review statements about opening untrusted files: read-only parsing and not intentionally executing the inspected file do not establish immunity to parser vulnerabilities. Keep the existing “not a virus scanner” explanation and give users accurate scope near relevant claims.

Advertising claims should be truthful and supported; a footer disclaimer does not establish that an absolute headline is accurate. [FTC: advertising basics](https://www.ftc.gov/business-guidance/advertising-marketing/advertising-marketing-basics), [Israel Consumer Protection Authority: misleading advertising and related complaints](https://www.gov.il/he/service/filing_a_complaint_to_fair_trade_authority).

### L10 — Resolve accessibility applicability and verify the actual site

**Confirmed evidence:** there is no accessibility statement route or footer link in `Routing.tsx`/`Footer.tsx`. The local project notes request WCAG compliance, but no conformance assessment was supplied. Video captions/audio description and actual keyboard, screen-reader, contrast, zoom/reflow, and dialog behavior remain unverified.

**Conditional change:** first determine whether the website is covered and whether a valid exemption applies. If covered without exemption, implement the legally required accessibility features and only the legally required statement/contact details. Do not equate W3C best practices with mandatory legal standards. If accessibility duties apply, assess the covered functionality, including registration, cookie/policy dialogs, file picking, reviews, menus, motion and video. For moving content, check pause/stop requirements; reduced-motion handling is useful but does not establish every applicable criterion is met. [W3C: WCAG 2.2](https://www.w3.org/TR/WCAG22/).

Israel's regulator says a qualifying exempt dealer (עוסק פטור) or a covered service provider with turnover below ₪120,000 can use a **self-exemption** from internet-service accessibility, without applying to the regulator. Eligibility must actually be established and the exemption/underlying turnover evidence retained if relied upon: the regulator says it may need to be shown in enforcement or litigation. Not being formally registered, not yet selling software, or having an unfinished website is **not by itself** proof. Do not automatically require a full conformance project or an accessibility-statement route until coverage and exemption are resolved. For non-exempt duties, use the applicable Israeli Standard 5568, not automatically WCAG 2.2. [Israel: public-service/commerce scope](https://www.gov.il/he/pages/website_accessibility?chapterIndex=3), [new-site timing](https://www.gov.il/he/pages/website_accessibility?chapterIndex=6), [exemptions](https://www.gov.il/he/pages/website_accessibility?chapterIndex=8), [service-accessibility regulations, including statement provisions](https://www.gov.il/BlobFolder/guide/accommodating_service_providing_rules/he/sitedocs_service_acessibility_regulations.pdf).

For US business coverage, DOJ guidance describes ADA obligations, but the exact application to an overseas software-only business requires legal assessment. Do not assume the public-sector technical rule automatically governs this private site. [US DOJ: web accessibility](https://www.ada.gov/resources/web-guidance/).

**Future placeholder:** assess any applicable checkout/e-commerce accessibility rules if a trial, purchase or other covered service is later offered; see [the future product review](../../../../Downloads/FUTURE_SIGAFLEX_RELEASE_LEGAL_REVIEW.md).

### L11 — Keep website and account terms limited to the current service

**Confirmed evidence:** the existing terms rely on website use/continued use as acceptance, exclude liability broadly, and allow terms to change. The client sends only `termsAccepted: boolean`; the server's `User` records `termsAcceptedAt` without the accepted policy version. The terms also contain a premature software-licensing clause (“for your own use”) and references to third-party licence rights, despite the absence of a downloadable product.

**Current website scope:** assess website/account/review rules and the enforceability of their actual terms. Do not suggest that continued browsing necessarily constitutes contractual acceptance, or that broad liability exclusions override applicable mandatory rights. An accepted policy version is an evidence recommendation, **not** a universal legally required database field. Whether any website Terms of Service document is required at all is **not established** by this review. Keep contractual acceptance distinct from optional privacy or marketing consent; accepting a privacy policy is not blanket consent. [EU: unfair contract terms](https://europa.eu/youreurope/citizens/consumers/unfair-treatment/unfair-contract-terms/index_en.htm).

**Future placeholder:** remove, disable, or clearly mark inapplicable any software licence/redistribution/update/support terms that wrongly imply an available program. Preserve the proposed software-licence content slot described above, with legal text deferred until its actual permitted uses and applicable obligations are established. See [the future product review](../../../../Downloads/FUTURE_SIGAFLEX_RELEASE_LEGAL_REVIEW.md). No desktop licence text needs to be operative for this website-only launch.

### L12 — Make public reviews transparent and manageable

**Confirmed evidence:** `Reviews.tsx` does not explain public visibility next to the posting controls or link the review rules/privacy notice there. It derives a default display name from the email prefix. No review-complaint route or moderator-facing removal endpoint was found in the reviewed website/review controller; the general contact address alone does not establish the internal handling process.

**Change:** add a clear just-in-time publication notice and link the relevant rules/privacy information. Prefer an explicitly chosen pseudonym to an email-derived default. Establish a monitored route and internal process for privacy complaints, copyright complaints, defamation/unlawful material, impersonation, and moderation. An administrator can use an appropriate internal workflow; a particular public report button is not a universal legal requirement. Assess intermediary obligations for the actual launch markets and service classification before enabling reviews.

Publish genuine feedback fairly. Do not fabricate reviews, condition incentives on positive sentiment, conceal material connections, or remove legitimate negative reviews merely because they are negative. No fabricated seed reviews were found. The FTC's rules distinguish merely hosting reviews from creating or disseminating false testimonials; do not misread them as requiring investigation of every ordinary reviewer. [FTC: consumer-review rule Q&A](https://www.ftc.gov/business-guidance/resources/consumer-reviews-testimonials-rule-questions-answers).

The server returns only the newest 100 reviews; the client calculates the count/average over that response. If the total later exceeds 100, label the summary as the displayed subset or return an accurate overall aggregate. This is a future presentation issue, not evidence that the current ratings are fabricated.

### L14 — Correct website wording that implies a live trial or download

**Confirmed evidence:** the free-trial card says “Open now” and “Start free trial,” links to `/download` while that page has no published installer. Other copy calls development use free; no current payment flow was found.

**Change now:** describe SigaFlex as an **upcoming product** and make Pricing, Download, CTA buttons, and other availability claims accurate. Do not invite visitors to begin a trial or download a program that cannot be obtained. Retaining a future download/pricing route in the site's structure does not make a trial or purchase active.

**Future placeholder:** website integration slots for actual downloading, trial, annual auto-renewing subscriptions, billing, cancellations, refunds, tax/invoicing and commercial notices are outlined in **Future website placeholders** above. Their future legal/operational work belongs in [the future product review](../../../../Downloads/FUTURE_SIGAFLEX_RELEASE_LEGAL_REVIEW.md). They are **not** current website requirements or unfinished current checkout functionality.

### L15 — Verify deployment security and privacy operations

**Confirmed code concerns:** `CookiesManager.ts` writes the remember token without `Secure`; JavaScript-set cookies cannot be `HttpOnly`. The session token is readable through `sessionStorage`. `ServerBridge.ts` accepts its configured API URL without requiring HTTPS. Confirmation/reset tokens remain in the browser query string. The checked files do not establish the website's live CSP, security headers, HTTPS redirect or HSTS settings.

`../file-analyzer-server/deploy/DEPLOY.md` also documents distinguishable registration responses for new, pending and confirmed addresses, retained for controlled testing. Decide and address the public-launch account-enumeration risk before enabling registration.

**Change/verify before real accounts:** enforce and verify HTTPS for the website/API, protect authentication cookies in production, and review a server-set HttpOnly remember-token design with the necessary transport/CSRF implications. Review XSS defenses, CSP and token removal/redaction from URLs/logs where practical. Verify the implemented session expiry/revocation in the deployed service rather than treating those mechanisms as missing. These are risk-based engineering recommendations, not a statement that a law prescribes one specific token architecture. [OWASP: session management](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html).

Verify the video provider's actual network/storage behavior on the deployed site before and after Play and unloading, and assess any consent requirements for its actual purposes.

Verify the documented Cloudflare/Cloud Run/Aiven deployment against the live service, including proxy authentication, database permissions, provider access and regional settings. Document the remaining contractual, administrative, backup/restoration, deletion and incident-response arrangements. Data-security duties can apply even if a database is exempt from registration. [Israel PPA: security-regulations FAQ](https://www.gov.il/he/pages/data_security_fqa?chapterIndex=1).

Have a real privacy-request procedure: monitored contact, proportionate identity checks, coverage of database/logs/suppliers/backups, applicable deadlines, and documented responses. A self-service account-delete button alone does not cover every privacy right. Classify incidents and prepare the applicable notification process; Israeli serious-incident reporting depends on the regulations and database classification. [Israel PPA: serious data-breach reporting](https://www.gov.il/he/service/report-of-data-breach).

Verify that the deployed website uses the intended `dist` output and that direct navigation to `/privacy`, `/terms`, `/licenses` and other legal routes works. `wrangler.toml` already limits static assets to `./dist` and configures single-page-application fallback; verify the output contents and live behavior rather than adding a missing configuration. Confirm secrets, environment files, private notes, source maps with sensitive material and unrelated directories are not published. Source configuration alone does not prove what is deployed.

### L16 — Treat worldwide coverage as a separate workstream

The owner confirmed an Israeli base and an intended global audience. Accessibility of a site from a country does not by itself settle every law's territorial reach, but intentionally offering services globally creates a stronger reason to assess destination-country requirements. This section assesses the current website, its accounts/reviews and marketing only; a free service can also fall within privacy rules. Future distribution and sales are tracked separately. EU guidance expressly distinguishes mere accessibility from offering services to people in the Union. [EDPB: territorial scope guidance](https://www.edpb.europa.eu/sites/default/files/files/file1/edpb_guidelines_3_2018_territorial_scope_after_public_consultation_en_0.pdf), [European Commission: GDPR scope, including free services](https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/application-gdpr_en).

The following is an applicability screen, not country-by-country clearance:

| Market/topic | Required follow-up for SigaFlex | Authoritative starting point |
| --- | --- | --- |
| EU/EEA | Determine GDPR scope, any representative obligation, provider/transfer arrangements, national cookie rules, presently applicable website protections and accessibility, and required website disclosures/languages. Do not assume a free service is outside privacy rules. | [EDPB territorial scope](https://www.edpb.europa.eu/sites/default/files/files/file1/edpb_guidelines_3_2018_territorial_scope_after_public_consultation_en_0.pdf) |
| UK | Assess UK privacy scope/representation separately, and use current PECR rules rather than an old universal cookie checklist. The ICO storage guidance was updated in April 2026. | [ICO: storage/access guidance](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/) |
| Israel (confirmed operating country) | Assess and implement the applicable controller/security duties and determine whether database registration/notification or a DPO is required. Amendment 13 narrowed registration; ordinary accounts do not automatically mean a database must be registered. | [PPA: registration after Amendment 13](https://www.gov.il/he/service/registration_in_the_database), [PPA: Amendment 13 Q&A](https://www.gov.il/he/pages/tikun13_qa?chapterIndex=6) |
| US/California | Screen state-specific privacy and consumer rules. CCPA has coverage criteria; do not assume every small site needs a sale/share opt-out link. Conversely, being below CCPA thresholds does not settle other laws such as CalOPPA's privacy-policy requirements. Assess actual tracking before writing DNT disclosures. | [California AG: CCPA coverage](https://oag.ca.gov/privacy/ccpa), [California AG: privacy-policy/CalOPPA guidance](https://oag.ca.gov/sites/all/files/agweb/pdfs/cybersecurity/making_your_privacy_practices_public.pdf) |
| Canada | Assess PIPEDA/provincial scope and establish meaningful, understandable consent and privacy practices where required; a generic EU lawful-basis paragraph is not a substitute. | [Canada OPC: meaningful consent](https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/p_principle/principles/p_consent/) |
| Quebec language requirements | The website is English-only. Determine whether current marketing or website services directed toward Quebec trigger French-language website requirements; commercial sales/document obligations are deferred. Do not assume every foreign site is covered merely because it is reachable. | [OQLF: websites, social media, and commercial publications](https://www.oqlf.gouv.qc.ca/francisation/entreprises/memo-assistant-francisation/publications/fiche-medias-sociaux-sites-web-doc-publicitaires.pdf) |
| Australia | Assess Australian connection and Privacy Act coverage, including small-business exceptions and exceptions to those exceptions. Do not assume either automatic coverage or automatic exemption. Consumer-sales obligations are deferred to the future product review. | [OAIC: small-business coverage](https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/organisations/small-business) |
| New Zealand | Assess whether the global offer amounts to carrying on business there. The regulator expressly addresses overseas organizations, privacy officers, and privacy statements. | [NZ Privacy Commissioner: overseas organizations](https://www.privacy.org.nz/resources-and-learning/knowledge-base/view/154/) |
| Brazil | Assess LGPD applicability, appropriate processing grounds, rights/contact arrangements, and transfers for the actual service. This review has not completed a Brazilian compliance assessment. | [ANPD: official LGPD FAQ](https://www.gov.br/anpd/pt-br/acesso-a-informacao/perguntas-frequentes) |
| India | Check the DPDP Act/Rules provisions and commencement dates applicable on the actual launch date. Official material describes an 18-month phased implementation following the 2025 Rules; do not assume every provision commenced simultaneously. | [MeitY: 2025–26 annual report, DPDP implementation](https://www.meity.gov.in/static/uploads/2026/04/46face7d48c8f6a97030f713ad5fdab4.pdf) |
| Other destinations | Additional national website privacy, transfer/localization, accessibility, marketing and language requirements remain unassessed; software-distribution, sales and tax issues are deferred. Maintain a launch-country applicability list; obtain local advice or limit transactional availability where requirements are unresolved. | No claim of clearance is made for unassessed countries. |

Cross-border handling must follow the actual transfer route, not a generic statement that data might go anywhere. Identify where hosting, support email, backups, and providers operate; assess contractual safeguards and applicable transfer mechanisms. Israeli transfer regulations and New Zealand's overseas-disclosure guidance illustrate why one global paragraph is insufficient. [Israel: overseas database-transfer regulations](https://www.gov.il/BlobFolder/news/post_schrems_update/he/TakanotHul.pdf), [NZ: sending information overseas](https://www.privacy.org.nz/responsibilities/disclosing-personal-information-outside-new-zealand/).

## Additional conditional checks

- **Children:** choose an intended age audience and establish what happens if an underage user is identified. The forms currently have no stated age policy. US COPPA can cover child-directed services or general-audience services with actual knowledge of under-13 collection; it does not universally require every website to collect birth dates. Other markets need separate age/capacity assessment. [FTC: COPPA FAQ](https://www.ftc.gov/business-guidance/resources/complying-coppa-frequently-asked-questions).
- **Email marketing:** current source implements account messages, not a newsletter signup. Do not reuse account emails for promotional campaigns on the assumption that registration authorized them. Review applicable consent/opt-out rules before adding campaigns. US CAN-SPAM distinguishes messages by their primary purpose; adding promotion can change treatment. [FTC: CAN-SPAM business guide](https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business).
- **Third-party brands:** check the exact Claude, Codex, Gemini, YouTube, Instagram, and other marks used against the owners' current rules and truthful compatibility claims. LobeHub's copyright license does not establish trademark permission. Clarify independence where presentation could imply sponsorship; verify the compatibility advertised. OpenAI's official guide, for example, limits mark use to its guidelines. [OpenAI: brand guidelines](https://openai.com/brand/). Anthropic/Google permissions for these specific uses remain unverified.
- **SigaFlex name/logo:** record ownership and perform trademark clearance for relevant software/services and launch markets, including similar marks and unregistered uses where relevant. A domain/social handle or copyright footer does not establish clearance. No comprehensive registry clearance was performed in this review. Registration is not automatically required simply to launch. [USPTO: comprehensive clearance guidance](https://www.uspto.gov/trademarks/search/comprehensive-clearance-search-similar-trademarks).

## Release checklist

The following are a **website-only review checklist**, not a declaration that every action is legally compulsory. Apply legal duties only if applicable to the site's actual functions, users, and markets; distinguish them from risk-reduction recommendations.

- [ ] L01: determine and satisfy the operator/contact disclosure legally required for the current website's covered personal-data collection, without inventing a company or mandatory country notice.
- [ ] L02–L04: assess current website/account/review privacy notices, request logs, retention, and persistent sign-in against applicable requirements.
- [ ] L09 and L14: remove or qualify present-tense download/trial claims and substantiate marketing claims made **now** about the upcoming product.
- [ ] L10: assess website accessibility duties and any valid exemption; implement only what actually applies.
- [ ] L11–L12: scope website/account/review rules and public review notices appropriately; assess mandatory requirements before imposing optional controls.
- [ ] L15: verify security and privacy operations of the **website and its enabled APIs**, distinguishing law from OWASP best-practice recommendations.
- [ ] L16 and conditional checks: determine applicability to **current** website visitors, data, marketing, brands and publication targets.
- [ ] Verify the website's deployed pages, assets, network/storage behavior, and applicable legal links. A successful build alone does not establish legal compliance.

**Future placeholder (not a current checkbox):** reserve the named website sections/content slots in **Future website placeholders** above. Download/installer and desktop licences, real trial activation, yearly auto-renewing paid access, legally applicable cancellation/refunds, sales information and distribution duties are tracked in [FUTURE_SIGAFLEX_RELEASE_LEGAL_REVIEW.md](../../../../Downloads/FUTURE_SIGAFLEX_RELEASE_LEGAL_REVIEW.md). Do not activate these sections or imply that the software or subscription is available. A documentation-only placeholder is enough today.

When implementing present website fixes, keep `USER_NOTES/SAFEGUARDS.md`, `LICENSES_INDEX_MAP.md`, and `OUTSIDE_ROUTES.md` consistent with the actual behavior. Do not weaken the existing file-locality, consent-gating, or click-to-load protections while correcting their disclosures.
