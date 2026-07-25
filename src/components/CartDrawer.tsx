import { useStore } from '../context/StoreContext';

export function CartDrawer() {
  const { state, dispatch } = useStore();

  if (!state.isCartOpen) return null;

  return (
    <div className="cart-overlay">
      <div className="cart-overlay__backdrop" onClick={() => dispatch({ type: 'TOGGLE_CART' })} />

      <div className="cart-drawer">
        <div className="cart-drawer__header">
          <h2>Your Cart</h2>
          <button onClick={() => dispatch({ type: 'TOGGLE_CART' })}>Close</button>
        </div>
        
        <div className="cart-drawer__items">
            {state.cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                state.cart.map((item) => (
                <div key={item.id} className="cart-drawer__item">
                    <span>{item.name}</span>
                    <div>
                        <button onClick={() => dispatch({ type: 'DECREMENT_QTY', payload: { id: item.id } })}>
                            -
                        </button>
                        <span> {item.quantity} </span>
                        <button onClick={() => dispatch({ type: 'INCREMENT_QTY', payload: { id: item.id } })}>
                            +
                            </button>
                            </div>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                            <button onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: { id: item.id } })}>
                                Remove
                                </button>
                        </div>
                    ))
                )}
            </div>
      </div>
    </div>
  );
}
