import { useStore } from '../context/useStore'
import type { SortOption } from '../types'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'Php',
  maximumFractionDigits: 0,
})

export function ProductFilters() {
  const { state, dispatch } = useStore()
  const { filters, products } = state
  const categories = ['All', ...new Set(products.map((product) => product.category))]
  const highestProductPrice = Math.ceil(
    Math.max(...products.map((product) => product.price), 0),
  )

  return (
    <section className="filters" aria-label="Product filters">
      <label className="filter-field search-field">
        <span>Search</span>
        <input
          type="search"
          value={filters.searchQuery}
          placeholder="Keyboard, charger, headphones..."
          onChange={(event) =>
            dispatch({ type: 'SET_SEARCH_QUERY', payload: event.target.value })
          }
        />
      </label>

      <label className="filter-field">
        <span>Category</span>
        <select
          value={filters.category}
          onChange={(event) =>
            dispatch({ type: 'SET_CATEGORY', payload: event.target.value })
          }
        >
          {categories.map((category) => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      <label className="filter-field price-field">
        <span>Max price</span>
        <div className="range-row">
          <input
            type="range"
            min="0"
            max={highestProductPrice}
            value={filters.maxPrice}
            onChange={(event) =>
              dispatch({
                type: 'SET_MAX_PRICE',
                payload: Number(event.target.value),
              })
            }
          />
          <output>{currencyFormatter.format(filters.maxPrice)}</output>
        </div>
      </label>

      <label className="filter-field">
        <span>Sort</span>
        <select
          value={filters.sortBy}
          onChange={(event) =>
            dispatch({
              type: 'SET_SORT_BY',
              payload: event.target.value as SortOption,
            })
          }
        >
          <option value="default">Featured</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="title">Title</option>
        </select>
      </label>
    </section>
  )
}
