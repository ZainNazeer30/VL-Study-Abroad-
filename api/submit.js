// Vercel Serverless Function: emails every form submission to your own Gmail using Nodemailer.
// Needs GMAIL_USER and GMAIL_APP_PASSWORD in Project settings -> Environment Variables.
import nodemailer from 'nodemailer'
import {
  validateSubmission,
  buildEmailText,
  rateLimited,
  ALLOWED_ORIGINS,
} from '../lib/validateSubmission.js'

// Created once per warm instance instead of once per request. Rebuilding the SMTP connection
// on every submission is slow and makes Gmail more likely to throttle you.
let transporter = null
function getTransporter(user, pass) {
  if (!transporter) {
    transporter = nodemailer.createTransport({ service: 'gmail', auth: { user, pass } })
  }
  return transporter
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).json({ ok: false, error: 'Method not allowed' })
    return
  }

  // Only accept submissions that came from your own site. A missing Origin header is allowed
  // because some privacy browsers strip it; a *wrong* one is always rejected.
  const origin = req.headers.origin
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    res.status(403).json({ ok: false, error: 'Forbidden' })
    return
  }

  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim()
  if (rateLimited(ip)) {
    res.status(429).json({ ok: false, error: 'Too many submissions. Please try again in a minute.' })
    return
  }

  const result = validateSubmission(req.body)
  if (!result.ok) {
    // A tripped honeypot gets a 200 so the bot learns nothing.
    if (result.silent) {
      res.status(200).json({ ok: true })
      return
    }
    res.status(400).json({ ok: false, error: result.error })
    return
  }

  const user = process.env.GMAIL_USER
  const pass = process.env.GMAIL_APP_PASSWORD
  const to = process.env.TO_EMAIL || user
  if (!user || !pass) {
    res.status(503).json({ ok: false, error: 'The form is not connected yet.' })
    return
  }

  try {
    await getTransporter(user, pass).sendMail({
      from: `"VL Study Abroad website" <${user}>`,
      to,
      replyTo: result.replyTo,
      subject: `New submission: ${result.form}`,
      text: buildEmailText(result.form, result.fields, req.body?.submittedAt),
    })
    res.status(200).json({ ok: true })
  } catch (err) {
    // Logged for you, never sent to the browser: SMTP errors can echo back the account
    // name and parts of the credentials.
    console.error('[submit] send failed:', err)
    res.status(502).json({ ok: false, error: 'Could not send right now. Please WhatsApp us instead.' })
  }
}
