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
    </>
  );
}

function App() {
  return (
    <StoreProvider>
      <TestButton />
      <CartDrawer />
    </StoreProvider>
  );
}

export default App;