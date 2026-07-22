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