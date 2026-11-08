import Icon from './Icon.jsx'
import { formatCurrency } from '../utils/formatCurrency.js'

function CartPage({
  products,
  cart,
  cartCount,
  cartTotal,
  onContinueShopping,
  onUpdateQuantity,
  onCheckout,
}) {
  const cartProducts = products.filter((product) => cart[product.id])

  return (
    <section className="cart-page">
      <div className="cart-heading">
        <div>
          <span className="eyebrow">READY WHEN YOU ARE</span>
          <h1>Your cart <span className="count-pill">{cartCount}</span></h1>
          <p>A little collection of good things.</p>
        </div>
        <button type="button" className="secondary-button" onClick={onContinueShopping}>
          Continue shopping
        </button>
      </div>
      {cartProducts.length === 0 ? (
        <div className="empty-state cart-empty">
          <span className="empty-icon"><Icon name="cart" size={24} /></span>
          <h3>Your cart is taking a little break</h3>
          <p>Add a product from the catalog and it&apos;ll show up here.</p>
          <button className="primary-button" type="button" onClick={onContinueShopping}>
            Explore products
          </button>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cartProducts.map((product) => (
              <CartItem
                key={product.id}
                product={product}
                quantity={cart[product.id]}
                onUpdateQuantity={onUpdateQuantity}
              />
            ))}
          </div>
          <OrderSummary
            cartCount={cartCount}
            cartTotal={cartTotal}
            onCheckout={onCheckout}
          />
        </div>
      )}
    </section>
  )
}

function CartItem({ product, quantity, onUpdateQuantity }) {
  return (
    <article className="cart-item">
      <img src={product.image} alt={product.name} />
      <div className="cart-item-info">
        <span className="product-category">{product.category}</span>
        <h2>{product.name}</h2>
        <span>{formatCurrency(product.price)} each</span>
      </div>
      <div className="quantity-control">
        <button
          type="button"
          onClick={() => onUpdateQuantity(product.id, -1)}
          aria-label={`Remove one ${product.name}`}
        >
          −
        </button>
        <span>{quantity}</span>
        <button
          type="button"
          disabled={quantity >= product.quantity}
          onClick={() => onUpdateQuantity(product.id, 1)}
          aria-label={`Add one ${product.name}`}
        >
          +
        </button>
      </div>
      <strong className="cart-line-total">
        {formatCurrency(product.price * quantity)}
      </strong>
      <button
        className="remove-button"
        type="button"
        onClick={() => onUpdateQuantity(product.id, -quantity)}
        aria-label={`Remove ${product.name} from cart`}
      >
        <Icon name="close" size={18} />
      </button>
    </article>
  )
}

function OrderSummary({ cartCount, cartTotal, onCheckout }) {
  return (
    <aside className="order-summary">
      <span className="eyebrow">ORDER SUMMARY</span>
      <div><span>Items ({cartCount})</span><strong>{formatCurrency(cartTotal)}</strong></div>
      <div><span>Shipping</span><strong className="free-shipping">Free</strong></div>
      <div className="summary-total"><span>Total</span><strong>{formatCurrency(cartTotal)}</strong></div>
      <button type="button" className="primary-button checkout-button" onClick={onCheckout}>
        Continue to checkout
      </button>
      <p>Taxes calculated at checkout.</p>
    </aside>
  )
}

export default CartPage
