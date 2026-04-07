import { useEffect, useState } from 'react'
import { vendorAPI } from '../../services/api.js'
import toast from 'react-hot-toast'
import { Package, Trash2, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'

const VendorProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await vendorAPI.getProducts()
      setProducts(response.data.products || [])
    } catch (error) {
      toast.error('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    try {
      await vendorAPI.deleteProduct(id)
      toast.success('Product deleted successfully')
      fetchProducts()
    } catch (error) {
      toast.error('Failed to delete product')
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
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Package className="w-8 h-8 text-green-600" />
          <div>
            <h1 className="text-2xl font-bold">My Products</h1>
            <p className="text-gray-600">Manage your product catalog</p>
          </div>
        </div>
        <Link to="/vendor/add-item" className="btn-success flex items-center space-x-2">
          + Add Product
        </Link>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product._id} className="card">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-lg">{product.name}</h3>
                  <p className="text-green-600 font-semibold mt-1">${product.price}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-gray-600 text-sm mt-3 line-clamp-2">{product.description}</p>
              <p className="text-xs text-gray-400 mt-4">
                Added: {new Date(product.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No products yet</h3>
          <p className="text-gray-500 mt-2">Start by adding your first product</p>
          <Link to="/vendor/add-item" className="btn-success mt-6 inline-block">
            Add Product
          </Link>
        </div>
      )}
    </div>
  )
}

export default VendorProducts
