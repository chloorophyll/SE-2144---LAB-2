import { createContext } from 'react'
import type { Dispatch } from 'react'
import type { Product, State } from '../types'
import productsData from '../data/products.json'
import { storeReducer } from '../reducer/reducer'
import type { Action } from '../reducer/reducer'

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

export const StoreContext = createContext<StoreContextValue | undefined>(
  undefined,
)

export { storeReducer }
export type { Action }
