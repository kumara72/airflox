import { useMemo, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { getCategory, categories } from '../data/categories'
import { getProductsByCategory } from '../data/products'
import ProductCard from '../components/ProductCard'
import PartIcon from '../components/PartIcon'

export default function Category() {
  const { slug } = useParams()
  const category = getCategory(slug)
  const allProducts = useMemo(() => getProductsByCategory(slug), [slug])

  const brands = useMemo(() => [...new Set(allProducts.map((p) => p.brand))].sort(), [allProducts])
  const [activeBrands, setActiveBrands] = useState([])
  const [sort, setSort] = useState('relevance')
  const [inStockOnly, setInStockOnly] = useState(false)

  if (!category) return <Navigate to="/" replace />

  const toggleBrand = (b) => {
    setActiveBrands((prev) => (prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]))
  }

  let list = allProducts.filter((p) => (activeBrands.length ? activeBrands.includes(p.brand) : true))
  if (inStockOnly) list = list.filter((p) => p.stock > 0)
  if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price)
  if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="text-xs text-[var(--steel)] mb-4">
        <Link to="/" className="hover:underline">Home</Link> / <span className="text-[var(--charcoal)]">{category.name}</span>
      </nav>

      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-md bg-white border border-[var(--steel-light)] flex items-center justify-center text-[var(--ink)] shrink-0">
          <PartIcon name={category.icon} className="w-8 h-8" />
        </div>
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-semibold text-[var(--ink)]">{category.name}</h1>
          <p className="text-[var(--steel)] text-sm">{category.blurb}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[240px_1fr] gap-8">
        <aside className="space-y-6">
          <div>
            <h3 className="font-display font-semibold text-sm uppercase tracking-wide text-[var(--ink)] mb-3">Brand</h3>
            <ul className="space-y-2 text-sm">
              {brands.map((b) => (
                <li key={b}>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={activeBrands.includes(b)} onChange={() => toggleBrand(b)} className="accent-[var(--teal)]" />
                    {b}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display font-semibold text-sm uppercase tracking-wide text-[var(--ink)] mb-3">Availability</h3>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} className="accent-[var(--teal)]" />
              In stock only
            </label>
          </div>
          <div>
            <h3 className="font-display font-semibold text-sm uppercase tracking-wide text-[var(--ink)] mb-3">Other Categories</h3>
            <ul className="space-y-2 text-sm">
              {categories.filter((c) => c.slug !== slug).map((c) => (
                <li key={c.slug}><Link to={`/category/${c.slug}`} className="text-[var(--teal-dark)] hover:underline">{c.name}</Link></li>
              ))}
            </ul>
          </div>
        </aside>

        <div>
          <div className="flex items-center justify-between mb-4 text-sm">
            <span className="text-[var(--steel)]">{list.length} result{list.length !== 1 ? 's' : ''}</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="border border-[var(--steel-light)] rounded-md px-3 py-1.5 text-sm bg-white">
              <option value="relevance">Sort: Relevance</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          {list.length === 0 ? (
            <div className="border border-dashed border-[var(--steel-light)] rounded-lg p-12 text-center text-[var(--steel)]">
              No parts match those filters. Try clearing a filter above, or send us the part number — we'll source it.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {list.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
