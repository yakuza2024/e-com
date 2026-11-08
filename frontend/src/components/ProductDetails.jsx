import { formatCurrency } from '../utils/formatCurrency.js'
import Icon from './Icon.jsx'

function ProductDetails({ product, onBack, onAddToCart, onChangeStock }) {
  if (!product) {
    return (
      <div className="empty-state">
        <h3>Product not found</h3>
        <button className="text-button" type="button" onClick={onBack}>
          Back to products
        </button>
      </div>
    )
  }

  return (
    <section className="detail-page">
      <button className="back-button" type="button" onClick={onBack}>
        <Icon name="arrow" size={18} /> Back to products
      </button>
      <div className="detail-layout">
        <div className="detail-image-wrap">
          <img className="detail-image" src={product.image} alt={product.name} />
          {product.quantity < 5 && <span className="stock-badge">Low stock</span>}
        </div>
        <div className="detail-content">
          <span className="product-category">{product.category}</span>
          <h1>{product.name}</h1>
          <div className="detail-rating">
            <span className="rating"><Icon name="star" size={15} />{product.rating.toFixed(1)}</span>
            <span>Customer rating</span>
          </div>
          <p className="detail-description">{product.description}</p>
          <div className="specification-box">
            <span className="eyebrow">SPECIFICATIONS</span>
            <p>{product.specifications}</p>
          </div>
          <div className="detail-price">{formatCurrency(product.price)} <span>/ unit</span></div>
          <div className="detail-stock-row">
            <div>
              <span className="eyebrow">IN STOCK</span>
              <strong className={product.quantity < 5 ? 'low-stock-text' : ''}>
                {product.quantity} units
              </strong>
            </div>
            <div className="quantity-control large">
              <button
                type="button"
                disabled={product.quantity === 0}
                onClick={() => onChangeStock(product.id, -1)}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span>{product.quantity}</span>
              <button
                type="button"
                onClick={() => onChangeStock(product.id, 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>
          <button
            className="primary-button detail-cart-button"
            type="button"
            onClick={() => onAddToCart(product)}
            disabled={product.quantity === 0}
          >
            <Icon name="cart" size={18} />
            {product.quantity === 0 ? 'Out of stock' : 'Add to cart'}
          </button>
          <p className="detail-subtotal">
            Inventory subtotal <strong>{formatCurrency(product.price * product.quantity)}</strong>
          </p>
        </div>
      </div>
    </section>
  )
}

export default ProductDetails
