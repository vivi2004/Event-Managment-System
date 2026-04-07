import { useEffect, useState } from 'react'
import { vendorAPI } from '../../services/api.js'
import toast from 'react-hot-toast'
import { Package, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import BackButton from '../../components/BackButton.jsx'
import { getProductImage } from '../../utils/productImages.js'

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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/90 via-teal-600/90 to-cyan-600/90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="absolute top-0 left-0">
            <BackButton className="mb-6" />
          </div>
          
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                <Package className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              My Products
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Manage your product catalog
            </p>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16 text-emerald-50" fill="currentColor" viewBox="0 0 1440 100">
            <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z"></path>
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-end mb-8">
          <Link to="/vendor/add-item" className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 font-medium flex items-center space-x-2 shadow-lg">
            <Package className="w-4 h-4" />
            <span>Add Product</span>
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div key={product._id} className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                <div className="relative h-48">
                  <img 
                    src={getProductImage(product.name, index)} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                    >
                      <Trash2 className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{product.name}</h3>
                    <p className="text-emerald-300 font-semibold">${product.price}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
                  <p className="text-xs text-gray-400 mt-4">
                    Added: {new Date(product.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No products yet</h3>
            <p className="text-gray-500 mb-6">Start by adding your first product</p>
            <Link to="/vendor/add-item" className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 font-medium inline-flex items-center space-x-2 shadow-lg">
              <Package className="w-4 h-4" />
              <span>Add Product</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default VendorProducts
