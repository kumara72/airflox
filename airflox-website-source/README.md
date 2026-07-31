# Airflox — HVAC Parts & Supplies Website

A full multi-page storefront for **airflox.in**: category browsing, product detail pages,
a "Quote List" (instead of a payment cart, since orders are inquiry/quote-based for now),
and a contact/RFQ form. Built with React + Vite + Tailwind CSS — no backend server required.

## What's included

- **Home** — hero, category grid, featured products, CTAs
- **Category pages** (`/category/:slug`) — brand filters, in-stock filter, sorting
- **Product pages** (`/product/:id`) — specs table, add to quote list
- **Quote List** (`/quote-cart`) — persists in the browser (localStorage), submits as an RFQ
- **Contact** (`/contact`) — general inquiry form
- **Search** (`/search?q=...`)
- Fully responsive, keyboard-accessible, reduced-motion friendly

Product data lives in `src/data/products.js` and `src/data/categories.js` — plain
JS arrays, easy to edit or eventually swap for a real database/API.

## 1. Run it locally

```bash
npm install
npm run dev
```

Visit the printed local URL (usually `http://localhost:5173`).

## 2. Connect the quote/contact forms (5 minutes, free)

Right now the forms post to a placeholder. To actually receive quote requests by email:

1. Go to [formspree.io](https://formspree.io) and create a free account.
2. Create a new form — Formspree gives you an endpoint like `https://formspree.io/f/abc123xy`.
3. Replace `FORM_ENDPOINT` in **two files** with your real endpoint:
   - `src/pages/QuoteCart.jsx`
   - `src/pages/Contact.jsx`
4. Rebuild (`npm run build`) and redeploy.

Formspree's free tier covers a low volume of monthly submissions and emails
each submission straight to your inbox — no backend server needed. If you outgrow
it, the same two files can be pointed at any endpoint (your own API, Zapier, etc.).

## 3. Deploy it for free (Vercel, recommended)

1. Push this folder to a GitHub repository (or use Vercel's CLI to deploy directly).
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import the repo.
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. Click **Deploy**. You'll get a live `*.vercel.app` URL in about a minute.

(Netlify works the same way if you prefer it — same build command/output folder.)

## 4. Point airflox.in at it

In Vercel: **Project → Settings → Domains → Add** → enter `airflox.in` (and `www.airflox.in`).
Vercel will show you DNS records to add. In your domain registrar's DNS settings
(wherever you bought airflox.in), add:

- An **A record** for `@` pointing to the IP Vercel gives you, **or**
- A **CNAME** for `www` pointing to `cname.vercel-dns.com` (exact value shown in your dashboard)

DNS changes can take anywhere from a few minutes to ~24 hours to propagate.
Vercel issues a free SSL certificate automatically once DNS is verified.

## 5. Editing the catalog

Add or edit products by editing `src/data/products.js` — each entry is a plain object:

```js
{ id: 'fh-001', sku: 'AFX-IG-4021', name: '...', category: 'furnace-heating',
  brand: 'TrueCore', price: 24.99, stock: 142, unit: 'each', description: '...',
  specs: { Voltage: '120V' }, icon: 'igniter' }
```

`icon` refers to a set of built-in line-art icons in `src/components/PartIcon.jsx`
(no product photography needed to launch — swap in real photos later by changing
`ProductCard.jsx` / `Product.jsx` to render an `<img>` instead of `<PartIcon>`).

## Notes on scope

- **Payments**: not wired up yet, by design — quote requests come in by form,
  and you follow up to confirm price/payment by phone or bank transfer. When you're
  ready for real online payment, Razorpay (popular in India, supports UPI/cards/netbanking)
  is a natural next step and can slot into the Quote List checkout flow.
- **Inventory**: stock counts are static demo data — update them by hand in
  `products.js` for now, or connect a spreadsheet/database later.
