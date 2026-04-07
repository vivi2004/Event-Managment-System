import { useState, useEffect } from 'react'
import { adminAPI } from '../../services/api.js'
import toast from 'react-hot-toast'
import { RefreshCw, XCircle, Check, Search } from 'lucide-react'

const UpdateMembership = () => {
  const [vendors, setVendors] = useState([])
  const [selectedVendor, setSelectedVendor] = useState('')
  const [membership, setMembership] = useState(null)
  const [action, setAction] = useState('extend')
  const [duration, setDuration] = useState('6 months')
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    fetchVendorsWithMembership()
  }, [])

  const fetchVendorsWithMembership = async () => {
    try {
      const response = await adminAPI.getVendors()
      const vendorsWithMembership = response.data.vendors?.filter(
        v => v.membership && v.membership.length > 0
      ) || []
      setVendors(vendorsWithMembership)
    } catch (error) {
      toast.error('Failed to load vendors')
    } finally {
      setFetching(false)
    }
  }

  const handleVendorSelect = (vendorId) => {
    setSelectedVendor(vendorId)
    const vendor = vendors.find(v => v._id === vendorId)
    if (vendor && vendor.membership && vendor.membership.length > 0) {
      setMembership(vendor.membership[0])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!selectedVendor || !membership) {
      toast.error('Please select a vendor with membership')
      return
    }

    setLoading(true)
    try {
      await adminAPI.updateMembership(membership._id, {
        action,
        duration: action === 'extend' ? duration : undefined,
      })
      
      toast.success(
        action === 'extend' 
          ? 'Membership extended successfully!' 
          : 'Membership cancelled successfully!'
      )
      
      setSelectedVendor('')
      setMembership(null)
      setAction('extend')
      setDuration('6 months')
      fetchVendorsWithMembership()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update membership')
    } finally {
      setLoading(false)
    }
  }

  const durations = [
    { value: '6 months', label: '6 Months (Default)' },
    { value: '1 year', label: '1 Year' },
    { value: '2 years', label: '2 Years' },
  ]

  if (fetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center space-x-3 mb-6">
        <RefreshCw className="w-8 h-8 text-primary-600" />
        <div>
          <h1 className="text-2xl font-bold">Update Membership</h1>
          <p className="text-gray-600">Extend or cancel vendor memberships</p>
        </div>
      </div>

      <div className="card">
        {vendors.length > 0 ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="form-label flex items-center space-x-2">
                <Search className="w-4 h-4" />
                <span>Membership Number / Vendor *</span>
              </label>
              <select
                value={selectedVendor}
                onChange={(e) => handleVendorSelect(e.target.value)}
                className="input"
                required
              >
                <option value="">Select vendor...</option>
                {vendors.map((vendor) => (
                  <option key={vendor._id} value={vendor._id}>
                    {vendor.name} - {vendor.membership[0]?.duration} 
                    (Ends: {new Date(vendor.membership[0]?.endDate).toLocaleDateString()})
                  </option>
                ))}
              </select>
            </div>

            {membership && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-blue-900 mb-2">Current Membership Details</h3>
                <div className="text-sm text-blue-800 space-y-1">
                  <p><strong>Status:</strong> {membership.status}</p>
                  <p><strong>Duration:</strong> {membership.duration}</p>
                  <p><strong>Start Date:</strong> {new Date(membership.startDate).toLocaleDateString()}</p>
                  <p><strong>End Date:</strong> {new Date(membership.endDate).toLocaleDateString()}</p>
                </div>
              </div>
            )}

            <div>
              <label className="form-label">Action *</label>
              <div className="grid grid-cols-2 gap-4">
                <label
                  className={`cursor-pointer border-2 rounded-lg p-4 transition-all ${
                    action === 'extend'
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="action"
                    value="extend"
                    checked={action === 'extend'}
                    onChange={(e) => setAction(e.target.value)}
                    className="hidden"
                  />
                  <div className="text-center">
                    <RefreshCw className="w-6 h-6 mx-auto mb-2 text-primary-600" />
                    <p className="font-medium">Extend Membership</p>
                  </div>
                </label>

                <label
                  className={`cursor-pointer border-2 rounded-lg p-4 transition-all ${
                    action === 'cancel'
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-red-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="action"
                    value="cancel"
                    checked={action === 'cancel'}
                    onChange={(e) => setAction(e.target.value)}
                    className="hidden"
                  />
                  <div className="text-center">
                    <XCircle className="w-6 h-6 mx-auto mb-2 text-red-600" />
                    <p className="font-medium">Cancel Membership</p>
                  </div>
                </label>
              </div>
            </div>

            {action === 'extend' && (
              <div>
                <label className="form-label">Extension Duration</label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="input"
                >
                  {durations.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-gray-500 mt-1">
                  Default extension is 6 months
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center space-x-2 py-3 rounded-lg font-medium transition-colors ${
                action === 'cancel'
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'btn-primary'
              }`}
            >
              {loading ? (
                <span>Processing...</span>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>
                    {action === 'extend' ? 'Extend Membership' : 'Cancel Membership'}
                  </span>
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="text-center py-8">
            <RefreshCw className="w-12 h-12 mx-auto text-gray-300 mb-3" />
            <h3 className="text-lg font-medium text-gray-900">No active memberships</h3>
            <p className="text-gray-500 mt-2">
              There are no vendors with active memberships to update
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default UpdateMembership
