import { useState } from 'react'
import { vendorAPI } from '../../services/api.js'
import toast from 'react-hot-toast'
import { Package, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const AddItem = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name || !formData.price || !formData.description) {
      toast.error('Please fill in all fields')
      return
    }

    if (parseFloat(formData.price) <= 0) {
      toast.error('Price must be greater than 0')
      return
    }

    setLoading(true)

    try {
      await vendorAPI.addProduct({
        name: formData.name,
        price: parseFloat(formData.price),
        description: formData.description,
      })
      toast.success('Product added successfully!')
      navigate('/vendor/products')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add product')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center space-x-3 mb-6">
        <Package className="w-8 h-8 text-green-600" />
        <div>
          <h1 className="text-2xl font-bold">Add New Product</h1>
          <p className="text-gray-600">Add a product to your catalog</p>
        </div>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="form-label">Product Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input"
              placeholder="Enter product name"
              required
            />
          </div>

          <div>
            <label className="form-label">Price ($)</label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="input"
              placeholder="0.00"
              required
            />
          </div>

          <div>
            <label className="form-label">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input h-32 resize-none"
              placeholder="Enter product description"
              required
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => navigate('/vendor/products')}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-success flex-1 flex items-center justify-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>{loading ? 'Adding...' : 'Add Product'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddItem
