import type { Product, State } from '../types'

export function getFilteredProducts(
  products: Product[],
  filters: State['filters'],
): Product[] {
  const searchQuery = filters.searchQuery.trim().toLowerCase()

  return [...products]
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery)
      const matchesCategory =
        filters.category === 'All' || product.category === filters.category
      const matchesPrice = product.price <= filters.maxPrice

      return matchesSearch && matchesCategory && matchesPrice
    })
    .sort((firstProduct, secondProduct) => {
      if (filters.sortBy === 'price-asc') {
        return firstProduct.price - secondProduct.price
      }

      if (filters.sortBy === 'price-desc') {
        return secondProduct.price - firstProduct.price
      }

      if (filters.sortBy === 'title') {
        return firstProduct.name.localeCompare(secondProduct.name)
      }

      return 0
    })
}
