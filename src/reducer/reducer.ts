import type { State, Product } from '../types';

export type Action =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: { id: string } }
  | { type: 'INCREMENT_QTY'; payload: { id: string } }
  | { type: 'DECREMENT_QTY'; payload: { id: string } }
  | { type: 'TOGGLE_CART' }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_CATEGORY'; payload: string }
  | { type: 'SET_MAX_PRICE'; payload: number }
  | { type: 'SET_SORT_BY'; payload: State['filters']['sortBy'] };

  export function cartReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existing = state.cart.find((item) => item.id === action.payload.id);

      if (existing) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      }

      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };

    case 'INCREMENT_QTY':
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };

    case 'DECREMENT_QTY':
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0),
      };

    case 'TOGGLE_CART':
      return { ...state, isCartOpen: !state.isCartOpen };

    case 'SET_SEARCH_QUERY':
      return { ...state, filters: { ...state.filters, searchQuery: action.payload } };

    case 'SET_CATEGORY':
      return { ...state, filters: { ...state.filters, category: action.payload } };

    case 'SET_MAX_PRICE':
      return { ...state, filters: { ...state.filters, maxPrice: action.payload } };

    case 'SET_SORT_BY':
      return { ...state, filters: { ...state.filters, sortBy: action.payload } };

    default:
      return state;
  }
} 