import { useEffect, useState } from 'react'
import { userAPI } from '../../services/api.js'
import toast from 'react-hot-toast'
import { Package, Plus, Minus, ShoppingCart, Star, Heart } from 'lucide-react'
import BackButton from '../../components/BackButton.jsx'
import { getProductImage } from '../../utils/productImages.js'

const ViewProducts = () => {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await userAPI.getProducts()
      setProducts(response.data.products || [])
    } catch (error) {
      toast.error('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.productId === product._id)
    let newCart
    
    if (existingItem) {
      newCart = cart.map(item =>
        item.productId === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    } else {
      newCart = [...cart, { productId: product._id, name: product.name, price: product.price, quantity: 1 }]
    }
    
    setCart(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
    toast.success(`${product.name} added to cart`)
  }

  const removeFromCart = (productId) => {
    const newCart = cart.filter(item => item.productId !== productId)
    setCart(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
  }

  const updateQuantity = (productId, delta) => {
    const newCart = cart.map(item => {
      if (item.productId === productId) {
        const newQuantity = item.quantity + delta
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item
      }
      return item
    }).filter(item => item.quantity > 0)
    
    setCart(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
  }

  const getCartItem = (productId) => cart.find(item => item.productId === productId)

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 via-pink-600/90 to-blue-600/90"></div>
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
              Browse Products
            </h1>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Discover amazing products from our trusted vendors
            </p>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16 text-purple-50" fill="currentColor" viewBox="0 0 1440 100">
            <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z"></path>
          </svg>
        </div>
      </div>

      {/* Cart Summary */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ShoppingCart className="w-8 h-8 text-purple-600" />
              <div>
                <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
                <p className="text-gray-600">{cart.length} items in cart</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-2xl font-bold text-green-600">
                ${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
              </p>
            </div>
          </div>
          {cart.length > 0 && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => window.location.href = '/user/checkout'}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => {
              const cartItem = getCartItem(product._id)
              const imageUrl = getProductImage(product.name, index)
              
              return (
                <div key={product._id} className="group">
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                    {/* Product Image */}
                    <div className="relative overflow-hidden">
                      <img 
                        src={imageUrl} 
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                          <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
                        </button>
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                          In Stock
                        </span>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                          {product.name}
                        </h3>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {product.description}
                      </p>

                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-2xl font-bold text-green-600">${product.price}</p>
                          <p className="text-xs text-gray-500">per item</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">Vendor</p>
                          <p className="text-sm font-medium text-gray-700">
                            {product.vendorId?.name || 'Unknown'}
                          </p>
                        </div>
                      </div>

                      {/* Cart Actions */}
                      {cartItem ? (
                        <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(product._id, -1)}
                              className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors shadow-sm"
                            >
                              <Minus className="w-4 h-4 text-gray-600" />
                            </button>
                            <span className="font-bold text-gray-900 w-8 text-center">
                              {cartItem.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(product._id, 1)}
                              className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors shadow-sm"
                            >
                              <Plus className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-semibold text-gray-700">
                              ${(product.price * cartItem.quantity).toFixed(2)}
                            </span>
                            <button
                              onClick={() => removeFromCart(product._id)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(product)}
                          className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center justify-center space-x-2 group"
                        >
                          <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                          <span>Add to Cart</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No products available</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Check back later for new products from our vendors
            </p>
            <button
              onClick={() => window.location.href = '/user/vendors'}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
            >
              Browse Vendors
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ViewProducts
