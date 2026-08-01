import { useState } from 'react'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

const FORM_ENDPOINT = 'https://formspree.io/f/xgogjwbl'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState('idle')

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="font-display text-2xl md:text-3xl font-semibold text-[var(--ink)] mb-2">Request a Quote / Get in Touch</h1>
      <p className="text-[var(--steel)] text-sm mb-10 max-w-2xl">
        Have a part number, a job spec, or just need help figuring out what you need? Send us the details and a real technician will follow up —
        we currently confirm all payments directly by phone or bank transfer once your quote is finalized.
      </p>

      <div className="grid md:grid-cols-[1fr_380px] gap-10">
        {status === 'success' ? (
          <div className="border border-[var(--steel-light)] rounded-lg bg-white p-8">
            <h2 className="font-display text-xl font-semibold text-[var(--ink)] mb-2">Message sent</h2>
            <p className="text-[var(--steel)]">Thanks for reaching out — we'll be in touch shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="border border-[var(--steel-light)] rounded-lg bg-white p-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-[var(--charcoal)]">Full name</label>
                <input required name="name" value={form.name} onChange={handleChange} className="mt-1 w-full border border-[var(--steel-light)] rounded-md px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium text-[var(--charcoal)]">Phone</label>
                <input required name="phone" value={form.phone} onChange={handleChange} className="mt-1 w-full border border-[var(--steel-light)] rounded-md px-3 py-2 text-sm" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-[var(--charcoal)]">Email</label>
              <input required type="email" name="email" value={form.email} onChange={handleChange} className="mt-1 w-full border border-[var(--steel-light)] rounded-md px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium text-[var(--charcoal)]">What do you need?</label>
              <textarea required name="message" value={form.message} onChange={handleChange} rows={5} className="mt-1 w-full border border-[var(--steel-light)] rounded-md px-3 py-2 text-sm" placeholder="Part number, model, quantity, or a description of the job…" />
            </div>
            <button type="submit" disabled={status === 'sending'} className="bg-[var(--signal)] hover:opacity-90 text-white font-medium px-6 py-3 rounded-md transition-opacity disabled:opacity-60">
              {status === 'sending' ? 'Sending…' : 'Send Message'}
            </button>
            {status === 'error' && (
              <p className="text-sm text-red-600">
                Couldn't send automatically — please call or email us directly using the details alongside this form.
              </p>
            )}
          </form>
        )}

        <div className="space-y-5">
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-[var(--teal-dark)] mt-0.5" />
            <div>
              <p className="font-medium text-[var(--charcoal)]">Call us</p>
              <a href="tel:+919311617600" className="text-sm text-[var(--steel)]">+91 9311617600</a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-[var(--teal-dark)] mt-0.5" />
            <div>
              <p className="font-medium text-[var(--charcoal)]">Email us</p>
              <a href="mailto:vivek@airflox.in" className="text-sm text-[var(--steel)]">vivek@airflox.in</a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-[var(--teal-dark)] mt-0.5" />
            <div>
              <p className="font-medium text-[var(--charcoal)]">Warehouse</p>
              <p className="text-sm text-[var(--steel)]">Shop No. 11, Amrit Plaza, KHS-652,<br /> Bisrakh Jalalpur, Greater Noida, <br /> Gautam Buddha Nagar, Uttar Pradesh – 201306, India</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-[var(--teal-dark)] mt-0.5" />
            <div>
              <p className="font-medium text-[var(--charcoal)]">Hours</p>
              <p className="text-sm text-[var(--steel)]">Mon–Sat, 9:00 AM – 7:00 PM IST</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
