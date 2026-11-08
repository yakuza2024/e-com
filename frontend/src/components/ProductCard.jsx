import { formatCurrency } from '../utils/formatCurrency.js'
import Icon from './Icon.jsx'

function ProductCard({ product, onOpen, onAddToCart, onChangeStock }) {
  const subtotal = product.price * product.quantity

  return (
    <article className="product-card">
      <button
        className="product-image-button"
        type="button"
        onClick={() => onOpen(product.id)}
        aria-label={`View ${product.name} details`}
      >
        <img className="product-image" src={product.image} alt={product.name} />
        {product.quantity < 5 && <span className="stock-badge">Low stock</span>}
      </button>
      <div className="product-card-body">
        <div className="product-card-heading">
          <div>
            <span className="product-category">{product.category}</span>
            <button
              type="button"
              className="product-name"
              onClick={() => onOpen(product.id)}
            >
              {product.name}
            </button>
          </div>
          <span className="rating">
            <Icon name="star" size={14} />
            {product.rating.toFixed(1)}
          </span>
        </div>
        <p className="product-description">{product.description}</p>
        <div className="product-card-footer">
          <div className="price-and-subtotal">
            <strong>{formatCurrency(product.price)}</strong>
            <span>Subtotal {formatCurrency(subtotal)}</span>
          </div>
          <div className="quantity-control" aria-label={`${product.name} stock`}>
            <button
              type="button"
              onClick={() => onChangeStock(product.id, -1)}
              disabled={product.quantity === 0}
              aria-label={`Decrease ${product.name} quantity`}
            >
              −
            </button>
            <span>{product.quantity}</span>
            <button
              type="button"
              onClick={() => onChangeStock(product.id, 1)}
              aria-label={`Increase ${product.name} quantity`}
            >
              +
            </button>
          </div>
        </div>
        <button
          type="button"
          className="add-cart-button"
          onClick={() => onAddToCart(product)}
          disabled={product.quantity === 0}
        >
          <Icon name="cart" size={17} />
          {product.quantity === 0 ? 'Out of stock' : 'Add to cart'}
        </button>
      </div>
    </article>
  )
}

export default ProductCard
