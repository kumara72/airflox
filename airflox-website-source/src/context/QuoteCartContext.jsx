import { createContext, useContext, useEffect, useState } from 'react'

const QuoteCartContext = createContext(null)
const STORAGE_KEY = 'airflox_quote_cart_v1'

export function QuoteCartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // storage unavailable — fail silently, cart just won't persist
    }
  }, [items])

  const addItem = (product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id)
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + qty } : i))
      }
      return [...prev, { id: product.id, sku: product.sku, name: product.name, price: product.price, unit: product.unit, qty }]
    })
  }

  const updateQty = (id, qty) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i)).filter((i) => i.qty > 0))
  }

  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id))
  const clearCart = () => setItems([])

  const count = items.reduce((sum, i) => sum + i.qty, 0)
  const subtotal = items.reduce((sum, i) => sum + i.qty * i.price, 0)

  return (
    <QuoteCartContext.Provider value={{ items, addItem, updateQty, removeItem, clearCart, count, subtotal }}>
      {children}
    </QuoteCartContext.Provider>
  )
}

export function useQuoteCart() {
  const ctx = useContext(QuoteCartContext)
  if (!ctx) throw new Error('useQuoteCart must be used within QuoteCartProvider')
  return ctx
}
