import { createContext, useContext, useReducer } from 'react';
import type { State } from '../types'

import productsData from '../data/products.json';

const initialState: State = {
  products: productsData,
  cart: [],
  filters: {
    searchQuery: '',
    category: 'All',
    maxPrice: 150,
    sortBy: 'default',
  },
  isCartOpen: false,
};

import { cartReducer, type Action } from '../reducer/reducer';

interface StoreContextValue {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}