import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Phone, ClipboardList, Menu, X } from 'lucide-react'
import { categories } from '../data/categories'
import { useQuoteCart } from '../context/QuoteCartContext'

export default function Header() {
  const [query, setQuery] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [catOpen, setCatOpen] = useState(false)
  const { count } = useQuoteCart()
  const navigate = useNavigate()

  const submitSearch = (e) => {
    e.preventDefault()
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <header className="sticky top-0 z-50">
      {/* top strip */}
      <div className="bg-[var(--ink-2)] text-[#B9C6D1] text-xs">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between">
          <span className="hidden sm:block">Serving HVAC pros & homeowners across India</span>
          <a href="tel:+919311617600" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Phone className="w-3.5 h-3.5" /> +919311617600
          </a>
        </div>
      </div>

      {/* main bar */}
      <div className="bg-[var(--ink)] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          <button className="lg:hidden text-white" onClick={() => setMobileOpen((v) => !v)} aria-label="Toggle menu">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src="/logo.png" alt="Airflox logo" className="w-8 h-8" />
          </Link>

          <form onSubmit={submitSearch} className="hidden md:flex flex-1 max-w-2xl">
            <div className="flex w-full bg-white rounded-md overflow-hidden">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="Search part name, SKU, or brand…"
                className="flex-1 px-4 py-2 text-sm text-[var(--charcoal)] outline-none"
              />
              <button type="submit" className="px-4 bg-[var(--teal)] hover:bg-[var(--teal-dark)] transition-colors text-white" aria-label="Search">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="flex items-center gap-4 ml-auto">
            <Link to="/quote-cart" className="relative flex items-center gap-2 text-white text-sm">
              <ClipboardList className="w-6 h-6" />
              <span className="hidden sm:inline">Quote List</span>
              {count > 0 && (
                <span className="absolute -top-2 -right-2 sm:static sm:ml-0 bg-[var(--signal)] text-white text-[11px] font-mono-data rounded-full w-5 h-5 flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>

        <form onSubmit={submitSearch} className="md:hidden px-4 pb-3">
          <div className="flex w-full bg-white rounded-md overflow-hidden">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search parts…"
              className="flex-1 px-4 py-2 text-sm outline-none"
            />
            <button type="submit" className="px-4 bg-[var(--teal)] text-white" aria-label="Search"><Search className="w-4 h-4" /></button>
          </div>
        </form>
      </div>

      {/* category nav */}
      <nav className="hidden lg:block bg-white border-b border-[var(--steel-light)]">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center gap-6 text-sm font-medium text-[var(--ink)]">
            <li className="relative py-3">
              <button
                onMouseEnter={() => setCatOpen(true)}
                onMouseLeave={() => setCatOpen(false)}
                className="flex items-center gap-1 hover:text-[var(--teal-dark)]"
              >
                All Categories
              </button>
              {catOpen && (
                <div
                  onMouseEnter={() => setCatOpen(true)}
                  onMouseLeave={() => setCatOpen(false)}
                  className="absolute top-full left-0 bg-white shadow-xl border border-[var(--steel-light)] rounded-md w-72 py-2 z-50"
                >
                  {categories.map((c) => (
                    <Link key={c.slug} to={`/category/${c.slug}`} className="block px-4 py-2 hover:bg-[var(--paper)] text-[var(--charcoal)]">
                      {c.name}
                    </Link>
                  ))}
                </div>
              )}
            </li>
            {categories.slice(0, 5).map((c) => (
              <li key={c.slug} className="py-3">
                <Link to={`/category/${c.slug}`} className="hover:text-[var(--teal-dark)]">{c.name}</Link>
              </li>
            ))}
            <li className="py-3 ml-auto">
              <Link to="/contact" className="text-[var(--signal)] hover:underline">Request a Quote →</Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-b border-[var(--steel-light)] px-4 py-3">
          <ul className="space-y-1">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link to={`/category/${c.slug}`} onClick={() => setMobileOpen(false)} className="block py-2 text-sm text-[var(--ink)] border-b border-[var(--steel-light)]">
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/contact" onClick={() => setMobileOpen(false)} className="block py-2 text-sm text-[var(--signal)] font-medium">
                Request a Quote →
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
