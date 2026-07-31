import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { getProduct, getRelated } from '../data/products'
import { getCategory } from '../data/categories'
import PartIcon from '../components/PartIcon'
import ProductCard from '../components/ProductCard'
import { useQuoteCart } from '../context/QuoteCartContext'
import { Check, Minus, Plus } from 'lucide-react'

export default function Product() {
  const { id } = useParams()
  const product = getProduct(id)
  const { addItem } = useQuoteCart()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) return <Navigate to="/" replace />
  const category = getCategory(product.category)
  const related = getRelated(product)

  const handleAdd = () => {
    addItem(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="text-xs text-[var(--steel)] mb-6">
        <Link to="/" className="hover:underline">Home</Link> / <Link to={`/category/${category.slug}`} className="hover:underline">{category.name}</Link> / <span className="text-[var(--charcoal)]">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="bg-white border border-[var(--steel-light)] rounded-xl aspect-square flex items-center justify-center text-[var(--ink)]">
          <PartIcon name={product.icon} className="w-40 h-40" />
        </div>

        <div>
          <span className="text-xs font-mono-data text-[var(--steel)]">SKU: {product.sku}</span>
          <h1 className="font-display text-2xl md:text-3xl font-semibold text-[var(--ink)] mt-1 mb-2">{product.name}</h1>
          <p className="text-sm text-[var(--steel)] mb-4">Brand: <span className="text-[var(--charcoal)] font-medium">{product.brand}</span></p>

          <div className="flex items-baseline gap-3 mb-4">
            <span className="font-display text-3xl font-semibold text-[var(--ink)]">₹{product.price.toFixed(2)}</span>
            <span className="text-sm text-[var(--steel)]">/ {product.unit}</span>
          </div>

          {product.stock > 0 ? (
            <p className="text-sm text-green-700 font-medium mb-6">✓ In stock — {product.stock} available</p>
          ) : (
            <p className="text-sm text-[var(--signal)] font-medium mb-6">Currently out of stock — request a quote to check next availability</p>
          )}

          <p className="text-[var(--charcoal)] text-sm leading-relaxed mb-6">{product.description}</p>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center border border-[var(--steel-light)] rounded-md">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-2 text-[var(--steel)] hover:text-[var(--ink)]" aria-label="Decrease quantity"><Minus className="w-4 h-4" /></button>
              <span className="px-4 font-mono-data text-sm w-10 text-center">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="px-3 py-2 text-[var(--steel)] hover:text-[var(--ink)]" aria-label="Increase quantity"><Plus className="w-4 h-4" /></button>
            </div>
            <button
              onClick={handleAdd}
              className={`flex-1 font-medium px-6 py-3 rounded-md transition-colors ${added ? 'bg-green-600 text-white' : 'bg-[var(--ink)] text-white hover:bg-[var(--teal-dark)]'}`}
            >
              {added ? <span className="flex items-center justify-center gap-2"><Check className="w-4 h-4" /> Added to Quote List</span> : 'Add to Quote List'}
            </button>
          </div>
          <p className="text-xs text-[var(--steel)]">No payment now — we'll confirm final pricing and stock when you submit your quote request.</p>

          <div className="mt-8 border-t border-[var(--steel-light)] pt-6">
            <h2 className="font-display font-semibold text-sm uppercase tracking-wide text-[var(--ink)] mb-3">Specifications</h2>
            <table className="w-full text-sm">
              <tbody>
                {Object.entries(product.specs).map(([k, v]) => (
                  <tr key={k} className="border-b border-[var(--steel-light)]">
                    <td className="py-2 pr-4 text-[var(--steel)] w-1/3">{k}</td>
                    <td className="py-2 font-mono-data text-[var(--charcoal)]">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-xl font-semibold text-[var(--ink)] mb-4">Related Parts</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  )
}
