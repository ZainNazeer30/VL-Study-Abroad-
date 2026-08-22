// Brand, navigation and contact details in one place.
// Update the WhatsApp number, email and website here and it changes across the whole site.

export const BRAND = {
  name: 'VL Study Abroad',
  suffix: 'Consultants',
  fullName: 'VL Study Abroad Consultants',
  blurb:
    'For more than five years we have helped students find their place at universities across Italy and France, from the first conversation to the day they arrive.',
}

export const CONTACT = {
  email: 'vlstudy.online@gmail.com',
  website: 'www.vlstudy.online',
  websiteUrl: 'https://www.vlstudy.online',
  phone: '+92 321 5208625',
  // Real number, in international format with no spaces or symbols, used to build the wa.me link below.
  whatsapp: 'https://wa.me/923215208625',
}

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

export const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'Study in Italy', to: '/italy' },
  { label: 'Study in France', to: '/france' },
  { label: 'Universities', to: '/universities' },
  { label: 'Scholarships', to: '/scholarships' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Apply', to: '/apply' },
]

export const FOOTER_LINKS = {
  quick: [
    { label: 'Home', to: '/' },
    { label: 'Study in Italy', to: '/italy' },
    { label: 'Study in France', to: '/france' },
    { label: 'Universities', to: '/universities' },
    { label: 'Scholarships', to: '/scholarships' },
  ],
  company: [
    { label: 'About Us', to: '/about' },
    { label: 'Success Stories', to: '/about' },
    { label: 'Contact Us', to: '/contact' },
    { label: 'Application Form', to: '/apply' },
  ],
}

// Soft background + text colour pairs used by icons, badges and pills.
export const TONES = {
  royal: { bg: 'bg-royal-soft', fg: 'text-royal' },
  green: { bg: 'bg-green-soft', fg: 'text-green' },
  gold: { bg: 'bg-[#FBF7EC]', fg: 'text-gold-ink' },
  rust: { bg: 'bg-rust-soft', fg: 'text-rust' },
}

export const STATUS = {
  green: { bg: 'bg-green-soft', fg: 'text-green' },
  rust: { bg: 'bg-rust-soft', fg: 'text-rust' },
  neutral: { bg: 'bg-[#F4F7FC]', fg: 'text-ink' },
}
