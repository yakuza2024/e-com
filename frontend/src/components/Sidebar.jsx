import Icon from './Icon.jsx'

function Sidebar({ screen, productCount, cartCount, onNavigate }) {
  return (
    <aside className="sidebar">
      <button
        className="brand"
        type="button"
        onClick={() => onNavigate('products')}
        aria-label="Go to products"
      >
        <span className="brand-mark"><span /></span>
        <span>goodgoods<span className="brand-dot">.</span><small>PRODUCT STUDIO</small></span>
      </button>
      <div className="sidebar-label">WORKSPACE</div>
      <nav className="main-nav" aria-label="Main navigation">
        <button
          className={`nav-item${screen === 'products' || screen === 'detail' ? ' active' : ''}`}
          type="button"
          onClick={() => onNavigate('products')}
        >
          <Icon name="box" size={19} />
          <span>Products</span>
          <span className="nav-count">{productCount}</span>
        </button>
        <button
          className={`nav-item${screen === 'add' ? ' active' : ''}`}
          type="button"
          onClick={() => onNavigate('add')}
        >
          <Icon name="plus" size={19} />
          <span>Add product</span>
        </button>
        <button
          className={`nav-item${screen === 'cart' ? ' active' : ''}`}
          type="button"
          onClick={() => onNavigate('cart')}
        >
          <Icon name="cart" size={19} />
          <span>Cart</span>
          {cartCount > 0 && <span className="nav-count cart-nav-count">{cartCount}</span>}
        </button>
      </nav>
      <div className="sidebar-bottom">
        <div className="help-card">
          <span className="help-spark">✳</span>
          <strong>Need a hand?</strong>
          <p>We&apos;re here to help you make your store shine.</p>
          <a href="mailto:hello@goodgoods.example">Get in touch <span>↗</span></a>
        </div>
        <button className="profile-button" type="button" aria-label="Alex Morgan profile">
          <span className="avatar">AM</span>
          <span className="profile-name"><strong>Alex Morgan</strong><small>Store owner</small></span>
          <span className="profile-more">···</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
