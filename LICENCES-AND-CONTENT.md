# Where everything on this site came from

You asked that nothing on the site carry a copyright problem, a third party claim or a usage
restriction. This file lists every asset and every piece of content, says who owns it and under
what terms it is used, and is honest about the one thing that still needs checking at your end.

Last reviewed: 22 August 2026.

---

## 1. Written content: yours, original

Every word on the site was written for this site. That includes:

- All twelve pages, including the Scholarships page, which at roughly 3,000 words is now the
  most detailed page on the site.
- All nine articles in `src/data/blog.js`, roughly 10,000 words.
- The privacy policy and terms of use.
- Every FAQ answer, university description and scholarship description.

None of it is copied, spun or rewritten from another consultancy's website, from a university
site or from a government page. Facts about visa processes and scholarship schemes are of course
drawn from how those schemes work in the real world, but facts are not copyrightable; the wording
is original.

**What this means for you:** you own it and can use it anywhere. You can put it on a brochure, a
Facebook post or a PDF without asking anyone.

**One caution.** If you later add content, do not paste from another site. Google detects
duplicated pages easily and it will suppress the copy rather than the original, so it costs you
rankings as well as being a legal exposure. Writing 400 words yourself beats copying 2,000.

---

## 2. Photographs

### 2a. The ten photos you sent, in `public/img`

These are the photos you supplied. They are used across the home page, the about page, the
universities page, the student life sections and the blog article covers.

| File name | What it shows | Used on |
|---|---|---|
| `hero-students-*` | Three graduates taking a selfie (a crop) | Home page hero |
| `band-sunset-*` | Caps thrown at sunset over a skyline (a crop) | Home page photo band |
| `band-campus-*` | A college seen in full across its lawn (a crop) | Universities page header |
| `graduates-raising-caps-*` | International graduates raising their caps | About page |
| `life-reading-room-*` | Grand reading room full of students (a crop) | Study in Italy, student life |
| `life-study-desk-*` | Students at library desks (a crop) | Study in France, student life |
| `graduation-caps-throw-*` | Graduates throwing caps outside a university | Guide: fully funded scholarships |
| `campus-courtyard-gothic-*` | Stone courtyard and clock tower | Guide: choosing a university |
| `museum-hall-*` | Great hall of a museum | Guide: cost of studying |
| `students-city-walk-*` | Students on a city bridge | Not used, see below |

No photograph is the picture for two different things. `npm run check-images` verifies that, and
will tell you if a later edit breaks it. A photo does appear more than once as you move around
the site, because the small card that links to a guide shows that guide's own cover, but that is
the guide's identity rather than the same picture doing two jobs.

Five of the files are wide crops rather than the full frame, because they sit in short, wide
boxes: `hero-students`, `band-sunset`, `band-campus`, `life-reading-room` and `life-study-desk`.
The originals you sent are unchanged; these are cut copies made for the web.

> **This is the one item that needs your confirmation.**
>
> I cannot verify where these files came from, because you sent me the image files rather than
> the pages they came from. They look like professional stock photography, and if they came from
> **Unsplash, Pexels or Pixabay** then they are free for commercial use and there is nothing to
> do. If any of them came from a **Google image search, a Pinterest board, another consultancy's
> website, or a paid stock site you do not have a licence for**, that one is a real risk and
> should be replaced before you promote the site.
>
> How to check any of them in two minutes: open images.google.com, click the camera icon, upload
> the file, and look at where it appears. If the top results are Unsplash or Pexels pages, you
> are fine. Note the photographer's name while you are there, and add it to this file.

`students-city-walk` is deliberately not placed on any page. It is a good photograph, but the
American flag and the New York skyline are in the middle of it and this site is about Italy and
France. `src/data/images.js` explains how to add it in one line if you want it anyway.

### 2b. Ten photographs from Unsplash

Two places need pictures your own photographs cannot supply. The country cards and country page
heroes have to actually look like Italy and France, and none of your photos were taken there. And
nine guides need nine different covers, which is more than the photos left over. Those use
Unsplash, referenced by exact photo ID so the same image comes back every time.

| Where | Unsplash photo ID | Fallback |
|---|---|---|
| Home, Study in Italy card | `photo-1578262634053-eead874052be` | `photo-1555992828-ca4dbe41d294` |
| Home, Study in France card | `photo-1526821799652-2dc51675628e` | `photo-1524396309943-e03f5249f002` |
| Study in Italy hero | `photo-1745323193093-763059f1eb8c` | `photo-1510758588288-aa8cf9445f5b` |
| Study in France hero | `photo-1531686669028-c55493110d74` | `photo-1755812970802-20776879c785` |
| Guide: applying from Pakistan | `photo-1741637335289-c99652d3155f` | `photo-1616428394230-ba242d33e3ba` |
| Guide: attestation | `photo-1683319598210-d70486f2f996` | `photo-1501503069356-3c6b82a17d89` |
| Guide: Italy student visa | `photo-1698153870091-5f2891c73362` | `photo-1704151101872-6888b508cf7c` |
| Guide: France student visa | `photo-1774526993562-abc3f2afac0f` | `photo-1650211233816-53d4e13a8817` |
| Guide: without IELTS | `photo-1758270704787-615782711641` | `photo-1758270704384-9df36d94a29d` |
| Guide: intake deadlines | `photo-1776536025707-9a0a915f85a5` | `photo-1567760855784-589f09ed5dc6` |

Every ID here is distinct, including the fallbacks, so nothing repeats. A fallback is only ever
shown if the main photo fails to load, which is why a visitor never sees a broken image icon.

**Licence:** the Unsplash Licence, which grants free use for commercial and non commercial
purposes with no permission and no attribution required. The full text is at
`https://unsplash.com/license`. You can view any of them at
`https://images.unsplash.com/photo-THE-ID?w=1200`, which is worth doing once so you have seen
every picture on your own site.

**The one restriction worth knowing:** the Unsplash Licence does not let you sell the photographs
themselves, or build a competing stock photo service out of them. Using them as pictures on your
own website is exactly what the licence is for.

**If you would rather own these outright**, replace them with your own photographs.
`src/data/images.js` has the instructions at the top of the file; it is a one line change each.

### 2bb. The founder biographies

The two biographies on the About page are condensed from the text Kashan Nazeer and Umer Sattar
each wrote about themselves, and the pull quotes are their own words verbatim. They are your
people describing your business, so there is nothing to license. The two LinkedIn addresses are
linked publicly and are also handed to search engines as structured data, which is one of the
strongest trust signals a small consultancy can have.

If either of you wants the wording changed, it lives in `src/data/about.js` under `FOUNDERS` and
nowhere else. Real photographs would be stronger than the initials currently shown; that file
explains how to add them.

### 2c. The illustrated portraits on the success stories

`src/components/artwork.jsx` contains three drawn portraits, made for this site. They are not
photographs of Ayesha, Hamza or Sana. That is deliberate: putting a stranger's stock photo beside
a named real client is something a visitor can catch with a reverse image search, and it would
undermine testimonials that are actually true. If a student agrees in writing to appear with
their real photo, that file explains how to swap one in.

---

## 3. Your logo

`public/logo.ico`, `public/logo.png` and `src/assets/logo.ico` are your own mark, which you
supplied. `logo.png` is the same image at 200 by 200 pixels, which is the size Google reads for
the logo beside your name in search results.

---

## 4. Fonts

| Font | Used for | Licence |
|---|---|---|
| Poppins | Headings and buttons | SIL Open Font License 1.1 |
| Inter | Body text | SIL Open Font License 1.1 |

Both are free for commercial use, including on a website and in printed material. They are
delivered by Google Fonts, which is free and requires no account.

---

## 5. Code libraries

Everything the site is built on is permissively licensed. None of these require you to publish
your source code, pay a fee, or credit anyone on the site.

| Library | Version | Licence |
|---|---|---|
| React | 19 | MIT |
| React DOM | 19 | MIT |
| React Router | 7 | MIT |
| Nodemailer (form emails) | 9 | MIT-0 |
| Vite (build tool) | 8 | MIT |
| Tailwind CSS | 4 | MIT |
| oxlint (development only) | 1 | MIT |
| Playwright (testing only) | 1 | Apache 2.0 |

The last two never reach your visitors; they only run on your own machine while developing.

At the time of writing, `npm audit` reports no known vulnerabilities. Run `npm audit` yourself
after any `npm install` to check again.

---

## 6. University and scheme names

The site names real universities (Bologna, Politecnico di Milano, Sorbonne, Sciences Po and
others) and real schemes (DSU, Eiffel Excellence, Invest Your Talent in Italy, Campus France,
Universitaly, IBCC, HEC, MOFA).

This is nominative use: referring to something by its real name in order to describe it factually.
It is normal and expected for a consultancy, and it is what a student is searching for. Two rules
keep it safe, and the site follows both:

- **No university logos or crests are used anywhere.** Names in plain text only. If you add a
  logo later, that is a trademark question and you would need permission.
- **No claim of partnership or official status is made.** The site says we help students apply to
  these universities. It never says we are an official representative, agent or partner of any of
  them. Do not add such a claim unless you actually hold a signed agreement, because that is the
  kind of statement a university's legal team does act on.

---

## 6b. The Scholarships page

That page names real schemes run by real bodies: the Italian Ministry of Foreign Affairs, the
European Commission, Campus France, individual universities and the regional right to study
agencies. Every figure on it is written as an approximation, is dated, and names the body that
runs the scheme so a reader can check the current number at the source. That is deliberate, and
it is what keeps the page honest as amounts change.

The page also states plainly that no consultant can guarantee a scholarship, that scholarship
matching is included in the free consultation, and that no legitimate scheme on it charges a
student a fee to apply. Those three sentences protect the student from the common scams and
protect you from a claim that you promised something. Please do not remove them, and do not let
anyone add "guaranteed scholarship" language anywhere on the site.

When you update figures, change `SCHOLARSHIPS_REVIEWED` in `src/data/scholarships.js` at the same
time. That date is displayed on the page and is what makes the approximations defensible.

---

## 7. Claims about your own business

These appear on the site and are your statements, not mine:

- "3+ years" of experience.
- "30+ students placed."
- "96% visa success rate." **Worth a second look.** On a base of about 30 students, 96% means 28
  or 29 of them. If that is what your records show, keep it. If it is a round impression rather
  than a counted figure, a phrase like "a strong visa record" is safer and reads just as well;
  the About page description already uses that wording.
- The three named testimonials from Ayesha K., Hamza R. and Sana M.

They came from your existing website, so I have carried them across as you had them. They are
your responsibility, and consumer protection rules in most countries expect a business to be able
to back up a numerical claim if asked. Keep whatever records support them. If any number is a
rough estimate rather than something you can evidence, it is safer to soften it ("hundreds of
students") than to state a precise figure you cannot show.

The site deliberately does **not** guarantee admission, a scholarship or a visa, and the terms
page says so explicitly. That protects you.

---

## 8. Data you collect

The forms collect a name, an email address, a phone number, a qualification and study preferences.
That is personal data, and `/privacy` now explains plainly what happens to it, how long it is
kept and how someone asks for it to be deleted. Read that page and correct anything that does not
match how you actually work, particularly the retention section.

Nothing on the site asks for a passport number, a CNIC, bank details or a payment. Keep it that
way: a web form is the wrong place for any of them, and the privacy page tells students that
anyone asking for a transfer through the site is not you.

---

## 9. Summary of what is still open

Everything on this site is either your own or used under a licence that permits commercial use,
with one exception:

1. **Confirm where your ten photographs came from.** Reverse image search each one. Anything not
   from Unsplash, Pexels or Pixabay, or not covered by a stock licence you hold, should be
   replaced. Replacing one is a single line in `src/data/images.js`.

Two optional improvements:

2. Replace the four Unsplash photos with your own Italy and France pictures, so that every image
   on the site is yours outright.
3. Add photographer credits to section 2a once you have checked the originals. Not required by
   any licence mentioned here, but good practice and it costs nothing.
