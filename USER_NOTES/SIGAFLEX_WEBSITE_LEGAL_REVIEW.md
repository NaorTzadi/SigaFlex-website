# SigaFlex: website-only pre-launch legal review

Review date: **29 October 2026**. Intended audience: **worldwide**, as confirmed by the owner.

Operator status: **an individual, not a registered business**. Operating country: **Israel**. Both confirmed by the owner on **31 October 2026**. The installer is not currently hosted or offered for download.

**Filter (owner's decision, 31 October 2026):** this file lists only items with realistic lawsuit or regulator-fine exposure. Accuracy polish and best-practice items without that exposure were removed: persistent sign-in (L04), desktop-claim verification (L09), Terms scope wording (L11), remaining availability wording (L14), the country-by-country applicability screen (L16), and the children, email-marketing and SigaFlex-trademark checks. Remaining IDs keep their original numbering.

**Current scope only:** the informational website for an *upcoming* desktop product, with its accounts, reviews, email and request logging. No installer, download, active trial, or payment is available. This is a source-based risk review, not legal clearance or a guarantee against lawsuits.

## Priorities, by exposure

| Order | ID | Risk | Why it is real | Blocked on |
| --- | --- | --- | --- | --- |
| 1 | L10 | Accessibility | Israel has heavy accessibility litigation; statutory damages can be claimed without proof of harm. | Owner's turnover/tax status for the self-exemption |
| 2 | L15 | Data breach | Real accounts and emails create breach liability and Israeli data-security duties. | Mostly code; deployment checks |
| 3 | L01–L03 | Inaccurate privacy notice | Regulators fine notices that do not match actual collection. | Owner's published name; live providers and log retention |
| 4 | L12 | Unmoderated reviews | Ignoring a defamation/copyright complaint about a hosted review creates liability. | Server removal path |
| 5 | L17 | Third-party AI brand logos | Use outside brand guidelines invites a takedown demand. | Checking each brand guide |

**Future, not current:** once auto-renewing subscriptions are sold, renewal/cancellation rules carry real class-action (US) and consumer-law (Israel) exposure. Tracked in [FUTURE_SIGAFLEX_RELEASE_LEGAL_REVIEW.md](../../../../Downloads/FUTURE_SIGAFLEX_RELEASE_LEGAL_REVIEW.md).

## Detailed findings and changes

### L10 — Resolve accessibility applicability

**Confirmed evidence:** there is no accessibility statement route or footer link in `Routing.tsx`/`Footer.tsx`. No conformance assessment was supplied. Video captions/audio description and actual keyboard, screen-reader, contrast, zoom/reflow, and dialog behavior remain unverified.

**Change:** first determine whether the website is covered and whether a valid exemption applies. Israel's regulator says a qualifying exempt dealer (עוסק פטור) or a covered service provider with turnover below ₪120,000 can use a **self-exemption** from internet-service accessibility, without applying to the regulator. Eligibility must actually be established and the turnover evidence retained if relied upon: the regulator says it may need to be shown in enforcement or litigation. Not being formally registered, not yet selling software, or having an unfinished website is **not by itself** proof. If covered without exemption, meet Israeli Standard 5568 and publish the required statement/contact details, covering registration, cookie/policy dialogs, file picking, reviews, menus, motion and video. [Israel: public-service/commerce scope](https://www.gov.il/he/pages/website_accessibility?chapterIndex=3), [new-site timing](https://www.gov.il/he/pages/website_accessibility?chapterIndex=6), [exemptions](https://www.gov.il/he/pages/website_accessibility?chapterIndex=8), [service-accessibility regulations, including statement provisions](https://www.gov.il/BlobFolder/guide/accommodating_service_providing_rules/he/sitedocs_service_acessibility_regulations.pdf).

For US business coverage, DOJ guidance describes ADA obligations, but the exact application to an overseas business requires legal assessment. [US DOJ: web accessibility](https://www.ada.gov/resources/web-guidance/).

### L15 — Deployment security and privacy operations

**Confirmed code concerns:** `CookiesManager.ts` writes the remember token without `Secure`; JavaScript-set cookies cannot be `HttpOnly`. The session token is readable through `sessionStorage`. `ServerBridge.ts` accepts its configured API URL without requiring HTTPS. Confirmation/reset tokens remain in the browser query string. The checked files do not establish the website's live CSP, security headers, HTTPS redirect or HSTS settings.

`../file-analyzer-server/deploy/DEPLOY.md` documents distinguishable registration responses for new, pending and confirmed addresses, retained for controlled testing. Address this account-enumeration risk before enabling public registration.

**Change before real accounts:** enforce and verify HTTPS for the website/API, protect authentication cookies in production, and review a server-set HttpOnly remember-token design with its transport/CSRF implications. Review XSS defenses, CSP and token removal/redaction from URLs/logs. Verify session expiry/revocation in the deployed service. [OWASP: session management](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html).

Verify the documented Cloudflare/Cloud Run/Aiven deployment against the live service, including proxy authentication, database permissions, provider access and regional settings. Document backup/restoration, deletion and incident-response arrangements. Data-security duties can apply even if a database is exempt from registration. [Israel PPA: security-regulations FAQ](https://www.gov.il/he/pages/data_security_fqa?chapterIndex=1).

Have a real privacy-request procedure: monitored contact, proportionate identity checks, coverage of database/logs/suppliers/backups, applicable deadlines, and documented responses. Prepare the breach-notification process; Israeli serious-incident reporting depends on the regulations and database classification. [Israel PPA: serious data-breach reporting](https://www.gov.il/he/service/report-of-data-breach).

Confirm secrets, environment files, private notes, sensitive source maps and unrelated directories are not published with `dist`.

### L01 — Publish real operator details and finalized policies

**Confirmed evidence:** `src/core/Constants.ts` still defines `SITE_OPERATOR = "Holder"` and `SITE_JURISDICTION = "Holder"`. `PolicyDraftNotice.tsx` labels both privacy and terms as placeholder drafts. The footer attributes copyright to `Holder`.

**Confirmed owner information:** the owner operates SigaFlex personally from Israel, without a registered business. Do not ask again whether the operator is a company. The remaining detail is the individual's name to publish.

**Change:** identify the responsible individual and working contact details in the privacy information. Do not invent a company or infer a duty to publish a home address or identity number. Finalize the documents and their dates before removing the draft warning. Verify control of `CONTACT_EMAIL`. Israel's section 11 collection notice includes the controller's name and contact details, purpose, voluntariness/consequences, recipients and access/correction rights. [Israel PPA: collection-notice guidance](https://www.gov.il/BlobFolder/legalinfo/duty_to_notify/he/notify13.pdf), [Israel PPA: database scope and duties](https://www.gov.il/BlobFolder/generalpage/manager_duties/he/InfoDuties_new.pdf).

### L02 — Complete the privacy notice against the actual data lifecycle

**Confirmed evidence:** `src/pages/Policies/Privacy.tsx` omits accepted-request logs, support correspondence, the configured hosting/database/email providers, server-side session records, email-rate-limit records, and many retention periods.

**Change:** make a data inventory, then publish an accurate notice. For each activity, identify data, purpose, recipients, storage location, retention/deletion rule, and the user's choices. Current configuration identifies Cloudflare for the website/API proxy, Google Cloud Run in `europe-west4`, Aiven MySQL in `ams`, and Gmail SMTP; the support address is also Gmail. The server guide calls the website Cloudflare Pages while the website has a Workers static-assets configuration, so confirm the actual deployment.

Use existing retention behavior: server sessions expire after 30 minutes idle or 12 hours absolute, unconfirmed accounts are eligible for removal after seven days, and hashed-recipient email-budget records after one day. Disclose those and the remaining account, review, security-log, support and backup lifecycles. Do not promise instant removal from backups unless that is the real process.

For EU/UK users, address lawful bases, transfers/safeguards, rights and complaints, and any representative details actually required. [ICO: right to be informed](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/individual-rights/right-to-be-informed/), [EDPB territorial scope](https://www.edpb.europa.eu/sites/default/files/files/file1/edpb_guidelines_3_2018_territorial_scope_after_public_consultation_en_0.pdf). For Israel, see L01 and [Israel PPA: controller duties, section 11](https://www.gov.il/BlobFolder/generalpage/manager_duties/he/InfoDuties_new.pdf).

### L03 — Correct the logging disclosure and implement a retention schedule

**Confirmed evidence in the adjacent server:**

- `ServerSecurity/RequestsFilter.java#doFilter` logs both accepted and rejected requests, including IP, method, and path. The privacy notice only discusses requests turned away.
- `Users/AuthController.java` logs email addresses for registration, login, and account-related requests. `CustomLogger.dev` uses INFO logging when enabled; its name does not mean development-only.
- `EmailService.java` logs delivery addresses.
- No security-event purge was found in `ServerSecurityService`/`Daemon`; log retention and access are not established.

**Change:** minimize application, infrastructure, email, and security logs; restrict access and add retention/deletion jobs for what remains. Disclose request and account/support logging. Distinguish six-hour IP-block expiry from retention of the records behind it. Verify the Worker's client-IP header forwarding is active and describe the actual logged identifier. [Israel PPA: security-regulations FAQ](https://www.gov.il/he/pages/data_security_fqa?chapterIndex=1).

### L12 — Review moderation

Done 31 October: publication notice before posting, no email-derived display name, and a reporting address in Terms (safeguard REV-001).

**Remaining evidence:** no moderator-facing removal endpoint exists in the review controller; a reported review can only be removed by editing the database directly.

**Change:** add an administrator removal path and act on reports for privacy, copyright, defamation/unlawful material and impersonation. Do not remove legitimate negative reviews merely because they are negative, and do not fabricate reviews. [FTC: consumer-review rule Q&A](https://www.ftc.gov/business-guidance/resources/consumer-reviews-testimonials-rule-questions-answers).

### L17 — Third-party AI brand logos

**Confirmed evidence:** `AgentTerminalDemo.tsx` shows Claude, Codex and Gemini logos. LobeHub's copyright licence for the icon files does not grant trademark permission, and the owners' rules for this use were not checked.

**Change:** check each owner's brand guidelines, or replace the logos with plain text names. Make sure the presentation does not imply sponsorship. [OpenAI: brand guidelines](https://openai.com/brand/).

## Checklist

- [ ] L10: establish the accessibility self-exemption with evidence, or meet IS 5568.
- [ ] L15: secure cookies, required HTTPS, enumeration fix, deployment and breach-procedure checks.
- [ ] L01–L03: publish the operator name, accurate privacy notice, and log retention.
- [ ] L12: administrator review-removal path and a report-handling routine.
- [ ] L17: brand-guideline check or text names.

When implementing fixes, keep `USER_NOTES/SAFEGUARDS.md`, `LICENSES_INDEX_MAP.md`, and `OUTSIDE_ROUTES.md` consistent with the actual behavior.
