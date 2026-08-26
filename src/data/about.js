// Content for the About page.

export const ABOUT_STATS = [
  { v: '3+', l: 'years of experience' },
  { v: '30+', l: 'students placed' },
  { v: '96%', l: 'visa success rate' },
  { v: '2', l: 'countries we know well' },
]

export const ABOUT_VALUES = [
  { glyph: '◎', tone: 'royal', t: 'Honest, personal advice', d: 'One counsellor who knows your file and tells you the truth about your chances.' },
  { glyph: '▤', tone: 'green', t: 'A clear process', d: 'Set fees, set timelines and a way to track your applications any time.' },
  { glyph: '◆', tone: 'gold', t: 'Deep local knowledge', d: 'We only work with Italy and France, so we know Universitaly, DSU, Campus France and CROUS well.' },
  { glyph: '✈', tone: 'rust', t: 'With you the whole way', d: 'From the first call to your first week on campus, including housing, permits and a bank account.' },
]

// ---------------------------------------------------------------------------------------------
// THE PEOPLE BEHIND THE COMPANY
//
// Worth having for two reasons. A student handing over their documents and their family's money
// wants to know who they are dealing with, and a named person with a real, checkable profile is
// the strongest trust signal a small consultancy has. Second, Google's own quality guidelines
// lean heavily on who is behind a site and whether they have real experience in the subject; the
// LinkedIn addresses below are handed over as structured data on this page for exactly that.
//
// The wording is each founder's own, condensed. If you want to change how you are described,
// change it here and nowhere else.
//
// PHOTOGRAPHS: both founders now have a real photograph, registered in src/data/images.js as
// `founderUmer` and `founderKashan` and referenced by the `image` key below. To swap one, put
// the new file in public/img and change the entry in images.js rather than here. If you ever
// remove the `image` key, the page falls back to the initials on a coloured circle, which is
// honest and looks deliberate.
// ---------------------------------------------------------------------------------------------
export const FOUNDERS = [
  {
    key: 'kashan',
    name: 'Kashan Nazeer',
    role: 'Consultant and Founder',
    // The one line version used under an article headline, where there is no room for the bio.
    credential: 'Founder of VL Study Abroad. Three years advising Pakistani students on admissions, funding and visa files for Italy and France.',
    initials: 'KN',
    tone: 'royal',
    image: 'founderKashan',
    linkedin: 'https://www.linkedin.com/in/kashan-nazeer-a72475369/',
    bio: [
      'Kashan has spent more than three years working directly with students to simplify the study abroad journey, through counselling, university selection, admissions support and planning the year properly rather than reactively.',
      'He handles most of the counselling side of VL: working out what a student can realistically get into, which funding routes are open to them, and what their documents need before anything is submitted.',
    ],
    quote:
      'Global education can transform careers and lives. My job is to help students confidently take the next step towards a brighter future.',
  },
  {
    key: 'umer',
    name: 'Umer Sattar',
    role: 'Educator and Co-founder',
    credential: 'Co-founder of VL Study Abroad and a working teacher, advising students on choosing a country, a programme and a realistic plan.',
    initials: 'US',
    tone: 'green',
    image: 'founderUmer',
    linkedin: 'https://www.linkedin.com/in/umer-sattar-76221942b/',
    bio: [
      'Umer came to study abroad consultancy from teaching, and still teaches alongside his work at VL. Being in a classroom and in a counselling session in the same week gives him an unusually direct view of what students actually struggle with when they start planning.',
      'He works with students on understanding their options, choosing a destination and a programme that fit them, and moving through admissions with more confidence than they started with.',
    ],
    quote:
      'Good guidance is about more than paperwork. It starts with understanding the student and giving honest, practical advice.',
  },
]

// Keyed by the short name each article's `author` field uses in src/data/blog.js, so an article
// can name a real person without repeating their details. An article with no `author`, or one
// naming a key that is not here, falls back to the company byline.
export const AUTHOR_BY_KEY = Object.fromEntries(FOUNDERS.map((f) => [f.key, f]))

// Real testimonials from students we have worked with, taken from vlstudy.online.
// The portraits beside them are illustrations, not photos of these students. See
// src/components/artwork.jsx for why, and how to swap in a real photo.
export const ABOUT_STORIES = [
  { personKey: 'ayesha', name: 'Ayesha K.', flag: '🇫🇷', tag: 'Studying in France', quote: 'The visa guidance made all the difference. Every document was explained clearly, and my appointment went smoothly from start to finish. I never felt like I was figuring it out alone.' },
  { personKey: 'hamza', name: 'Hamza R.', flag: '🇮🇹', tag: 'Studying in Italy', quote: "VL helped me find a scholarship I had no idea existed. It's genuinely what made studying in Italy possible for me, and they stayed in touch well after I landed." },
  { personKey: 'sana', name: 'Sana M.', flag: '🎓', tag: 'Admissions client', quote: 'Honest, patient and genuinely helpful from the very first call. They walked me through every step of my application and never made me feel rushed.' },
]
