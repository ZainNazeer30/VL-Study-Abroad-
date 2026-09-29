// Content for the two level pages, /universities/bachelors and /universities/masters.
//
// WHY TWO PAGES RATHER THAN ONE FILTER
//
// The obvious thing would be a level filter on the universities table, and that filter still
// exists. These are separate pages because applying to a Bachelor and applying to a Master from
// Pakistan are genuinely different processes, not the same process at two levels:
//
//   Bachelor   twelve years of schooling, IBCC attestation for Matric and FSc, an entrance test
//              (TOLC) at many Italian universities, and far fewer English-taught courses.
//   Master     a Bachelor degree, HEC attestation, no TOLC, and most English-taught programmes
//              in Italy sit at this level.
//
// A student on the wrong one of those two tracks wastes months. Two pages that each answer one
// track properly are more useful than one page that hedges, and in search they match two
// different queries: "bachelor in italy for pakistani students" and "masters in italy in
// english". If these ever collapse into near-identical text, merge them back into one page:
// two thin pages rank worse than one good one.
//
// NOTE ON COURSE LISTS
// There is deliberately no list of individual degree programmes here. A course list for sixty
// universities is hundreds of rows that go stale every cycle, and a wrong course name sends a
// student to a page that does not exist. The honest version is to point at each university's own
// English course catalogue, which is what the table on /universities already does through the
// `official` link, and at Universitaly, which is the government's own searchable list.

export const LEVELS = {
  bachelor: {
    key: 'bachelor',
    // The value in `lvl` on each entry in src/data/universities.js.
    lvl: 'Bachelor',
    slug: 'bachelors',
    label: 'Bachelor',
    // Each level page gets its own photograph so the two do not read as the same page twice.
    // Students arriving on a campus, for the level most people reach straight from college.
    heroImage: 'blogApply',
    h1: 'Bachelor degrees in Italy and France for Pakistani students',
    seoTitle: 'Bachelor Degrees in Italy and France',
    metaDescription:
      'Bachelor degrees in Italy and France for Pakistani students. Entry from FSc and A Levels, IBCC attestation, the TOLC test and deadlines.',
    intro:
      'Applying for a Bachelor from Pakistan means twelve years of schooling, IBCC attestation rather than HEC, and at many Italian universities an entrance test. There are fewer English-taught Bachelor courses than Master courses, so the shortlist is shorter and the deadlines matter more.',

    // What a student on this track actually has to do, in order.
    steps: [
      {
        t: 'Twelve years of schooling',
        d: 'FSc, FA, ICS, I.Com or A Levels. Italian and French universities count years of schooling rather than grades alone, and twelve is the line. A student with only Matric is not eligible whatever their marks.',
      },
      {
        t: 'IBCC attestation, then MOFA',
        d: 'Matric and FSc certificates go to IBCC, not HEC. HEC handles degrees, so it does not come into a Bachelor application at all. MOFA comes after IBCC, and the embassy after MOFA.',
      },
      {
        t: 'The TOLC test, at many Italian universities',
        d: 'A number of Italian universities use TOLC, an online admission test taken through CISIA, for Bachelor entry. Which version you sit depends on the subject, and some courses do not require it. Check the course page before you assume either way, because booking a TOLC date late is a common reason a Bachelor application misses its window.',
      },
      {
        t: 'English proficiency, or a Medium of Instruction letter',
        d: 'Some universities accept an MOI letter from your college in place of IELTS. It is accepted less often at Bachelor level than at Master level, so check rather than assume. The table below marks which universities accept it.',
      },
      {
        t: 'Universitaly pre-enrolment',
        d: 'The same government portal used at every level. It is compulsory, separate from the university application, and the visa cannot proceed without a validated pre-enrolment.',
      },
    ],

    // Honest cautions. These are the things students get wrong on this track specifically.
    notes: [
      'Most Bachelor courses in Italy are taught in Italian. The English-taught ones are a minority, concentrated in engineering, economics, design and a few science subjects.',
      'France runs a separate procedure for first-year Bachelor entry, and the Campus France route for it differs from the Master route. Start with Campus France Pakistan rather than the university.',
      'A Bachelor is three years in both countries, not four. Plan the funding for three.',
    ],

    faqs: [
      {
        q: 'Can I apply for a Bachelor in Italy after FSc?',
        a: 'Yes. FSc, FA, ICS, I.Com and A Levels all count as the twelve years of schooling Italian universities require. Your certificates need IBCC attestation and then MOFA before the embassy stage, and some universities will also want a Declaration of Value or a CIMEA statement.',
      },
      {
        q: 'What is the TOLC test and do I have to take it?',
        a: 'TOLC is an online admission test run by CISIA and used by many Italian universities for Bachelor entry. There are different versions for different subject areas, and not every course requires one. Check the course page on the university website, because dates book up and a late TOLC is a common reason a Bachelor application misses its deadline.',
      },
      {
        q: 'Are there Bachelor degrees in Italy taught fully in English?',
        a: 'Yes, but fewer than at Master level. They cluster in engineering, economics and management, design and some sciences. Universitaly, the government portal, lets you filter courses by teaching language, which is the most reliable way to see the current list rather than relying on any third-party page.',
      },
      {
        q: 'Do I need IELTS for a Bachelor, or is a Medium of Instruction letter enough?',
        a: 'It depends on the university and sometimes on the individual course. An MOI letter from your college is accepted in some places and refused in others, and it is accepted less often at Bachelor level than at Master level. Confirm with the specific course before you decide not to sit a test.',
      },
      {
        q: 'How long is a Bachelor in Italy or France?',
        a: 'Three years in both countries, under the Bologna system. That is one year shorter than a typical Pakistani Bachelor, which is worth knowing when you plan funding and when you compare the total cost against a four year degree at home.',
      },
    ],
  },

  master: {
    key: 'master',
    lvl: 'Master',
    slug: 'masters',
    label: 'Master',
    // Older stone and a clock tower: the register of a postgraduate institution rather than a
    // first term.
    heroImage: 'blogChoosing',
    h1: 'Master degrees in Italy and France for Pakistani students',
    seoTitle: 'Masters in Italy and France in English',
    metaDescription:
      'Masters in English in Italy and France for Pakistani students. CGPA, HEC attestation, CIMEA or Declaration of Value, and deadlines.',
    intro:
      'Most English-taught programmes in Italy sit at Master level, so the choice here is wider than at Bachelor. The entry route is different too: a Bachelor degree attested by HEC rather than IBCC, usually no entrance test, and a recognition document for your degree before the visa stage.',

    steps: [
      {
        t: 'A relevant Bachelor degree',
        d: 'Sixteen years of education. Universities look at whether the subject matches the Master, not only at the marks. A change of field is possible but needs explaining in the motivation letter, and some courses will refuse it outright.',
      },
      {
        t: 'HEC attestation, then MOFA',
        d: 'Degrees go to HEC, not IBCC. This is the step that takes longest and the one students start too late. Begin it before you have offers rather than after.',
      },
      {
        t: 'CIMEA or a Declaration of Value',
        d: 'Italian universities need your Pakistani degree recognised. A CIMEA statement of comparability and a Declaration of Value from the embassy do similar jobs, but they come from different bodies on different timelines. Ask which one your programme wants before paying for either.',
      },
      {
        t: 'English proficiency, or a Medium of Instruction letter',
        d: 'MOI letters are accepted more widely at Master level than at Bachelor level, particularly in Italy. France is stricter, because the Campus France file is assessed on documents rather than in conversation.',
      },
      {
        t: 'Universitaly pre-enrolment, or Campus France',
        d: 'Italy runs through Universitaly. France runs through the Etudes en France portal with an academic interview at Alliance Francaise. Both are compulsory and both sit before the visa application.',
      },
    ],

    notes: [
      'A Master is normally two years in Italy and one to two years in France. A one year French Master is cheaper in total than a two year Italian one even when the annual cost is higher.',
      'CGPA thresholds differ by university and sometimes by course. Several Italian universities publish a specific minimum for Pakistani applicants, so check the university page rather than assuming a general figure.',
      'Applying to eight ambitious universities is the most common way to lose a year. Two ambitious, four realistic, two safe is a better shape.',
    ],

    faqs: [
      {
        q: 'What CGPA do I need for a Master in Italy from Pakistan?',
        a: 'It varies by university and sometimes by course, and several Italian universities publish a specific threshold for Pakistani applicants. As a general picture, most public universities are reachable from around 60 percent or a CGPA near 2.5, while the technical universities and the more selective institutions ask for more. Check the individual university page rather than relying on a single figure, because these are set locally and they move.',
      },
      {
        q: 'Do I need HEC or IBCC attestation for a Master application?',
        a: 'HEC, because it is a degree. IBCC handles Matric and FSc certificates and does not come into a Master application unless a university asks for your full academic history. MOFA comes after HEC in both cases.',
      },
      {
        q: 'What is the difference between CIMEA and a Declaration of Value?',
        a: 'Both establish what your Pakistani qualification is worth in the Italian system. A Declaration of Value is issued by the Italian Embassy in Islamabad from documents already attested through HEC and MOFA. A CIMEA statement of comparability comes from CIMEA directly and is often faster. Universities differ on which they accept, so confirm before you pay for either.',
      },
      {
        q: 'Can I do a Master in Italy in a different subject from my Bachelor?',
        a: 'Sometimes. Italian universities check that your Bachelor covers enough credits in the relevant area, and a large change of field is usually refused rather than negotiated. Where there is a partial overlap, a clear motivation letter explaining the connection matters. Ask the programme coordinator before applying rather than after being rejected.',
      },
      {
        q: 'Is a Master in Italy taught in English?',
        a: 'Many are. Italy has expanded English-taught Master programmes substantially, and they are the majority of what an international student will find. Universitaly lets you filter by teaching language, which is the most current list because it comes from the ministry rather than a third party.',
      },
    ],
  },
}

export const LEVEL_LIST = [LEVELS.bachelor, LEVELS.master]
