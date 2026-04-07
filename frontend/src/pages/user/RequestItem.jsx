import { useState, useEffect } from 'react'
import { userAPI } from '../../services/api.js'
import toast from 'react-hot-toast'
import { Package, Send, Store } from 'lucide-react'

const RequestItem = () => {
  const [vendors, setVendors] = useState([])
  const [formData, setFormData] = useState({
    vendorId: '',
    productName: '',
    description: '',
    expectedPrice: '',
    quantity: 1,
  })
  const [loading, setLoading] = useState(false)
  const [fetchingVendors, setFetchingVendors] = useState(true)

  useEffect(() => {
    fetchVendors()
  }, [])

  const fetchVendors = async () => {
    try {
      const response = await userAPI.getVendors()
      setVendors(response.data.vendors || [])
    } catch (error) {
      toast.error('Failed to load vendors')
    } finally {
      setFetchingVendors(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.vendorId || !formData.productName || !formData.description) {
      toast.error('Please fill in all required fields')
      return
    }

    setLoading(true)

    try {
      await userAPI.requestProduct({
        vendorId: formData.vendorId,
        productName: formData.productName,
        description: formData.description,
        expectedPrice: parseFloat(formData.expectedPrice) || 0,
        quantity: parseInt(formData.quantity) || 1,
      })
      
      toast.success('Product request sent successfully!')
      setFormData({
        vendorId: '',
        productName: '',
        description: '',
        expectedPrice: '',
        quantity: 1,
      })
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send request')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center space-x-3 mb-6">
        <Package className="w-8 h-8 text-purple-600" />
        <div>
          <h1 className="text-2xl font-bold">Request Custom Item</h1>
          <p className="text-gray-600">Request a specific product from a vendor</p>
        </div>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="form-label flex items-center space-x-2">
              <Store className="w-4 h-4" />
              <span>Select Vendor *</span>
            </label>
            {fetchingVendors ? (
              <div className="animate-pulse h-10 bg-gray-200 rounded-lg"></div>
            ) : (
              <select
                value={formData.vendorId}
                onChange={(e) => setFormData({ ...formData, vendorId: e.target.value })}
                className="input"
                required
              >
                <option value="">Choose a vendor...</option>
                {vendors.map((vendor) => (
                  <option key={vendor._id} value={vendor._id}>
                    {vendor.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div>
            <label className="form-label">Product Name *</label>
            <input
              type="text"
              value={formData.productName}
              onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
              className="input"
              placeholder="What product are you looking for?"
              required
            />
          </div>

          <div>
            <label className="form-label">Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input h-32 resize-none"
              placeholder="Describe the product in detail (specifications, color, size, etc.)"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">Expected Price ($)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.expectedPrice}
                onChange={(e) => setFormData({ ...formData, expectedPrice: e.target.value })}
                className="input"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="form-label">Quantity</label>
              <input
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="input"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>{loading ? 'Sending...' : 'Send Request'}</span>
          </button>
        </form>
      </div>
    </div>
  )
}

export default RequestItem
