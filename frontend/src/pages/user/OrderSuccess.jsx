import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, ShoppingBag, ClipboardList } from 'lucide-react'

const OrderSuccess = () => {
  const [orderDetails, setOrderDetails] = useState(null)

  useEffect(() => {
    // In a real app, you would fetch the order details from the API
    // For now, we'll just show a success message
  }, [])

  return (
    <div className="max-w-md mx-auto text-center py-12">
      <div className="mb-6">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Order Placed Successfully!
      </h1>
      
      <p className="text-gray-600 mb-8">
        Thank you for your purchase. Your order has been confirmed and is being processed.
      </p>

      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
        <h2 className="font-semibold text-green-900 mb-2">What happens next?</h2>
        <ul className="text-green-700 text-sm space-y-2 text-left">
          <li>• You will receive an order confirmation email</li>
          <li>• The vendor will prepare your items</li>
          <li>• You can track your order status in the Orders section</li>
        </ul>
      </div>

      <div className="space-y-3">
        <Link
          to="/user/order-status"
          className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2 inline-block"
        >
          <ClipboardList className="w-5 h-5" />
          <span>View My Orders</span>
        </Link>
        
        <Link
          to="/user/products"
          className="w-full py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center space-x-2 inline-block"
        >
          <ShoppingBag className="w-5 h-5" />
          <span>Continue Shopping</span>
        </Link>
      </div>
    </div>
  )
}

export default OrderSuccess
