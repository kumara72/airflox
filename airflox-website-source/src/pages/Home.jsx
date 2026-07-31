import { Link } from 'react-router-dom'
import { ShieldCheck, Truck, Headset, Percent } from 'lucide-react'
import { categories } from '../data/categories'
import { products } from '../data/products'
import PartIcon from '../components/PartIcon'
import ProductCard from '../components/ProductCard'
import DuctSchematic from '../components/DuctSchematic'

const featured = products.filter((p) => ['fh-001', 'ac-001', 'tc-001', 'df-002', 'wh-002', 'ts-001', 'ac-003', 'fh-003'].includes(p.id))

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[var(--ink)] blueprint-grid relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-20 grid md:grid-cols-2 gap-10 items-center relative z-10">
          <div>
            <span className="inline-block font-mono-data text-xs text-[var(--teal)] border border-[var(--teal)]/40 rounded-full px-3 py-1 mb-5">
              RUN-01 · SUPPLY CONFIRMED
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-white leading-tight mb-5">
              HVAC parts that get the airflow moving again.
            </h1>
            <p className="text-[#B9C6D1] text-base md:text-lg max-w-lg mb-8">
              Furnace, AC, ductwork, and controls — stocked and ready for pros and homeowners across India.
              Build a quote list, and our team confirms pricing and delivery in one call.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/category/furnace-heating" className="bg-[var(--teal)] hover:bg-[var(--teal-dark)] transition-colors text-white font-medium px-6 py-3 rounded-md">
                Browse Parts
              </Link>
              <Link to="/contact" className="border border-white/30 hover:border-white text-white font-medium px-6 py-3 rounded-md transition-colors">
                Request a Quote
              </Link>
            </div>
          </div>
          <div className="hidden md:block opacity-90">
            <DuctSchematic />
          </div>
        </div>
      </section>

      {/* trust bar */}
      <section className="border-b border-[var(--steel-light)] bg-white">
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
          <div className="flex items-center gap-3">
            <Truck className="w-6 h-6 text-[var(--teal-dark)] shrink-0" />
            <span>Pan-India dispatch, tracked shipping</span>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[var(--teal-dark)] shrink-0" />
            <span>Genuine parts, checked specs</span>
          </div>
          <div className="flex items-center gap-3">
            <Headset className="w-6 h-6 text-[var(--teal-dark)] shrink-0" />
            <span>Real quotes from real technicians</span>
          </div>
          <div className="flex items-center gap-3">
            <Percent className="w-6 h-6 text-[var(--teal-dark)] shrink-0" />
            <span>Contractor pricing on request</span>
          </div>
        </div>
      </section>

      {/* categories */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="flex items-end justify-between mb-6">
          <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">Shop by Category</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to={`/category/${c.slug}`}
              className="group flex items-center gap-4 border border-[var(--steel-light)] rounded-lg p-5 bg-white hover:border-[var(--teal)] hover:shadow-md transition-all"
            >
              <div className="w-14 h-14 rounded-md bg-[var(--paper)] flex items-center justify-center text-[var(--ink)] group-hover:text-[var(--teal-dark)] transition-colors shrink-0">
                <PartIcon name={c.icon} className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-medium text-[var(--charcoal)]">{c.name}</h3>
                <p className="text-sm text-[var(--steel)]">{c.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* featured products */}
      <section className="bg-white border-y border-[var(--steel-light)]">
        <div className="max-w-7xl mx-auto px-4 py-14">
          <div className="flex items-end justify-between mb-6">
            <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">Frequently Ordered</h2>
            <Link to="/category/furnace-heating" className="text-sm text-[var(--teal-dark)] font-medium hover:underline">View all →</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA split */}
      <section className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-8">
        <div className="bg-[var(--ink)] rounded-xl p-8 text-white flex flex-col justify-between">
          <div>
            <h3 className="font-display text-xl font-semibold mb-2">Running a job today?</h3>
            <p className="text-[#B9C6D1] text-sm mb-6">
              Add parts to your quote list as you diagnose. Send it to us at day's end, and we'll confirm stock and pricing before you order.
            </p>
          </div>
          <Link to="/quote-cart" className="self-start bg-[var(--teal)] hover:bg-[var(--teal-dark)] transition-colors text-white font-medium px-5 py-2.5 rounded-md">
            Go to My Quote List
          </Link>
        </div>
        <div className="bg-[var(--paper)] border border-[var(--steel-light)] rounded-xl p-8 flex flex-col justify-between">
          <div>
            <h3 className="font-display text-xl font-semibold text-[var(--ink)] mb-2">Set up contractor pricing</h3>
            <p className="text-[var(--steel)] text-sm mb-6">
              Register your business for volume pricing and priority dispatch on repeat orders.
            </p>
          </div>
          <Link to="/contact" className="self-start bg-[var(--ink)] hover:bg-[var(--teal-dark)] transition-colors text-white font-medium px-5 py-2.5 rounded-md">
            Talk to Our Team
          </Link>
        </div>
      </section>
    </div>
  )
}
