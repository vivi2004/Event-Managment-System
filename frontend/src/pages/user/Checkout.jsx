import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CreditCard, CheckCircle, ArrowLeft, Lock } from 'lucide-react'
import toast from 'react-hot-toast'
import { userAPI } from '../../services/api.js'

const Checkout = () => {
  const [cart] = useState(() => {
    const savedCart = localStorage.getItem('cart')
    return savedCart ? JSON.parse(savedCart) : []
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const handleCheckout = async () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty')
      return
    }

    setLoading(true)

    try {
      const items = cart.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      }))

      await userAPI.createOrder({ items })
      
      // Clear cart
      localStorage.removeItem('cart')
      
      toast.success('Order placed successfully!')
      navigate('/user/order-success')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order')
    } finally {
      setLoading(false)
    }
  }

  if (cart.length === 0) {
    return (
      <div className="card text-center py-12">
        <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">No items to checkout</h2>
        <p className="text-gray-600">Your cart is empty</p>
        <button
          onClick={() => navigate('/user/products')}
          className="mt-6 btn-primary"
        >
          Browse Products
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => navigate('/user/cart')}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Cart
      </button>

      <div className="card">
        <div className="text-center mb-8">
          <CreditCard className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold">Checkout</h1>
          <p className="text-gray-600">Complete your order</p>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h2 className="font-bold mb-4">Order Summary</h2>
          <div className="space-y-2">
            {cart.map((item) => (
              <div key={item.productId} className="flex justify-between text-sm">
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t mt-4 pt-4 flex justify-between text-xl font-bold">
            <span>Total</span>
            <span className="text-green-600">${totalAmount.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Form (Simulated) */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-4">
            <Lock className="w-4 h-4" />
            <span>Secure Payment (Simulated)</span>
          </div>
          
          <div>
            <label className="form-label">Card Number</label>
            <input
              type="text"
              placeholder="**** **** **** ****"
              className="input"
              disabled
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">Expiry Date</label>
              <input
                type="text"
                placeholder="MM/YY"
                className="input"
                disabled
              />
            </div>
            <div>
              <label className="form-label">CVV</label>
              <input
                type="text"
                placeholder="***"
                className="input"
                disabled
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
        >
          {loading ? (
            <span>Processing...</span>
          ) : (
            <>
              <Lock className="w-4 h-4" />
              <span>Pay ${totalAmount.toFixed(2)}</span>
            </>
          )}
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          This is a simulated payment. No actual charges will be made.
        </p>
      </div>
    </div>
  )
}

export default Checkout
