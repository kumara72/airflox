import { useSearchParams, Link } from 'react-router-dom'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'

export default function SearchResults() {
  const [params] = useSearchParams()
  const q = (params.get('q') || '').toLowerCase().trim()

  const results = q
    ? products.filter((p) => [p.name, p.sku, p.brand, p.category].some((f) => f.toLowerCase().includes(q)))
    : []

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="font-display text-2xl font-semibold text-[var(--ink)] mb-1">Search results for "{q}"</h1>
      <p className="text-[var(--steel)] text-sm mb-8">{results.length} part{results.length !== 1 ? 's' : ''} found</p>

      {results.length === 0 ? (
        <div className="border border-dashed border-[var(--steel-light)] rounded-lg p-12 text-center text-[var(--steel)]">
          No matches in our current catalog. <Link to="/contact" className="text-[var(--teal-dark)] font-medium hover:underline">Send us the part number</Link> and we'll try to source it.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  )
}
