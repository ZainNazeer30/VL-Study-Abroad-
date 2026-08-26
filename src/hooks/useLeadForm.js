import { useState } from 'react'
import { submitForm } from '../lib/submitForm'

// One place for the logic all three forms need.
//
// Home.jsx, Apply.jsx and Contact.jsx each had their own copy of this: field state, a `hint`
// string, some validation, a call to submitForm. They had already drifted apart: only Apply
// checked required fields, none of the three validated an email address, and all three showed
// a success message whether or not the submission actually arrived.
//
// Usage:
//   const f = useLeadForm('Application form', { name: '', email: '', phone: '' })
//   f.values.name          the current value
//   f.setField('name')     an onChange handler
//   f.submit({ required: ['name', 'phone'] })   returns true if it was sent
//   f.sending / f.error / f.done

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// A Pakistani number is eleven digits and nothing else, starting with a zero: 03215208625.
// The old rule here accepted anything from seven to twenty characters made of digits, spaces
// and brackets, which meant "1234567" and "((((((()))))))" both got through and landed in the
// inbox as a lead nobody could call back.
const PHONE = /^0\d{10}$/
export const PHONE_HINT = '11 digits, for example 03215208625'

// Runs on every keystroke in a phone field, so a wrong character never appears in the first
// place rather than being rejected after the student has finished typing. Anything that is not
// a digit is dropped, a pasted +92 or 0092 number is converted to the local form, and the value
// stops at eleven digits.
export function normalisePhone(input) {
  let digits = String(input ?? '').replace(/\D/g, '')
  if (digits.startsWith('0092')) digits = `0${digits.slice(4)}`
  else if (digits.startsWith('92') && digits.length >= 12) digits = `0${digits.slice(2)}`
  return digits.slice(0, 11)
}

const LABELS = {
  name: 'your name', email: 'an email address', phone: 'a phone number',
  country: 'a preferred country', level: 'a degree level', qual: 'your highest qualification',
  grade: 'your marks', intake: 'a target intake',
}

export function useLeadForm(formName, initialValues) {
  // `company` is the honeypot. A person never sees it, so anything in it means a bot.
  const [values, setValues] = useState({ ...initialValues, company: '' })
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  const setField = (key) => (e) => {
    setError('')
    const raw = e.target.value
    const next = key === 'phone' ? normalisePhone(raw) : raw
    setValues((v) => ({ ...v, [key]: next }))
  }

  const reset = () => {
    setValues({ ...initialValues, company: '' })
    setError('')
    setDone(false)
  }

  // Checks the fields, sends, and only reports success if it actually arrived.
  // Returns true when sent, false when it did not, and the caller uses that to decide whether to
  // advance to a "thank you" screen.
  // `extra` is for values the caller computes at submit time rather than holding in a field,
  // the chosen day and time on the booking calendar, for instance. Passing them here keeps the
  // caller from having to mutate state, which React does not allow.
  const submit = async ({ required = [], send = true, extra = {} } = {}) => {
    const payload = { ...values, ...extra }
    const missing = required.filter((k) => !String(payload[k] || '').trim())
    if (missing.length) {
      const names = missing.map((k) => LABELS[k] || k)
      const list = names.length > 1 ? `${names.slice(0, -1).join(', ')} and ${names.at(-1)}` : names[0]
      setError(`Please add ${list}.`)
      return false
    }
    // An email typo means you cannot reply. Worth catching before the student leaves.
    if (payload.email?.trim() && !EMAIL.test(payload.email.trim())) {
      setError('That email address does not look right. Check it, or leave it blank.')
      return false
    }
    // Only reached if somebody defeats the keystroke filter above, or types too few digits.
    // The message says what to do rather than only that something is wrong.
    if (payload.phone?.trim() && !PHONE.test(payload.phone.trim())) {
      setError('Please enter your full 11 digit number starting with 0, for example 03215208625.')
      return false
    }
    if (!send) {
      setError('')
      return true
    }

    setSending(true)
    const result = await submitForm(formName, payload)
    setSending(false)

    if (!result.ok) {
      setError(result.error)
      return false
    }
    setError('')
    setDone(true)
    return true
  }

  return { values, setField, setValues, submit, sending, error, done, reset }
}
