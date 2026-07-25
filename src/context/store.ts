import { createContext } from 'react'
import type { Dispatch } from 'react'
import type { Product, SortOption, State } from '../types'
import productsData from '../data/products.json'

export type Action =
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_CATEGORY'; payload: string }
  | { type: 'SET_MAX_PRICE'; payload: number }
  | { type: 'SET_SORT_BY'; payload: SortOption }
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'INCREASE_CART_QUANTITY'; payload: string }
  | { type: 'DECREASE_CART_QUANTITY'; payload: string }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'TOGGLE_CART' }

export interface StoreContextValue {
  state: State
  dispatch: Dispatch<Action>
}

const products = productsData as Product[]
const maxProductPrice = Math.ceil(
  Math.max(...products.map((product) => product.price), 0),
)

export const initialState: State = {
  products,
  cart: [],
  filters: {
    searchQuery: '',
    category: 'All',
    maxPrice: maxProductPrice,
    sortBy: 'default',
  },
  isCartOpen: false,
}

export function storeReducer(state: State, action: Action): State {
  switch (action.type) {
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

    case 'SET_SORT_BY':
      return {
        ...state,
        filters: { ...state.filters, sortBy: action.payload },
      }

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

    case 'INCREASE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      }

    case 'DECREASE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          )
          .filter((item) => item.quantity > 0),
      }

    case 'OPEN_CART':
      return { ...state, isCartOpen: true }

    case 'CLOSE_CART':
      return { ...state, isCartOpen: false }

    case 'TOGGLE_CART':
      return { ...state, isCartOpen: !state.isCartOpen }

    default:
      return state
  }
}

export const StoreContext = createContext<StoreContextValue | undefined>(
  undefined,
)
