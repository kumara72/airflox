import { Link } from 'react-router-dom'
import { categories } from '../data/categories'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[var(--ink-2)] text-[#B9C6D1] mt-20">
  <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
    <div className="col-span-2 md:col-span-1">
      <div className="flex items-center gap-3 mb-4">
        <img src="/logo.png" alt="Airflox logo" className="w-14 h-14 rounded-lg shadow-md" />
        <span className="font-display font-semibold text-white text-xl">airflox</span>
      </div>
      <p className="text-sm text-[var(--steel)]">
        Airflox is a supplier of HVAC parts and supplies for professionals and homeowners across India. We provide a wide range of products including furnaces, air conditioners, ductwork, thermostats, water heaters, and tools.
      </p>
    </div>

        <div>
          <h3 className="text-white font-display text-sm font-semibold mb-3 uppercase tracking-wide">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-white transition-colors">About Airflox</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Request a Quote</Link></li>
            <li><Link to="/quote-cart" className="hover:text-white transition-colors">My Quote List</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-display text-sm font-semibold mb-3 uppercase tracking-wide">Get in Touch</h3>
          <ul className="space-y-2.5 text-sm">
            <li className="flex items-start gap-2"><Phone className="w-4 h-4 mt-0.5 shrink-0" /> +91-93116176000</li>
            <li className="flex items-start gap-2"><Mail className="w-4 h-4 mt-0.5 shrink-0" /> vivek@airflox.in</li>
            <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0" /> Greater Noida, Uttar Pradesh – 201306, India</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 text-xs flex flex-col sm:flex-row gap-2 sm:justify-between">
          <span>© {new Date().getFullYear()} Airflox. All rights reserved.</span>
          <span>Prices shown are indicative — final pricing confirmed on quote.</span>
        </div>
      </div>
    </footer>
  )
}
