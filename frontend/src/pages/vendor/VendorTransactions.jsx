import { useEffect, useState } from 'react'
import { vendorAPI } from '../../services/api.js'
import toast from 'react-hot-toast'
import { DollarSign, User, Package } from 'lucide-react'

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
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <DollarSign className="w-8 h-8 text-green-600" />
        <div>
          <h1 className="text-2xl font-bold">Transactions</h1>
          <p className="text-gray-600">Orders containing your products</p>
        </div>
      </div>

      {transactions.length > 0 ? (
        <div className="space-y-4">
          {transactions.map((order) => (
            <div key={order._id} className="card">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-gray-400" />
                  <span className="font-medium">{order.userId?.name || 'Unknown'}</span>
                  <span className="text-gray-400">({order.userId?.email || 'N/A'})</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === 'completed' ? 'bg-green-100 text-green-800' :
                  order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status}
                </span>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-600 mb-2">Items:</h4>
                <div className="space-y-2">
                  {order.items?.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <Package className="w-4 h-4 text-gray-400" />
                        <span>{item.productId?.name || 'Unknown Product'}</span>
                      </div>
                      <span className="text-gray-600">
                        x{item.quantity} - ${(item.productId?.price || 0) * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t mt-4 pt-4 flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
                <span className="text-lg font-bold text-green-600">
                  Total: ${order.totalAmount}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <DollarSign className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No transactions yet</h3>
          <p className="text-gray-500 mt-2">Transactions will appear when customers order your products</p>
        </div>
      )}
    </div>
  )
}

export default VendorTransactions
