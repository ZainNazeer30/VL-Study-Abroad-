// Content for the Study in Italy and Study in France pages.

export const COUNTRIES = {
  italy: {
    key: 'italy',
    name: 'Italy',
    flag: '🇮🇹',
    badge: { bg: 'bg-green-soft', fg: 'text-green' },
    metaDescription:
      'Study in Italy from Pakistan: low tuition public universities, fully funded DSU scholarships, IBCC and HEC attestation, and the student visa from Islamabad.',
    heroKey: 'italyHero',
    lifeKey: 'italyLife',
    heroTitle: 'Study in Italy without the huge price tag',
    heroText:
      'Italy has some of the oldest universities in the world, hundreds of degrees taught in English, and regional scholarships that many students qualify for. We help you find the right one and actually get in.',
    stats: [
      { v: '€1k to €4k', l: 'typical tuition a year' },
      { v: '500+', l: 'degrees taught in English' },
      { v: '90+', l: 'public universities' },
    ],
    reasons: [
      {
        t: 'Low tuition at public universities',
        d: 'Most public universities set their fees by family income, so plenty of students pay between €1,000 and €4,000 a year.',
      },
      {
        t: 'Regional DSU scholarships',
        d: 'These can cover your tuition, a place to live and your meals. They look at income, not just top grades.',
      },
      {
        t: 'Plenty of English-taught degrees',
        d: 'You can take a Bachelor or a Master fully in English at hundreds of programs, with no Italian needed to start.',
      },
      {
        t: 'Universities with real history',
        d: 'Italy is home to the oldest university in the world and some of the best design and engineering schools in Europe.',
      },
      {
        t: 'A student life people enjoy',
        d: 'The cities are walkable and affordable, the food is good, and the rest of Europe is a short train ride away.',
      },
    ],
    unis: [
      { name: 'University of Bologna', city: 'Bologna', known: 'The oldest university in the world, with strong departments in almost every field.', opens: 'Applications open Nov 2026' },
      { name: 'Politecnico di Milano', city: 'Milan', known: 'One of the top technical universities anywhere for engineering, architecture and design.', opens: 'Applications open Oct 2026' },
      { name: 'Sapienza University', city: 'Rome', known: 'One of the largest universities in Europe, with excellent science and humanities.', opens: 'Applications open Dec 2026' },
      { name: 'University of Padua', city: 'Padua', known: 'A historic research university where Galileo once taught, strong in medicine and psychology.', opens: 'Applications open Nov 2026' },
    ],
    courses: ['Engineering', 'Architecture', 'Design and Fashion', 'Business and Management', 'Computer Science', 'Medicine', 'Economics', 'International Relations'],
    costs: [
      { l: 'Tuition at public universities', v: '€1,000 to €4,000 a year' },
      { l: 'Shared accommodation', v: '€250 to €500 a month' },
      { l: 'Food and groceries', v: '€200 to €300 a month' },
      { l: 'Transport and extras', v: '€50 to €120 a month' },
    ],
    costNote: 'If you win a DSU scholarship, your tuition is often waived and your housing is subsidised on top of that.',
    scholarships: [
      { name: 'DSU regional scholarship', fullyFunded: true, d: 'Based on family income. It can be worth up to €7,000 a year and often comes with a tuition waiver, housing and meals, which covers most students fully.' },
      { name: 'Invest Your Talent in Italy', fullyFunded: true, d: 'Open to students from selected countries. It adds tuition support and about €900 a month for Master programs, enough to live on in most student cities.' },
      { name: 'University merit awards', fullyFunded: false, d: 'Bologna, Politecnico di Milano and others cut fees, sometimes to a few hundred euros, for strong applicants. This lowers your bill rather than covering it.' },
    ],
    requirements: [
      'FSc, A Levels or an equivalent twelve years of schooling for a Bachelor, or a relevant Bachelor degree for a Master',
      'IBCC attestation for your Matric and FSc certificates, or HEC attestation for a degree, followed by MOFA',
      'Your academic transcripts and diploma, translated into Italian and legalised',
      'Proof of English such as IELTS 6.0 or a Medium of Instruction letter, depending on the program',
      'A Declaration of Value from the Italian Embassy in Islamabad, or a CIMEA statement, so your qualification is recognised',
      'A motivation letter and CV for the more competitive programs',
      'Pre-enrolment on the Universitaly portal',
    ],
    visaIntro:
      'As a Pakistani student you will need a Type D study visa, applied for at the Italian Embassy in Islamabad. We handle the whole file with you, from Universitaly pre-enrolment and the Declaration of Value to financial proof, insurance and the appointment itself.',
    timeline: [
      { n: '1', t: 'Choose programs and apply', when: 'Nov to Apr', d: 'We build your shortlist and send off the applications with a clear checklist.' },
      { n: '2', t: 'Get your admission', when: 'Mar to Jun', d: 'Accept your offer and pay the first instalment if the university asks for one.' },
      { n: '3', t: 'Universitaly pre-enrolment', when: 'Apr to Jul', d: 'Official pre-enrolment that links to your visa application.' },
      { n: '4', t: 'Visa appointment', when: 'Jun to Aug', d: 'Submit your Type D visa file at the consulate. It usually takes two to six weeks.' },
      { n: '5', t: 'Fly out and enrol', when: 'Sep', d: 'Arrive, apply for your residence permit and start classes.' },
    ],
    lifestyle:
      'Studying in Italy is real work, but the day to day is genuinely nice. A coffee between lectures, dinner with classmates, a weekend trip from Florence to the mountains. Student cities like Bologna and Padua are safe, easy to get around and not expensive.',
    faqs: [
      { q: 'Do I need to speak Italian?', a: 'Not for the English-taught programs. A little Italian makes daily life easier, and most universities run free classes for international students.' },
      { q: 'Can I work while I study?', a: 'Yes. A student permit lets you work up to 20 hours a week.' },
      // Kept deliberately in step with the figure and the caveat in
      // src/data/posts/italy-student-visa-from-pakistan.js. If you update one, update the other:
      // two different numbers for the same requirement on the same site is the kind of thing a
      // careful reader notices and a competitor screenshots.
      { q: 'How much money do I need to show for the visa?', a: 'The figure commonly used is in the region of €7,000 for an academic year, but confirm the current requirement for your intake with the consulate, because it is reviewed. What matters as much as the amount is that the funds have a visible history and a traceable source. You can show it with your own statements or with a documented sponsor, usually a parent.' },
      { q: 'Is the DSU scholarship really within reach?', a: 'For a lot of students, yes. It looks at family income rather than grades, so students from lower income families often qualify when the paperwork is done properly.' },
    ],
  },

  france: {
    key: 'france',
    name: 'France',
    flag: '🇫🇷',
    badge: { bg: 'bg-royal-soft', fg: 'text-royal' },
    metaDescription:
      'Study in France from Pakistan: Campus France, English taught degrees, the Eiffel Excellence scholarship and full student visa support from Islamabad.',
    heroKey: 'franceHero',
    lifeKey: 'franceLife',
    heroTitle: 'Study in France and open doors worldwide',
    heroText:
      'France has globally ranked universities, career focused degrees and scholarships that bring the cost right down. Many graduates also stay on to work after their course. We guide you through every step.',
    stats: [
      { v: '€2.8k', l: 'public tuition a year' },
      { v: '1,600+', l: 'degrees taught in English' },
      { v: '2 years', l: 'post-study work visa' },
    ],
    reasons: [
      {
        t: 'Degrees respected everywhere',
        d: 'France has several universities in the global top 100, along with the well known grandes écoles.',
      },
      {
        t: 'Low, regulated public tuition',
        d: 'Public universities charge roughly €2,770 to €3,790 a year, and waivers can lower that even further.',
      },
      {
        t: 'Courses built around your career',
        d: 'Most Master programs include an internship and keep close ties with employers.',
      },
      {
        t: 'The option to stay and work',
        d: 'Master graduates can apply to stay up to two years to look for a job, through the APS permit.',
      },
      {
        t: 'A country used to international students',
        d: 'More than 400,000 international students are already there, with student life subsidised through CROUS.',
      },
    ],
    unis: [
      { name: 'Sorbonne University', city: 'Paris', known: 'A famous research university, strong in the humanities and sciences.', opens: 'Campus France opens Oct 2026' },
      { name: 'Sciences Po', city: 'Paris', known: 'One of the most respected schools for political science and public policy, judged on your essays as much as your transcript.', opens: 'Applications open Oct 2026' },
      { name: 'Université PSL', city: 'Paris', known: 'The highest ranked university in France, selective and research led.', opens: 'Campus France opens Oct 2026' },
      { name: 'Université Grenoble Alpes', city: 'Grenoble', known: 'A leading science and engineering hub with a big international community.', opens: 'Campus France opens Nov 2026' },
      { name: 'Université de Lyon', city: 'Lyon', known: 'A major student city with strong business and science faculties.', opens: 'Campus France opens Nov 2026' },
    ],
    courses: ['Business and Management', 'Computer Science', 'Data Science and AI', 'Engineering', 'Fashion and Luxury', 'Hospitality', 'Political Science', 'Finance'],
    costs: [
      { l: 'Public tuition, Bachelor', v: '€2,770 a year' },
      { l: 'Public tuition, Master', v: '€3,790 a year' },
      { l: 'CROUS or shared housing', v: '€250 to €600 a month' },
      { l: 'Food, transport and extras', v: '€300 to €450 a month' },
    ],
    costNote: 'CAF housing support can pay back up to 35 percent of your rent, and international students can claim it too.',
    scholarships: [
      { name: 'Eiffel Excellence scholarship', fullyFunded: true, d: 'Around €1,181 a month plus travel and insurance, for strong Master and PhD candidates. This is enough to live on without a second income.' },
      { name: 'Émile Boutmy scholarship', fullyFunded: false, d: 'A Sciences Po scholarship for non-EU students, on top of its income-scaled tuition. It reduces tuition, not living costs.' },
      { name: 'Tuition fee waivers', fullyFunded: false, d: 'Many universities waive part of the higher international fee, sometimes down to the EU rate.' },
      { name: 'Campus France and embassy grants', fullyFunded: false, d: 'Country specific grants arranged through the French embassy where you live. Worth checking, but the amount varies.' },
    ],
    requirements: [
      'FSc, A Levels or an equivalent twelve years of schooling for a Bachelor, or a relevant Bachelor degree for a Master',
      'Registration with Campus France Pakistan, which is required before you can apply',
      'IBCC attestation for your Matric and FSc certificates, or HEC attestation for a degree, followed by MOFA',
      'Proof of English such as IELTS 6.0 to 6.5 for English-taught programs',
      'A motivation letter written for each program you apply to',
      'Academic transcripts and diplomas, translated into French or English as the university asks',
      'Proof of funds of about €615 a month for the visa, in your name or a sponsor’s',
    ],
    visaIntro:
      'From Pakistan you apply through Campus France first, then for the VLS-TS long stay visa. We take care of the Études en France file, prepare you for the Campus France interview, and book the visa appointment in Islamabad.',
    timeline: [
      { n: '1', t: 'Campus France file', when: 'Oct to Jan', d: 'We set up your Études en France profile and pick programs together.' },
      { n: '2', t: 'Applications and interview', when: 'Dec to Mar', d: 'Submit your applications and get ready for the Campus France interview.' },
      { n: '3', t: 'Get your admission', when: 'Apr to Jun', d: 'Accept your offer inside the Études en France portal.' },
      { n: '4', t: 'VLS-TS visa', when: 'Jun to Aug', d: 'Book the visa appointment with your acceptance letter and proof of funds.' },
      { n: '5', t: 'Arrive and validate', when: 'Sep', d: 'Validate your visa online, claim your CAF housing support and start classes.' },
    ],
    lifestyle:
      'France gives you a proper international student life. Meals at the campus canteen run between €1 and €3.30 through CROUS, student discounts are everywhere, and fast trains take you across the country and into the rest of Europe. Paris cafés, food markets in Lyon, the mountains around Grenoble, take your pick.',
    faqs: [
      { q: 'Do I need to speak French?', a: 'Not for the English-taught programs. Even basic French makes daily life and job hunting a lot easier, so it is worth starting early.' },
      { q: 'What is Campus France?', a: 'It is the official route, called Études en France, that most students outside the EU use to apply and get a visa. We manage it with you.' },
      { q: 'Can I stay after I graduate?', a: 'Yes. Master graduates can get a two year permit to look for work, called the APS.' },
      { q: 'Can I work while I study?', a: 'Yes, up to 964 hours a year, which is about 20 hours a week.' },
    ],
  },
}
