VL STUDY ABROAD CONSULTANTS — WEBSITE
=====================================

HOW TO VIEW
  Open index.html in any web browser.

PAGES
  index.html         Home
  about.html         About Us
  services.html      Services
  destinations.html  Destinations (France & Italy)
  contact.html       Contact + enquiry form

FOLDERS
  css/style.css      All styling (colours, fonts, layout)
  js/main.js         Menu, animations, contact form
  assets/            Logo images

EDITING YOUR DETAILS
  - Phone / WhatsApp: search the files for 923215208625 and replace.
  - Email: search for vlstudy.online@gmail.com and replace.
  - Text: open any .html file and edit the words between the tags.
  - Colours: change the values at the top of css/style.css (:root section).

DOMAIN (for SEO) — DONE
  The SEO tags, sitemap and social sharing now use your live domain:
      https://www.vlstudy.online
  Next: submit sitemap.xml in Google Search Console
  (search.google.com/search-console) so Google indexes the site.
  Sitemap URL to submit:  https://www.vlstudy.online/sitemap.xml

PHOTOS
  - The hero scene, flags, logo and social image live in assets/ (bundled).
  - Two photos load live from Unsplash (free, no account needed):
      * Homepage "Ready to Start" band  -> css/style.css  (.cta background)
      * About page framed photo         -> about.html     (figure.framed-photo)
    To use your own instead, drop a JPG in assets/ and swap the image URL.

SEO ADDED
  - Unique titles + descriptions, canonical URLs on every page.
  - Open Graph + Twitter cards (preview image: assets/og-image.jpg).
  - JSON-LD structured data (Organization + breadcrumbs).
  - Favicon (favicon.ico + assets/favicon-*.png + apple-touch-icon).
  - sitemap.xml and robots.txt.
  - Compressed logo and image dimensions for faster loading.
  NOTE: testimonials are sample placeholders — replace with real client
  names/photos/quotes before adding review stars, to stay within Google's rules.

FORMS (ENQUIRY + REVIEWS) - ONE-TIME SETUP TO RECEIVE EMAILS
  The Student Enquiry form (Contact page) and the "Share Your Experience"
  review form (Home page) email submissions straight to you using Web3Forms
  (free, no server needed). To switch them on:

  1. Go to  https://web3forms.com  and enter  vlstudy.online@gmail.com
     You will receive an "Access Key" (a long code) by email.
  2. In BOTH files below, find  YOUR_WEB3FORMS_ACCESS_KEY  and replace it with
     that code (keep the quotes around it):
        - contact.html   (Student Enquiry form)
        - index.html     (Share Your Experience form)
  3. Save/upload to GitHub -> Vercel redeploys -> the forms are live.
  Send yourself a test message to confirm it arrives (check spam the first time).
  Free plan allows 250 submissions/month.

REVIEWS - HOW NEW ONES GO ON THE SITE
  A submitted review is EMAILED to you (it does NOT appear automatically), so
  nothing inappropriate can go live on its own. To publish a review you like,
  add a card in index.html by copying an existing testimonial block and editing
  the text, the initial letter in <span class="avatar">, the name and the city:
      <div class="quote-card reveal">
        <div class="mark">"</div>
        <p>THE REVIEW TEXT GOES HERE</p>
        <div class="stars">*****</div>
        <div class="quote-who"><span class="avatar">A</span><div><b>Name</b><span>City / Programme</span></div></div>
      </div>
  (Or just send me the review and I'll add it for you.)

  To show a real PHOTO instead of the letter initial, put an image in the circle:
      <span class="avatar"><img src="assets/student1.jpg" alt="Student name"></span>

UNIVERSITIES LIST (Destinations page) - EASY TO UPDATE
  The list of universities + scholarships lives in  js/universities.js
  Open that file: each university is one { ... } block with plain fields
  (name, city, fields, scholarship, status, intake, deadline, link).
  - To add one: copy a block, paste it, edit the text.
  - To mark closed: set  status: "closed"  (or "soon" for closing soon).
  - Save/upload to GitHub -> Vercel updates the site.
  Full instructions are written at the top of that file. Only facts and your
  own wording are used (no logos or copied text), so there is no copyright risk.

PUBLISHING (free options)
  - Netlify: drag this whole folder onto app.netlify.com/drop
  - GitHub Pages, Vercel, or any web host also work.

TOP CONTACT BAR - ADD YOUR SOCIAL LINKS
  The bar above the menu has Facebook, Instagram and LinkedIn icons whose
  links are placeholders (href="#"). Open any .html file, search for
  aria-label="Facebook" (and Instagram, LinkedIn) and replace the # with your
  real profile URLs. WhatsApp is already wired to your number.

BLOG
  Articles live in blog.html. To add or edit an article, copy an <article>
  block inside blog.html and change the heading/text; the homepage "Latest
  From Our Blog" cards (in index.html) link to each article via #id anchors.

REVIEWS WITH PHOTOS
  To show a real photo instead of the initial letter in a testimonial, use:
    <span class="avatar"><img src="assets/student1.jpg" alt="Name"></span>
  (Put the photo in the assets folder first.)

COPYRIGHT & LICENCES
  See LICENSES.txt for a full breakdown. In short: your logo/brand, the fonts
  (open licence) and all stock photos (Unsplash licence) are cleared for
  commercial use. The ONLY thing to double-check is the two flag photos
  (assets/france.jpg, assets/italy.jpg) which you provided - confirm you have
  the right to use them, or ask us to swap in free-licence versions.
