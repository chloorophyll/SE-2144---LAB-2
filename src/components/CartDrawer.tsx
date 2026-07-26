import { useStore } from '../context/useStore'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'PHP',
})

export function CartDrawer() {
  const { state, dispatch } = useStore()
  const subtotal = state.cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )

  if (!state.isCartOpen) return null

  return (
    <div className="cart-overlay">
      <button
        type="button"
        className="cart-backdrop"
        aria-label="Close cart"
        onClick={() => dispatch({ type: 'TOGGLE_CART', payload: false })}
      />

      <aside className="cart-drawer" aria-label="Shopping cart" aria-modal="true">
        <div className="cart-header">
          <div>
            <p className="eyebrow">Cart</p>
            <h2>Your picks</h2>
          </div>
          <button
            type="button"
            className="icon-button"
            aria-label="Close cart"
            onClick={() => dispatch({ type: 'TOGGLE_CART', payload: false })}
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
                            type: 'UPDATE_QUANTITY',
                            payload: {
                              id: item.id,
                              quantity: item.quantity - 1,
                            },
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
                            type: 'UPDATE_QUANTITY',
                            payload: {
                              id: item.id,
                              quantity: item.quantity + 1,
                            },
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

            <div className="cart-summary">
              <div className="cart-total">
                <span>Subtotal</span>
                <strong>{currencyFormatter.format(subtotal)}</strong>
              </div>
              <div className="cart-total grand-total">
                <span>Grand total</span>
                <strong>{currencyFormatter.format(subtotal)}</strong>
              </div>
              <button
                type="button"
                className="checkout-button"
                onClick={() => dispatch({ type: 'CLEAR_CART' })}
              >
                Checkout
              </button>
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
