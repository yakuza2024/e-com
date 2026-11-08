import { useState } from 'react'
import CartPage from './components/CartPage.jsx'
import ProductCatalog from './components/ProductCatalog.jsx'
import ProductDetails from './components/ProductDetails.jsx'
import ProductForm from './components/ProductForm.jsx'
import Sidebar from './components/Sidebar.jsx'
import Toast from './components/Toast.jsx'
import Topbar from './components/Topbar.jsx'
import { useProductStore } from './hooks/useProductStore.js'
import './App.css'

const pageTitles = {
  products: 'Products',
  add: 'Add product',
  detail: 'Product details',
  cart: 'Your cart',
}

function App() {
  const [screen, setScreen] = useState('products')
  const [selectedProductId, setSelectedProductId] = useState(null)
  const [notice, setNotice] = useState('')
  const {
    products,
    cart,
    cartCount,
    cartTotal,
    inventoryTotal,
    lowStockCount,
    addProduct,
    addToCart,
    changeStock,
    updateCartQuantity,
  } = useProductStore()

  function showNotice(message) {
    setNotice(message)
    window.setTimeout(() => setNotice(''), 2800)
  }

  function handleAddProduct(product) {
    addProduct(product)
    setScreen('products')
    showNotice(`${product.name} added to your products.`)
  }

  function handleAddToCart(product) {
    const result = addToCart(product)
    showNotice(
      result.message || `${product.name} added to your cart.`,
    )
  }

  const selectedProduct = products.find(
    (product) => product.id === selectedProductId,
  )

  return (
    <div className="app-shell">
      <Sidebar
        screen={screen}
        productCount={products.length}
        cartCount={cartCount}
        onNavigate={setScreen}
      />
      <main className="main-area">
        <Topbar
          title={pageTitles[screen]}
          cartCount={cartCount}
          onOpenCart={() => setScreen('cart')}
        />
        <div className="page-content">
          {screen === 'products' && (
            <ProductCatalog
              products={products}
              cartCount={cartCount}
              cartTotal={cartTotal}
              inventoryTotal={inventoryTotal}
              lowStockCount={lowStockCount}
              onAddProduct={() => setScreen('add')}
              onAddToCart={handleAddToCart}
              onChangeStock={changeStock}
              onOpenProduct={(productId) => {
                setSelectedProductId(productId)
                setScreen('detail')
              }}
            />
          )}
          {screen === 'detail' && (
            <ProductDetails
              product={selectedProduct}
              onBack={() => setScreen('products')}
              onAddToCart={handleAddToCart}
              onChangeStock={changeStock}
            />
          )}
          {screen === 'add' && (
            <ProductForm
              onCancel={() => setScreen('products')}
              onSubmit={handleAddProduct}
            />
          )}
          {screen === 'cart' && (
            <CartPage
              products={products}
              cart={cart}
              cartCount={cartCount}
              cartTotal={cartTotal}
              onContinueShopping={() => setScreen('products')}
              onUpdateQuantity={updateCartQuantity}
              onCheckout={() => showNotice('Your order is ready for checkout.')}
            />
          )}
          <footer className="page-footer">
            <span>Made for the things you love.</span>
            <span>Goodgoods © 2024</span>
          </footer>
        </div>
      </main>
      {notice && (
        <Toast message={notice} />
      )}
    </div>
  )
}

export default App
