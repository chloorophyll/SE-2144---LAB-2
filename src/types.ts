export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  inStock: boolean;
  description?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'title';

export interface State {
  products: Product[];
  cart: CartItem[];
  filters: {
    searchQuery: string;
    category: string;
    maxPrice: number;
    sortBy: SortOption;
  };
  isCartOpen: boolean;
}
