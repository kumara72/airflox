import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-14">
      <h1 className="font-display text-3xl font-semibold text-[var(--ink)] mb-6">Built by people who've been on the roof.</h1>
      <div className="space-y-5 text-[var(--charcoal)] leading-relaxed">
        <p>
          Airflox started with a simple frustration: finding the right igniter, capacitor, or control board
          shouldn't take longer than the repair itself. We stock the parts that keep furnaces, AC units,
          and water heaters running — organized the way a technician actually thinks about a job, not the way
          a warehouse happens to be shelved.
        </p>
        <p>
          Right now, every order starts as a quote. Build your list, tell us what you need, and a real person
          on our team confirms stock, pricing, and delivery before anything is finalized. No card details,
          no guesswork — just a straight answer, fast.
        </p>
        <p>
          As we grow, online checkout and contractor accounts are next. For now, we'd rather get the basics
          right: accurate specs, honest stock counts, and a team that picks up the phone.
        </p>
      </div>
      <Link to="/contact" className="inline-block mt-8 bg-[var(--ink)] text-white px-6 py-3 rounded-md font-medium hover:bg-[var(--teal-dark)] transition-colors">
        Talk to the Team
      </Link>
    </div>
  )
}
