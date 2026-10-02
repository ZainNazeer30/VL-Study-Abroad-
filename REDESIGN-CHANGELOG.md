# VL homepage redesign update

## What changed

- Removed the founder photo from the homepage hero. The founder/team remains on the About page.
- Repositioned the homepage around **Study in Italy or France from Pakistan**.
- Reworked the hero to present VL as a focused research + counselling platform rather than a generic consultancy landing page.
- Added a prominent **Research before you apply** tools section linking to university search, scholarship research, deadline tracking and profile assessment.
- Replaced founder-specific hero stats with product/value-oriented proof points.
- Kept the existing university directory, scholarship content, budget planner, eligibility form, guides, FAQ and application journey intact.
- Preserved the existing route structure and lead-form backend.
- Sitemap generation still reports 41 URLs: 11 university pages, 14 articles and 3 guides, alongside the main site pages.

## Validation note

The source changes were inspected after editing. A full `npm run build` could not be completed in this environment because the package registry is not reachable and the local dependency cache does not contain Vite. Run `npm ci` followed by `npm run build` in the normal development/CI environment before deployment.
