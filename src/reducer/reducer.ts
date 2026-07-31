import type { Product, SortOption, State } from '../types'

export type Action =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_CATEGORY'; payload: string }
  | { type: 'SET_MAX_PRICE'; payload: number }
  | { type: 'SET_SORT'; payload: SortOption }
  | { type: 'TOGGLE_CART'; payload?: boolean }

export function storeReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_TO_CART': {
      if (!action.payload.inStock) {
        return state
      }

      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id,
      )

      return {
        ...state,
        cart: existingItem
          ? state.cart.map((item) =>
              item.id === action.payload.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            )
          : [...state.cart, { ...action.payload, quantity: 1 }],
        isCartOpen: true,
      }
    }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      }

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: action.payload.quantity }
              : item,
          )
          .filter((item) => item.quantity > 0),
      }

    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
      }

    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        filters: { ...state.filters, searchQuery: action.payload },
      }

    case 'SET_CATEGORY':
      return {
        ...state,
        filters: { ...state.filters, category: action.payload },
      }

    case 'SET_MAX_PRICE':
      return {
        ...state,
        filters: { ...state.filters, maxPrice: action.payload },
      }

    case 'SET_SORT':
      return {
        ...state,
        filters: { ...state.filters, sortBy: action.payload },
      }

    case 'TOGGLE_CART':
      return {
        ...state,
        isCartOpen:
          typeof action.payload === 'boolean'
            ? action.payload
            : !state.isCartOpen,
      }

    default:
      return state
  }
}

export const cartReducer = storeReducer
