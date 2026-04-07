import { useEffect, useState } from 'react'
import { vendorAPI } from '../../services/api.js'
import toast from 'react-hot-toast'
import { DollarSign, User, Package } from 'lucide-react'
import BackButton from '../../components/BackButton.jsx'

const VendorTransactions = () => {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    try {
      const response = await vendorAPI.getTransactions()
      setTransactions(response.data.orders || [])
    } catch (error) {
      toast.error('Failed to load transactions')
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
                <DollarSign className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Transactions
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Orders containing your products
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
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          </div>
        ) : transactions.length > 0 ? (
          <div className="space-y-6">
            {transactions.map((order) => (
              <div key={order._id} className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <User className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{order.userId?.name || 'Unknown'}</h3>
                      <p className="text-gray-500">{order.userId?.email || 'N/A'}</p>
                    </div>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                    order.status === 'completed' ? 'bg-green-100 text-green-800' :
                    order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
                
                <div className="border-t border-gray-100 pt-6">
                  <h4 className="text-sm font-semibold text-gray-600 mb-4">Items:</h4>
                  <div className="space-y-3">
                    {order.items?.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                            <Package className="w-4 h-4 text-emerald-600" />
                          </div>
                          <span className="font-medium text-gray-900">{item.productId?.name || 'Unknown Product'}</span>
                        </div>
                        <span className="text-gray-600 font-medium">
                          x{item.quantity} - ${(item.productId?.price || 0) * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-100 mt-6 pt-6 flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="text-2xl font-bold text-emerald-600">${order.totalAmount}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <DollarSign className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No transactions yet</h3>
            <p className="text-gray-500">Transactions will appear when customers order your products</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default VendorTransactions
