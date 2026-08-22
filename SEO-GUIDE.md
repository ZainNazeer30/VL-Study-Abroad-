# Ranking for "study in Italy from Pakistan"

You want the site to come up when a Pakistani student searches about applying to Italy or France.
This file has two halves: what is already built into the site, and what only you can do.

The honest framing first. Search rankings are not something a website can be configured into.
Everything technical on this site is now done properly, and technical SEO is table stakes: it
stops you being held back, it does not by itself put you first. What decides the rest is content
that answers real questions and other websites linking to you, and those take months. A realistic
expectation is small movements within 4 to 8 weeks, meaningful movement on the long specific
searches in 3 to 6 months, and competition for the big head terms like "study abroad consultants
in Pakistan" measured in years. Anyone quoting you a faster number is guessing or lying.

The good news: the long specific searches are where the students who actually convert are. A
student typing "how much bank statement required for italy student visa from pakistan" is far
closer to booking a call than one typing "study abroad".

---

## Part 1: what is already built in

### Technical

- **Every page has its own title, description and canonical address.** Set in each page file
  through `useSeo(...)`, in `src/hooks/useSeo.js`. Titles are all under 60 characters and
  descriptions under 160, which is what actually shows in a result.
- **Structured data on every page.** Organisation and website details site wide, plus a
  breadcrumb trail, plus a page type on each page, plus `FAQPage` on the home page, both country
  pages and the contact page, plus `BlogPosting` and `FAQPage` on every article. The FAQ blocks
  are the ones with a visible payoff: they make you eligible for the expandable question boxes
  in Google, which take up several times the space of a plain blue link.
- **A sitemap that cannot go stale.** `npm run build` regenerates `public/sitemap.xml` from the
  actual routes and articles, so adding an article automatically adds it to the sitemap.
- **A real 404 page,** marked `noindex`. Previously any wrong address quietly showed the home
  page, which makes Google think you have hundreds of duplicate copies of it. That actively hurt
  you and is now fixed.
- **Images at four sizes each, in webp and jpg.** A phone downloads roughly a tenth of what a
  desktop does. The home page hero is preloaded, so it starts downloading with the stylesheet
  rather than after it. Measured locally, the largest element on the home page paints in about a
  third of a second on a phone sized screen.
- **Every image has alt text** describing what it shows.
- **One `h1` per page, with `h2` and `h3` beneath it** in the right order. Unglamorous and still
  one of the clearest signals of what a page is about.
- **Internal links everywhere.** The home page links to the guides, each country page links to
  the guides that matter for that country, each article links to three related articles, and the
  footer carries the five most important guides on every page. Search engines use internal links
  to work out which of your pages you consider important.
- **Cache headers** so photos and scripts are cached for a year while the HTML never is.
- **Privacy and terms pages,** which are part of what Google's quality guidelines describe as
  trust signals for a business handling people's details.

### Content

Nine articles, roughly 10,000 words, each targeting a real search:

| Article | Written to catch searches like |
|---|---|
| Apply to Italy or France from Pakistan | "how to apply for study in italy from pakistan" |
| HEC, IBCC and MOFA attestation order | "hec attestation for study abroad", "ibcc equivalence" |
| Fully funded scholarships in Italy and France | "fully funded scholarship for pakistani students" |
| Italy student visa from Pakistan | "italy student visa bank statement", "declaration of value" |
| France student visa and Campus France | "campus france pakistan", "france study visa requirements" |
| Cost of studying in Italy and France | "cost of studying in italy for pakistani students" |
| Study without IELTS | "study in italy without ielts", "medium of instruction letter" |
| Choosing a university | "best universities in italy for pakistani students" |
| Intake deadlines | "italy university deadline", "september intake 2027" |

---

## Part 2: what only you can do

This part matters more than everything above. In rough order of impact.

### 1. Google Business Profile (do this first, it is the biggest single win)

Free, takes an afternoon, and for a local service business it usually outranks everything else
you could do in the first month. Go to `google.com/business` and create a profile for VL Study
Abroad Consultants.

- Category: "Educational consultant" or "Study abroad consultant".
- Add your address (or set a service area if you do not have a public office), your phone number
  and `https://www.vlstudy.online`.
- Add real photographs of your office and your team.
- Post an update every week or two. The guides on this site are ready made posts.

Then ask every student you have successfully placed to leave a review. Reviews are the thing
that moves a local profile, and past clients say yes far more often than you expect if you simply
ask. Ten honest reviews will do more for you in month one than any amount of keyword work.

### 2. Google Search Console

At `search.google.com/search-console`:

- Confirm the property for `https://www.vlstudy.online` is verified.
- Submit `https://www.vlstudy.online/sitemap.xml` under Sitemaps. Do this again after adding
  articles.
- Use "URL Inspection", paste each new article address, and click "Request indexing". This gets
  a new page looked at in days rather than weeks.
- Check the **Performance** report once a month. The "Queries" tab shows the actual phrases
  people typed to find you. That list is the single best source of ideas for your next article:
  anything you appear for on page two is a page worth improving.

Also add Bing Webmaster Tools. It takes ten minutes and it imports everything from Search Console.

### 3. Write one article a month

Answer one real question a student asked you that week. That is the whole method. Do not write
for Google; write the answer you would give on WhatsApp, then tidy it up.

Ideas, all real searches with no good Pakistani specific answer online:

- What a motivation letter for an Italian university should actually say (with an example)
- What Pakistani students get wrong in the Campus France interview
- Studying in Italy with a 2.5 CGPA: what is actually possible
- Milan versus Bologna versus Padua for a Pakistani student on a budget
- How to get a Medium of Instruction letter from a Pakistani university
- What to pack, and what to buy after you land
- Getting a residence permit in Italy in your first eight days
- Sending money from Pakistan to Europe as a student
- Finding halal food and a prayer space as a student in Italy and France

`src/data/blog.js` has the instructions at the top. Copy an existing article block, change the
fields, run `npm run build`, and the sitemap updates itself.

### 4. Get other websites to link to you

This is the hardest part and the one that separates page one from page three. Nothing artificial:
paid link schemes are detectable and get sites penalised. What works:

- **Your own social accounts.** Facebook, Instagram, LinkedIn, TikTok and YouTube, each with the
  website address filled in. Then actually post the guides.
- **Pakistani student communities.** Facebook groups for study abroad aspirants, Reddit threads,
  university forums. Answer the question properly in the comment and link the guide as the longer
  version. Do not drop bare links; you will be removed and it does not work anyway.
- **Directories.** Pakistani business directories, education directories, your chamber of
  commerce.
- **Your students.** A student who blogs or posts about their journey and mentions who helped
  them is worth more than any directory.
- **Local press and college talks.** A single mention from a Pakistani news site or a college
  website is worth dozens of directory listings.

### 5. Put your real numbers into the site

Two placeholders are worth filling in:

- `sameAs` in the structured data (in `index.html` and in `LICENCES-AND-CONTENT.md` terms) is an
  empty list. Put your Facebook, Instagram and LinkedIn addresses in it. It is how Google
  connects the site to your social profiles and reinforces that you are one real business.
- If you have a public office, add the street address to the same block. A physical address is a
  strong local signal.

### 6. Keep the guides current

Every article shows a "last updated" date, and Google reads it. When tuition changes, or a
deadline shifts, or a scholarship amount is revised, update the article and change its `updated`
field. A guide refreshed every year holds its ranking. One left untouched for three years slowly
loses it.

---

## What not to do

- **Do not buy backlinks or use an "SEO package" that promises page one.** These are almost
  always link schemes, and the penalty when it is detected takes longer to recover from than
  the ranking took to gain.
- **Do not stuff keywords.** Writing "study abroad consultants in Pakistan" fourteen times reads
  badly to a human and does nothing for a machine that has understood language for a decade.
- **Do not copy content from other consultancies.** Google suppresses the copy, not the original.
- **Do not make up FAQ answers to get the FAQ boxes.** The structured data on this site only
  contains questions actually answered on the page, which is Google's rule. Breaking it can get
  the whole site's rich results removed.
- **Do not change an article's `slug` after it is published.** Any link pointing at the old
  address breaks and the ranking goes with it.

---

## Checking your own work

Three free tools, all worth running after any change:

- **Rich Results Test** (`search.google.com/test/rich-results`): paste a page address and it
  tells you whether the structured data is valid and which rich results you qualify for.
- **PageSpeed Insights** (`pagespeed.web.dev`): run the home page and one article. Look at the
  mobile score, not the desktop one.
- **Search Console Performance**: the truth about what you actually rank for, updated daily.
