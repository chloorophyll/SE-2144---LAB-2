import { useMemo } from 'react'
import './App.css'
import { ProductFilters } from './components/ProductFilters'
import { ProductGrid } from './components/ProductGrid'
import { CartDrawer } from './components/CartDrawer'
import { StoreProvider } from './context/StoreContext'
import { useStore } from './context/useStore'
import { getFilteredProducts } from './utils/getFilteredProducts'

function GearHubApp() {
  const { state, dispatch } = useStore()
  const { filters, products, cart } = state

  const filteredProducts = useMemo(
    () => getFilteredProducts(products, filters),
    [filters, products],
  )

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <>
      <main className="app-shell">
        <header className="site-header">
          <div className="header-copy">
            <p className="eyebrow">GearHub Mini E-Commerce</p>
            <h1>Shop desk-ready tech accessories.</h1>
            <p>
              Browse keyboards, audio gear, chargers, mounts, storage, and
              cables with instant filtering.
            </p>
          </div>

          <button
            type="button"
            className="cart-button"
            aria-label={`Open cart with ${cartItemCount} items`}
            onClick={() => dispatch({ type: 'TOGGLE_CART', payload: true })}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2ZM7.2 14.8h7.6c.8 0 1.6-.5 1.9-1.2L20.3 6H6.1L5.4 3H2v2h1.8l2.6 11.1c.2.5.6.9 1.2.9H19v-2H7.2ZM7 8h10.1l-2.2 4.8H8.1L7 8Z" />
            </svg>
            <span>Cart</span>
            <strong>{cartItemCount}</strong>
          </button>
        </header>

        <ProductFilters />
        <ProductGrid products={filteredProducts} totalProducts={products.length} />
      </main>

      <CartDrawer />
    </>
  )
}

function App() {
  return (
    <StoreProvider>
      <GearHubApp />
    </StoreProvider>
  )
}

export default App
