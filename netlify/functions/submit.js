// Netlify Function: emails every form submission to your own Gmail, for free, using Nodemailer.
// This only runs once the site is deployed on Netlify with the two environment variables below
// set (Site settings -> Environment variables). See the README section "Receiving applications
// and bookings" for the full setup, including how to get a Gmail app password.
//
// This file only runs when Netlify builds the site from your GitHub repository. Dragging the
// `dist` folder onto the Netlify dashboard does not run this, since that skips the build step
// entirely and only uploads the static files.
import nodemailer from 'nodemailer'

export default async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  let data
  try {
    data = await req.json()
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid JSON' }), { status: 400 })
  }

  const result = await sendSubmissionEmail(data)
  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}

export const config = { path: '/api/submit' }

async function sendSubmissionEmail(data) {
  const user = process.env.GMAIL_USER
  const pass = process.env.GMAIL_APP_PASSWORD
  const to = process.env.TO_EMAIL || user

  // Not configured yet: say so quietly rather than throwing, so the rest of the site keeps
  // working while you finish the Gmail app password step.
  if (!user || !pass) return { ok: false, reason: 'not_configured' }

  const { form, submittedAt, ...fields } = data || {}
  const rows = Object.entries(fields)
    .filter(([, v]) => v !== '' && v !== undefined && v !== null)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n')

  try {
    const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user, pass } })
    await transporter.sendMail({
      from: `"VL Study Abroad website" <${user}>`,
      to,
      replyTo: fields.email || undefined,
      subject: `New submission: ${form || 'Website form'}`,
      text: `${form || 'Website form'}\nSubmitted: ${submittedAt || new Date().toISOString()}\n\n${rows}`,
    })
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err.message }
  }
}
