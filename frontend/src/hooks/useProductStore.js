import { useMemo, useState } from 'react'
import { initialProducts } from '../data/products.js'

export function useProductStore() {
  const [products, setProducts] = useState(initialProducts)
  const [cart, setCart] = useState({})

  const inventoryTotal = useMemo(
    () =>
      products.reduce(
        (total, product) => total + product.price * product.quantity,
        0,
      ),
    [products],
  )
  const cartCount = useMemo(
    () => Object.values(cart).reduce((total, quantity) => total + quantity, 0),
    [cart],
  )
  const cartTotal = useMemo(
    () =>
      products.reduce(
        (total, product) => total + product.price * (cart[product.id] || 0),
        0,
      ),
    [cart, products],
  )
  const lowStockCount = useMemo(
    () => products.filter((product) => product.quantity < 5).length,
    [products],
  )

  function addProduct(product) {
    setProducts((current) => [{ ...product, id: Date.now() }, ...current])
  }

  function changeStock(productId, amount) {
    const product = products.find((item) => item.id === productId)
    const nextStock = Math.max(0, (product?.quantity ?? 0) + amount)

    setProducts((current) =>
      current.map((item) =>
        item.id === productId ? { ...item, quantity: nextStock } : item,
      ),
    )
    setCart((current) => {
      const nextCartQuantity = Math.min(current[productId] || 0, nextStock)
      if (!nextCartQuantity) {
        const remaining = { ...current }
        delete remaining[productId]
        return remaining
      }
      return { ...current, [productId]: nextCartQuantity }
    })
  }

  function addToCart(product) {
    const currentQuantity = cart[product.id] || 0
    if (currentQuantity >= product.quantity) {
      return {
        added: false,
        message:
          product.quantity === 0
            ? 'This product is out of stock.'
            : 'Your cart already has all available stock.',
      }
    }

    setCart((current) => ({
      ...current,
      [product.id]: (current[product.id] || 0) + 1,
    }))
    return { added: true }
  }

  function updateCartQuantity(productId, amount) {
    const nextQuantity = (cart[productId] || 0) + amount
    if (nextQuantity <= 0) {
      setCart((current) => {
        const remaining = { ...current }
        delete remaining[productId]
        return remaining
      })
      return
    }
    setCart((current) => ({ ...current, [productId]: nextQuantity }))
  }

  return {
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
  }
}
