# SigaFlex: pre-launch legal risk review

Review date: **29 October 2026**. Intended audience: **worldwide**, as confirmed by the owner.

Operator status: **an individual, not a registered business**. Operating country: **Israel**. Both confirmed by the owner on **31 October 2026**. The installer is not currently hosted or offered for download. Worldwide is the intended audience, not a change to the operator's country or evidence of clearance in every market.

Outstanding findings and current source rechecked **31 October 2026**.

This file lists outstanding work only. Completed findings are removed; remaining IDs retain their original numbering. Conditional work applies only when the relevant feature or market is in scope; it is not automatically a blocker for an informational launch.

## Launch assessment

**Changes are needed before public launch.** The clearest remaining issues are unfinished operator/policy details, inaccurate privacy disclosures, and overly broad product claims. Accounts and payments create additional obligations at different stages.

This is a source-based risk review, not legal clearance or a guarantee against lawsuits. A worldwide launch cannot be cleared against every country's laws from a repository review. The owner will operate as an individual in Israel; the name to publish where identification is required and the paid-launch plan remain unresolved. Deployment files now identify several providers, but their live settings, contracts, retention and backup arrangements still need verification. Professional review is recommended for unresolved applicability, policy and sales questions; it is not presented as a universal requirement to hire a lawyer before publishing a personal project.

The current scope is the website and any enabled accounts, reviews, email and request logging. Applicable identification/privacy duties, data security and accessibility concern that scope even without a hosted installer. This report does not establish a requirement to register a business, publish a home address or identity number, or display Israel as a standalone mandatory country notice for the current site. Naming the responsible person for covered personal-data collection is a separate issue from business registration. Desktop distribution/licence work becomes relevant before offering the program; prices, billing, renewal, cancellation and refund terms become relevant before an active trial or paid offer. Website operational arrangements mean who handles website data, access, retention, backups and privacy requests; they are internal practices whose relevant effects must be described accurately, not a requirement to publish every implementation detail.

## Scope and evidence

Reviewed the website's routes, account and review forms, browser storage, file detector, video embed, marketing copy, policy pages, dependencies, fonts, icons, public files, existing `dist/` output, and all five product screenshots. Also read relevant source in the adjacent `../file-analyzer-server` module to check the website's server-related promises.

The 31 October recheck compared the remaining findings with current website/server source and the deployment files, including `wrangler.toml`, `../file-analyzer-server/deploy/wrangler.toml`, `cloudflare-worker.js` and `DEPLOY.md`. Desktop-application dependency licensing remains outside this website review's scope.

Online references below are legislation, regulators, standards bodies, or official project licenses. Sources were checked on the original review date; the FTC advertising guidance, ICO privacy-notice/storage guidance and OWASP session guidance were rechecked on 31 October. The remaining country references were not revalidated in this source recheck. Some government pages blocked direct retrieval during the original review; where relevant, their official indexed text was available.

Neither the original review nor this recheck ran the application or performed live browser/network, accessibility, penetration, payment, or deployed-host checks. The desktop application's complete code, installer, native dependencies, and runtime behavior were not audited. The original `dist/` directory was inspected as an existing artifact, not certified as a fresh build; this recheck did not certify the current output. Secret environment values were not read or reproduced. No tests or builds were run for these documentation-only reviews.

Evidence labels used below:

- **Confirmed:** directly visible in reviewed source or assets.
- **Conditional:** depends on a feature being enabled or a law applying.
- **Unverified:** needs operational evidence, provenance, or jurisdiction-specific review.

## Next implementation batch

| Order | Item | Work to start with | Effort |
| --- | --- | --- | --- |
| 1 | L12: review posting UI | Explain public visibility next to posting controls, link privacy/review rules, and stop deriving the default public name from the email address. | Small |
| 2 | L14 and L09: availability wording | Align Pricing, Download and related copy with the unpublished installer; remove active-trial and available-download claims. | Small |

These are focused website changes that do not require operator or hosting decisions.
Persistent sign-in remains in L04, and moderation arrangements remain in L12.
Finalizing L01/L02 for public data collection still requires the individual's name to publish and verification of the
configured providers, data locations, contracts and retention rules.

## Priorities

These are recommended release gates, not a claim that each item is universally required by law.

| ID | Finding | Recommended gate | Evidence |
| --- | --- | --- | --- |
| L01 | Individual operator is confirmed; identification/policy text remains unfinished | Before covered account/review collection; finalize published placeholders | Confirmed; individual based in Israel |
| L02 | Privacy notice lacks important disclosures and operational detail | Before collecting visitor/account data | Confirmed omissions; applicability varies |
| L03 | Server logging exceeds the notice; retention is incomplete | Before enabling the public API | Confirmed |
| L04 | Automatic persistent sign-in needs assessment or an informed choice | Before public account activation | Confirmed behavior; exemptions depend on the requested purpose |
| L09 | Remaining disk-write, safety, coverage and AI-data claims need qualification | Before public launch | Confirmed copy; desktop behavior unverified |
| L10 | Accessibility statement is missing; conformance remains unverified | Before public launch unless a valid exemption applies | Confirmed missing statement; technical assessment pending |
| L11 | Terms need final scope, acceptance evidence, and consumer-rights review | Before accounts/downloads; revisit before sales | Confirmed gaps; enforceability is jurisdiction-specific |
| L12 | Reviews need clearer publication/privacy information and moderation arrangements | Before enabling public reviews | Confirmed UI/backend gaps |
| L14 | Trial and paid terms are unfinished | Before presenting an active trial or accepting payment | Confirmed; no checkout found |
| L15 | Deployment security and privacy operations need evidence | Before public accounts/API | Confirmed code concerns; deployment unverified |
| L16 | Worldwide availability needs a regional applicability and localization plan | Before claiming worldwide readiness | Unverified country coverage |

## Detailed findings and changes

### L01 — Publish real operator details and finalized policies

**Confirmed evidence:** `src/core/Constants.ts` still defines `SITE_OPERATOR = "Holder"` and `SITE_JURISDICTION = "Holder"`. `PolicyDraftNotice.tsx` explicitly labels both privacy and terms as placeholder drafts. The footer attributes copyright to `Holder`.

**Confirmed owner information:** the owner operates SigaFlex personally from Israel, without a registered business, and intends to serve a worldwide audience. Do not ask again whether the operator is a company. The remaining identification detail is the individual's name to publish where required for personal-data collection. Israel is the operating country; `SITE_JURISDICTION` is used for a chosen governing-law clause, not a mandatory country field that every personal website must display.

**Change for covered personal-data collection:** identify the responsible individual and provide working contact details in the collection/privacy information. Showing that the operator is based in Israel is a transparency recommendation, not a separately established universal country-notice duty. Do not require company details for an individual, or infer a present duty to publish a home address or identity number. Finalize relevant documents and their actual effective/update dates before removing the draft warning. `CONTACT_EMAIL` already contains a non-placeholder address; verify control of the published contact address. Do not invent a company name or treat sales-stage disclosures as an instruction to register a business, add checkout or host an installer now.

**Verified rule and scope:** Israel's section 11 collection notice for covered personal-data processing includes the controller's name and contact details, alongside purpose, voluntariness/consequences, recipients and access/correction rights. This concerns the person responsible for the data, not incorporation. The database definition has exclusions, including personal nonbusiness collections; an individual is not automatically exempt merely because no company is registered. Assess the actual public account/review activity rather than claiming every personal website must display its author's legal name. [Israel PPA: collection-notice guidance](https://www.gov.il/BlobFolder/legalinfo/duty_to_notify/he/notify13.pdf), [Israel PPA: database scope and duties](https://www.gov.il/BlobFolder/generalpage/manager_duties/he/InfoDuties_new.pdf).

Sales-stage trader/address disclosures must be assessed if the project begins making relevant offers or sales. They are not an established current requirement for this no-sale stage. [EU: distance-selling information](https://europa.eu/youreurope/business/selling-in-eu/selling-goods-services/ecommerce-distance-selling/index_en.htm).

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

**Confirmed evidence:** the terms rely on website use/continued use as acceptance, license the application only “for your own use,” exclude liability broadly, and allow terms to change. The client sends only `termsAccepted: boolean`; the server's `User` records `termsAcceptedAt` without the accepted policy version. The terms preserve third-party licence rights but do not expressly preserve mandatory consumer rights.

**Change:** distinguish website terms, account/review rules, and the desktop license. Define permitted personal/commercial use, redistribution and restrictions, support/update obligations, and the status of the free release consistently. Present the actual software license at a meaningful point before installation/use where needed. Preserve the accepted terms version and its text, date, and relevant acceptance event. Treat version records as an evidence recommendation, not a universal statutory database schema requirement.

Have counsel review liability limits, changes/notification, termination, dispute terms, and governing law for the operator and worldwide consumers. Explicitly preserve mandatory consumer rights. Do not assume “as is,” a checkbox, continued browsing, or a chosen jurisdiction prevents claims. EU guidance identifies several one-sided liability/change provisions as potentially unfair. [EU: unfair contract terms](https://europa.eu/youreurope/citizens/consumers/unfair-treatment/unfair-contract-terms/index_en.htm).

Keep contract acceptance distinct from any optional privacy/marketing consent. A separate checkbox consenting to the entire privacy policy is not a universal fix.

### L12 — Make public reviews transparent and manageable

**Confirmed evidence:** `Reviews.tsx` does not explain public visibility next to the posting controls or link the review rules/privacy notice there. It derives a default display name from the email prefix. No review-complaint route or moderator-facing removal endpoint was found in the reviewed website/review controller; the general contact address alone does not establish the internal handling process.

**Change:** add a clear just-in-time publication notice and link the relevant rules/privacy information. Prefer an explicitly chosen pseudonym to an email-derived default. Establish a monitored route and internal process for privacy complaints, copyright complaints, defamation/unlawful material, impersonation, and moderation. An administrator can use an appropriate internal workflow; a particular public report button is not a universal legal requirement. Assess intermediary obligations for the actual launch markets and service classification before enabling reviews.

Publish genuine feedback fairly. Do not fabricate reviews, condition incentives on positive sentiment, conceal material connections, or remove legitimate negative reviews merely because they are negative. No fabricated seed reviews were found. The FTC's rules distinguish merely hosting reviews from creating or disseminating false testimonials; do not misread them as requiring investigation of every ordinary reviewer. [FTC: consumer-review rule Q&A](https://www.ftc.gov/business-guidance/resources/consumer-reviews-testimonials-rule-questions-answers).

The server returns only the newest 100 reviews; the client calculates the count/average over that response. If the total later exceeds 100, label the summary as the displayed subset or return an accurate overall aggregate. This is a future presentation issue, not evidence that the current ratings are fabricated.

### L14 — Finish trial and consumer-sale terms before monetization

**Confirmed evidence:** the free-trial card says “Open now” and “Start free trial,” links to `/download` while that page has no published installer, and does not specify the trial duration. Other copy calls development use free without that limit. Paid checkout/subscription work below is conditional; no current payment flow was found.

**Change now:** state one accurate availability/development/free-trial position and remove misleading active-trial wording until there is a real offer.

**Before charging:** settle final prices/currency/taxes, duration, commercial-use rights, recurring billing/renewal, trial conversion, cancellation, refunds, functionality/compatibility, support, and trader contact details. Present key terms before the customer commits and supply the required confirmation. Do not assume every digital download is automatically nonrefundable; applicable consent/acknowledgment and consumer-law exceptions matter. [EU: online selling and digital-content rules](https://europa.eu/youreurope/business/selling-in-eu/selling-goods-services/ecommerce-distance-selling/index_en.htm).

If Israeli online consumer cancellation duties apply, implement the required prominent cancellation route and disclosures; do not treat account deletion as subscription cancellation. [Knesset: consumer cancellation amendment](https://main.knesset.gov.il/Activity/Legislation/Laws/Pages/LawBill.aspx?lawitemid=2002974).

Reassess payment-provider contracts, privacy disclosures, tax/invoicing, and country-specific subscription rules when the commercial model is known. These are conditional launch requirements, not missing active payment functionality in this version.

### L15 — Verify deployment security and privacy operations

**Confirmed code concerns:** `CookiesManager.ts` writes the remember token without `Secure`; JavaScript-set cookies cannot be `HttpOnly`. The session token is readable through `sessionStorage`. `ServerBridge.ts` accepts its configured API URL without requiring HTTPS. Confirmation/reset tokens remain in the browser query string. The checked files do not establish the website's live CSP, security headers, HTTPS redirect or HSTS settings.

`../file-analyzer-server/deploy/DEPLOY.md` also documents distinguishable registration responses for new, pending and confirmed addresses, retained for controlled testing. Decide and address the public-launch account-enumeration risk before enabling registration.

**Change/verify before real accounts:** enforce and verify HTTPS for the website/API, protect authentication cookies in production, and review a server-set HttpOnly remember-token design with the necessary transport/CSRF implications. Review XSS defenses, CSP and token removal/redaction from URLs/logs where practical. Verify the implemented session expiry/revocation in the deployed service rather than treating those mechanisms as missing. These are risk-based engineering recommendations, not a statement that a law prescribes one specific token architecture. [OWASP: session management](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html).

Verify the video provider's actual network/storage behavior on the deployed site before and after Play and unloading, and assess any consent requirements for its actual purposes.

Verify the documented Cloudflare/Cloud Run/Aiven deployment against the live service, including proxy authentication, database permissions, provider access and regional settings. Document the remaining contractual, administrative, backup/restoration, deletion and incident-response arrangements. Data-security duties can apply even if a database is exempt from registration. [Israel PPA: security-regulations FAQ](https://www.gov.il/he/pages/data_security_fqa?chapterIndex=1).

Have a real privacy-request procedure: monitored contact, proportionate identity checks, coverage of database/logs/suppliers/backups, applicable deadlines, and documented responses. A self-service account-delete button alone does not cover every privacy right. Classify incidents and prepare the applicable notification process; Israeli serious-incident reporting depends on the regulations and database classification. [Israel PPA: serious data-breach reporting](https://www.gov.il/he/service/report-of-data-breach).

Verify that the deployed website uses the intended `dist` output and that direct navigation to `/privacy`, `/terms`, `/licenses` and other legal routes works. `wrangler.toml` already limits static assets to `./dist` and configures single-page-application fallback; verify the output contents and live behavior rather than adding a missing configuration. Confirm secrets, environment files, private notes, source maps with sensitive material and unrelated directories are not published. Source configuration alone does not prove what is deployed.

### L16 — Treat worldwide coverage as a separate workstream

The owner confirmed an Israeli base and an intended global audience. Accessibility of a site from a country does not by itself settle every law's territorial reach, but intentionally offering services globally creates a stronger reason to assess destination-country requirements. Assess the website's accounts/reviews separately from future software distribution and sales; a free service can also fall within privacy rules. EU guidance expressly distinguishes mere accessibility from offering services to people in the Union. [EDPB: territorial scope guidance](https://www.edpb.europa.eu/sites/default/files/files/file1/edpb_guidelines_3_2018_territorial_scope_after_public_consultation_en_0.pdf), [European Commission: GDPR scope, including free services](https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/application-gdpr_en).

The following is an applicability screen, not country-by-country clearance:

| Market/topic | Required follow-up for SigaFlex | Authoritative starting point |
| --- | --- | --- |
| EU/EEA | Determine GDPR scope, any representative obligation, provider/transfer arrangements, national cookie rules, consumer protections, accessibility, and required local disclosures/languages. Do not assume a free service is outside privacy rules. | [EDPB territorial scope](https://www.edpb.europa.eu/sites/default/files/files/file1/edpb_guidelines_3_2018_territorial_scope_after_public_consultation_en_0.pdf) |
| UK | Assess UK privacy scope/representation separately, and use current PECR rules rather than an old universal cookie checklist. The ICO storage guidance was updated in April 2026. | [ICO: storage/access guidance](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/) |
| Israel (confirmed operating country) | Assess and implement the applicable controller/security duties and determine whether database registration/notification or a DPO is required. Amendment 13 narrowed registration; ordinary accounts do not automatically mean a database must be registered. | [PPA: registration after Amendment 13](https://www.gov.il/he/service/registration_in_the_database), [PPA: Amendment 13 Q&A](https://www.gov.il/he/pages/tikun13_qa?chapterIndex=6) |
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

- [ ] Resolve the individual's name/contact notice for covered collection, target-market treatment and the configured providers' actual data handling, using the confirmed individual-in-Israel and website-without-installer scope. No business-registration requirement is established by this review. Reassess before enabling downloads, an active trial or payments.
- [ ] Resolve L01; publish final, accurate legal notices and real contact/business information.
- [ ] Resolve L02–L04 for account/privacy information, remaining logging/retention gaps, and automatic persistent sign-in.
- [ ] Resolve L09; match claims and availability to the actual release.
- [ ] Resolve L10; verify accessibility and document any valid exemption.
- [ ] Resolve L11–L12 before accepting accounts/reviews; retain final acceptance evidence and establish complaint handling.
- [ ] Resolve L14 before any paid/trial offer becomes active.
- [ ] Resolve L15 in the production deployment; confirm operational privacy/security procedures.
- [ ] Complete L16's market review and remaining children/email/brand decisions.
- [ ] Rebuild the intended release and verify the deployed pages, artifacts, network/storage behavior, and legal links after fixes. A successful build alone does not establish legal compliance.

When implementing fixes, keep `USER_NOTES/SAFEGUARDS.md`, `LICENSES_INDEX_MAP.md`, and `OUTSIDE_ROUTES.md` consistent with the actual behavior. Do not weaken the existing file-locality, consent-gating, or click-to-load protections while correcting their disclosures.
