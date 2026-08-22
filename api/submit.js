// Vercel Serverless Function: emails every form submission to your own Gmail, for free, using
// Nodemailer. This only runs once the site is deployed on Vercel with the two environment
// variables below set (Project settings -> Environment Variables). See the README section
// "Receiving applications and bookings" for the full setup, including how to get a Gmail app
// password. Vercel picks this up automatically, there is nothing else to configure.
import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send('Method not allowed')
    return
  }

  const user = process.env.GMAIL_USER
  const pass = process.env.GMAIL_APP_PASSWORD
  const to = process.env.TO_EMAIL || user

  // Not configured yet: say so quietly rather than throwing, so the rest of the site keeps
  // working while you finish the Gmail app password step.
  if (!user || !pass) {
    res.status(200).json({ ok: false, reason: 'not_configured' })
    return
  }

  const { form, submittedAt, ...fields } = req.body || {}
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
    res.status(200).json({ ok: true })
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message })
  }
}
