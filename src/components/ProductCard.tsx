import { useStore } from '../context/useStore'
import type { Product } from '../types'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'PHP',
})

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useStore()

  return (
    <article className="product-card">
      <div className="product-image-wrap">
         <img src={product.image} alt={product.name} loading="lazy" />
         {!product.inStock && (
           <div className="out-of-stock-overlay">Out of Stock</div>
         )}
      </div>

      <div className="product-card-body">
        <div className="product-meta">
          <span>{product.category}</span>
          <span className={product.inStock ? 'stock in' : 'stock out'}>
            {product.inStock ? 'In stock' : 'Out of stock'}
          </span>
        </div>

        <h3>{product.name}</h3>

        {product.description ? (
          <p className="product-description">{product.description}</p>
        ) : null}

        <div className="product-card-footer">
          <strong>{currencyFormatter.format(product.price)}</strong>
          <button
            type="button"
            disabled={!product.inStock}
            onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}
          >
            {product.inStock ? 'Add to cart' : 'Unavailable'}
          </button>
        </div>
      </div>
    </article>
  )
}
