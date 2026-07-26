# GearHub Mini E-Commerce

GearHub is a single-page React app for browsing tech accessories, filtering
products, adding items to a cart, and previewing the cart subtotal.
It is frontend-only: product data comes from a static JSON file, with no backend,
APIs, or database required.

## Product Browsing & Filtering

- Product cards render from `src/data/products.json`.
- Products can be filtered by search query, category, and max price.
- Products can be sorted by featured order, price low-to-high, price high-to-low,
  or title.
- The cart badge counts total item quantity.
- The cart drawer supports add, remove, quantity updates, subtotal, grand total,
  and a simulated checkout that clears the cart.

## Run Locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite in your browser.

## Build

```bash
npm run build
```
