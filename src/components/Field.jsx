// Labelled form fields.
//
// The forms on the site currently use a bare <input placeholder="Full name">. Three things go
// wrong with that, and all three cost you real enquiries:
//
//   1. A placeholder disappears the moment someone types. Anyone who is interrupted mid-form
//      comes back to four identical grey boxes with no way to tell which is which.
//   2. A screen reader announces "edit text, blank" and nothing else, so a blind student
//      cannot fill in the form at all. Placeholder text is not a label.
//   3. Without `type` and `autoComplete`, a phone shows the full QWERTY keyboard for a phone
//      number field, and the browser cannot offer to autofill a saved name or email.
//
// These two components fix all three. Use them everywhere a form input appears.

const base =
  'w-full px-3.5 py-3.5 rounded-[11px] border border-field text-[14px] bg-white text-ink ' +
  // A visible focus ring. `outline-none` on its own leaves a keyboard user with no way to see
  // where they are on the page; `focus-visible` shows the ring for keyboard users without
  // putting a box around every field a mouse user clicks.
  'outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal ' +
  'focus:border-royal aria-[invalid=true]:border-rust'

export function Field({
  id,
  label,
  value,
  onChange,
  type = 'text',
  autoComplete,
  inputMode,
  required = false,
  hint,
  invalid = false,
  className = '',
  as = 'input',
  rows,
  children,
}) {
  const hintId = hint ? `${id}-hint` : undefined
  const Tag = as
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-[12.5px] font-medium text-navy mb-1.5">
        {label}
        {required && (
          <span className="text-rust ml-0.5" aria-hidden="true">
            *
          </span>
        )}
        {required && <span className="sr-only"> (required)</span>}
      </label>
      <Tag
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        type={as === 'input' ? type : undefined}
        rows={rows}
        autoComplete={autoComplete}
        inputMode={inputMode}
        required={required}
        aria-invalid={invalid || undefined}
        aria-describedby={hintId}
        className={`${base} ${as === 'textarea' ? 'resize-y' : ''}`}
      >
        {children}
      </Tag>
      {hint && (
        <p id={hintId} className="text-[11.5px] text-slate mt-1 m-0">
          {hint}
        </p>
      )}
    </div>
  )
}

// A <select> needs the same label treatment. The first <option> is the prompt, and it carries
// value="" so validation can tell "not chosen yet" from a real answer.
export function SelectField({ id, label, value, onChange, required = false, prompt, options, className = '' }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-[12.5px] font-medium text-navy mb-1.5">
        {label}
        {required && (
          <span className="text-rust ml-0.5" aria-hidden="true">
            *
          </span>
        )}
        {required && <span className="sr-only"> (required)</span>}
      </label>
      <select id={id} name={id} value={value} onChange={onChange} required={required} className={base}>
        <option value="">{prompt}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  )
}

// The invisible field a spam bot fills in and a person never sees. Paired with the honeypot
// check in lib/validateSubmission.js. `aria-hidden` and `tabIndex={-1}` keep it away from
// screen readers and the keyboard, so it is invisible to people and obvious to bots.
export function Honeypot({ value, onChange }) {
  return (
    <div className="absolute w-px h-px -m-px overflow-hidden" aria-hidden="true">
      <label htmlFor="company">Company (leave this empty)</label>
      <input id="company" name="company" value={value} onChange={onChange} tabIndex={-1} autoComplete="off" />
    </div>
  )
}
