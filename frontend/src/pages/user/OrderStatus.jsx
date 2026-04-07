import { useEffect, useState } from 'react'
import { userAPI } from '../../services/api.js'
import toast from 'react-hot-toast'
import { ClipboardList, Package, XCircle } from 'lucide-react'

const OrderStatus = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await userAPI.getOrders()
      setOrders(response.data.orders || [])
    } catch (error) {
      toast.error('Failed to load orders')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = async (orderId) => {
    if (!confirm('Are you sure you want to cancel this order?')) return
    try {
      await userAPI.cancelOrder(orderId)
      toast.success('Order cancelled successfully')
      fetchOrders()
    } catch (error) {
      toast.error('Failed to cancel order')
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      case 'shipped': return 'bg-blue-100 text-blue-800'
      default: return 'bg-yellow-100 text-yellow-800'
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
        <ClipboardList className="w-8 h-8 text-purple-600" />
        <div>
          <h1 className="text-2xl font-bold">Order Status</h1>
          <p className="text-gray-600">Track your orders and view history</p>
        </div>
      </div>

      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="card">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Package className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Order #{order._id?.slice(-8)}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  {order.status !== 'cancelled' && order.status !== 'completed' && (
                    <button
                      onClick={() => handleCancel(order._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      title="Cancel Order"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-600 mb-2">Items:</h4>
                <div className="space-y-2">
                  {order.items?.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{item.productId?.name || 'Unknown Product'} x {item.quantity}</span>
                      <span className="text-gray-600">
                        ${(item.productId?.price || 0) * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-gray-600">Total Amount</span>
                <span className="text-xl font-bold text-green-600">${order.totalAmount}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <ClipboardList className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No orders yet</h3>
          <p className="text-gray-500 mt-2">Your order history will appear here</p>
        </div>
      )}
    </div>
  )
}

export default OrderStatus
