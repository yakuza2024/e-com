import Icon from './Icon.jsx'
import { formatCurrency } from '../utils/formatCurrency.js'

function StoreSummary({
  productCount,
  cartCount,
  cartTotal,
  lowStockCount,
  inventoryTotal,
}) {
  return (
    <section className="stats-grid" aria-label="Store summary">
      <article className="stat-card">
        <span className="stat-icon lavender"><Icon name="box" size={20} /></span>
        <div><span>Total products</span><strong>{productCount}</strong></div>
        <small>in your catalog</small>
      </article>
      <article className="stat-card">
        <span className="stat-icon mint"><Icon name="cart" size={20} /></span>
        <div><span>Cart items</span><strong>{cartCount}</strong></div>
        <small>{formatCurrency(cartTotal)} cart value</small>
      </article>
      <article className="stat-card">
        <span className="stat-icon peach"><Icon name="box" size={20} /></span>
        <div><span>Low stock</span><strong>{lowStockCount}</strong></div>
        <small>fewer than 5 units</small>
      </article>
      <article className="stat-card">
        <span className="stat-icon blue"><span className="dollar-sign">$</span></span>
        <div><span>Inventory value</span><strong>{formatCurrency(inventoryTotal)}</strong></div>
        <small>across all products</small>
      </article>
    </section>
  )
}

export default StoreSummary
