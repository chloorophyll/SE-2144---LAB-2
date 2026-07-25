<<<<<<< Updated upstream
import { StoreProvider } from './context/StoreContext';
import { CartDrawer } from './components/CartDrawer';
import { useStore } from './context/StoreContext';

function TestButton() {
  const { dispatch } = useStore();

  const fakeProduct = {
    id: 'test-1',
    name: 'Test Keyboard',
    category: 'Keyboards',
    price: 49.99,
    image: '',
    inStock: true,
  };

  return (
    <>
      <button onClick={() => dispatch({ type: 'TOGGLE_CART' })}>Open Cart</button>
      <button onClick={() => dispatch({ type: 'ADD_TO_CART', payload: fakeProduct })}>
        Add Test Product
      </button>
=======
import { useMemo } from 'react'
import './App.css'
import { ProductFilters } from './components/ProductFilters'
import { ProductGrid } from './components/ProductGrid'
import { StoreProvider } from './context/StoreContext'
import { useStore } from './context/useStore'
import type { Product, State } from './types'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

function getFilteredProducts(products: Product[], filters: State['filters']) {
  const searchQuery = filters.searchQuery.trim().toLowerCase()

  return [...products]
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery)
      const matchesCategory =
        filters.category === 'All' || product.category === filters.category
      const matchesPrice = product.price <= filters.maxPrice

      return matchesSearch && matchesCategory && matchesPrice
    })
    .sort((firstProduct, secondProduct) => {
      if (filters.sortBy === 'price-asc') {
        return firstProduct.price - secondProduct.price
      }

      if (filters.sortBy === 'price-desc') {
        return secondProduct.price - firstProduct.price
      }

      if (filters.sortBy === 'title') {
        return firstProduct.name.localeCompare(secondProduct.name)
      }

      return 0
    })
}

function CartDrawer() {
  const { state, dispatch } = useStore()
  const subtotal = state.cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )

  if (!state.isCartOpen) {
    return null
  }

  return (
    <div className="cart-overlay" role="presentation">
      <aside className="cart-drawer" aria-label="Shopping cart">
        <div className="cart-header">
          <div>
            <p className="eyebrow">Cart</p>
            <h2>Your picks</h2>
          </div>
          <button
            type="button"
            className="icon-button"
            aria-label="Close cart"
            onClick={() => dispatch({ type: 'CLOSE_CART' })}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18.3 5.7 12 12l6.3 6.3-1.4 1.4-6.3-6.3-6.3 6.3-1.4-1.4L9.2 12 2.9 5.7l1.4-1.4 6.3 6.3 6.3-6.3 1.4 1.4Z" />
            </svg>
          </button>
        </div>

        {state.cart.length > 0 ? (
          <>
            <ul className="cart-items">
              {state.cart.map((item) => (
                <li key={item.id}>
                  <img src={item.image} alt="" />
                  <div>
                    <h3>{item.name}</h3>
                    <p>{currencyFormatter.format(item.price)}</p>
                    <div className="quantity-controls">
                      <button
                        type="button"
                        aria-label={`Decrease ${item.name} quantity`}
                        onClick={() =>
                          dispatch({
                            type: 'DECREASE_CART_QUANTITY',
                            payload: item.id,
                          })
                        }
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        aria-label={`Increase ${item.name} quantity`}
                        onClick={() =>
                          dispatch({
                            type: 'INCREASE_CART_QUANTITY',
                            payload: item.id,
                          })
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="remove-button"
                    onClick={() =>
                      dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })
                    }
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="cart-total">
              <span>Subtotal</span>
              <strong>{currencyFormatter.format(subtotal)}</strong>
            </div>
          </>
        ) : (
          <div className="empty-cart">
            <h3>Your cart is empty</h3>
            <p>Add an in-stock accessory to see it here.</p>
          </div>
        )}
      </aside>
    </div>
  )
}

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
            onClick={() => dispatch({ type: 'OPEN_CART' })}
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
>>>>>>> Stashed changes
    </>
  );
}

function App() {
  return (
    <StoreProvider>
<<<<<<< Updated upstream
      <TestButton />
      <CartDrawer />
    </StoreProvider>
  );
}

export default App;
=======
      <GearHubApp />
    </StoreProvider>
  )
}

export default App
>>>>>>> Stashed changes
