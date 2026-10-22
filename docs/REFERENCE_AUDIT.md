# Reference Audit — OPay Web (https://www.opayweb.com)

**Audit date:** 2026-10-22
**Method:** Public pages inspected via HTTP fetch. Internal systems were **not** accessible.

> Scope note: this audit records only what was publicly observable. We did **not** inspect
> proprietary source code, internal APIs, or backend systems, and we do not reproduce them. The
> Novus MFB implementation is an independent re-creation.

## 1. Overview
OPay is a Nigerian fintech offering transfers, airtime/data, bill payments, debit cards and a
savings product (OWealth). The public site is marketing-focused, emphasising app downloads and
product features, with trust indicators.

## 2. Verified page inventory

| Reference page | URL | Purpose | Main sections | Interactive elements | Proposed Novus equivalent | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Home | `/` | Marketing landing | Hero, Services, App download, Testimonials, Security, Support | Dropdown nav, mobile menu, app-store buttons, cookie banner | `/` (Home) | Verified |
| About Us | `/about-us/` | Company info | Reuses home sections | Nav | `/about` | Verified |
| Contact Us | `/contact-us/` | Contact + branch addresses | Contact details, addresses | Nav, links | `/contact` | Verified |
| Report an Issue | `/report` | Issue reporting | Support entry | Links | `/report` | Referenced in footer |
| Privacy Policy | `/privacy-policy` | Legal | Policy text | — | `/privacy-policy` | Referenced |
| Terms & Conditions | `/terms-and-conditions` | Legal | Terms text | — | `/terms-and-conditions` | Referenced |
| Security | `/security` | Security info | Guidance | — | `/security` | Referenced |
| Help | `/help` | Support/security features | Guidance | — | `/faq` | Referenced |
| Newsroom | `/newsroom/` | Press | Articles | — | `/newsroom` | Referenced in nav |
| CSR | `/csr` | CSR programmes | Sub-pages | — | (not reproduced) | Referenced |
| Careers | `careers.opayweb.com` | Jobs | Listings | — | `/careers` | External link |
| Business | `opaybusiness.opayweb.com` | Business portal | — | — | `/business` | External link |
| Loan | `opaymfb.com` | Loan portal | — | — | `/loans` | External link |

## 3. Homepage structure (observed order)
1. Header: logo, "Business", "Company" dropdown (About/Contact), "CSR" dropdown, Newsroom, Careers.
2. Hero: "We are Beyond Banking", description, CBN/NDIC trust badge, App Store/Google Play buttons,
   desktop and mobile banner images.
3. "Our Services": three cards — transfers/bills, debit cards, OWealth.
4. App download block: QR code + store links.
5. "Here is what our customers think" — testimonials.
6. Security banners.
7. "Your Security and Privacy are our priority": fraud protection, secure transactions, instant
   account locking (USSD).
8. "Customer Satisfaction, Our Priority": hotline numbers, support channels, videos.
9. Footer: Company / Resources / Discover columns, branch addresses, social icons, copyright
   (`© 2026 OPay Digital Services Limited`), whistleblowing email.
10. Cookie consent banner (Accept All / Reject All / Settings).

## 4. Visual observations
- Clean, modern fintech layout; white background with card-based sections.
- Green brand accent (OPay) — **not** reused; Novus uses its own logo colours.
- Generous whitespace, large hero imagery, prominent app CTAs, trust badges.
- Separate mobile hero image; responsive layout.

## 5. Public technology signals
- Static assets served from a CDN (`gstatic.opayweb.com`).
- Standard responsive markup.
- **Backend technology, database and hosting could not be determined from the public site.**
  No inference is made about them.

## 6. Novus MFB adaptation decisions
1. All OPay branding, copy, contact details and links replaced with Novus content.
2. No reproduction of OPay's proprietary assets or source code — independent implementation.
3. App-store links and OWealth/CBN/NDIC claims are **not** carried over; Novus displays no
   regulatory or insurance claim until the owner supplies verified wording (`site-config.ts`).
4. Trust badges are hidden by default (`regulatory.showBadges = false`).
5. Pages beyond the audited inventory are only added when approved (see `PROJECT_PLAN.md`).
