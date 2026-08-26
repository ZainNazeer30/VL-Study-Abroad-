// The booking calendar in src/pages/Contact.jsx currently has its dates typed in by hand:
//
//   const DAYS = [{ dow: 'Mon', num: '24' }, { dow: 'Tue', num: '25' }, ...]
//   const confirmLine = `${DAYS[day].dow} ${DAYS[day].num} Aug at ${SLOTS[slot]}`
//
// Those were correct in the week they were written and are wrong in every week since. The
// month is hardcoded to "Aug" as well, so from September onwards a student books "Mon 24 Aug",
// receives a confirmation for a date in the past, and quietly decides the business is not
// operating. Replace both with this.

const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// The next `count` working days, starting tomorrow. Sunday is skipped; Saturday is kept,
// because the existing calendar offered Saturday slots and Pakistani students often book then.
export function nextWorkingDays(count = 6, from = new Date()) {
  const days = []
  const cursor = new Date(from)
  cursor.setHours(0, 0, 0, 0)
  while (days.length < count) {
    cursor.setDate(cursor.getDate() + 1)
    if (cursor.getDay() === 0) continue // skip Sunday
    days.push({
      dow: DOW[cursor.getDay()],
      num: String(cursor.getDate()),
      month: MONTH[cursor.getMonth()],
      // ISO value is what gets sent to your inbox, so the booking is never ambiguous.
      iso: `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, '0')}-${String(cursor.getDate()).padStart(2, '0')}`,
    })
  }
  return days
}

// In Contact.jsx:
//
//   const DAYS = useMemo(() => nextWorkingDays(6), [])
//   ...
//   const confirmLine = day >= 0 && slot >= 0
//     ? `${DAYS[day].dow} ${DAYS[day].num} ${DAYS[day].month} at ${SLOTS[slot]}`
//     : ''
//   ...
//   submitForm('Consultation booking', { name, phone, day: DAYS[day].iso, time: SLOTS[slot] })
//
// useMemo matters here: without it, every keystroke in the name field rebuilds the array and
// gives every day button a new object, so all six re-render on every character typed.
