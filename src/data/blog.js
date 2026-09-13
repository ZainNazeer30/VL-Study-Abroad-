// ---------------------------------------------------------------------------------------------
// THE BLOG
//
// Why a study abroad site needs one. Your eight main pages can each rank for one or two phrases,
// roughly "study in italy from pakistan" and "study abroad consultants pakistan". But a student
// deciding whether to go does not search that first. They search "does hec attestation take how
// long", "how much bank statement for italy student visa", "can i study in france without ielts".
// Those are the questions with real intent behind them, there are hundreds of them, and each
// needs its own page to rank. That is what these articles are.
//
// Every article here is written for a student in Pakistan, names the Pakistani institutions by
// name (IBCC, HEC, MOFA, the embassies in Islamabad), and answers the question early rather than
// making the reader scroll. Google measures whether people come back to the search results after
// clicking you; answering fast is not just good manners, it is the ranking signal.
//
// ---------------------------------------------------------------------------------------------
// HOW TO ADD A NEW ARTICLE
//
//   1. Copy any block below and change the fields.
//   2. `slug` becomes the web address: 'my-article' turns into /blog/my-article. Use words a
//      person would search, separated by hyphens, and never change it once it is published,
//      because any links pointing at the old address will break.
//   3. Add the address to public/sitemap.xml so Google finds it quickly.
//   4. `image` must be a key that exists in src/data/images.js.
//   5. `author` must be a key that exists in AUTHOR_BY_KEY in src/data/about.js, currently
//      'kashan' or 'umer'. Name the person who actually wrote or checked the article. Google's
//      guidance on who is behind a page is explicit that this has to be true, and a student who
//      reads a visa guide signed by a named consultant with a LinkedIn profile trusts it more
//      than one signed by "the team". Leave it out and the company byline is used instead.
//
// One article a month, answering one real question a student asked you that week, is worth more
// than ten thin pages written in an afternoon.
//
// The `body` is a list of blocks. The kinds available are:
//   { h2: 'A heading' }              a section heading
//   { h3: 'A smaller heading' }
//   { p: 'A paragraph.' }
//   { ul: ['point', 'point'] }       a bulleted list
//   { ol: ['first', 'second'] }      a numbered list
//   { note: 'Something to flag.' }   a highlighted box
//   { table: { head: [...], rows: [[...], [...]] } }
// ---------------------------------------------------------------------------------------------

export const BLOG_CATEGORIES = ['All', 'Applying', 'Visas', 'Scholarships', 'Money', 'Life abroad']

export const POSTS = [
  // -------------------------------------------------------------------------------------------
  {
    slug: 'apply-to-italy-and-france-from-pakistan',
    author: 'kashan',
    title: 'How to apply to a university in Italy or France from Pakistan',
    seoTitle: 'Apply to Italy or France from Pakistan',
    description:
      'A step by step guide for Pakistani students: documents, attestation, Universitaly and Campus France, deadlines and the student visa, in the order you meet them.',
    excerpt:
      'The whole route, from the day you decide to go to the day you get your visa, written for a student applying from Pakistan rather than from anywhere else.',
    category: 'Applying',
    image: 'blogApply',
    date: '2026-08-04',
    updated: '2026-08-04',
    read: 9,
    keywords: [
      'apply to italy from pakistan',
      'apply to france from pakistan',
      'study in europe from pakistan',
      'universitaly',
      'campus france pakistan',
    ],
faqs: [
      {
        q: 'Can I apply to Italy or France from Pakistan without an agent?',
        a: 'Yes. Nothing in either process legally requires a consultant, and plenty of students do it alone. What a consultant buys you is the sequence: knowing that attestation starts before applications, that Universitaly and Campus France are visa steps and not admission steps, and what a bank statement has to look like before a consulate accepts it. Those three mistakes are what cost students a whole intake.',
      },
      {
        q: 'How early should I start applying from Pakistan?',
        a: 'Twelve to fifteen months before your intended start. That sounds excessive until you count the attestation chain, which is IBCC or HEC then MOFA then embassy legalisation, and can take two to three months on its own without anything going wrong.',
      },
      {
        q: 'Do I need IELTS to apply to Italy or France?',
        a: 'Not always. Many English taught programmes accept a Medium of Instruction letter from your previous institution instead. A 6.0 or higher in IELTS still helps, because some scholarships weigh it and it strengthens the visa file.',
      },
    ],
    related: ['hec-ibcc-mofa-attestation-order', 'fully-funded-scholarships-for-pakistani-students', 'intake-deadlines-italy-france'],
  },

  // -------------------------------------------------------------------------------------------
  {
    slug: 'hec-ibcc-mofa-attestation-order',
    author: 'kashan',
    title: 'HEC, IBCC and MOFA attestation, in the right order',
    seoTitle: 'HEC, IBCC and MOFA Attestation Order',
    description:
      'Which documents go to IBCC, which go to HEC, when MOFA comes in and how long each stage takes. The exact order for an Italy or France student visa.',
    excerpt:
      'Matric to IBCC, degree to HEC, both to MOFA, then the embassy. Get the order wrong and you start again. Here is the sequence and the honest timings.',
    category: 'Applying',
    image: 'blogAttestation',
    date: '2026-07-21',
    updated: '2026-08-02',
    read: 7,
    keywords: [
      'hec attestation for study abroad',
      'ibcc attestation',
      'mofa attestation pakistan',
      'document attestation for italy student visa',
    ],
faqs: [
      {
        q: 'Does IBCC or HEC come first?',
        a: 'Neither comes before the other, because they handle different documents. Matric and Intermediate go to IBCC, degrees go to HEC, and both queues can be run at the same time. What is fixed is that MOFA comes after IBCC or HEC, and the embassy comes after MOFA.',
      },
      {
        q: 'How long does HEC attestation take?',
        a: 'The attestation itself is usually done on the day of your appointment. The wait is for the appointment slot, which in the busy months can be several weeks out, so book it as early as the online system allows.',
      },
      {
        q: 'Do I need MOFA attestation for an Italy or France student visa?',
        a: 'In almost all cases yes. MOFA attestation is what allows the embassy in Islamabad to legalise the document, and the consulate will not accept academic documents that have not been through that chain.',
      },
      {
        q: 'Should documents be translated before or after attestation?',
        a: 'After. The translator needs to translate the attestation stamps as well as the document, so a translation done first has to be repeated.',
      },
    ],
    related: ['apply-to-italy-and-france-from-pakistan', 'italy-student-visa-from-pakistan', 'france-student-visa-from-pakistan'],
  },

  // -------------------------------------------------------------------------------------------
  {
    slug: 'fully-funded-scholarships-for-pakistani-students',
    author: 'kashan',
    title: 'Fully funded scholarships in Italy and France for Pakistani students',
    seoTitle: 'Fully Funded Scholarships in Italy & France',
    description:
      'Which scholarships in Italy and France actually cover tuition and living costs, who qualifies, and what a Pakistani student needs to apply for each one.',
    excerpt:
      'The difference between a scholarship that covers your life and one that trims your fee, and the handful in Italy and France that genuinely do the first.',
    category: 'Scholarships',
    image: 'blogScholarships',
    date: '2026-07-07',
    updated: '2026-08-11',
    read: 8,
    keywords: [
      'fully funded scholarships for pakistani students',
      'dsu scholarship italy',
      'eiffel excellence scholarship',
      'scholarships in italy for pakistani students',
      'scholarships in france for pakistani students',
    ],
faqs: [
      {
        q: 'Which scholarships in Italy are fully funded for Pakistani students?',
        a: 'The regional DSU right to study scholarships are the main one, combining a maintenance grant with a tuition exemption and subsidised housing and meals. Invest Your Talent in Italy also combines a monthly allowance with tuition support for Master students in selected fields.',
      },
      {
        q: 'Can I get a fully funded scholarship in France?',
        a: 'The Eiffel Excellence scholarship is the main fully funded route, covering a monthly allowance, travel and insurance for Master and PhD students. It is nominated by the university rather than applied for directly, so you have to make contact early enough to be put forward.',
      },
      {
        q: 'Do I need a very high CGPA to get a scholarship?',
        a: 'For the merit competitions, yes, they are genuinely competitive. But the largest Italian awards, the regional DSU scholarships, are assessed on family income rather than marks, which is why they are often the better route for a student with average grades and a modest household income.',
      },
      {
        q: 'When do scholarship deadlines fall?',
        a: 'They vary by scheme and by region and they move year to year, but as a rule the scholarship deadline sits alongside or before the admission deadline, not after it. Never wait for an offer before applying for funding.',
      },
    ],
    related: ['cost-of-studying-in-italy-and-france', 'apply-to-italy-and-france-from-pakistan', 'intake-deadlines-italy-france'],
  },

  // -------------------------------------------------------------------------------------------
  {
    slug: 'italy-student-visa-from-pakistan',
    author: 'kashan',
    title: 'The Italy student visa from Pakistan, step by step',
    // "Requirements" is in here on purpose. Search Console shows this page sitting at about
    // position 8 for "italy student visa requirements pakistan", its single best query, and the
    // title did not contain the word the student actually typed. With the site name appended
    // this comes to roughly 63 characters, which Google may trim at the end, but the words that
    // matter are at the front where they are read first.
    seoTitle: 'Italy Student Visa Requirements from Pakistan',
    description:
      'What the Italian Embassy in Islamabad asks for, how much money to show, what a good bank statement looks like, and how long the student visa takes.',
    excerpt:
      'Pre enrolment, the Declaration of Value, the funds question and the appointment in Islamabad, in the order a Pakistani applicant meets them.',
    category: 'Visas',
    image: 'blogItalyVisa',
    date: '2026-06-16',
    updated: '2026-08-08',
    read: 8,
    keywords: [
      'italy student visa from pakistan',
      'italy study visa requirements pakistan',
      'universitaly pre enrolment',
      'declaration of value italy',
      'italy student visa bank statement',
    ],
faqs: [
      {
        q: 'How much bank statement is required for an Italy student visa from Pakistan?',
        a: 'The reference figure for academic years 2026/2027 and 2027/2028 is €10,179.85, set by the MUR and MAECI circular. It replaced €6,947.33, so guidance written before 2026 understates it by about a third. What matters as much as the amount is that the funds have a visible history and a traceable source rather than appearing shortly before the appointment.',
      },
      {
        q: 'How long does an Italian student visa take from Pakistan?',
        a: 'Usually two to six weeks after the appointment, and longer during the busy period before a September intake. Applying in the first round rather than the last is the single most effective way to avoid that pressure.',
      },
      {
        q: 'What is a Declaration of Value?',
        a: 'It is a statement from the Italian Embassy describing what your Pakistani qualification is equivalent to within the Italian education system. It is issued from documents that have already been attested by IBCC or HEC and then MOFA.',
      },
      {
        q: 'Can my father sponsor my Italian student visa?',
        a: 'Yes, a parent sponsor is normal and expected. You will need their bank statements, proof of their income, a sponsorship affidavit and documents proving the relationship, and the sponsor’s income should plausibly match the balance being shown.',
      },
    ],
    related: ['hec-ibcc-mofa-attestation-order', 'france-student-visa-from-pakistan', 'cost-of-studying-in-italy-and-france'],
  },

  // -------------------------------------------------------------------------------------------
  {
    slug: 'france-student-visa-from-pakistan',
    author: 'kashan',
    title: 'The France student visa from Pakistan, and the Campus France step',
    seoTitle: 'France Student Visa Requirements from Pakistan',
    description:
      'How Campus France and Études en France fit into the French student visa, what the interview asks, and how much money a Pakistani student needs to show.',
    excerpt:
      'France runs its applications through a government platform and interviews you before your file reaches a university. Here is how that works from Pakistan.',
    category: 'Visas',
    image: 'blogFranceVisa',
    date: '2026-06-02',
    updated: '2026-08-08',
    read: 7,
    keywords: [
      'france student visa from pakistan',
      'campus france pakistan',
      'etudes en france',
      'france study visa requirements',
      'france student visa interview',
    ],
faqs: [
      {
        q: 'Is Campus France compulsory for Pakistani students?',
        a: 'For the great majority of applicants going to a French institution for a full degree, yes. The Études en France file is how your application reaches the universities and it is also part of the visa process, so skipping it usually means starting the application again.',
      },
      {
        q: 'Can I study in France without knowing French?',
        a: 'Yes. There are many English taught Masters, particularly in business, engineering and computing. Learning some French before you go still helps a great deal with housing, part time work and daily administration once you arrive.',
      },
      {
        q: 'How much money do I need to show for a French student visa?',
        a: 'France works on a monthly figure, commonly cited at roughly €615 a month, which is a little over €7,000 for a year. Confirm the current requirement for your intake, and remember that a consulate weighs the history and source of the funds as much as the balance.',
      },
      {
        q: 'Can I work while studying in France?',
        a: 'Yes. A student residence permit allows part time work up to a legal limit, usually described as about 20 hours a week. It helps with living costs but it is not a substitute for having funding in place before you go.',
      },
    ],
    related: ['italy-student-visa-from-pakistan', 'fully-funded-scholarships-for-pakistani-students', 'study-without-ielts'],
  },

  // -------------------------------------------------------------------------------------------
  {
    slug: 'cost-of-studying-in-italy-and-france',
    author: 'umer',
    title: 'What it really costs to study in Italy or France',
    seoTitle: 'Cost of Studying in Italy and France',
    description:
      'Tuition, rent, food, transport and the one off costs nobody budgets for, laid out for a Pakistani student comparing Italy and France on a real budget.',
    excerpt:
      'Tuition is the small number. Rent is the big one. Here is a realistic monthly budget for both countries, plus the one off costs that catch families out.',
    category: 'Money',
    image: 'blogCost',
    date: '2026-05-19',
    updated: '2026-08-11',
    read: 7,
    keywords: [
      'cost of studying in italy for pakistani students',
      'cost of studying in france',
      'italy tuition fees for international students',
      'france tuition fees',
      'study abroad budget pakistan',
    ],
faqs: [
      {
        q: 'How much does it cost to study in Italy from Pakistan?',
        a: 'Public university tuition is often in the range of €1,000 to €4,000 a year and is frequently calculated on assessed family income, so a low income student can pay near the bottom. Living costs outside Milan usually run about €500 to €850 a month, less with DSU student housing.',
      },
      {
        q: 'Is France more expensive than Italy for students?',
        a: 'Slightly, on both tuition and living costs, and Paris significantly so. But many French public universities waive the higher international rate, and CROUS housing plus the housing allowance can bring the monthly figure close to Italy in a mid sized city.',
      },
      {
        q: 'Can I cover my costs with a part time job?',
        a: 'Part time work at the usual limit of about 20 hours a week can cover food, transport and some of your rent depending on the city. It should be treated as a buffer on top of proper funding, not as the funding itself.',
      },
    ],
    related: ['fully-funded-scholarships-for-pakistani-students', 'italy-student-visa-from-pakistan', 'choosing-a-university-in-italy-or-france'],
  },

  // -------------------------------------------------------------------------------------------
  {
    slug: 'study-without-ielts',
    author: 'umer',
    title: 'Can you study in Italy or France without IELTS?',
    seoTitle: 'Study in Italy or France Without IELTS',
    description:
      'When a Medium of Instruction letter is accepted instead of IELTS, which programmes still insist on a score, and what a Pakistani student should do in each case.',
    excerpt:
      'Often yes, through a Medium of Instruction letter. But there are places where a score still decides things, and one of them is money.',
    category: 'Applying',
    image: 'blogIelts',
    date: '2026-05-05',
    updated: '2026-07-28',
    read: 5,
    keywords: [
      'study in italy without ielts',
      'study in france without ielts',
      'medium of instruction letter',
      'study abroad without ielts from pakistan',
    ],
faqs: [
      {
        q: 'Can I study in Italy without IELTS?',
        a: 'Frequently yes. Many English taught Italian programmes accept a Medium of Instruction letter from your previous institution instead of a test score. Competitive programmes and several scholarships still ask for a score.',
      },
      {
        q: 'Can I apply to France without IELTS?',
        a: 'Some English taught French programmes accept a Medium of Instruction letter, but more of them ask for a score than in Italy, and Campus France may ask about your English level at the interview. Check each programme individually.',
      },
      {
        q: 'What is a Medium of Instruction letter?',
        a: 'A letter from your previous university, on letterhead and signed by the registrar, confirming that your degree was taught and examined in English. It is used in place of an IELTS or TOEFL score where a programme allows it.',
      },
    ],
    related: ['apply-to-italy-and-france-from-pakistan', 'france-student-visa-from-pakistan', 'choosing-a-university-in-italy-or-france'],
  },

  // -------------------------------------------------------------------------------------------
  {
    slug: 'choosing-a-university-in-italy-or-france',
    author: 'umer',
    title: 'How to choose a university in Italy or France, and not regret it',
    seoTitle: 'Choosing a University in Italy or France',
    description:
      'Rankings are the least useful way to pick. What actually decides three good years abroad: city, cost, language of teaching, housing and life after graduation.',
    excerpt:
      'The ranking is the least useful number on the page. Five things matter more, and four of them are things you can check in an afternoon.',
    category: 'Applying',
    image: 'blogChoosing',
    date: '2026-04-14',
    updated: '2026-07-12',
    read: 6,
    keywords: [
      'best universities in italy for pakistani students',
      'best universities in france for international students',
      'how to choose a university abroad',
      'english taught programmes italy',
    ],
faqs: [
      {
        q: 'Which universities in Italy are best for Pakistani students?',
        a: 'It depends far more on your subject, budget and city than on any ranking. Large public universities such as Bologna, Sapienza and Padua offer wide English taught choice and low income linked fees, while Politecnico di Milano is strong for engineering and design at a higher cost of living. The right answer is the one where you can afford to live and are likely to be admitted.',
      },
      {
        q: 'Do university rankings matter for jobs?',
        a: 'Some, particularly if you plan to return to Pakistan where a recognisable name carries weight, or if you intend to go into research. For most graduates the programme content, the internship component and the city’s job market matter more.',
      },
      {
        q: 'How many universities should I apply to?',
        a: 'Around six to eight, split into two ambitious, four realistic and two you are confident of. Applying to eight ambitious choices is the most common way students lose a year.',
      },
    ],
    related: ['cost-of-studying-in-italy-and-france', 'apply-to-italy-and-france-from-pakistan', 'study-without-ielts'],
  },

  // -------------------------------------------------------------------------------------------
  {
    slug: 'intake-deadlines-italy-france',
    author: 'umer',
    title: 'Italy and France intake deadlines, month by month',
    seoTitle: 'Italy and France Intake Deadlines',
    description:
      'When applications open and close for Italian and French universities, when scholarship deadlines fall, and what you should be doing in each month of the year.',
    excerpt:
      'The calendar most students see too late. What should be finished by November, what closes in January, and why April is not the start of anything.',
    category: 'Applying',
    image: 'blogDeadlines',
    date: '2026-04-02',
    updated: '2026-08-14',
    read: 6,
    keywords: [
      'italy university deadlines',
      'france application deadline',
      'september intake italy',
      'campus france deadline pakistan',
      'study abroad intake 2027',
    ],
faqs: [
      {
        q: 'When do applications for Italian universities open?',
        a: 'Many open from around November for a September start, with deadlines spread from December through to April depending on the university and programme. The separate Universitaly pre enrolment window usually falls in the spring.',
      },
      {
        q: 'When is the Campus France deadline for Pakistan?',
        a: 'The Études en France cycle usually opens in the autumn for the following academic year, with submissions and interviews running through the winter. Confirm the exact dates for your year with Campus France Pakistan, because they shift.',
      },
      {
        q: 'Is the February intake worth it?',
        a: 'It is a reasonable second option when September is not achievable, but the choice of programmes is narrower and most scholarship funding is attached to the September intake. If September is achievable, take it.',
      },
    ],
    related: ['apply-to-italy-and-france-from-pakistan', 'fully-funded-scholarships-for-pakistani-students', 'hec-ibcc-mofa-attestation-order'],
  },
]

export const POST_BY_SLUG = Object.fromEntries(POSTS.map((p) => [p.slug, p]))

// The article text itself lives in src/data/posts/<slug>.js, one file per article, and is only
// downloaded when a reader actually opens that article. The home page and the guides index show
// only the title, category and excerpt above, so they no longer pay for text nobody is reading.

export function formatPostDate(iso) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
