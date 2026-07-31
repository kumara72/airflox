import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <h1 className="font-display text-4xl font-semibold text-[var(--ink)] mb-3">404</h1>
      <p className="text-[var(--steel)] mb-6">This duct run doesn't lead anywhere — the page you're looking for isn't here.</p>
      <Link to="/" className="inline-block bg-[var(--ink)] text-white px-6 py-3 rounded-md font-medium hover:bg-[var(--teal-dark)] transition-colors">
        Back to Home
      </Link>
    </div>
  )
}
