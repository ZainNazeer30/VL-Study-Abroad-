// Content for the Home page.

export const TRUST = [
  'Fully funded scholarship routes',
  '3+ years helping Pakistani students',
  'HEC, IBCC and MOFA attestation help',
  'Focused on Italy and France',
  'Full visa file support',
  'One counsellor who knows your case',
]

export const SERVICES = [
  { name: 'University selection', glyph: '⌂', tone: 'green' },
  { name: 'Admissions assistance', glyph: '✎', tone: 'gold' },
  { name: 'Visa guidance', glyph: '✓', tone: 'royal' },
  { name: 'Scholarship support', glyph: '✦', tone: 'rust' },
  { name: 'Pre-departure guidance', glyph: '✈', tone: 'gold' },
  { name: 'Career counselling', glyph: '◎', tone: 'royal' },
  { name: 'Finding somewhere to live', glyph: '⌘', tone: 'green' },
  { name: 'Support after you land', glyph: '☏', tone: 'rust' },
]

export const STEPS = [
  { n: '1', name: 'Free first chat', desc: 'Talk to a counsellor about your goals and budget, and get an honest read on your options. On WhatsApp or a call, whichever suits you.' },
  { n: '2', name: 'We look at your profile', desc: 'We match your Matric, FSc or Bachelor results, your English level and your budget to universities you can realistically get into.' },
  { n: '3', name: 'Documents and attestation', desc: 'We tell you exactly what needs IBCC, HEC and MOFA attestation, in what order, so nothing is rejected later for a missing stamp.' },
  { n: '4', name: 'We apply for you', desc: 'We prepare your motivation letters and forms, handle Universitaly for Italy or Campus France for France, and submit everything.' },
  { n: '5', name: 'Visa file and interview', desc: 'We build the visa file, check your bank statement and funds proof, book the Islamabad appointment and prepare you for the interview.' },
  { n: '6', name: 'Travel and enrol', desc: 'A briefing before you fly, help finding housing, and support through your residence permit once you land.' },
]

export const HOME_FILTERS = ['All', 'Italy', 'France', 'English-taught', 'STEM']

// No fee field here on purpose. See the note at the top of src/data/universities.js: a single
// tuition figure beside a university name is wrong for most of the students reading it, because
// Italy sets fees on assessed family income and France frequently waives the international rate.
// `apply` is what a student can act on instead, and it is the same window shown on the
// Universities page. Update both together each admissions cycle.
export const HOME_UNIS = [
  { name: 'University of Bologna', flag: '🇮🇹', city: 'Bologna', country: 'Italy', tags: ['English-taught', 'Public', 'All levels'], apply: 'Apply Nov 2026 to Mar 2027', status: 'Opens Nov', tone: 'neutral' },
  { name: 'Politecnico di Milano', flag: '🇮🇹', city: 'Milan', country: 'Italy', tags: ['Engineering', 'Design', 'Master'], apply: 'Apply Oct 2026 to Feb 2027', status: 'Opens Oct', tone: 'neutral' },
  { name: 'Sorbonne University', flag: '🇫🇷', city: 'Paris', country: 'France', tags: ['Humanities', 'Science', 'Public'], apply: 'Campus France, Oct 2026 to Jan 2027', status: 'Opens Oct', tone: 'neutral' },
  { name: 'Sciences Po', flag: '🇫🇷', city: 'Paris', country: 'France', tags: ['Humanities', 'Business', 'Public'], apply: 'Apply Oct 2026 to Jan 2027', status: 'Opens Oct', tone: 'neutral' },
  { name: 'Université Grenoble Alpes', flag: '🇫🇷', city: 'Grenoble', country: 'France', tags: ['STEM', 'English-taught'], apply: 'Campus France, Nov 2026 to Mar 2027', status: 'Opens Nov', tone: 'neutral' },
  { name: 'Politecnico di Torino', flag: '🇮🇹', city: 'Turin', country: 'Italy', tags: ['Engineering', 'STEM', 'Spring intake'], apply: 'Closing now for February 2027', status: 'Closing soon', tone: 'rust' },
]

// These three are the fully funded routes, the ones that cover tuition and living costs rather
// than just cutting the fee. Most students who come to us ask about these first, so they lead
// the homepage scholarships section.
export const HOME_SCHOLARSHIPS = [
  { flag: '🇮🇹', country: 'Italy', name: 'DSU regional scholarship', deadline: 'Aug 2027', fullyFunded: true, benefit: 'Up to €7,000 a year plus a tuition waiver, housing and meal support.', eligibility: 'Based on family income (ISEE). Most international students qualify.' },
  { flag: '🇫🇷', country: 'France', name: 'Eiffel Excellence scholarship', deadline: 'Jan 2027', fullyFunded: true, benefit: '€1,181 a month plus travel, insurance and activities.', eligibility: 'A strong academic record, under 25 for a Master or 30 for a PhD.' },
  { flag: '🇮🇹', country: 'Italy', name: 'Invest Your Talent in Italy', deadline: 'Feb 2027', fullyFunded: true, benefit: '€900 a month plus tuition support, for Master students in fields like engineering or design.', eligibility: 'Open to citizens of selected countries with strong grades.' },
]

export const WHY_US = [
  { name: 'We lead with fully funded options', desc: 'Before we look at anything else, we check what you could get for free or close to it, and only move on once that is covered.' },
  { name: 'We know the Pakistani paperwork', desc: 'IBCC for your Matric and FSc, HEC for your degree, then MOFA. We know the order, the timings and what the consulates in Islamabad actually accept.' },
  { name: '3+ years in Italy and France admissions', desc: 'We have been doing this since well before it was our full time job, and we have seen almost every kind of case.' },
  { name: 'One counsellor, start to finish', desc: 'The same person handles your case from the first call to your arrival, so nothing gets lost.' },
  { name: 'Clear and honest', desc: 'You see the real costs and timelines up front. No hidden fees and no promises we cannot keep.' },
  { name: 'Track your applications', desc: 'You can check where every application stands whenever you want.' },
  { name: 'We only do Italy and France', desc: 'Because we focus on two countries, we know their systems inside out.' },
  { name: 'Help with everything', desc: 'From picking a course to your first week on campus, including housing and paperwork.' },
]

// Real testimonials from students we have worked with, taken from vlstudy.online.
// The portraits beside them are illustrations, not photos of these students. See
// src/components/artwork.jsx for why, and how to swap in a real photo.
export const TESTIMONIALS = [
  { personKey: 'ayesha', name: 'Ayesha K.', flag: '🇫🇷', tag: 'Studying in France', quote: 'The visa guidance made all the difference. Every document was explained clearly, and my appointment went smoothly from start to finish.' },
  { personKey: 'hamza', name: 'Hamza R.', flag: '🇮🇹', tag: 'Studying in Italy', quote: "VL helped me find a scholarship I had no idea existed. It's genuinely what made studying in Italy possible for me." },
  { personKey: 'sana', name: 'Sana M.', flag: '🎓', tag: 'Admissions client', quote: 'Honest, patient and genuinely helpful from the very first call. They walked me through every step of my application.' },
]

export const HOME_FAQS = [
  { q: 'Which scholarships are actually fully funded?', a: 'The DSU regional scholarship in Italy and Invest Your Talent in Italy both cover tuition and living costs, and the Eiffel Excellence scholarship in France does the same. These are the ones we check first for every student, because they are the difference between studying abroad and not being able to afford it. Fee waivers and merit awards help too, but they lower the bill rather than cover it.' },
  { q: 'What do I need to get in?', a: 'Most programs ask for your transcripts, a valid passport, proof of English such as IELTS or a Medium of Instruction letter, a motivation letter and a CV. We check your profile and give you the exact list for each university.' },
  { q: 'Do my documents need HEC and IBCC attestation?', a: 'Yes, and the order matters. Matric and FSc certificates go through IBCC, a Bachelor or Master degree goes through HEC, and after that both usually need MOFA attestation before a consulate will accept them. Skipping a step, or doing them out of order, is one of the most common reasons a Pakistani student loses weeks. We give you the exact sequence for your documents at the start, so it runs alongside your applications rather than holding them up.' },
  { q: 'How much is tuition in Italy and France?', a: 'Less than most families expect, and there is no single figure we can honestly give you. Italian public universities set tuition on assessed family income, so two students on the same course can pay very different amounts. Many French public universities waive the higher international rate down to what a French student pays. On top of that a fully funded scholarship can bring the number close to nothing. Send us your household details and we will work out your actual figure, at no cost.' },
  { q: 'How much money do I need to show in my bank statement?', a: 'Both countries want proof you can support yourself for the year, and both accept a sponsor, usually a parent. Italy generally looks for around €7,000 for the year and France for roughly €615 a month. The amount matters less than how the account looks: consulates want to see funds that have been there for a while, not a large deposit made the week before. We review your statement before you book the appointment and tell you honestly if it needs work.' },
  { q: 'Where do I give my visa interview?', a: 'For most students it is Islamabad, at the Italian Embassy for Italy or through the French Embassy process for France. We book the appointment, put the file together in the order they expect it, and take you through the likely questions beforehand so you walk in prepared.' },
  { q: 'Can I get a scholarship?', a: 'Very likely. Italy has regional DSU scholarships that can cover tuition, housing and meals, and France has the Eiffel scholarship, the Sciences Po Émile Boutmy award and university-specific awards. We check what you qualify for at no cost, and we tell you honestly if a fully funded route is not realistic for your profile.' },
  { q: 'How long does the visa take?', a: 'Usually two to six weeks after your appointment, depending on the consulate and the time of year. We prepare the file so it is right the first time.' },
  { q: 'When are the deadlines?', a: 'In Italy most applications run from November to April for a September start. In France, Campus France usually closes between December and March. The earlier you start, the more options you have.' },
  { q: 'Do I need IELTS or TOEFL?', a: 'A lot of English-taught programs accept a Medium of Instruction letter instead, but a 6.0 or higher in IELTS helps with both admission and scholarships. We advise you program by program.' },
  { q: 'Will you help me find housing?', a: 'Yes. We guide you through university residences, DSU housing in Italy, CROUS in France and trusted private options before you fly.' },
  { q: 'Can I work part-time while studying?', a: 'Yes. Student visas in both Italy and France let you work up to 20 hours a week.' },
]
