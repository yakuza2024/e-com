import Icon from './Icon.jsx'

function Topbar({ title, cartCount, onOpenCart }) {
  return (
    <header className="topbar">
      <div className="breadcrumb">
        <span>Workspace</span>
        <span className="breadcrumb-divider">/</span>
        <strong>{title}</strong>
      </div>
      <div className="topbar-right">
        <span className="store-status"><span /> Store is live</span>
        <button
          className="topbar-cart"
          type="button"
          onClick={onOpenCart}
          aria-label={`Open cart, ${cartCount} items`}
        >
          <Icon name="cart" size={19} />
          {cartCount > 0 && <span>{cartCount}</span>}
        </button>
      </div>
    </header>
  )
}

export default Topbar
