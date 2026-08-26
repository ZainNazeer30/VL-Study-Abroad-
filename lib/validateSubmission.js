// Shared validation for every form submission, used by both api/submit.js (Vercel) and
// netlify/functions/submit.js (Netlify). Put this file at the project root as
// `lib/validateSubmission.js` so both functions can import it.
//
// Why this exists: the endpoint is public. Anyone can POST anything to it. Without an
// allow-list, a spam bot can push arbitrary keys and megabytes of text through your Gmail
// account, and Google will suspend the account long before you notice.

// Only these field names are ever accepted. Anything else is silently dropped.
const ALLOWED_FIELDS = {
  name: 120,
  email: 200,
  phone: 40,
  nation: 80,
  qual: 60,
  grade: 40,
  english: 60,
  country: 40,
  level: 30,
  program: 120,
  intake: 40,
  notes: 2000,
  day: 20,
  time: 20,
}

// Must match the strings the pages pass to submitForm(). Country.jsx builds its name from the
// country, so both variants are listed. An unrecognised name is not rejected — it is relabelled
// "Website form", so a new form you add still reaches you; you just lose the label until you
// add it here.
const ALLOWED_FORMS = new Set([
  'Application form',
  'Consultation booking',
  'Home eligibility check',
  'Italy consultation request',
  'France consultation request',
])

// Deliberately loose: one @, no spaces, a dot in the domain. Strict RFC regexes reject valid
// addresses and are a common reason real students silently fail to reach you.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
// Digits, spaces and the usual separators. Pakistani numbers arrive in every possible format.
const PHONE = /^[\d\s+()-]{7,20}$/
// CR and LF are the characters that let an attacker inject extra mail headers.
const CRLF = /[\r\n]/

// Strips control characters and collapses newline runs. Applied to every value that reaches
// the email body.
function clean(value, maxLength) {
  return String(value)
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, maxLength)
}

export function validateSubmission(raw) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return { ok: false, error: 'Invalid request' }
  }

  // A bot that fills every field it finds trips this. Real visitors never see the input,
  // so a value here means the submission is automated. Reported as success so the bot has
  // no signal to retry with.
  if (typeof raw.company === 'string' && raw.company.trim() !== '') {
    return { ok: false, silent: true }
  }

  const form = ALLOWED_FORMS.has(raw.form) ? raw.form : 'Website form'

  const fields = {}
  for (const [key, maxLength] of Object.entries(ALLOWED_FIELDS)) {
    const value = raw[key]
    if (typeof value !== 'string') continue
    const cleaned = clean(value, maxLength)
    if (cleaned) fields[key] = cleaned
  }

  // Every form on the site requires at least one of these, so a submission with neither is
  // either a bot or a broken client. Nothing useful can be done with it either way.
  if (!fields.name || (!fields.phone && !fields.email)) {
    return { ok: false, error: 'Please provide your name and a phone number or email address.' }
  }
  if (fields.email && !EMAIL.test(fields.email)) {
    return { ok: false, error: 'That email address does not look right.' }
  }
  if (fields.phone && !PHONE.test(fields.phone)) {
    return { ok: false, error: 'That phone number does not look right.' }
  }
  // replyTo goes into a mail header. A newline there would let an attacker add their own
  // headers (Bcc, for instance) and turn your Gmail into an open relay.
  const replyTo = fields.email && !CRLF.test(fields.email) ? fields.email : undefined

  return { ok: true, form, fields, replyTo }
}

// Builds the plain-text email body. Field names are from the allow-list above, values are
// cleaned, so nothing here can be injected.
export function buildEmailText(form, fields, submittedAt) {
  const rows = Object.entries(fields)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n')
  const when = typeof submittedAt === 'string' && submittedAt.length <= 40 ? submittedAt : new Date().toISOString()
  return `${form}\nSubmitted: ${when}\n\n${rows}\n`
}

// Crude per-instance rate limit. It resets whenever the serverless instance is recycled, so
// it is not a hard guarantee — it is there to stop a single bot hammering the endpoint for
// minutes at a time. For a real guarantee put Cloudflare Turnstile in front of the form.
const hits = new Map()
const WINDOW_MS = 60_000
const MAX_PER_WINDOW = 5

export function rateLimited(ip) {
  if (!ip) return false
  const now = Date.now()
  const record = hits.get(ip)
  if (!record || now - record.start > WINDOW_MS) {
    hits.set(ip, { start: now, count: 1 })
    if (hits.size > 5000) hits.clear() // crude memory ceiling
    return false
  }
  record.count += 1
  return record.count > MAX_PER_WINDOW
}

export const ALLOWED_ORIGINS = [
  'https://www.vlstudy.online',
  'https://vlstudy.online',
]
