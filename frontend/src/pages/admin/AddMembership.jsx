import { useState, useEffect } from 'react'
import { adminAPI } from '../../services/api.js'
import toast from 'react-hot-toast'
import { CreditCard, Plus, Check } from 'lucide-react'

const AddMembership = () => {
  const [vendors, setVendors] = useState([])
  const [selectedVendor, setSelectedVendor] = useState('')
  const [duration, setDuration] = useState('6 months')
  const [loading, setLoading] = useState(false)
  const [fetchingVendors, setFetchingVendors] = useState(true)

  useEffect(() => {
    fetchVendors()
  }, [])

  const fetchVendors = async () => {
    try {
      const response = await adminAPI.getVendors()
      // Filter vendors without active membership
      const vendorsWithoutMembership = response.data.vendors?.filter(
        v => !v.membership || v.membership.length === 0
      ) || []
      setVendors(vendorsWithoutMembership)
    } catch (error) {
      toast.error('Failed to load vendors')
    } finally {
      setFetchingVendors(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!selectedVendor) {
      toast.error('Please select a vendor')
      return
    }

    setLoading(true)
    try {
      await adminAPI.addMembership({
        vendorId: selectedVendor,
        duration,
      })
      toast.success('Membership added successfully!')
      setSelectedVendor('')
      setDuration('6 months')
      fetchVendors() // Refresh the list
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add membership')
    } finally {
      setLoading(false)
    }
  }

  const durations = [
    { value: '6 months', label: '6 Months', price: '$50' },
    { value: '1 year', label: '1 Year', price: '$90' },
    { value: '2 years', label: '2 Years', price: '$160' },
  ]

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center space-x-3 mb-6">
        <CreditCard className="w-8 h-8 text-primary-600" />
        <div>
          <h1 className="text-2xl font-bold">Add Membership</h1>
          <p className="text-gray-600">Assign membership to a vendor</p>
        </div>
      </div>

      <div className="card">
        {fetchingVendors ? (
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        ) : vendors.length > 0 ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="form-label">Select Vendor *</label>
              <select
                value={selectedVendor}
                onChange={(e) => setSelectedVendor(e.target.value)}
                className="input"
                required
              >
                <option value="">Choose a vendor...</option>
                {vendors.map((vendor) => (
                  <option key={vendor._id} value={vendor._id}>
                    {vendor.name} ({vendor.email})
                  </option>
                ))}
              </select>
              <p className="text-sm text-gray-500 mt-1">
                Only vendors without active membership are shown
              </p>
            </div>

            <div>
              <label className="form-label">Membership Duration *</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {durations.map((option) => (
                  <label
                    key={option.value}
                    className={`cursor-pointer border-2 rounded-lg p-4 transition-all ${
                      duration === option.value
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="duration"
                      value={option.value}
                      checked={duration === option.value}
                      onChange={(e) => setDuration(e.target.value)}
                      className="hidden"
                    />
                    <div className="text-center">
                      <p className="font-medium">{option.label}</p>
                      <p className="text-sm text-gray-500">{option.price}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> The default selection is 6 months. 
                All fields are mandatory.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center space-x-2"
            >
              {loading ? (
                <span>Adding...</span>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add Membership</span>
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="text-center py-8">
            <CreditCard className="w-12 h-12 mx-auto text-gray-300 mb-3" />
            <h3 className="text-lg font-medium text-gray-900">No vendors available</h3>
            <p className="text-gray-500 mt-2">
              All vendors already have memberships or no vendors exist
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AddMembership
