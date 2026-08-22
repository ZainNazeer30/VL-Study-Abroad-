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
    body: [
      {
        p: 'If you are applying from Pakistan, the process has two halves that most guides mix together. The first half is the university application, which is broadly the same for a student anywhere in the world. The second half is the paperwork half, and it is entirely specific to Pakistan: IBCC, HEC, MOFA, a bank statement a consulate will accept, and an appointment in Islamabad. Students lose whole intakes to the second half while doing the first half perfectly.',
      },
      { p: 'Here is the whole thing in order, with the Pakistan specific parts marked.' },

      { h2: 'Step 1: Decide the country and the level, honestly' },
      {
        p: 'Italy and France both charge public university fees that are low by international standards, both let you work part time on a student visa, and both give you a path to stay and work after you graduate. They differ in how they select students.',
      },
      {
        ul: [
          'Italy is more forgiving on grades and stronger on need based support. The regional DSU scholarships are assessed on family income rather than marks, which suits a strong student from a modest income household better than almost any other route in Europe.',
          'France is more selective on academic record and more structured. The application runs through a government platform, the interview is a real interview, and the scholarships that matter, such as Eiffel Excellence, are competitive on merit.',
        ],
      },
      {
        p: 'If your marks are average but your family income is genuinely low, look at Italy first. If your marks are strong, apply to both and let the offers decide.',
      },

      { h2: 'Step 2: Start attestation before you start applying' },
      {
        p: 'This is the single most useful sentence in this article. Attestation runs on its own timeline and nothing you do speeds it up on the day you need it. Start it the month you decide to go, not the month a university asks for it.',
      },
      {
        ol: [
          'Matric and FSc or Intermediate certificates go to IBCC.',
          'A Bachelor or Master degree and its transcript go to HEC.',
          'After IBCC or HEC, the documents go to MOFA.',
          'Only then can an embassy legalise them.',
        ],
      },
      {
        note: 'The order is not optional. MOFA will not attest a degree that HEC has not attested first, and an embassy will not touch anything MOFA has not stamped. Doing them out of order means starting again.',
      },
      {
        p: 'We wrote the full sequence, with the realistic timings for each stage, in a separate article: HEC, IBCC and MOFA attestation, in the right order.',
      },

      { h2: 'Step 3: Sort your English evidence' },
      {
        p: 'Most English taught programmes in both countries accept one of three things: an IELTS or TOEFL score, a Medium of Instruction letter from your last institution, or in some cases an interview. A 6.0 overall in IELTS opens almost every English taught Bachelor, and 6.5 opens most Masters. If your degree was taught in English, ask your university registrar for a Medium of Instruction letter early, because they are slow to issue.',
      },
      {
        p: 'A score helps beyond admission. Several scholarships weigh it, and a visa officer reads it as evidence you can actually follow the course.',
      },

      { h2: 'Step 4: Build the academic file' },
      {
        p: 'The same set of documents is used again and again, so make one clean folder and keep it complete:',
      },
      {
        ul: [
          'Passport, valid for at least the length of your intended stay plus a few months.',
          'Matric, FSc and any degree certificates and full transcripts.',
          'English proof, IELTS, TOEFL or a Medium of Instruction letter.',
          'A CV in European format, one to two pages.',
          'A motivation letter, rewritten for each university rather than copied.',
          'Two academic references where the programme asks for them.',
          'A passport photograph on a white background, taken recently.',
        ],
      },
      {
        p: 'The motivation letter is where Pakistani applications are usually weakest and most easily fixed. Admissions staff read hundreds. A letter that names the specific programme, the specific modules and what you plan to do afterwards beats a letter about your love of learning every time.',
      },

      { h2: 'Step 5: Apply, through the right platform' },
      { h3: 'Italy' },
      {
        p: 'You apply directly to each university first, and separately you make a pre enrolment application on Universitaly, the Italian government portal. The Universitaly step is what connects your admission to your visa application, so it is not optional and it has its own window, usually opening in spring for a September start. Some universities also run their own early rounds from November onwards.',
      },
      { h3: 'France' },
      {
        p: 'For most Pakistani students the route is Campus France Pakistan and the Études en France platform. You create a file, list your programme choices, upload the documents, and go through an interview at Campus France before your application reaches the universities. Campus France clearance is also a step in the visa process, which is why starting it late is so costly.',
      },
      {
        note: 'Both countries treat the pre enrolment or Campus France stage as part of the visa route, not just the admission route. A student who has an offer letter but skipped the platform does not yet have a visa application.',
      },

      { h2: 'Step 6: Apply for the scholarships in parallel' },
      {
        p: 'Do not wait for an offer. Most of the fully funded options have their own deadlines that sit before or alongside the admission deadlines. Italy’s DSU regional scholarships are assessed on family income and can cover tuition, a maintenance grant, housing and meals. France’s Eiffel Excellence scholarship is nominated by the university, which means you have to ask the university to nominate you, and there is a date after which they cannot.',
      },
      {
        p: 'For DSU you will need Pakistani income and property documents translated and legalised, and that takes weeks. Same rule as attestation: start early.',
      },

      { h2: 'Step 7: Build the visa file' },
      {
        p: 'Once you have an offer and the platform step is done, the visa file comes together. Both consulates want broadly the same categories of evidence:',
      },
      {
        ul: [
          'Admission or pre enrolment confirmation.',
          'Proof of accommodation for at least the first period.',
          'Health insurance covering the stay.',
          'Proof of funds, and this is the part that fails most often.',
          'Attested and legalised academic documents.',
          'A completed application form and the appointment booking.',
        ],
      },
      {
        p: 'On funds, the amount matters less than the shape of the account. A consulate wants to see money that has been sitting there, in an account belonging to you or a clearly documented sponsor, usually a parent, with a relationship proof. A large deposit made a week before the appointment reads as borrowed money and is a common reason for refusal. Six months of steady statements beats a big number every time.',
      },

      { h2: 'Step 8: The appointment in Islamabad' },
      {
        p: 'For most students the appointment happens in Islamabad, at the Italian Embassy for Italy or through the French Embassy process for France. Bring the file in the order the checklist lists it, not in the order you assembled it. Expect questions about why this programme, why this city, who is paying and what you intend to do after you graduate. Answer plainly. A student who knows the name of their supervisor and the cost of a room in that city sounds like a student.',
      },
      {
        p: 'Decisions usually take two to six weeks after the appointment, longer at the peak of the season, which is exactly why applying in the first round matters.',
      },

      { h2: 'A realistic timeline for a September start' },
      {
        table: {
          head: ['When', 'What you should be doing'],
          rows: [
            ['12 to 15 months before', 'Decide the country and level. Start IBCC or HEC attestation. Book IELTS if you need it.'],
            ['10 to 12 months before', 'Shortlist programmes. Get the Medium of Instruction letter. Finish attestation and MOFA.'],
            ['8 to 10 months before', 'Write motivation letters. Submit university applications and open the Campus France file.'],
            ['6 to 8 months before', 'Universitaly pre enrolment for Italy. Campus France interview for France. Submit scholarship applications.'],
            ['4 to 6 months before', 'Offers arrive. Arrange accommodation, insurance and the funds evidence.'],
            ['3 to 4 months before', 'Book and attend the visa appointment in Islamabad.'],
            ['1 to 2 months before', 'Visa decision, flights, pre departure briefing.'],
          ],
        },
      },
      {
        p: 'If you are reading this later than the top row suggests, it is not necessarily too late, but the next intake becomes the realistic target rather than the one after this month. We will tell you honestly which one you are looking at.',
      },
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
    body: [
      {
        p: 'Attestation is the part of studying abroad that nobody warns Pakistani students about until it is already late. It is not hard. It is just sequential, and each stage refuses to act until the previous one has stamped the paper.',
      },
      { h2: 'The short answer' },
      {
        table: {
          head: ['Document', 'Goes to', 'Then to'],
          rows: [
            ['Matric certificate', 'IBCC', 'MOFA'],
            ['FSc, FA or Intermediate certificate', 'IBCC', 'MOFA'],
            ['O Levels or A Levels', 'IBCC (equivalence certificate)', 'MOFA'],
            ['Bachelor degree and transcript', 'HEC', 'MOFA'],
            ['Master degree and transcript', 'HEC', 'MOFA'],
            ['Birth certificate or NADRA documents', 'Issuing authority', 'MOFA'],
          ],
        },
      },
      {
        p: 'After MOFA, the relevant embassy in Islamabad legalises the document. For Italy this is often described as legalisation at the Italian Embassy, and for a degree it may be accompanied by a Declaration of Value, which is the embassy confirming what your Pakistani qualification is equivalent to in the Italian system.',
      },
      {
        note: 'MOFA will not attest anything IBCC or HEC has not already attested. An embassy will not legalise anything MOFA has not stamped. There is no way to jump the queue, so the only lever you have is starting early.',
      },

      { h2: 'IBCC, for school certificates' },
      {
        p: 'The Inter Board Committee of Chairmen handles Matric and Intermediate level documents, and issues equivalence certificates for O and A Levels. If you studied under a foreign board, the equivalence certificate is the document European universities and consulates actually want, because it states your result in terms a Pakistani board result would be understood in.',
      },
      {
        p: 'You will typically need the original certificate, the detailed marks certificate, your CNIC or B Form and passport copies, and the fee. Regional offices exist in the major cities, and the timing varies with the season. Around results time it is slower.',
      },

      { h2: 'HEC, for degrees' },
      {
        p: 'The Higher Education Commission attests degrees and transcripts from recognised Pakistani universities. HEC runs an online appointment system, and this is where students lose the most time, because appointments in the busy months fill up well in advance. Book the appointment before you have your documents in hand if the system lets you, then work backwards.',
      },
      {
        p: 'HEC will not attest a degree from an institution it does not recognise, and it will not attest a provisional certificate in place of the real one in every case. If you have only just finished, ask your university how quickly it issues the final degree, because that date, not your result date, is what governs your timeline.',
      },

      { h2: 'MOFA, after both' },
      {
        p: 'The Ministry of Foreign Affairs attests documents that already carry an IBCC or HEC stamp. It is the fastest of the three stages, often same day or next day at a camp office, but only if the previous stamp is there and correct.',
      },

      { h2: 'How long the whole chain takes' },
      {
        p: 'With nothing going wrong and appointments available, students commonly get through the full chain in four to eight weeks. In the busy period, or if a document has to be reissued, three months is realistic. Build your plan around the slow version.',
      },
      {
        ul: [
          'Get every original document in hand first, including the final degree, not a provisional one.',
          'Make good quality copies and scans of everything before you start, because you will be asked for the same file repeatedly.',
          'Do school certificates and degrees in parallel, not one after the other. IBCC and HEC are separate queues.',
          'Book the HEC appointment as early as the system allows.',
          'Keep a single folder, physical and digital, and never break it up.',
        ],
      },

      { h2: 'Translations' },
      {
        p: 'Italy generally wants documents translated into Italian by an approved translator, and France into French, though English is accepted for parts of some processes. Translation happens after attestation, not before, because the translator has to translate the stamps too. Ask before you pay: a translation done at the wrong stage has to be redone.',
      },

      { h2: 'What actually goes wrong' },
      {
        ol: [
          'Starting attestation after receiving an admission offer, which leaves six weeks of work in a four week window.',
          'Attesting a provisional degree, then having to repeat the chain with the final one.',
          'A name spelled differently on the passport and on the degree. Fix this before attestation, not after.',
          'Translating before attesting.',
          'Getting only the degree attested and not the transcript, when the university asks for both.',
        ],
      },
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
    body: [
      {
        p: 'Almost every study abroad page says "scholarships available". Very few say which ones pay your rent. That distinction is the whole thing, so start with it.',
      },
      {
        ul: [
          'A fully funded scholarship covers tuition and gives you enough to live on. It is the difference between going and not going.',
          'A fee waiver or a merit award reduces the bill. It is genuinely useful, but you still need to fund your living costs.',
        ],
      },
      {
        p: 'We check the first category for every student before we look at anything else, because there is no point optimising a fee waiver for someone who qualifies for a full grant.',
      },

      { h2: 'Italy: the DSU regional scholarships' },
      {
        p: 'This is the strongest route for most Pakistani students, and it is the one most often missed. Each Italian region runs a right to study scheme, and the award is based on family income and assets rather than on your marks. For a student from a modest income household, that is a much better basis than a merit competition against the whole world.',
      },
      {
        p: 'A full DSU award typically combines a maintenance grant, a full tuition exemption, and subsidised or free university housing and meals. The exact amounts differ by region and by whether you live at home, which for an international student you do not, so you fall into the higher bracket.',
      },
      { h3: 'What a Pakistani applicant needs' },
      {
        ul: [
          'Family income documents, which usually means tax records or an income certificate.',
          'Property and asset documents for the family.',
          'These translated and legalised through the attestation chain, then submitted in the form the region asks for.',
          'The regional application submitted by its own deadline, which is separate from your university application.',
        ],
      },
      {
        note: 'The income paperwork is the reason students miss DSU. It has to come from Pakistani authorities, be translated, and be legalised, and that is a multi week job. Start it at the same time as your academic attestation.',
      },

      { h2: 'Italy: Invest Your Talent in Italy' },
      {
        p: 'A programme aimed at Master students in fields such as engineering, advanced technologies, architecture, design and economics. It combines a monthly maintenance allowance with tuition support, and is open to citizens of a list of selected countries. It is competitive on academic record, and applications run through the participating universities.',
      },

      { h2: 'Italy: university and regional merit awards' },
      {
        p: 'Most Italian public universities also run their own merit scholarships and tuition bands based on income. Italian tuition is often calculated on the ISEE income assessment in the first place, which means a low income international student can end up paying near the bottom of the range before any scholarship at all. Ask about this specifically, because it is not advertised.',
      },

      { h2: 'France: the Eiffel Excellence scholarship' },
      {
        p: 'The flagship French government scholarship, aimed at Master and PhD students, and genuinely full: a monthly allowance plus international travel, health insurance and cultural activities. It is competitive, and there is one detail that catches students out.',
      },
      {
        note: 'You do not apply for Eiffel yourself. The university nominates you. That means you have to be in contact with the university early enough for them to put your name forward, and their internal deadline sits before the official one.',
      },
      {
        p: 'Age limits apply and vary by level, so check the current year’s rules against your date of birth before you build a plan around it.',
      },

      { h2: 'France: Sciences Po Émile Boutmy and university awards' },
      {
        p: 'Sciences Po runs the Émile Boutmy scholarship for non EU students, which can be substantial and is awarded on a mix of academic strength and financial need. Many other French institutions run their own awards, and the grandes écoles in particular have funds that are not widely known outside their own websites.',
      },

      { h2: 'France: CROUS housing, which is not a scholarship but behaves like one' },
      {
        p: 'CROUS is the French student services network, and its subsidised housing is one of the biggest single savings available to a student in France. A CROUS room in a mid sized city can cost a fraction of the private market, and there is also a national housing allowance that many international students are eligible for once they arrive. Neither is a scholarship, but together they can change your monthly budget more than a small merit award would.',
      },

      { h2: 'How to actually get one' },
      {
        ol: [
          'Work out your realistic category first. Strong marks and a competitive profile point at Eiffel and Invest Your Talent. Modest marks and genuinely low family income point at DSU, which is often the larger award anyway.',
          'Start the supporting paperwork in parallel with your applications, not after. Income and asset documents take as long as academic attestation.',
          'Contact the university early if a scholarship requires nomination. Nobody nominates a name they have not heard.',
          'Apply to more than one. Scholarship outcomes are not fully predictable, and the application costs you time rather than money.',
          'Keep the fallback in view. A low tuition public university plus CROUS or DSU housing plus 20 hours a week of legal part time work is a workable plan on its own.',
        ],
      },
      {
        p: 'And a warning that should not need writing: nobody can guarantee you a scholarship. Anyone who does is selling something. What we can do is tell you honestly which category you fall into and make sure nothing is missed on a deadline.',
      },
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
    title: 'The Italy student visa from Pakistan, step by step',
    seoTitle: 'Italy Student Visa from Pakistan',
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
    body: [
      {
        p: 'An Italian student visa application is not judged on your marks. It is judged on whether the file is complete, whether the money is credible, and whether you sound like someone who is going to study. Those are three separate things and each one can be prepared.',
      },

      { h2: 'Before the visa: pre enrolment on Universitaly' },
      {
        p: 'Italy requires a pre enrolment application through Universitaly, the government portal, in addition to your application to the university itself. This links your admission to your visa file. Without it the consulate has nothing to attach your application to, so it is the first real deadline in your year rather than an afterthought.',
      },

      { h2: 'The Declaration of Value' },
      {
        p: 'The Dichiarazione di Valore, usually called the Declaration of Value, is a statement from the Italian Embassy in Islamabad describing what your Pakistani qualification amounts to within the Italian system. It is issued on the basis of documents that have already been through IBCC or HEC and then MOFA, which is why the attestation chain has to be finished well before this point. Some universities accept alternative recognition statements instead, so check which one your programme wants before paying for the wrong document.',
      },

      { h2: 'What goes in the file' },
      {
        ul: [
          'Completed national visa application form.',
          'Passport valid for the intended stay, plus passport photographs to the required specification.',
          'Universitaly pre enrolment confirmation and the university admission letter.',
          'Attested and legalised academic documents, with translations, and the Declaration of Value or equivalent.',
          'Proof of accommodation in Italy for the initial period.',
          'Health insurance valid in Italy for the length of the stay.',
          'Proof of financial means, covered below in detail.',
          'Proof of the return or onward journey where requested.',
        ],
      },
      {
        note: 'Present the file in the order the checklist lists it, tabbed, with copies behind originals. This sounds trivial. It is not. A file that is easy to check is checked favourably.',
      },

      { h2: 'The money question, properly' },
      {
        p: 'Italy expects evidence that you can support yourself for the academic year. The figure commonly used is in the region of €7,000 for a year, but treat any number you read anywhere, including here, as something to confirm against the current consulate guidance for your intake, because it is reviewed periodically.',
      },
      {
        p: 'Far more important than the number is the shape of the account. What a consular officer is looking for:',
      },
      {
        ul: [
          'A history. Six months of statements showing the money sitting there beats a single large balance that appeared last week.',
          'A traceable source. Salary, business income, rental income or an explained sale. Cash deposits with no explanation are the classic failure.',
          'A documented sponsor. Almost always a parent. You need their statements, their proof of income, a sponsorship affidavit and proof of the relationship.',
          'Consistency with everything else in the file. A declared family income that could not plausibly produce the balance in the account raises the exact question you do not want raised.',
        ],
      },
      {
        p: 'If your statement does not look like this yet, the fix is time, not a bigger number. We look at statements before an appointment is booked and say honestly whether they are ready.',
      },

      { h2: 'The appointment in Islamabad' },
      {
        p: 'The appointment is at the Italian Embassy in Islamabad for most applicants. Book as early as slots allow, because they compress badly in the run up to a September intake.',
      },
      { p: 'The questions are predictable, and being unprepared for predictable questions is what damages an otherwise good application:' },
      {
        ul: [
          'Why this programme, and why not the same subject in Pakistan?',
          'Why this university and this city?',
          'Who is funding you, and what do they do?',
          'What will you do after you graduate?',
          'What are the modules in your first semester?',
        ],
      },
      {
        p: 'Know the name of your programme, the name of at least one professor or the head of department, and roughly what a room costs in that city. That level of detail is what separates a student from an applicant.',
      },

      { h2: 'How long it takes' },
      {
        p: 'Two to six weeks after the appointment is typical, longer at the peak of the season. Plan your flights around the decision, not the other way round, and never buy a non refundable ticket before a visa is issued.',
      },

      { h2: 'After you land: the residence permit' },
      {
        p: 'The visa gets you into Italy. Within eight working days of arriving you have to apply for the permesso di soggiorno, the residence permit, at a post office, and that is what lets you stay legally for the year. Miss it and you create a problem that is tedious to unwind. This is on the list of things we brief students on before they fly.',
      },
    ],
    faqs: [
      {
        q: 'How much bank statement is required for an Italy student visa from Pakistan?',
        a: 'The figure commonly used is around €7,000 for an academic year, but confirm the current requirement for your intake with the consulate, because it is reviewed. What matters as much as the amount is that the funds have a visible history and a traceable source rather than appearing shortly before the appointment.',
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
    title: 'The France student visa from Pakistan, and the Campus France step',
    seoTitle: 'France Student Visa and Campus France',
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
    body: [
      {
        p: 'The French process has one structural difference from the Italian one, and everything else follows from it: for most students, your application goes through Campus France before it goes to a university, and Campus France interviews you.',
      },

      { h2: 'Campus France and Études en France' },
      {
        p: 'Campus France is the French government agency for international students, with an office serving Pakistan. You create a file on the Études en France platform, list the programmes you want, upload your documents, and attend an interview. Campus France then forwards your file to the institutions, and its clearance later becomes part of your visa application.',
      },
      {
        note: 'This means the platform is not paperwork you do after being accepted. It is how you get accepted, and it is a visa step. A student who applied directly to a French university by email and skipped Campus France usually has to start again.',
      },

      { h2: 'The Campus France interview' },
      {
        p: 'It is a real interview about your academic plan, conducted in English or French depending on your programme. It is not a test of trivia. What it is testing is coherence: does this programme follow from what you have already studied, and does it lead somewhere you can describe?',
      },
      { p: 'Be able to answer:' },
      {
        ul: [
          'Why France rather than another country, and why this city?',
          'How does this Master follow from your Bachelor?',
          'What are the specific modules, and who teaches the part you care about?',
          'What is your plan after graduating, and how does it connect to Pakistan or to Europe?',
          'How is this being funded, in numbers?',
        ],
      },
      {
        p: 'A weak answer to "why this programme" is the most common reason a strong student comes out of this stage worse off than they should.',
      },

      { h2: 'French language, or not' },
      {
        p: 'There are a large number of English taught Masters in France, particularly in business, engineering and computer science, so you can absolutely go without French. But learning some before you arrive changes your life there rather than your admission: part time work, housing and administration all get easier. A2 before you fly is a realistic and worthwhile target.',
      },

      { h2: 'The visa file' },
      {
        ul: [
          'Études en France file number and Campus France clearance.',
          'Admission or pre admission letter from the institution.',
          'Passport and photographs to specification.',
          'Proof of accommodation for the initial period, whether CROUS, a private lease or a certified host.',
          'Proof of financial means for the year.',
          'Health insurance for the initial period, alongside registration in the French health system once you arrive.',
          'Academic documents, attested through IBCC or HEC then MOFA, with translations.',
        ],
      },

      { h2: 'How much money you have to show' },
      {
        p: 'France works on a monthly figure rather than a lump sum, commonly cited at roughly €615 a month, so a little over €7,000 for a year. As with Italy, confirm the current figure for your intake rather than relying on any article, and understand that the credibility of the funds matters as much as the total.',
      },
      {
        p: 'The same rules apply as for Italy: history, traceable source, documented sponsor, and consistency with the rest of the file. A statement that suddenly grows the month before the appointment invites the question you least want.',
      },

      { h2: 'After the visa: validation' },
      {
        p: 'A long stay French student visa usually has to be validated online shortly after you arrive, which is what turns it into a valid residence document. It is quick, it is free of drama if you do it on time, and it is one of the things students forget in their first busy fortnight.',
      },

      { h2: 'Working and staying afterwards' },
      {
        p: 'A French student visa allows part time work up to a legal limit, commonly described as around 20 hours a week or 964 hours a year. After a Master there is a temporary residence route that lets graduates look for work or start a business, which is one of the practical reasons students choose France over some other destinations. The rules change, so check the current position for your graduation year rather than the one in force when you applied.',
      },
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
    body: [
      {
        p: 'Most families ask about tuition first. In Italy and France, tuition is usually the smallest line in the budget, and the number that actually decides whether the plan works is rent. So let us do it in the right order.',
      },

      { h2: 'Tuition' },
      { h3: 'Italy' },
      {
        p: 'Public universities in Italy typically charge somewhere in the range of €1,000 to €4,000 a year for international students, and here is the part that is not widely understood: the figure is often calculated on assessed family income, through the ISEE system. A student from a genuinely low income household can land near the bottom of the band before any scholarship is involved. Private universities are a different market entirely and can be many times that.',
      },
      { h3: 'France' },
      {
        p: 'France sets a higher rate for non EU students at public universities, in the region of €2,770 a year for a Bachelor and €3,770 for a Master. However, a large number of public institutions choose to waive the difference and charge international students the same as French students, which is a few hundred euros a year. Whether a given university waives it is decided institution by institution, so check the specific programme rather than assuming either figure. Grandes écoles and business schools set their own, much higher, fees.',
      },
      {
        note: 'Confirm current tuition on the university’s own page for your intake year. Fees are reviewed annually and any article, including this one, ages.',
      },

      { h2: 'A realistic monthly budget' },
      {
        p: 'These are broad ranges for a student living reasonably frugally. Paris and Milan sit at or above the top of every range. A mid sized university city sits near the bottom.',
      },
      {
        table: {
          head: ['Monthly cost', 'Italy', 'France'],
          rows: [
            ['Room, university or shared', '€250 to €500', '€250 to €550'],
            ['Room, Paris or Milan', '€500 to €800', '€600 to €900'],
            ['Food and groceries', '€150 to €250', '€180 to €280'],
            ['Transport pass', '€20 to €40', '€25 to €80'],
            ['Phone and internet', '€10 to €25', '€15 to €30'],
            ['Books, supplies, personal', '€50 to €100', '€50 to €120'],
            ['Realistic total outside the capital', '€500 to €850', '€550 to €950'],
          ],
        },
      },
      {
        p: 'Subsidised housing changes this picture more than anything else. DSU housing in Italy and CROUS housing in France can cut the largest line roughly in half, and France also has a housing allowance many international students become eligible for after arriving. This is why choosing a city with good student housing is a financial decision, not just a lifestyle one.',
      },

      { h2: 'The one off costs families forget' },
      {
        ul: [
          'IELTS registration, if you take it.',
          'IBCC, HEC and MOFA attestation fees across several documents.',
          'Certified translations, which are charged per page and add up quickly.',
          'The Declaration of Value or equivalent recognition document.',
          'Visa fee and appointment costs, plus travel to Islamabad and a night there.',
          'Flights, one way, booked after the visa is issued.',
          'The first month deposit on a room, often two months of rent at once.',
          'Health insurance for the initial period.',
          'Residence permit costs after arrival.',
        ],
      },
      {
        p: 'Taken together these are usually a meaningful sum in rupees, and they land before any scholarship money arrives. Budget them separately from the monthly living costs, because they are the ones that surprise people.',
      },

      { h2: 'Part time work' },
      {
        p: 'Both countries allow students to work part time, commonly described as up to about 20 hours a week. In practice that can cover food, transport and phone, and sometimes part of the rent, depending on the city and the language you speak. What it does not do is fund the whole plan, and treating it as your funding strategy is how students end up in trouble in their first year. Plan to be funded, and treat part time work as the buffer.',
      },

      { h2: 'Putting it together' },
      {
        p: 'A workable plan for a Pakistani student without a full scholarship usually looks like this: a public university with low or waived tuition, a mid sized city rather than the capital, subsidised student housing, a documented sponsor covering the year, and part time work for the extras. That plan is affordable for a lot more families than assume it is not.',
      },
      {
        p: 'With a fully funded scholarship, the maths changes entirely, which is why we check that first for every student.',
      },
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
    body: [
      {
        p: 'The short answer is often yes. A good number of English taught programmes in both Italy and France accept a Medium of Instruction letter from your previous institution in place of an IELTS or TOEFL score. But "often" is doing real work in that sentence, so here is where the line falls.',
      },

      { h2: 'What a Medium of Instruction letter is' },
      {
        p: 'It is a letter from your university or college, on official letterhead, signed by the registrar or controller of examinations, stating that your degree was taught and examined in English. That is all it is. It carries weight because it comes from the institution rather than from you.',
      },
      { p: 'A letter that gets accepted usually:' },
      {
        ul: [
          'Names you, your programme and the years you studied.',
          'States explicitly that the medium of instruction and of examination was English.',
          'Is on letterhead with a stamp and a signature and a contact for verification.',
          'Is issued recently rather than years ago.',
        ],
      },
      {
        note: 'Registrars in Pakistan are often slow to issue these, and the wording matters. Request it early and check it says "medium of instruction and examination" rather than something vaguer.',
      },

      { h2: 'Where a score is still needed' },
      {
        ul: [
          'Competitive programmes that state a specific score in their entry requirements, particularly at well ranked institutions.',
          'Several scholarship schemes, which use a score as an objective comparison across countries.',
          'Some professional and clinical programmes.',
          'Occasionally the visa stage, where a score is one more piece of evidence that you can follow the course.',
        ],
      },

      { h2: 'What score to aim for' },
      {
        p: 'As a general guide, 6.0 overall opens most English taught Bachelor programmes and 6.5 opens most Masters, with some asking for no band below 5.5 or 6.0. Check the exact requirement of the programmes on your shortlist rather than aiming at a number you read anywhere.',
      },

      { h2: 'Our honest advice' },
      {
        p: 'If you can afford the test and you have the time, take it. Not because you always need it, but because it removes a whole category of "it depends" from your year: it widens your shortlist, it makes scholarship applications possible that otherwise are not, and it makes the visa file stronger. If money or time genuinely makes that impossible, then build the shortlist around programmes that accept a Medium of Instruction letter and get the letter worded properly.',
      },
      {
        p: 'What we would not do is decide the whole country and programme purely to avoid a test. That is optimising the small decision at the cost of the large one.',
      },

      { h2: 'And French, for France' },
      {
        p: 'English taught Masters in France do not require French for admission. If you apply to a French taught programme, you will usually need a DELF or TCF result at around B2. Either way, a little French before you go makes the practical parts of life there significantly easier.',
      },
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
    body: [
      {
        p: 'Students arrive at us with a list of universities taken from a global ranking, and it is almost always the wrong list. Not because rankings are meaningless, but because they measure research output, and you are not buying research output. You are buying three years of your life in a particular city on a particular budget.',
      },
      { p: 'Here is what we actually go through with a student, in order of how much it affects the outcome.' },

      { h2: '1. Is the programme taught in a language you have?' },
      {
        p: 'Obvious, and still the most common mistake. A programme listed under an English title is not always taught in English throughout, and a Master with English in the first year and Italian in the second is a real thing. Check the language of instruction on the programme page, not the faculty page, and check it for every year.',
      },

      { h2: '2. What does the city cost, and does the university house you?' },
      {
        p: 'The difference between Milan and Bologna, or Paris and Lille, is larger than the difference between most universities in the same country. A university with guaranteed DSU or CROUS housing in a mid sized city can be several hundred euros a month cheaper than a better ranked one in the capital, which over two years is a scholarship in itself.',
      },
      {
        p: 'Ask directly: does this university offer student housing to international students, and is it allocated or applied for? "Applied for, in a competitive pool" and "allocated to scholarship holders" are very different answers.',
      },

      { h2: '3. Can you actually get in?' },
      {
        p: 'Look at the stated entry requirements and be honest about your file. A shortlist should have a couple of ambitious choices, several realistic ones and one you would certainly get. A list of eight ambitious choices is not a strategy, it is a way to spend a year and end up with nothing.',
      },

      { h2: '4. What is the scholarship position at that specific institution?' },
      {
        p: 'This varies enormously and is not visible in any ranking. Some Italian universities sit in regions with generous DSU provision. Some French institutions nominate actively for Eiffel and some barely do. Some have their own income based fee bands. Two universities of identical standing can differ by thousands of euros a year for the same student.',
      },

      { h2: '5. What happens after you graduate?' },
      {
        p: 'Look for whether the programme has an internship or placement component, whether the city has employers in your field, and what the post study stay route looks like in that country for your graduation year. A well connected programme in a working city beats a famous name in a place with no industry in your subject.',
      },

      { h2: 'Where rankings are genuinely useful' },
      {
        p: 'Two places. First, if you intend to go on to a PhD or to research, the standing of the department matters and subject rankings are a reasonable proxy. Second, if your family or a future employer in Pakistan will recognise the name, that has real value, and it is not snobbery to weigh it. Just weigh it after the five things above, not before.',
      },

      { h2: 'A simple way to build the shortlist' },
      {
        ol: [
          'Write down your budget per month, honestly, in euros.',
          'List programmes in your subject taught in a language you have.',
          'Remove any in a city where your budget would not cover a room and food.',
          'Of what is left, sort by scholarship and housing provision rather than by ranking.',
          'Split the top eight into two ambitious, four realistic and two safe.',
          'Then, and only then, look at where they sit in a ranking, and use it to break ties.',
        ],
      },
      {
        p: 'That process produces a very different list from the one most students walk in with, and a much higher proportion of students who are still happy in year two.',
      },
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
    body: [
      {
        p: 'Deadlines move year to year and university to university, so treat this as the shape of the year rather than a list of dates. What does not change is the shape: the work that decides your outcome happens six to twelve months before the deadline everyone talks about.',
      },

      { h2: 'The two intakes' },
      {
        ul: [
          'September or October, the main intake in both countries, with the widest choice of programmes and almost all of the scholarship money.',
          'February, a smaller intake at some Italian universities and a few French institutions, with a narrower choice and much less funding.',
        ],
      },
      {
        p: 'If you can make the September intake work, make it work. The February intake is a reasonable second option, not an equal one.',
      },

      { h2: 'The year, working backwards from a September start' },
      {
        table: {
          head: ['Month', 'Italy', 'France'],
          rows: [
            ['Aug to Sep, a year ahead', 'Start IBCC and HEC attestation. Book IELTS if needed.', 'Same. Begin looking at programmes.'],
            ['Oct to Nov', 'Early university rounds start opening. Shortlist programmes.', 'Études en France file opens for the next year. Prepare documents.'],
            ['Dec to Jan', 'Many university deadlines fall here. Motivation letters written.', 'Campus France submissions and interviews. Eiffel nominations happen around now inside universities.'],
            ['Feb to Mar', 'Further university deadlines. Regional DSU information published.', 'Institution decisions begin. Later programme deadlines close.'],
            ['Mar to May', 'Universitaly pre enrolment window. DSU applications.', 'Offers arrive. Accept and begin CROUS housing applications.'],
            ['May to Jul', 'Offers, accommodation, insurance, funds evidence.', 'Visa appointment booking and the file.'],
            ['Jun to Aug', 'Visa appointment in Islamabad and the decision.', 'Visa appointment and decision. Flights after approval.'],
            ['Sep', 'Arrive. Permesso di soggiorno within eight working days.', 'Arrive. Validate the visa online.'],
          ],
        },
      },

      { h2: 'The three dates that actually decide it' },
      {
        ol: [
          'The day you start attestation. Everything downstream waits on this, and it is entirely within your control.',
          'The scholarship deadline, which usually sits before the admission deadline rather than after it. Students who wait for an offer before applying for funding have already missed it.',
          'The date you book the visa appointment. Slots compress badly in the summer, and a file that is ready in June with a September appointment has still lost.',
        ],
      },

      { h2: 'If you are starting late' },
      {
        p: 'Late is a spectrum. Starting in October for the following September is comfortable. Starting in January is tight but workable if your documents are already attested. Starting in April for that September usually means the February intake or the following year, and anyone who tells you otherwise while taking your money should be treated with suspicion.',
      },
      {
        p: 'We will tell you which intake is realistic on the first call, before you have paid anything. Sometimes the honest answer is to spend six months getting the file right and target the next round properly, and that produces better outcomes than rushing a weak application into a closing window.',
      },
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

export function formatPostDate(iso) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
