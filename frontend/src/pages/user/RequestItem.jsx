import { useState, useEffect } from 'react'
import { userAPI } from '../../services/api.js'
import toast from 'react-hot-toast'
import BackButton from '../../components/BackButton.jsx'

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
      toast.error('Sync failed')
    } finally {
      setFetchingVendors(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.vendorId || !formData.productName || !formData.description) {
      toast.error('All fields mandatory')
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
      
      toast.success('Inquiry Logged')
      setFormData({
        vendorId: '',
        productName: '',
        description: '',
        expectedPrice: '',
        quantity: 1,
      })
    } catch (error) {
      toast.error(error.response?.data?.message || 'Inquiry failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-container max-w-2xl">
      <div className="mb-6">
        <BackButton />
      </div>

      <header className="page-header">
        <h1 className="page-title">CUSTOM_INQUIRY_PROTOCOL</h1>
        <p className="page-subtitle">Initialize a special request for a specific vendor unit</p>
      </header>

      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label className="form-label">Target Vendor (Select)</label>
            {fetchingVendors ? (
              <div className="animate-pulse h-10 bg-slate-100 rounded"></div>
            ) : (
              <select
                value={formData.vendorId}
                onChange={(e) => setFormData({ ...formData, vendorId: e.target.value })}
                className="input text-xs font-bold"
                required
              >
                <option value="">-- SELECT_AUTHORIZED_VENDOR --</option>
                {vendors.map((vendor) => (
                  <option key={vendor._id} value={vendor._id}>
                    {vendor.name.toUpperCase()}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Item Designation (Name)</label>
            <input
              type="text"
              value={formData.productName}
              onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
              className="input"
              placeholder="E.G. CUSTOM_STAGING_UNIT"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Technical Specification (Description)</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input h-32 resize-none text-xs"
              placeholder="DESCRIBE_REQUEST_PARAMETERS_AND_TERMS..."
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">Expected Valuation (USD)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.expectedPrice}
                onChange={(e) => setFormData({ ...formData, expectedPrice: e.target.value })}
                className="input font-mono"
                placeholder="0.00"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Unit Quantity</label>
              <input
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="input font-mono"
                required
              />
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-100 rounded text-[9px] text-slate-400 uppercase tracking-widest leading-relaxed">
            SYSTEM_LOG: Custom inquiries are transmitted directly to the vendor buffer. 
            Approval is subject to vendor-side capacity validation.
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3 text-xs font-bold uppercase tracking-widest"
          >
            {loading ? 'TRANSMITTING_STREAMS...' : 'INITIALIZE_REQUEST'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default RequestItem
