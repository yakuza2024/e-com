import { useState } from 'react'
import Icon from './Icon.jsx'

const initialForm = {
  image: '',
  name: '',
  category: '',
  description: '',
  specifications: '',
  rating: '',
  price: '',
  quantity: '',
}

function ProductForm({ onCancel, onSubmit }) {
  const [form, setForm] = useState(initialForm)

  function updateField(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    onSubmit({
      ...form,
      price: Number(form.price),
      rating: Number(form.rating),
      quantity: Number(form.quantity),
    })
  }

  function handleCancel() {
    setForm(initialForm)
    onCancel()
  }

  return (
    <section className="form-page">
      <button className="back-button" type="button" onClick={onCancel}>
        <Icon name="arrow" size={18} /> Back to products
      </button>
      <div className="form-heading">
        <span className="eyebrow">GROW YOUR CATALOG</span>
        <h1>Add a new product</h1>
        <p>Fill in the details below to add a product to your store.</p>
      </div>
      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-section-title">
          <span className="form-step">01</span>
          <div><h2>Product details</h2><p>The essentials your customers will see.</p></div>
        </div>
        <div className="form-grid">
          <label className="form-field full">
            <span>Featured image URL <b>*</b></span>
            <input
              name="image"
              type="url"
              value={form.image}
              onChange={updateField}
              placeholder="https://example.com/product-image.jpg"
              required
            />
            <small>Paste a direct link to your product photo.</small>
          </label>
          <label className="form-field">
            <span>Product name <b>*</b></span>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={updateField}
              placeholder="e.g. Minimal desk clock"
              maxLength={70}
              required
            />
          </label>
          <label className="form-field">
            <span>Category <b>*</b></span>
            <input
              name="category"
              type="text"
              value={form.category}
              onChange={updateField}
              placeholder="e.g. Home"
              maxLength={40}
              required
            />
          </label>
          <label className="form-field full">
            <span>Description <b>*</b></span>
            <textarea
              name="description"
              value={form.description}
              onChange={updateField}
              placeholder="Tell customers what makes this product special..."
              rows="4"
              maxLength={500}
              required
            />
          </label>
          <label className="form-field full">
            <span>Product specifications <b>*</b></span>
            <input
              name="specifications"
              type="text"
              value={form.specifications}
              onChange={updateField}
              placeholder="e.g. Material, dimensions, features"
              maxLength={180}
              required
            />
          </label>
        </div>
        <div className="form-section-title second">
          <span className="form-step">02</span>
          <div><h2>Pricing &amp; stock</h2><p>Set the numbers for your new product.</p></div>
        </div>
        <div className="form-grid">
          <label className="form-field">
            <span>Price (USD) <b>*</b></span>
            <div className="input-prefix">
              <span>$</span>
              <input
                name="price"
                type="number"
                min="0.01"
                step="0.01"
                value={form.price}
                onChange={updateField}
                placeholder="0.00"
                required
              />
            </div>
          </label>
          <label className="form-field">
            <span>Quantity in stock <b>*</b></span>
            <input
              name="quantity"
              type="number"
              min="0"
              step="1"
              value={form.quantity}
              onChange={updateField}
              placeholder="0"
              required
            />
          </label>
          <label className="form-field">
            <span>Rating (0–5) <b>*</b></span>
            <input
              name="rating"
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={form.rating}
              onChange={updateField}
              placeholder="4.5"
              required
            />
          </label>
        </div>
        <div className="form-actions">
          <button type="button" className="secondary-button" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" className="primary-button">
            <Icon name="check" size={18} /> Add product
          </button>
        </div>
      </form>
    </section>
  )
}

export default ProductForm
