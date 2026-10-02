# VL Study Abroad: Agency / Humanisation / SQA / SEO pass

## Completed in this revision
- Reworked the homepage into an editorial education-agency layout rather than a SaaS/AI landing-page pattern.
- Removed sales-oriented homepage language and changed the primary navigation action to "Contact the team".
- Removed one-person positioning such as "one counsellor" and replaced it with agency/team language.
- Added a practical research-first homepage structure: destinations, research links, university table, services, process and guides.
- Kept the existing university, scholarship, guide, application and contact routes.
- Kept local Pakistan-specific content and terminology (IBCC, HEC, MOFA, Campus France, Universitaly).
- Preserved the existing form-validation/security implementation.
- Removed the duplicate Netlify security-header block.
- Strengthened clickjacking protection with X-Frame-Options: DENY on Netlify and Vercel.
- Regenerated sitemap: 41 URLs (11 university pages, 14 articles, 3 guides, plus main routes).

## SQA status
Static checks completed:
- Sitemap generation: PASS
- 41 sitemap URLs generated: PASS
- Source phrase audit for known sales/template wording: PASS
- Homepage image keys verified against image data: PASS
- Home university links now derive stable slugs: PASS

Browser/build checks could not be completed in this environment because npm dependencies are not installed and registry access timed out. `vite` and `playwright` are therefore unavailable here. This is an environment limitation, not a claimed production-build pass.

Run locally:

    npm ci
    npm run build
    npm run audit

The existing audit script checks titles, descriptions, canonical tags, robots, H1/H2 counts, image alt text, broken images, JSON-LD, body word count and horizontal overflow at 390/820/1440px.

## SEO direction
The homepage title/description now lead with the destination + Pakistan intent without stuffing "consultants" repeatedly. University and guide architecture remains intact. The sitemap is generated from the actual route/data structure rather than manually maintained.

## Security note
The site keeps the existing server-side submission validation, allow-listing, length limits, origin checks, honeypot and rate limiting. CSP remains intentionally conservative because the current site has inline consent/analytics scripts; replacing `unsafe-inline` with hashes/nonces should be a separate controlled security change after testing analytics and consent behaviour.
