import { FORMS } from '../data/site'

// Sends a form submission somewhere you can actually see it. Every call is tagged with which
// form it came from so they're easy to tell apart in your inbox.
//
// By default this posts to /api/submit, a small function (see netlify/functions/submit.js and
// api/submit.js) that emails the submission to your own Gmail using Nodemailer, for free. That
// only works once you deploy to Netlify or Vercel and set the GMAIL_USER and GMAIL_APP_PASSWORD
// environment variables described in the README.
//
// If you'd rather use a service like Formspree instead (simpler to set up, no Gmail app
// password, but capped at 50 submissions a month on its free plan), set FORMS.endpoint in
// src/data/site.js to your Formspree URL and this will post there instead.
//
// Either way, if the request fails for any reason (not deployed yet, offline visitor, endpoint
// not configured), this quietly does nothing rather than blocking the on-page "thanks" message
// the visitor sees regardless.
export async function submitForm(formName, data) {
  const endpoint = FORMS.endpoint || '/api/submit'
  try {
    await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        form: formName,
        submittedAt: new Date().toISOString(),
        ...data,
      }),
    })
  } catch {
    // Swallowed on purpose, see the note above.
  }
}
