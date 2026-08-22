// ---------------------------------------------------------------------------------------------
// SCHOLARSHIPS
//
// This is the page most students land on, because "fully funded scholarship" is what they search
// before they search anything else. So it carries more detail than any other page on the site.
//
// THE ONE RULE FOR THIS FILE: `fullyFunded` is true only when the scheme realistically covers
// tuition AND enough to live on. A fee waiver is not fully funded, however generous, and marking
// one as fully funded to make the list look better would be the fastest way to lose a student's
// trust, because they find out at the point they are booking a flight.
//
// AMOUNTS AND DEADLINES MOVE. Every figure here is what the scheme was paying at the review date
// below, and every one is written as an approximation on purpose. Each entry names the body that
// actually runs the scheme and where its official page lives, so a student can confirm the
// current number themselves. Keep that discipline when you edit: a precise figure you cannot
// stand behind is worse than an honest range.
//
// LAST REVIEWED: 22 August 2026. Re-check before each intake and update the date below.
// ---------------------------------------------------------------------------------------------

export const SCHOLARSHIPS_REVIEWED = '22 August 2026'

export const SCHOLARSHIPS = [
  // ----------------------------------------------------------------------- ITALY, fully funded
  {
    flag: '🇮🇹',
    country: 'Italy',
    name: 'DSU regional scholarship',
    level: 'Bachelor, Master and PhD',
    deadline: 'Usually Aug to Sep',
    fullyFunded: true,
    benefit:
      'A maintenance grant of roughly €5,000 to €7,000 a year, a full tuition exemption, and subsidised or free university housing and meals. For most students who qualify, this covers the year.',
    eligibility:
      'Assessed on family income and assets rather than on marks, through the Italian ISEE calculation. The threshold sits around €27,000 of ISEE, and it differs by region. There is no minimum grade to apply.',
    covers: ['Tuition exemption', 'Maintenance grant', 'Housing', 'Meals'],
    runBy: 'The right to study agency of the region your university is in, not the university itself',
    official: 'Your regional agency, for example ERGO in Emilia-Romagna, DSU Toscana or DiSCo in Lazio',
    watchOut:
      'The application is separate from your university application and has its own deadline, usually in late summer. The income and property documents have to come from Pakistani authorities, be translated and be legalised, which takes weeks. This is the most missed opportunity for Pakistani students.',
  },
  {
    flag: '🇮🇹',
    country: 'Italy',
    name: 'Invest Your Talent in Italy',
    level: 'Master',
    deadline: 'Usually Jan to Feb',
    fullyFunded: true,
    benefit:
      'A monthly allowance in the region of €900 for the length of the programme, plus tuition support, for Master students in engineering, advanced technologies, architecture, design, economics and management.',
    eligibility:
      'Open to citizens of a list of selected countries, republished with each call. Competitive on academic record. You apply to the programme and to the participating university.',
    covers: ['Monthly allowance', 'Tuition support', 'Internship placement'],
    runBy: 'The Italian Ministry of Foreign Affairs, with Italian universities and companies',
    official: 'investyourtalentinitaly.esteri.it',
    watchOut:
      'The country list is set again every year. Check that Pakistan is on it for your intake before building a plan around this, because it has not been on every call.',
  },
  {
    flag: '🇮🇹',
    country: 'Italy',
    name: 'Italian Government MAECI scholarship',
    level: 'Master, PhD and language courses',
    deadline: 'Usually Apr to Jun',
    fullyFunded: true,
    benefit:
      'A monthly allowance of roughly €900, exemption from tuition, and health insurance cover, for periods of three, six or nine months depending on the award.',
    eligibility:
      'Awarded by the Italian government to citizens of the countries named in that year’s call, on academic merit. Applications go through the Study in Italy portal.',
    covers: ['Monthly allowance', 'Tuition exemption', 'Health insurance'],
    runBy: 'The Italian Ministry of Foreign Affairs and International Cooperation',
    official: 'studyinitaly.esteri.it',
    watchOut:
      'Eligible countries and the number of places change with every call. Confirm Pakistan is included for your year before you spend time on the application.',
  },

  // ---------------------------------------------------------------------- FRANCE, fully funded
  {
    flag: '🇫🇷',
    country: 'France',
    name: 'Eiffel Excellence scholarship',
    level: 'Master and PhD',
    deadline: 'Usually Jan, with an earlier deadline inside the university',
    fullyFunded: true,
    benefit:
      'A monthly allowance of around €1,181 for a Master, plus international travel, health insurance and cultural activities. Enough to live on without a second income.',
    eligibility:
      'A strong academic record, and age limits that apply at the level you are applying for. Nominated by the French institution, not applied for directly by the student.',
    covers: ['Monthly allowance', 'Return travel', 'Health insurance', 'Cultural programme'],
    runBy: 'Campus France, for the French Ministry for Europe and Foreign Affairs',
    official: 'campusfrance.org',
    watchOut:
      'You cannot apply for this yourself. The university puts your name forward, and its internal deadline sits before the national one. That means being in contact with the institution early enough to be nominated, which most students find out too late.',
  },

  // ------------------------------------------------------------------------- BOTH, fully funded
  {
    flag: '🇪🇺',
    country: 'Both',
    name: 'Erasmus Mundus Joint Masters',
    level: 'Master',
    deadline: 'Usually Oct to Jan for the following September',
    fullyFunded: true,
    benefit:
      'A full scholarship covering tuition, a contribution to living costs in the region of €1,400 a month, plus travel and installation costs. You study in two or more countries, and Italian and French universities run a large share of the programmes.',
    eligibility:
      'Open to students worldwide, including Pakistan, on academic merit. You apply directly to each programme consortium rather than to a central office, and you may usually apply to a limited number of programmes in one round.',
    covers: ['Full tuition', 'Monthly living allowance', 'Travel', 'Installation costs'],
    runBy: 'The European Union, through the Erasmus+ programme',
    official: 'erasmus-plus.ec.europa.eu',
    watchOut:
      'Genuinely competitive, and the deadlines are early, often three months before ordinary university deadlines. If you want this, it decides your whole autumn timetable.',
  },

  // -------------------------------------------------------------- ITALY, university level awards
  {
    flag: '🇮🇹',
    country: 'Italy',
    name: 'University of Bologna study grants',
    level: 'Bachelor and Master',
    deadline: 'Usually Mar',
    fullyFunded: false,
    benefit:
      'A cash study grant in the region of €11,000 across the course, together with a full tuition waiver, for international students admitted to Bologna. Substantial, and it can combine with a DSU award to become a fully funded position.',
    eligibility:
      'Applied for alongside admission and awarded on academic merit. Open to students who do not hold Italian citizenship or an Italian qualification.',
    covers: ['Study grant', 'Tuition waiver'],
    runBy: 'The University of Bologna',
    official: 'unibo.it',
    watchOut:
      'Marked as a fee reduction here rather than fully funded because on its own it is not designed to cover living costs. Combined with DSU it very often does.',
  },
  {
    flag: '🇮🇹',
    country: 'Italy',
    name: 'Politecnico di Milano merit awards',
    level: 'Master',
    deadline: 'With your application',
    fullyFunded: false,
    benefit:
      'Merit based awards combining a tuition waiver with a cash contribution, commonly quoted in the range of €5,000 to €10,000 across a two year Master.',
    eligibility: 'Considered automatically for international applicants to eligible Master programmes, on academic record.',
    covers: ['Tuition waiver', 'Cash contribution'],
    runBy: 'Politecnico di Milano',
    official: 'polimi.it',
    watchOut:
      'Milan is one of the most expensive Italian student cities, so model your budget with Milan rents before treating this as enough on its own.',
  },
  {
    flag: '🇮🇹',
    country: 'Italy',
    name: 'Income based tuition, the ISEE bands',
    level: 'All levels',
    deadline: 'Early in your first semester',
    fullyFunded: false,
    benefit:
      'Not a scholarship at all, but often worth more than one. Italian public universities set tuition on assessed family income, so a student from a low income household can pay near the bottom of the range, sometimes a few hundred euros, before any award is considered.',
    eligibility: 'Open to everyone who files the ISEE documentation on time. Skip it and you are charged the top band by default.',
    covers: ['Reduced tuition'],
    runBy: 'Each Italian public university',
    official: 'Your university’s student fees office',
    watchOut:
      'The most commonly missed saving on this whole list, because it is filed as paperwork rather than advertised as a scholarship. The documents are the same ones DSU needs, so do both together.',
  },

  // ------------------------------------------------------------- FRANCE, university level awards
  {
    flag: '🇫🇷',
    country: 'France',
    name: 'Differentiated fee waiver',
    level: 'Bachelor and Master',
    deadline: 'With your application',
    fullyFunded: false,
    benefit:
      'Brings non-EU tuition at a public university down from roughly €2,770 for a Bachelor or €3,770 for a Master to the domestic rate, which is a few hundred euros. It lowers your bill; it does not touch living costs.',
    eligibility:
      'Decided institution by institution. Many public universities waive the difference for a large share of their international students, some automatically and some on request.',
    covers: ['Reduced tuition'],
    runBy: 'Each French public university',
    official: 'campusfrance.org',
    watchOut:
      'Whether a university waives it is the single biggest variable in French tuition, and it is rarely on the front page. Ask the programme directly before you compare two universities on price.',
  },
  {
    flag: '🇫🇷',
    country: 'France',
    name: 'Émile Boutmy scholarship, Sciences Po',
    level: 'Bachelor and Master',
    deadline: 'With your application',
    fullyFunded: false,
    benefit:
      'A tuition scholarship for non-EU students admitted to Sciences Po, awarded on a mix of academic strength and financial need, on top of fees that are already scaled to family income.',
    eligibility: 'Considered automatically when you apply to Sciences Po from outside the EU or EEA. There is no separate application.',
    covers: ['Tuition scholarship'],
    runBy: 'Sciences Po',
    official: 'sciencespo.fr',
    watchOut: 'It reduces tuition rather than covering living costs, and Paris is expensive.',
  },
  {
    flag: '🇫🇷',
    country: 'France',
    name: 'Université Paris-Saclay international Master scholarship',
    level: 'Master',
    deadline: 'Usually spring',
    fullyFunded: false,
    benefit:
      'A scholarship commonly quoted at around €10,000 a year for international students admitted to selected Master programmes, which covers a large part of living costs in the Paris area.',
    eligibility: 'Academic merit, applied for alongside admission to a participating programme.',
    covers: ['Annual allowance'],
    runBy: 'Université Paris-Saclay',
    official: 'universite-paris-saclay.fr',
    watchOut:
      'Several other French institutions run comparable schemes under their own names. Ask about the institutional scholarship at every university on your shortlist, because they are rarely listed together anywhere.',
  },
  {
    flag: '🇫🇷',
    country: 'France',
    name: 'CROUS housing and the housing allowance',
    level: 'All levels',
    deadline: 'As soon as you are admitted',
    fullyFunded: false,
    benefit:
      'Not a scholarship, but it changes a monthly budget more than most awards do. Subsidised student housing at a fraction of private rents, and a national housing allowance many international students become eligible for once they arrive and hold a lease.',
    eligibility:
      'Housing is applied for through CROUS and is competitive, so apply the day you accept an offer. The allowance is claimed after arrival.',
    covers: ['Subsidised housing', 'Monthly housing allowance'],
    runBy: 'CROUS, the French student services network, and the CAF for the allowance',
    official: 'messervices.etudiant.gouv.fr',
    watchOut:
      'Rooms go quickly and priority rules apply. Late applicants end up in the private market at two or three times the cost, which quietly undoes a scholarship.',
  },
  {
    flag: '🇫🇷',
    country: 'France',
    name: 'French embassy and Campus France grants',
    level: 'Varies',
    deadline: 'Varies, set locally',
    fullyFunded: false,
    benefit:
      'A monthly stipend and social security cover, sometimes with travel, under bilateral programmes run through the French embassy in a given country. Sizes and availability differ a great deal.',
    eligibility: 'Set by each French embassy, so what is open to a Pakistani applicant changes year to year.',
    covers: ['Stipend', 'Social security cover'],
    runBy: 'The French embassy in your country, with Campus France',
    official: 'Campus France Pakistan',
    watchOut:
      'Ask Campus France Pakistan directly what is running for your intake. These are not always advertised widely and there is no single national page listing them.',
  },
]

// ---------------------------------------------------------------------------------------------
// What a scholarship does and does not cover, as a table on the page. Students consistently
// assume "scholarship" means "everything is paid for", and the gap between the two is where
// families get into trouble in the first term.
// ---------------------------------------------------------------------------------------------

export const COVERAGE_ROWS = [
  ['Tuition', 'Yes, in full', 'Usually yes'],
  ['Rent', 'Usually, through a grant or student housing', 'No'],
  ['Food and daily costs', 'Usually, through a monthly allowance', 'No'],
  ['Health insurance', 'Sometimes', 'No'],
  ['Flights', 'Sometimes, on the government schemes', 'No'],
  ['Visa fee and attestation costs', 'No, you pay these yourself', 'No'],
  ['The deposit on your first room', 'No', 'No'],
]

// ---------------------------------------------------------------------------------------------
// The scholarship year. Deadlines move, so this is the shape rather than a list of dates.
// ---------------------------------------------------------------------------------------------

export const SCHOLARSHIP_CALENDAR = [
  ['Aug to Oct', 'Start attestation and gather family income and property documents. Erasmus Mundus calls open.'],
  ['Oct to Dec', 'Erasmus Mundus deadlines. Open the Campus France file. Ask French universities about Eiffel nomination.'],
  ['Jan to Feb', 'Eiffel national deadline. Invest Your Talent in Italy call. Many university deadlines.'],
  ['Mar to Apr', 'University study grant deadlines, including Bologna. MAECI call typically opens.'],
  ['May to Jul', 'Offers arrive. Accept, then apply for CROUS housing the same week.'],
  ['Aug to Sep', 'DSU regional applications. ISEE documentation filed. Results and enrolment.'],
]

// ---------------------------------------------------------------------------------------------
// The questions students ask before they book a call. These are on the page for readers and are
// also handed to Google as FAQ structured data, which is what can turn a plain search result
// into an expandable one. Every question here must stay answered on the page itself.
// ---------------------------------------------------------------------------------------------

export const SCHOLARSHIP_FAQS = [
  {
    q: 'Can a Pakistani student get a fully funded scholarship in Italy or France?',
    a: 'Yes, and more often than most families expect. The largest route is the Italian regional DSU scholarship, which is assessed on family income rather than marks and can cover tuition, a maintenance grant, housing and meals. For strong Master applicants there is also Erasmus Mundus, open worldwide, covering tuition plus roughly €1,400 a month, and the French Eiffel Excellence scholarship. What nobody can do is promise you one: these are competitive awards decided by the awarding bodies, not by any consultant.',
  },
  {
    q: 'Which scholarship is easiest to get from Pakistan?',
    a: 'For a student from a modest income household, the Italian DSU regional scholarship is usually the most realistic, because it is assessed on family income rather than on grades and sets no minimum mark. The difficulty is paperwork rather than competition: you need income and property documents from Pakistani authorities, translated and legalised, and there is a separate application with its own deadline in late summer.',
  },
  {
    q: 'Do I need a high CGPA to get a scholarship?',
    a: 'For the merit competitions, such as Erasmus Mundus, Eiffel Excellence and university merit awards, yes, they are genuinely competitive. The need based routes are different. DSU and Italy’s income based tuition bands look at family income and set no minimum grade at all, which is why an average student from a low income household can end up better funded than a strong student who only applied for merit awards.',
  },
  {
    q: 'Can I apply for a scholarship before I get an admission offer?',
    a: 'In most cases you must. Scholarship deadlines usually fall before or alongside admission deadlines rather than after them, and several schemes are decided as part of the admission process. Waiting for an offer before thinking about funding is the most common way a student loses a year.',
  },
  {
    q: 'Do you charge for finding scholarships?',
    a: 'Scholarship matching is part of the free first consultation. We look at what you qualify for and tell you honestly whether a fully funded route is realistic for your profile before you have paid anything. If you then engage us for the application work, the fee and what it covers are agreed with you in writing first.',
  },
  {
    q: 'Can a consultant guarantee me a scholarship?',
    a: 'No, and anyone who says otherwise is either mistaken or misleading you. Scholarship decisions are made by governments, universities and awarding bodies, and no third party can influence them. What a consultant can genuinely do is make sure you apply for everything you qualify for, that nothing is missed on a deadline, and that your documents are in the form the awarding body expects.',
  },
  {
    q: 'Should I pay a fee to apply for a scholarship?',
    a: 'The scholarships on this page do not charge students an application fee. If someone asks you to pay a fee to be considered for a scholarship, or to release a scholarship that has supposedly already been awarded, treat it as a scam and check the awarding body’s own website before paying anything.',
  },
  {
    q: 'Can I hold more than one scholarship at the same time?',
    a: 'Sometimes, and it is always worth asking. A tuition waiver often combines with a maintenance grant, and a university study grant can sit alongside a DSU award to become fully funded. Some schemes explicitly forbid combining, so check each one’s rules before counting on both.',
  },
  {
    q: 'Are the amounts on this page guaranteed?',
    a: 'No. Every figure here is an approximation of what the scheme was paying when this page was last reviewed, and amounts, thresholds and deadlines are revised regularly. Each entry names the body that runs the scheme so you can confirm the current figure at the source before you make a decision on it.',
  },
]
