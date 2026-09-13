// Brand, navigation and contact details in one place.
// Update the WhatsApp number, email and website here and it changes across the whole site.

export const BRAND = {
  name: 'VL Study Abroad',
  suffix: 'Consultants',
  fullName: 'VL Study Abroad Consultants',
  blurb:
    'For more than three years we have helped students find their place at universities across Italy and France, from the first conversation to the day they arrive.',
}

export const CONTACT = {
  email: 'vlstudy.online@gmail.com',
  website: 'www.vlstudy.online',
  websiteUrl: 'https://www.vlstudy.online',
  phone: '+92 321 5208625',
  // Office hours, shown on the contact page and repeated in the schema in index.html so they can
  // appear beside the business in search. Keep the two in step: hoursText is what a person reads,
  // hoursOpens and hoursCloses are the 24 hour values Google needs.
  hoursText: '10:00 am to 4:30 pm, Monday to Saturday',
  hoursShort: '10:00 am – 4:30 pm',
  hoursOpens: '10:00',
  hoursCloses: '16:30',
  hoursDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  // Real number, in international format with no spaces or symbols, used to build the wa.me link below.
  whatsapp: 'https://wa.me/923215208625',
}

// Your social profiles, in one place.
//
// Two separate things need these, and it is worth knowing they are separate. The footer renders
// them as icons so a visitor can find you. The "sameAs" list in index.html tells Google that these
// profiles and this website are one business, which is what makes your logo and details eligible
// to appear beside your name in a search result.
//
// Google reads sameAs more confidently when the same links are also on the page where a person
// can click them, which is the other reason the footer block exists.
//
// KEEP IN SYNC: index.html is a plain static file and cannot import this one, so its sameAs list
// is a copy of these addresses. Change a profile here and change it there in the same commit, or
// the two quietly drift apart.
export const SOCIAL = [
  { label: 'Facebook', icon: 'facebook', href: 'https://www.facebook.com/share/1YUPTvTdaB/' },
  { label: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/vl.study.abroad/' },
  { label: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/company/vl-study-abroad-consultants/' },
]

// Where form submissions go. Leave this exactly as it is to use the free option: every
// submission emails your own Gmail through the function in netlify/functions/submit.js (or
// api/submit.js on Vercel). That needs two settings on your hosting dashboard, GMAIL_USER and
// GMAIL_APP_PASSWORD, see the README section "Receiving applications and bookings".
//
// If you'd rather use Formspree instead (quicker to set up, but free only up to 50 submissions
// a month, and a third party keeps a copy):
//   1. Go to https://formspree.io and sign up.
//   2. Create a new form, name it anything, for example "VL Study Abroad".
//   3. Copy the endpoint it gives you, it looks like https://formspree.io/f/abcdwxyz.
//   4. Paste it below as the value of `endpoint`.
export const FORMS = {
  endpoint: '',
}

// The top menu. "Apply" is deliberately not in this list: the Apply Now button sits beside the
// menu on every screen size, so listing it twice only makes the desktop bar more crowded.
export const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'Study in Italy', to: '/italy' },
  { label: 'Study in France', to: '/france' },
  { label: 'Universities', to: '/universities' },
  { label: 'Scholarships', to: '/scholarships' },
  { label: 'Guides', to: '/blog' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export const FOOTER_LINKS = {
  quick: [
    { label: 'Home', to: '/' },
    { label: 'Study in Italy', to: '/italy' },
    { label: 'Study in France', to: '/france' },
    { label: 'Universities', to: '/universities' },
    { label: 'Scholarships', to: '/scholarships' },
    { label: 'Guides and answers', to: '/blog' },
  ],
  company: [
    { label: 'About Us', to: '/about' },
    { label: 'Success Stories', to: '/about' },
    { label: 'Contact Us', to: '/contact' },
    { label: 'Application Form', to: '/apply' },
  ],
  // The most useful guides, linked from every page. Search engines follow links to decide what
  // matters on a site, so the pages you most want to rank belong in the footer, not buried.
  guides: [
    { label: 'Applying from Pakistan', to: '/blog/apply-to-italy-and-france-from-pakistan' },
    { label: 'HEC, IBCC and MOFA order', to: '/blog/hec-ibcc-mofa-attestation-order' },
    { label: 'Fully funded scholarships', to: '/blog/fully-funded-scholarships-for-pakistani-students' },
    { label: 'Italy student visa', to: '/blog/italy-student-visa-from-pakistan' },
    { label: 'France student visa', to: '/blog/france-student-visa-from-pakistan' },
  ],
}

// Soft background + text colour pairs used by icons, badges and pills.
// One treatment for every decorative icon tile on the site.
//
// This used to be four: a pale blue tile with blue icon, a pale green with green, a pale gold
// with gold, a pale rust with rust, rotated down a grid of services with nothing choosing which
// tile got which colour. Rotating pastel tints behind saturated icons is one of the most
// recognisable signatures of a generated template, and it is what a visitor reads as "this site
// was not designed". No brand uses four accent colours decoratively; a designer picks one and
// spends the others on meaning.
//
// So decoration is now quiet and colour is reserved for two jobs that need it: STATUS below,
// where green and rust genuinely say open and closing, and the gold in the logo and the primary
// button, which is the brand. If you want an icon tile to stand out, that is a sign it belongs in
// a different section, not a different colour.
export const TILE = { bg: 'bg-tile', fg: 'text-navy' }

// The downloadable PDFs in public/guides, keyed so any page can pull the right one.
//
// They live here rather than inside the contact page because a download is most useful at the
// moment someone is reading about that country, not on the page they visit last. Each file is
// built from the same facts as the article of the same name.
export const GUIDE_PDFS = {
  italy: {
    title: 'The Italy student visa from Pakistan',
    blurb: 'Funds, the Declaration of Value, the Islamabad appointment and a document checklist.',
    file: '/guides/italy-student-visa-guide.pdf',
    pages: '2 pages',
  },
  france: {
    title: 'The France student visa from Pakistan',
    blurb: 'Campus France, the interview, the file and a document checklist.',
    file: '/guides/france-student-visa-guide.pdf',
    pages: '2 pages',
  },
  scholarships: {
    title: 'Scholarships in Italy and France',
    blurb: 'DSU, Eiffel, and which ones Pakistani students can actually apply for.',
    file: '/guides/scholarships-italy-france-guide.pdf',
    pages: '2 pages',
  },
}

// Kept, and still four colours, because here the colour carries information: a student scanning
// the universities table reads rust as "this is closing" without stopping to read the words.
export const STATUS = {
  green: { bg: 'bg-green-soft', fg: 'text-green' },
  rust: { bg: 'bg-rust-soft', fg: 'text-rust' },
  neutral: { bg: 'bg-[#F4F7FC]', fg: 'text-ink' },
}
