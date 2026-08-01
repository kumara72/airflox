import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2, ClipboardList } from 'lucide-react'
import { useQuoteCart } from '../context/QuoteCartContext'

// Replace this with your own Formspree endpoint (https://formspree.io) —
// free tier works fine for a low-volume quote inbox. See README for setup.
const FORM_ENDPOINT = 'https://formspree.io/f/xgogjwbl'

export default function QuoteCart() {
  const { items, updateQty, removeItem, subtotal, clearCart } = useQuoteCart()
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', notes: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (items.length === 0) return
    setStatus('sending')

    const payload = {
      ...form,
      items: items.map((i) => `${i.qty} x ${i.sku} — ${i.name} (₹${i.price}/${i.unit})`).join('\n'),
      estimated_subtotal: `₹${subtotal.toFixed(2)}`,
    }

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        setStatus('success')
        clearCart()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-semibold text-[var(--ink)] mb-3">Quote request received</h1>
        <p className="text-[var(--steel)] mb-6">
          Thanks{form.name ? `, ${form.name}` : ''} — our team will confirm pricing and stock and get back to you by phone or email shortly.
          For anything urgent, call us directly at <a href="tel:+919311617600" className="text-[var(--teal-dark)] font-medium">+91 11 4000 0000</a>.
        </p>
        <Link to="/" className="inline-block bg-[var(--ink)] text-white px-6 py-3 rounded-md font-medium hover:bg-[var(--teal-dark)] transition-colors">
          Back to Home
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="font-display text-2xl md:text-3xl font-semibold text-[var(--ink)] mb-2 flex items-center gap-3">
        <ClipboardList className="w-7 h-7 text-[var(--teal-dark)]" /> My Quote List
      </h1>
      <p className="text-[var(--steel)] text-sm mb-8">
        This isn't a payment cart — build your list, tell us a bit about yourself, and we'll follow up with final pricing and availability.
      </p>

      {items.length === 0 ? (
        <div className="border border-dashed border-[var(--steel-light)] rounded-lg p-12 text-center">
          <p className="text-[var(--steel)] mb-4">Your quote list is empty.</p>
          <Link to="/" className="text-[var(--teal-dark)] font-medium hover:underline">Browse parts →</Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          <div className="space-y-3">
            {items.map((i) => (
              <div key={i.id} className="flex items-center gap-4 border border-[var(--steel-light)] rounded-lg bg-white p-4">
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-mono-data text-[var(--steel)]">{i.sku}</span>
                  <p className="font-medium text-[var(--charcoal)] truncate">{i.name}</p>
                  <span className="text-sm text-[var(--steel)]">₹{i.price.toFixed(2)} / {i.unit}</span>
                </div>
                <div className="flex items-center border border-[var(--steel-light)] rounded-md shrink-0">
                  <button onClick={() => updateQty(i.id, i.qty - 1)} className="px-2 py-1.5 text-[var(--steel)] hover:text-[var(--ink)]" aria-label="Decrease"><Minus className="w-3.5 h-3.5" /></button>
                  <span className="px-3 font-mono-data text-sm">{i.qty}</span>
                  <button onClick={() => updateQty(i.id, i.qty + 1)} className="px-2 py-1.5 text-[var(--steel)] hover:text-[var(--ink)]" aria-label="Increase"><Plus className="w-3.5 h-3.5" /></button>
                </div>
                <span className="font-mono-data text-sm w-20 text-right shrink-0">₹{(i.price * i.qty).toFixed(2)}</span>
                <button onClick={() => removeItem(i.id)} className="text-[var(--steel)] hover:text-[var(--signal)] shrink-0" aria-label={`Remove ${i.name}`}>
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <div className="flex justify-between border-t border-[var(--steel-light)] pt-4 text-sm">
              <span className="text-[var(--steel)]">Estimated subtotal (confirmed on quote)</span>
              <span className="font-display font-semibold text-[var(--ink)]">₹{subtotal.toFixed(2)}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white border border-[var(--steel-light)] rounded-lg p-6 h-fit space-y-4">
            <h2 className="font-display font-semibold text-[var(--ink)]">Send this as a quote request</h2>
            <div>
              <label className="text-sm font-medium text-[var(--charcoal)]">Full name</label>
              <input required name="name" value={form.name} onChange={handleChange} className="mt-1 w-full border border-[var(--steel-light)] rounded-md px-3 py-2 text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-[var(--charcoal)]">Email</label>
                <input required type="email" name="email" value={form.email} onChange={handleChange} className="mt-1 w-full border border-[var(--steel-light)] rounded-md px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium text-[var(--charcoal)]">Phone</label>
                <input required name="phone" value={form.phone} onChange={handleChange} className="mt-1 w-full border border-[var(--steel-light)] rounded-md px-3 py-2 text-sm" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-[var(--charcoal)]">Company (optional)</label>
              <input name="company" value={form.company} onChange={handleChange} className="mt-1 w-full border border-[var(--steel-light)] rounded-md px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium text-[var(--charcoal)]">Notes for our team (optional)</label>
              <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} className="mt-1 w-full border border-[var(--steel-light)] rounded-md px-3 py-2 text-sm" />
            </div>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-[var(--signal)] hover:opacity-90 text-white font-medium px-6 py-3 rounded-md transition-opacity disabled:opacity-60"
            >
              {status === 'sending' ? 'Sending…' : 'Submit Quote Request'}
            </button>
            {status === 'error' && (
              <p className="text-sm text-red-600">
                Something went wrong sending this automatically. Please call us at <a href="tel:+919311617600" className="underline">+91 11 4000 0000</a> or email <a href="mailto:hello@airflox.in" className="underline">hello@airflox.in</a> with your list.
              </p>
            )}
          </form>
        </div>
      )}
    </div>
  )
}
