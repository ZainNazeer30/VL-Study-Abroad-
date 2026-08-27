# VL Study Abroad Consultants

A fully responsive marketing website for a study abroad consultancy focused on Italy and France,
built with React, Vite and Tailwind CSS. It looks like a clean mobile app on a phone, and expands
into a proper desktop layout (wide hero sections, multi-column grids, an inline top nav) on
tablets and larger screens. It has twelve pages plus nine guide articles: Home, Study in Italy, Study in France,
Universities, Scholarships, Guides (the blog index), About, Contact, Apply, Privacy, Terms and a
proper "not found" page. There is a working navigation menu, university search and filters, a
scholarship checker, FAQ accordions, a booking calendar and a three step application form.

## Run it on your computer

You need Node.js version 18 or newer.

```bash
npm install
npm run dev
```

Then open the address it prints (usually http://localhost:5173). The page reloads as you edit.

## Build for hosting

```bash
npm run build
```

This creates a `dist` folder with the finished site. To preview that build locally:

```bash
npm run preview
```

## Put it online

The `dist` folder is a normal static site, so most hosts work.

- **Netlify**: connect your GitHub repository and Netlify will use the included `netlify.toml`
  (build command, publish folder and every page link already set up). Connecting the repository,
  rather than dragging the `dist` folder onto the dashboard, is what lets the free email
  notifications below actually work, since dragging a folder skips the build step and never
  picks up the `netlify/functions` folder.
- **Vercel**: import the project from GitHub and it deploys with no extra setup. The included
  `vercel.json` keeps every page link working and the `api/submit.js` function working side by
  side.
- **Any other host**: upload the contents of `dist`. If deep links like `/universities` show a
  404, tell your host to serve `index.html` for any unknown path (this is standard for single
  page apps). Plain static hosts like this cannot run the free email notifications below, since
  those need a host that runs server code; use the Formspree option in that case instead.

## Where to change things

Everything you are likely to edit lives in `src/data`.

- `src/data/site.js` sets the WhatsApp number, email address, website and the menu. It already
  has your real details filled in (phone `+92 321 5208625`, email `vlstudy.online@gmail.com`,
  `www.vlstudy.online`). Change the contact details here once and they update across the whole
  site, including the WhatsApp button in the bottom corner of every page. This file also has the
  `FORMS.endpoint` setting described below.
- `src/data/images.js` lists every photo on the site, one entry per picture, with instructions at
  the top for swapping any of them in a single line. Most of the photographs are your own, saved
  into `public/img` at four widths each in two formats so a visitor on a phone downloads roughly a
  tenth of what a desktop visitor does. Four pictures still come from Unsplash: the two country
  cards on the home page and the two country page heroes, because those have to actually look like
  Italy and France and none of your photos were taken there. Replacing those four with your own
  Italy and France pictures is the one remaining step to owning every image outright, and
  `LICENCES-AND-CONTENT.md` covers the licensing in full. No photograph is the picture for two
  different things; `npm run check-images` enforces that and will tell you if an edit breaks it.
- `src/components/artwork.jsx` holds the three illustrated portraits on the success story cards.
  These are drawn rather than photographed on purpose. The quotes are real, but we do not have
  photos of Ayesha, Hamza and Sana, and putting a stranger's stock photo beside a named client is
  something a visitor can catch with a reverse image search. An illustration reads as a friendly
  placeholder instead of a false claim about who someone is. If a student agrees to appear on the
  site, that file explains how to swap in their real photo.
- `src/data/blog.js` holds all nine guide articles. Adding one is a copy and paste job; the
  instructions are at the top of the file, and `npm run build` puts the new address into the
  sitemap automatically. One article a month, answering a question a student actually asked you,
  is the single most useful ongoing thing you can do for search rankings.
- `src/data/universities.js` is the one to keep an eye on. It drives the details table on the
  Universities page, the search filters and the structured data Google reads, all from a single
  array. Two things about it are deliberate. First, **there is no tuition or fee field** anywhere
  in it: Italian public universities set fees on assessed family income and French ones
  frequently waive the international rate, so a single figure beside a university name is wrong
  for most of the students reading it, and walking that number back on the first phone call costs
  more trust than it wins clicks. Cost is discussed properly, with the conditions attached, in the
  cost guide and on the scholarships page. Second, `intake`, `applyBy` and `status` go stale every
  admissions cycle, so when you go through them, update `LAST_REVIEWED` at the top of the file.
  The page prints that date to the visitor, which is the difference between a deadline table that
  gets trusted and one that gets ignored.
- `src/data/countries.js`, `scholarships.js`, `home.js` and `about.js` hold
  all the written content, universities, scholarships and questions. Edit the text there.
  Scholarships have a `fullyFunded` flag; set it to `true` only for ones that realistically cover
  both tuition and living costs, since that badge is what the site uses to sort and highlight
  them first on the Home, Scholarships, Study in Italy and Study in France pages.

The visual style (colours and fonts) is defined once in `src/index.css`.

## Written for Pakistani applicants

Since every applicant comes from Pakistan, the content is written for that audience rather than
in generic international terms:

- The application forms use Pakistani qualifications (Matric, O Levels, FSc, FA, A Levels, BS,
  BSc, MS) instead of "high school" and "bachelor degree".
- The process section and the FAQs cover the things Pakistani students actually get stuck on:
  IBCC attestation for Matric and FSc, HEC attestation for degrees, MOFA after that, the
  Declaration of Value from the Italian Embassy in Islamabad, Campus France Pakistan, and how a
  bank statement needs to look before a consulate will accept it.
- Both country pages name Islamabad as where the visa appointment happens.
- The search descriptions and page titles target the terms Pakistani students search for, such
  as "study abroad consultants in Pakistan" and "study in Italy from Pakistan".

If you ever expand beyond Pakistan, these are the places to revisit: `src/data/home.js`
(trust chips, process steps, FAQs), `src/data/countries.js` (requirements and visa sections),
and the `useSeo(...)` calls at the top of each file in `src/pages`.

## Receiving applications and bookings

Every form on the site (the Home page eligibility check, the Study in Italy and Study in France
consultation forms, the Contact page booking calendar, and the Apply page application) shows the
visitor an on-page confirmation right away. Out of the box, though, nobody actually receives that
information anywhere, which means someone could apply or book a call and you would never know.

### Option A: free, straight to your own Gmail (recommended)

This uses [Nodemailer](https://nodemailer.com) through a small function that runs on Netlify or
Vercel (`netlify/functions/submit.js` and `api/submit.js`, already included, whichever host you
use will pick up the matching one). There's no monthly limit beyond Gmail's own sending limit
(about 500 emails a day, far more than you'll need), and no third party ever sees the
submissions, they go straight to your inbox.

1. On your Google account, turn on 2-Step Verification if it isn't already on
   (myaccount.google.com/security).
2. Go to myaccount.google.com/apppasswords, and create an app password. Name it something like
   "VL Website". Google gives you a 16 character code, copy it.
3. On your hosting dashboard, add two environment variables:
   - `GMAIL_USER` = `vlstudy.online@gmail.com`
   - `GMAIL_APP_PASSWORD` = the 16 character code from step 2 (no spaces)
   - On Netlify: Site settings -> Environment variables. On Vercel: Project settings ->
     Environment Variables.
4. Deploy (or redeploy) the site. This only works when Netlify or Vercel builds the site from
   your GitHub repository, see "Put it online" above.

Once that's done, every submission arrives by email from your own site with a subject like "New
submission: Application form", listing everything the visitor entered.

### Option B: quicker to set up, a third party keeps a copy

If you'd rather skip the Gmail app password, or you're hosting somewhere that can't run server
code, use [Formspree](https://formspree.io) instead. It's free for up to 50 submissions a month.

1. Sign up at formspree.io and create a new form, call it anything, for example "VL Study Abroad".
2. Copy the endpoint it gives you, it looks like `https://formspree.io/f/abcdwxyz`.
3. Paste that into `FORMS.endpoint` in `src/data/site.js`.

Setting `FORMS.endpoint` automatically switches every form on the site over to Formspree instead
of the Gmail function, so you only need one or the other, not both.

## SEO

There is a full explanation in `SEO-GUIDE.md`, including the things only you can do. The short
version of what is in the code:

- Each page sets its own tab title, search description, canonical address, social preview image
  and structured data through the `useSeo(...)` call near the top of its file in `src/pages`.
  Edit the text there to change how a page appears in search results.
- `index.html` holds the site wide defaults and the business details that let Google show your
  logo beside your name.
- Structured data covers breadcrumbs on every page, FAQ blocks on the home page, both country
  pages and the contact page, and article blocks on every guide. The FAQ ones are what make you
  eligible for the expandable question boxes in a search result.
- `public/sitemap.xml` is generated by `npm run build` from the real routes and articles, so it
  can never go stale. `npm run sitemap` regenerates it on its own.
- Wrong addresses now get a real "not found" page marked `noindex`, instead of quietly showing
  the home page. That change alone removes a problem that was working against you.
- All of this points at `https://www.vlstudy.online`. If you ever move to a different domain,
  update it in `index.html`, `public/robots.txt` and `scripts/generate-sitemap.mjs`.

## Project layout

```
src/
  components/   shared pieces (nav, footer, bottom bar, Img, avatars, FAQ, article body)
  data/         all content, photos and settings, including blog.js
  hooks/        useSeo, for titles, descriptions, canonicals and structured data
  lib/          submitForm, used by every form on the site
  pages/        one file per page
  index.css     colours, fonts and base styles
  App.jsx       the routes
public/
  img/          every photograph, at four widths each in webp and jpg
  robots.txt    what search engines may read
  sitemap.xml   generated by npm run build, do not edit by hand
scripts/
  generate-sitemap.mjs
```

Three other files worth reading once:

- `SEO-GUIDE.md` explains what is built into the site for search engines, and the handful of
  things only you can do (Google Business Profile, Search Console, backlinks). Read this one.
- `LICENCES-AND-CONTENT.md` lists every photo, font and library and who owns it, and flags the
  one thing that still needs checking at your end.
- `scripts/audit.mjs` is a test you can run yourself. After `npm run build`, run `npm run audit`
  and it opens every page in a real browser and checks titles, descriptions, headings, images,
  structured data and sideways scrolling at phone, tablet and desktop width. The first time, run
  `npx playwright install chromium` once so it has a browser to use. `npm run check-schema` does
  the same for the structured data on its own. Neither is needed to run or deploy the site.
