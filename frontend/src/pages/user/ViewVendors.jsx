import { useEffect, useState } from 'react'
import { userAPI } from '../../services/api.js'
import toast from 'react-hot-toast'
import { Store, Package } from 'lucide-react'
import { Link } from 'react-router-dom'

const ViewVendors = () => {
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)

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
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Store className="w-8 h-8 text-purple-600" />
        <div>
          <h1 className="text-2xl font-bold">Vendors</h1>
          <p className="text-gray-600">Browse our registered vendors</p>
        </div>
      </div>

      {vendors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors.map((vendor) => (
            <div key={vendor._id} className="card">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Store className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold">{vendor.name}</h3>
                  <p className="text-sm text-gray-500">{vendor.email}</p>
                </div>
              </div>
              
              {vendor.membership && vendor.membership.length > 0 && (
                <div className="mb-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Verified Vendor
                  </span>
                </div>
              )}

              <Link
                to="/user/products"
                className="w-full block text-center py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
              >
                <Package className="w-4 h-4 inline mr-2" />
                View Products
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <Store className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No vendors yet</h3>
          <p className="text-gray-500 mt-2">Check back later for available vendors</p>
        </div>
      )}
    </div>
  )
}

export default ViewVendors
