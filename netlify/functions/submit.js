// Netlify Function: emails every form submission to your own Gmail using Nodemailer.
// Needs GMAIL_USER and GMAIL_APP_PASSWORD in Site settings -> Environment variables.
import nodemailer from 'nodemailer'
import {
  validateSubmission,
  buildEmailText,
  rateLimited,
  ALLOWED_ORIGINS,
} from '../../lib/validateSubmission.js'

export const config = { path: '/api/submit' }

let transporter = null
function getTransporter(user, pass) {
  if (!transporter) {
    transporter = nodemailer.createTransport({ service: 'gmail', auth: { user, pass } })
  }
  return transporter
}

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })

export default async (req) => {
  if (req.method !== 'POST') {
    return json({ ok: false, error: 'Method not allowed' }, 405)
  }

  const origin = req.headers.get('origin')
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    return json({ ok: false, error: 'Forbidden' }, 403)
  }

  const ip = (req.headers.get('x-nf-client-connection-ip') || '').trim()
  if (rateLimited(ip)) {
    return json({ ok: false, error: 'Too many submissions. Please try again in a minute.' }, 429)
  }

  // Reject oversized bodies before parsing them. Without this a single request can push
  // megabytes of text through your Gmail account.
  const length = Number(req.headers.get('content-length') || 0)
  if (length > 16_000) {
    return json({ ok: false, error: 'That message is too long.' }, 413)
  }

  let data
  try {
    data = await req.json()
  } catch {
    return json({ ok: false, error: 'Invalid request' }, 400)
  }

  const result = validateSubmission(data)
  if (!result.ok) {
    if (result.silent) return json({ ok: true })
    return json({ ok: false, error: result.error }, 400)
  }

  const user = process.env.GMAIL_USER
  const pass = process.env.GMAIL_APP_PASSWORD
  const to = process.env.TO_EMAIL || user
  if (!user || !pass) {
    return json({ ok: false, error: 'The form is not connected yet.' }, 503)
  }

  try {
    await getTransporter(user, pass).sendMail({
      from: `"VL Study Abroad website" <${user}>`,
      to,
      replyTo: result.replyTo,
      subject: `New submission: ${result.form}`,
      text: buildEmailText(result.form, result.fields, data?.submittedAt),
    })
    return json({ ok: true })
  } catch (err) {
    console.error('[submit] send failed:', err)
    return json({ ok: false, error: 'Could not send right now. Please WhatsApp us instead.' }, 502)
  }
}
