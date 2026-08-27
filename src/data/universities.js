// Full university list used on the Universities page (search, filters and the details table).
//
// HOW TO EDIT THIS FILE
// Each entry is one university. Copy an existing block, change the values, done. The page,
// the search filters and the structured data Google reads are all built from this array, so
// there is nothing else to keep in sync.
//
// A NOTE ON WHAT IS DELIBERATELY NOT HERE
// There is no tuition or fee field. Fees at Italian public universities are set on assessed
// family income and at French public universities are frequently waived down to the domestic
// rate, so any single figure printed beside a university name is wrong for most of the
// students reading it. Quoting a number you then have to walk back in the first phone call
// costs more trust than it wins clicks. Cost is discussed properly, with the ranges and the
// conditions attached, in the guide at /blog/cost-of-studying-in-italy-and-france.
//
// KEEPING THE DATES HONEST
// `intake`, `applyBy` and `status` go stale every admissions cycle. Update LAST_REVIEWED below
// whenever you go through them, because the page prints that date to the visitor. A wrong
// deadline on a study abroad site is the single fastest way to lose a student's trust, and
// Google increasingly rewards pages that are visibly maintained.
//
// FIELD REFERENCE
//   name, city, country, flag  Identity. `flag` is just the emoji.
//   subjects                   Must come from the SUBJECTS list below, or the filter misses it.
//   levels / lvl               `levels` is the words shown; `lvl` is the array the filter reads.
//   intake                     'Sep 2027' or 'Feb 2027'. Matched by the intake filter.
//   applyBy                    The application window in plain words. Shown in the table.
//   english                    The English requirement in one short line.
//   moiAccepted                true when a Medium of Instruction letter can replace IELTS.
//                              This drives the "no IELTS route" filter, which is one of the
//                              most searched things a Pakistani applicant looks for.
//   entry                      Grades needed, given as a percentage and a CGPA out of 4.
//   status / tone              The badge. tone is 'green', 'neutral' or 'rust'.
//   official                   The university's own English admissions page. Opens in a new tab.
//   guide                      Slug of the guide on this site most relevant to this university.
//   detail                     The paragraph shown when a visitor expands the row.

export const LAST_REVIEWED = 'August 2026'

export const SUBJECTS = ['Engineering', 'Business', 'Computer Science', 'Design', 'Sciences', 'Humanities']

export const UNIVERSITIES = [
  {
    name: 'University of Bologna', city: 'Bologna', country: 'Italy', flag: '🇮🇹',
    subjects: ['Business', 'Humanities', 'Sciences', 'Engineering'],
    levels: 'Bachelor and Master', lvl: ['Bachelor', 'Master'],
    intake: 'Sep 2027', applyBy: 'Nov 2026 to Mar 2027',
    english: 'IELTS 6.0, MOI letter accepted for many courses', moiAccepted: true,
    entry: '60% and above, CGPA 2.5',
    status: 'Opens Nov', tone: 'neutral',
    official: 'https://www.unibo.it/en',
    guide: 'choosing-a-university-in-italy-or-france',
    detail: 'The oldest university in the world, founded in 1088, with more than 200 programmes and around 90 taught in English. The regional DSU scholarship is unusually well funded across Emilia-Romagna, which matters more to a Pakistani applicant than the headline fee does.',
  },
  {
    name: 'Politecnico di Milano', city: 'Milan', country: 'Italy', flag: '🇮🇹',
    subjects: ['Engineering', 'Design', 'Computer Science'],
    levels: 'Bachelor and Master', lvl: ['Bachelor', 'Master'],
    intake: 'Sep 2027', applyBy: 'Oct 2026 to Feb 2027, early round closes first',
    english: 'IELTS 6.0, or TOEFL, or the PoliMi English test', moiAccepted: false,
    entry: 'Competitive, 70% and above, CGPA 3.0',
    status: 'Opens Oct', tone: 'neutral',
    official: 'https://www.polimi.it/en',
    guide: 'apply-to-italy-and-france-from-pakistan',
    detail: 'The top technical university in Italy and one of the best anywhere for design and architecture. Admission runs in rounds and the early round is both cheaper and less crowded, so a Pakistani applicant who needs visa time should be aiming at it rather than the last call.',
  },
  {
    name: 'Sapienza University of Rome', city: 'Rome', country: 'Italy', flag: '🇮🇹',
    subjects: ['Sciences', 'Humanities', 'Engineering'],
    levels: 'Bachelor and Master', lvl: ['Bachelor', 'Master'],
    intake: 'Sep 2027', applyBy: 'Dec 2026 to Apr 2027',
    english: 'IELTS 6.0, MOI letter accepted for many courses', moiAccepted: true,
    entry: '60% and above, CGPA 2.5',
    status: 'Opens Dec', tone: 'neutral',
    official: 'https://www.uniroma1.it/en',
    guide: 'choosing-a-university-in-italy-or-france',
    detail: 'One of the largest universities in Europe, known for classics and physics, and one of the more forgiving on entry grades. LazioDisco runs the regional scholarship, and the later application window suits students still waiting on attestation.',
  },
  {
    name: 'University of Padua', city: 'Padua', country: 'Italy', flag: '🇮🇹',
    subjects: ['Sciences', 'Business', 'Humanities'],
    levels: 'Bachelor and Master', lvl: ['Bachelor', 'Master'],
    intake: 'Sep 2027', applyBy: 'Nov 2026 to Mar 2027, first call closes earliest',
    english: 'IELTS 6.0, MOI letter accepted for some courses', moiAccepted: true,
    entry: '65% and above, CGPA 2.8',
    status: 'Opens Nov', tone: 'neutral',
    official: 'https://www.unipd.it/en/',
    guide: 'intake-deadlines-italy-france',
    detail: 'Founded in 1222, this is where Galileo taught. Padua runs its applications in calls rather than one long window, and the first call is where the fee waivers and the university\u2019s own merit scholarships are actually won.',
  },
  {
    name: 'Politecnico di Torino', city: 'Turin', country: 'Italy', flag: '🇮🇹',
    subjects: ['Engineering', 'Computer Science'],
    levels: 'Bachelor and Master', lvl: ['Bachelor', 'Master'],
    intake: 'Feb 2027', applyBy: 'Closing now for February entry',
    english: 'IELTS 6.0 or TOEFL', moiAccepted: false,
    entry: '65% and above, CGPA 2.8',
    status: 'Closing soon', tone: 'rust',
    official: 'https://www.polito.it/en',
    guide: 'intake-deadlines-italy-france',
    detail: 'An engineering focused university with a February start, which is the route back for a student who missed the September round rather than losing a whole year to it. Move quickly: the visa appointment in Islamabad has to fit inside the same window.',
  },
  {
    name: 'Sorbonne University', city: 'Paris', country: 'France', flag: '🇫🇷',
    subjects: ['Humanities', 'Sciences'],
    levels: 'Bachelor and Master', lvl: ['Bachelor', 'Master'],
    intake: 'Sep 2027', applyBy: 'Oct 2026 to Jan 2027, through Campus France',
    english: 'IELTS 6.5 for English-taught, French B2 for French-taught', moiAccepted: false,
    entry: '60% and above, CGPA 2.5',
    status: 'Opens Oct', tone: 'neutral',
    official: 'https://www.sorbonne-universite.fr/en',
    guide: 'france-student-visa-from-pakistan',
    detail: 'A famous research university in the heart of Paris. Every Pakistani applicant goes through Campus France Pakistan first, and that step has its own earlier deadline than the university\u2019s, which is what catches most people out.',
  },
  {
    name: 'Université Paris-Saclay', city: 'Paris (Saclay)', country: 'France', flag: '🇫🇷',
    subjects: ['Sciences', 'Engineering', 'Computer Science'],
    levels: 'Master', lvl: ['Master'],
    intake: 'Sep 2027', applyBy: 'Dec 2026 to Mar 2027, through Campus France',
    english: 'IELTS 6.5', moiAccepted: false,
    entry: 'Selective, 70% and above, CGPA 3.0',
    status: 'Opens Dec', tone: 'neutral',
    official: 'https://www.universite-paris-saclay.fr/en',
    guide: 'fully-funded-scholarships-for-pakistani-students',
    detail: 'Ranked among the very best in the world for mathematics and physics. It runs selective English-taught Masters, and its IDEX scholarship is one of the few in France worth applying for on its own merits rather than as a long shot.',
  },
  {
    name: 'Université Grenoble Alpes', city: 'Grenoble', country: 'France', flag: '🇫🇷',
    subjects: ['Engineering', 'Computer Science', 'Sciences'],
    levels: 'Bachelor and Master', lvl: ['Bachelor', 'Master'],
    intake: 'Sep 2027', applyBy: 'Nov 2026 to Mar 2027, through Campus France',
    english: 'IELTS 6.0 to 6.5 depending on the programme', moiAccepted: false,
    entry: '60% and above, CGPA 2.5',
    status: 'Opens Nov', tone: 'neutral',
    official: 'https://www.univ-grenoble-alpes.fr/english/',
    guide: 'france-student-visa-from-pakistan',
    detail: 'A leading science and technology university with more than 9,000 international students and a solid run of English-taught Masters. Living costs in Grenoble sit well below Paris, which is the part of the sum that actually decides most budgets.',
  },
  {
    name: 'Université de Lyon', city: 'Lyon', country: 'France', flag: '🇫🇷',
    subjects: ['Business', 'Sciences', 'Humanities'],
    levels: 'Bachelor and Master', lvl: ['Bachelor', 'Master'],
    intake: 'Sep 2027', applyBy: 'Nov 2026 to Mar 2027, through Campus France',
    english: 'IELTS 6.0 to 6.5 depending on the programme', moiAccepted: false,
    entry: '60% and above, CGPA 2.5',
    status: 'Opens Nov', tone: 'neutral',
    official: 'https://www.universite-lyon.fr/en/',
    guide: 'choosing-a-university-in-italy-or-france',
    detail: 'The biggest student city in France after Paris, with strong business and science faculties and noticeably lower rent. A good middle option for a student who wants a real city without the Paris housing queue.',
  },
  {
    name: "Université Côte d'Azur", city: 'Nice', country: 'France', flag: '🇫🇷',
    subjects: ['Business', 'Computer Science', 'Sciences'],
    levels: 'Bachelor and Master', lvl: ['Bachelor', 'Master'],
    intake: 'Feb 2027', applyBy: 'Closing now for the spring intake',
    english: 'IELTS 6.0', moiAccepted: false,
    entry: '60% and above, CGPA 2.5',
    status: 'Closing soon', tone: 'rust',
    official: 'https://univ-cotedazur.eu/',
    guide: 'intake-deadlines-italy-france',
    detail: 'A campus on the Riviera with a spring intake for several Masters and strong AI programmes tied to the Sophia Antipolis technology park. One of the few French options that lets you start in February rather than waiting for September.',
  },
  {
    name: 'Sciences Po', city: 'Paris', country: 'France', flag: '🇫🇷',
    subjects: ['Humanities', 'Business'],
    levels: 'Bachelor and Master', lvl: ['Bachelor', 'Master'],
    intake: 'Sep 2027', applyBy: 'Oct 2026 to Jan 2027',
    english: 'IELTS 7.0 for English-taught programmes', moiAccepted: false,
    entry: 'Highly selective, strong grades plus essays and interview',
    status: 'Opens Oct', tone: 'neutral',
    official: 'https://www.sciencespo.fr/en/',
    guide: 'fully-funded-scholarships-for-pakistani-students',
    detail: 'One of the most respected schools anywhere for political science, international affairs and public policy. Your written application carries as much weight here as your transcript, and the \u00c9mile Boutmy scholarship is aimed specifically at strong non-EU applicants.',
  },
]
