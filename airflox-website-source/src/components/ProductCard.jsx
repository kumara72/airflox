import { Link } from 'react-router-dom'
import { Plus, Check } from 'lucide-react'
import { useState } from 'react'
import PartIcon from './PartIcon'
import { useQuoteCart } from '../context/QuoteCartContext'

export default function ProductCard({ product }) {
  const { addItem } = useQuoteCart()
  const [added, setAdded] = useState(false)

  const handleAdd = (e) => {
    e.preventDefault()
    addItem(product, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <Link to={`/product/${product.id}`} className="group border border-[var(--steel-light)] rounded-lg bg-white p-4 flex flex-col hover:shadow-md hover:border-[var(--teal)] transition-all">
      <div className="aspect-square bg-[var(--paper)] rounded-md flex items-center justify-center mb-3 text-[var(--ink)] group-hover:text-[var(--teal-dark)] transition-colors">
        <PartIcon name={product.icon} className="w-16 h-16" />
      </div>
      <span className="text-xs font-mono-data text-[var(--steel)] mb-1">{product.sku}</span>
      <h3 className="text-sm font-medium text-[var(--charcoal)] line-clamp-2 mb-1 min-h-[2.5rem]">{product.name}</h3>
      <span className="text-xs text-[var(--steel)] mb-2">{product.brand}</span>
      <div className="mt-auto flex items-center justify-between">
        <span className="font-display font-semibold text-[var(--ink)]">₹{product.price.toFixed(2)}</span>
        <button
          onClick={handleAdd}
          className={`text-xs font-medium px-3 py-1.5 rounded-md flex items-center gap-1 transition-colors ${
            added ? 'bg-green-600 text-white' : 'bg-[var(--ink)] text-white hover:bg-[var(--teal-dark)]'
          }`}
        >
          {added ? <><Check className="w-3.5 h-3.5" /> Added</> : <><Plus className="w-3.5 h-3.5" /> Quote</>}
        </button>
      </div>
      {product.stock < 15 && (
        <span className="mt-2 text-[11px] text-[var(--signal)] font-medium">Only {product.stock} left in stock</span>
      )}
    </Link>
  )
}
