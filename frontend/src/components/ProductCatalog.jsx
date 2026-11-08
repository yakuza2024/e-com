import { useMemo, useState } from 'react'
import Icon from './Icon.jsx'
import ProductCard from './ProductCard.jsx'
import StoreSummary from './StoreSummary.jsx'

function ProductCatalog({
  products,
  cartCount,
  cartTotal,
  inventoryTotal,
  lowStockCount,
  onAddProduct,
  onAddToCart,
  onChangeStock,
  onOpenProduct,
}) {
  const [category, setCategory] = useState('All products')
  const [search, setSearch] = useState('')

  const categories = useMemo(
    () => ['All products', ...new Set(products.map((product) => product.category))],
    [products],
  )
  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase()
    return products.filter((product) => {
      const matchesCategory =
        category === 'All products' || product.category === category
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      return matchesCategory && matchesSearch
    })
  }, [category, products, search])

  return (
    <>
      <section className="welcome-panel">
        <div>
          <span className="eyebrow">YOUR STORE AT A GLANCE</span>
          <h1>Good morning, Alex <span aria-hidden="true">✦</span></h1>
          <p>Here&apos;s what&apos;s happening with your products today.</p>
        </div>
        <button type="button" className="primary-button" onClick={onAddProduct}>
          <Icon name="plus" size={18} />
          Add product
        </button>
      </section>

      <StoreSummary
        productCount={products.length}
        cartCount={cartCount}
        cartTotal={cartTotal}
        lowStockCount={lowStockCount}
        inventoryTotal={inventoryTotal}
      />

      <section className="catalog-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">THE GOOD STUFF</span>
            <h2>Your products <span className="count-pill">{products.length}</span></h2>
          </div>
          <label className="search-field">
            <Icon name="search" size={18} />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products..."
              aria-label="Search products"
            />
            <kbd>⌘ K</kbd>
          </label>
        </div>
        <div className="category-list" aria-label="Filter by category">
          {categories.map((item) => (
            <button
              className={`category-chip${category === item ? ' active' : ''}`}
              key={item}
              type="button"
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        {visibleProducts.length ? (
          <div className="product-grid">
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpen={onOpenProduct}
                onAddToCart={onAddToCart}
                onChangeStock={onChangeStock}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span className="empty-icon"><Icon name="search" size={24} /></span>
            <h3>No products found</h3>
            <p>Try a different search or category.</p>
            <button
              type="button"
              className="text-button"
              onClick={() => {
                setSearch('')
                setCategory('All products')
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </>
  )
}

export default ProductCatalog
