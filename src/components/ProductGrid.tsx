import type { Product } from '../types'
import { ProductCard } from './ProductCard'

interface ProductGridProps {
  products: Product[]
  totalProducts: number
}

export function ProductGrid({ products, totalProducts }: ProductGridProps) {
  const productLabel =
    products.length === 1 ? '1 product' : `${products.length} products`

  return (
    <section className="products-section" aria-labelledby="products-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Browse GearHub</p>
          <h2 id="products-heading">Featured accessories</h2>
        </div>
        <p>
          Showing {productLabel} of {totalProducts}
        </p>
      </div>

      {products.length > 0 ? (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No products found</h3>
          <p>Try a different search, category, or price range.</p>
        </div>
      )}
    </section>
  )
}
