import { Link } from 'react-router-dom'
import { Container } from '../components/ui'
import { CONTACT, BRAND } from '../data/site'
import { useSeo, graph } from '../hooks/useSeo'

// ---------------------------------------------------------------------------------------------
// The two pages every site that collects a phone number should have, and most Pakistani
// consultancy sites do not.
//
// The privacy page exists because your forms ask for a name, an email, a phone number and
// someone's academic history. That is personal data, and once a student in Europe or a browser
// privacy check looks at your site, "what happens to my details" is a fair question with a real
// answer. Saying it plainly costs nothing and it is one of the trust signals Google's own quality
// guidelines describe.
//
// The terms page exists to say the thing that protects you: you give guidance, you do not decide
// visas, and no consultant on earth can guarantee one. Anybody who does is either lying or about
// to disappoint somebody. Writing it down is better for you than leaving it unsaid.
//
// EDIT THE TEXT BELOW to match how you actually work. It is written to be accurate for the site
// as it stands, but it is not legal advice, and if you take on staff, start storing files or work
// with partners abroad it is worth having a lawyer read it once.
// ---------------------------------------------------------------------------------------------

const LAST_UPDATED = '22 August 2026'

export default function Legal({ which }) {
  const page = which === 'terms' ? TERMS : PRIVACY

  useSeo(page.title, page.description, {
    path: page.path,
    jsonLd: graph(
      { '@type': 'WebPage', name: page.title, description: page.description }
    ),
  })

  return (
    <div>
      <section className="px-5 sm:px-8 lg:px-12 pt-6 pb-5 lg:pt-12 bg-gradient-to-b from-[#F6F9FE] to-white">
        <Container className="lg:max-w-3xl">
          <h1 className="font-display font-bold text-[26px] sm:text-[32px] text-navy m-0 mb-2">{page.title}</h1>
          <p className="text-[13px] text-mist m-0">Last updated {LAST_UPDATED}</p>
        </Container>
      </section>

      <section className="px-5 sm:px-8 lg:px-12 pt-6 pb-10 lg:pb-16">
        <Container className="lg:max-w-3xl">
          {page.sections.map((s, i) => (
            <div key={i} className="mb-6">
              <h2 className="font-display font-semibold text-[18px] sm:text-[20px] text-navy m-0 mb-2.5">{s.h}</h2>
              {s.p?.map((para, j) => (
                <p key={j} className="text-[14.5px] leading-[1.75] text-ink m-0 mb-3">
                  {para}
                </p>
              ))}
              {s.ul && (
                <ul className="m-0 mb-3 pl-0 list-none flex flex-col gap-2">
                  {s.ul.map((li, j) => (
                    <li key={j} className="flex gap-2.5 text-[14.5px] leading-[1.7] text-ink">
                      <span className="mt-[9px] w-1.5 h-1.5 rounded-full bg-royal shrink-0" />
                      <span>{li}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <div className="rounded-[16px] border border-[#E3EBF8] bg-[#F4F8FE] p-5">
            <h2 className="font-display font-semibold text-[16px] text-navy m-0 mb-1.5">Questions about this page</h2>
            <p className="text-[14px] leading-relaxed m-0 mb-2">
              Email{' '}
              <a href={`mailto:${CONTACT.email}`} className="text-royal font-medium">
                {CONTACT.email}
              </a>{' '}
              or message us on{' '}
              <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="text-royal font-medium">
                WhatsApp
              </a>
              . We answer every message about data or fees personally.
            </p>
            <Link to="/contact" className="text-[13.5px] font-semibold text-royal">
              Contact us →
            </Link>
          </div>
        </Container>
      </section>
    </div>
  )
}

const PRIVACY = {
  title: 'Privacy Policy',
  path: '/privacy',
  description:
    'What VL Study Abroad Consultants collects when you fill in a form, what we do with it, how long we keep it and how to have it deleted.',
  sections: [
    {
      h: 'The short version',
      p: [
        `${BRAND.fullName} collects the details you type into a form on this site so that a counsellor can reply to you. We do not sell your details, we do not pass them to anyone who is not working on your application, and if you ask us to delete them we delete them.`,
      ],
    },
    {
      h: 'What we collect',
      p: ['Only what you type in, which depending on the form is:'],
      ul: [
        'Your name, email address and phone or WhatsApp number.',
        'Your current qualification, your preferred country, intake and programme.',
        'Anything you choose to write in a message or notes field.',
        'For a booking, the date and time you selected.',
      ],
      // eslint-disable-next-line
    },
    {
      h: 'What we do not collect',
      ul: [
        'We do not ask for your passport number, CNIC, bank details or any payment information through this website.',
        'This site does not run advertising trackers or profiling cookies.',
        'We do not collect anything at all if you simply read the site without submitting a form.',
      ],
      p: [
        'If anyone contacts you claiming to be us and asks for a bank transfer or a card number through a web form, it is not us. Speak to us on the number listed on the contact page before paying anything.',
      ],
    },
    {
      h: 'Where it goes',
      p: [
        'When you submit a form, the details are sent to our own email inbox so a counsellor can read them and reply. They are held in that email account and, for students who become clients, in our own working records for the application.',
        'The site is hosted with a commercial hosting provider, and the form submission is delivered by email. Those providers process the message in order to deliver it, in the same way any email provider does.',
      ],
    },
    {
      h: 'How long we keep it',
      p: [
        'If you enquire and do not go ahead, we keep your enquiry while it is still useful to you, since students often come back a year later for the next intake, and delete it on request at any time.',
        'If you become a client, we keep the records connected to your application for as long as we are working on it and for a reasonable period afterwards, because questions about a visa or an enrolment can come back months later.',
      ],
    },
    {
      h: 'Your choices',
      ul: [
        'You can ask us what we hold about you, and we will tell you.',
        'You can ask us to correct anything that is wrong.',
        'You can ask us to delete your details, and we will, unless we are in the middle of an application you have asked us to run.',
        'You can ask us to stop contacting you, and we will stop.',
      ],
      p: ['Email us and say what you want. There is no form to fill in for this.'],
    },
    {
      h: 'Photographs and success stories',
      p: [
        'The quotes on this site come from students we have worked with. The portraits beside them are illustrations, not photographs of those students, so that nobody is identifiable from a picture they did not agree to. If a student agrees to appear with their real name and photograph, we ask them in writing first and they can withdraw at any time.',
      ],
    },
    {
      h: 'Children',
      p: [
        'This site is aimed at students applying to university. If you are under 18, please go through the enquiry with a parent or guardian, since they will need to be involved in the funding and the visa file anyway.',
      ],
    },
    {
      h: 'Changes',
      p: [
        'If this policy changes we will update the date at the top. This is a plain description of how we work rather than a legal document drafted by a lawyer, and it is not legal advice.',
      ],
    },
  ],
}

const TERMS = {
  title: 'Terms of Use',
  path: '/terms',
  description:
    'The terms for using the VL Study Abroad Consultants website: what our guidance is and is not, no guarantee of admission or visa, and how fees are agreed.',
  sections: [
    {
      h: 'What this website is',
      p: [
        `This site describes the services of ${BRAND.fullName} and gives general guidance to students applying to universities in Italy and France from Pakistan. Using the site does not create a contract between us. That happens separately, in writing, when you engage us for a specific piece of work.`,
      ],
    },
    {
      h: 'Guidance, not a decision',
      p: [
        'Nothing on this site is legal or immigration advice, and we are not a law firm. Admission decisions are made by universities. Visa decisions are made by embassies and consulates. Scholarship decisions are made by the awarding bodies. We prepare, advise and represent you as well as we can, and none of us can decide those outcomes.',
        'For that reason we do not guarantee admission, a scholarship or a visa, and we would ask you to be careful with any consultant who does.',
      ],
    },
    {
      h: 'Accuracy and dates',
      p: [
        'Fees, deadlines, scholarship amounts and visa requirements change, sometimes in the middle of an application cycle. We keep the pages here current as best we can and mark when guides were last updated, but before you rely on any figure for a decision, confirm it against the university, the embassy or the awarding body for your own intake year. Where a page names a specific amount, treat it as a guide rather than a promise.',
      ],
    },
    {
      h: 'Fees and refunds',
      p: [
        'Our fees, what they cover and when they are payable are agreed with you directly before any paid work begins, in writing, along with the refund position. Nothing is charged through this website, and we will never ask for card details or a bank transfer through a web form.',
      ],
    },
    {
      h: 'What we ask of you',
      ul: [
        'Give us accurate information and genuine documents. We will not submit anything we believe to be false, and doing so puts your own future travel at risk far more than it puts ours.',
        'Meet the deadlines we give you, since most of them belong to somebody else and cannot be moved.',
        'Tell us promptly if your circumstances, funding or plans change.',
      ],
    },
    {
      h: 'Other websites',
      p: [
        'This site links to university, government and embassy pages so you can check things at the source. We do not control those sites and are not responsible for their content, though we would rather you checked them than took our word for it.',
      ],
    },
    {
      h: 'The content on this site',
      p: [
        'The text, guides and design here are our own work. You are welcome to read, print and share links to any of it. Please do not republish whole articles as your own; a link back is always fine and always welcome.',
      ],
    },
    {
      h: 'Law',
      p: [
        'These terms are governed by the law of Pakistan. If something here does not match what we agreed with you in writing for your own case, the written agreement is what counts.',
      ],
    },
  ],
}
