import { FORMS } from '../data/site'

// Sends a form submission and TELLS YOU WHETHER IT ARRIVED.
//
// The previous version swallowed every error and returned nothing, so the page showed
// "Application received" whether or not the submission reached your inbox. A student on a
// dropped connection in Lahore would be told their application was received, close the tab,
// and wait for a call that was never going to come. That is the single most expensive bug on
// the site, because it is invisible from your end: you cannot follow up on an enquiry you
// never got.
//
// Returns { ok: true } or { ok: false, error: 'a sentence you can show the visitor' }.
export async function submitForm(formName, data) {
  const endpoint = FORMS.endpoint || '/api/submit'

  // A hung request should not leave the button spinning forever on a slow mobile connection.
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15000)

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        form: formName,
        submittedAt: new Date().toISOString(),
        ...data,
      }),
      signal: controller.signal,
    })

    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      return {
        ok: false,
        error: body.error || 'We could not send that just now. Please WhatsApp us instead.',
      }
    }
    return { ok: true }
  } catch (err) {
    const offline = err.name === 'AbortError' || !navigator.onLine
    return {
      ok: false,
      error: offline
        ? 'That took too long — check your connection and try again, or message us on WhatsApp.'
        : 'We could not send that just now. Please WhatsApp us instead.',
    }
  } finally {
    clearTimeout(timeout)
  }
}
