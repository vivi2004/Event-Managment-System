import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { vendorAPI } from '../../services/api.js'
import toast from 'react-hot-toast'
import { Store, Package, ShoppingCart, MessageSquare, TrendingUp, Plus, Eye } from 'lucide-react'
import BackButton from '../../components/BackButton.jsx'
import { getProductImage, getCakeImage, getFlowerImage } from '../../utils/productImages.js'

const VendorDashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    transactions: 0,
    requests: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [productsRes, transactionsRes, requestsRes] = await Promise.all([
        vendorAPI.getProducts(),
        vendorAPI.getTransactions(),
        vendorAPI.getProductRequests(),
      ])

      setStats({
        products: productsRes.data.count || 0,
        transactions: transactionsRes.data.count || 0,
        requests: requestsRes.data.count || 0,
      })
    } catch (error) {
      toast.error('Failed to load dashboard stats')
    } finally {
      setLoading(false)
    }
  }

  const dashboardCards = [
    {
      title: 'My Products',
      count: stats.products,
      icon: Package,
      color: 'from-green-500 to-teal-600',
      link: '/vendor/products',
      description: 'Manage your product listings',
      image: getCakeImage(0),
    },
    {
      title: 'Transactions',
      count: stats.transactions,
      icon: ShoppingCart,
      color: 'from-blue-500 to-cyan-600',
      link: '/vendor/transactions',
      description: 'View customer orders',
      image: getFlowerImage(0),
    },
    {
      title: 'Product Requests',
      count: stats.requests,
      icon: MessageSquare,
      color: 'from-purple-500 to-pink-600',
      link: '/vendor/product-requests',
      description: 'Customer inquiries',
      image: getProductImage('request', 0),
    },
  ]

  const quickActions = [
    { 
      label: 'Add New Product', 
      link: '/vendor/add-item', 
      icon: Plus,
      color: 'from-green-600 to-teal-600' 
    },
    { 
      label: 'View Products', 
      link: '/vendor/products', 
      icon: Package,
      color: 'from-blue-600 to-cyan-600' 
    },
    { 
      label: 'View Transactions', 
      link: '/vendor/transactions', 
      icon: ShoppingCart,
      color: 'from-purple-600 to-pink-600' 
    },
  ]

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
                <Store className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Vendor Dashboard
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Manage your products and grow your business
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
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Link
                key={action.label}
                to={action.link}
                className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${action.color}`}></div>
                <div className="relative p-6 text-white">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{action.label}</h3>
                      <p className="text-white/80 text-sm">Quick access</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-white/90 group-hover:text-white transition-colors">
                    <span className="text-sm">Get started</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Stats Grid */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {dashboardCards.map((card) => {
              const Icon = card.icon
              return (
                <Link
                  key={card.title}
                  to={card.link}
                  className="group"
                >
                  <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                    <div className="relative h-48">
                      <img 
                        src={card.image} 
                        alt={card.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                      <div className="absolute top-4 right-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center shadow-lg`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-2xl font-bold">{card.count}</h3>
                        <p className="text-white/90">{card.title}</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 text-sm mb-4">{card.description}</p>
                      <div className="flex items-center text-emerald-600 group-hover:text-emerald-700 font-medium transition-colors">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        <span>View Details</span>
                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}

        {/* Performance Overview */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white mb-12">
          <h2 className="text-2xl font-bold mb-6">Business Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Package className="w-8 h-8" />
              </div>
              <p className="text-3xl font-bold">{stats.products}</p>
              <p className="text-white/80 text-sm">Total Products</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-3">
                <ShoppingCart className="w-8 h-8" />
              </div>
              <p className="text-3xl font-bold">{stats.transactions}</p>
              <p className="text-white/80 text-sm">Total Orders</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-3">
                <MessageSquare className="w-8 h-8" />
              </div>
              <p className="text-3xl font-bold">{stats.requests}</p>
              <p className="text-white/80 text-sm">Customer Requests</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-8 h-8" />
              </div>
              <p className="text-3xl font-bold">98%</p>
              <p className="text-white/80 text-sm">Satisfaction Rate</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                <p className="text-gray-600 text-sm">Your latest business metrics</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                <span className="text-gray-700">Products Listed</span>
                <span className="font-bold text-emerald-600">{stats.products}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="text-gray-700">Orders Received</span>
                <span className="font-bold text-blue-600">{stats.transactions}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <span className="text-gray-700">Pending Requests</span>
                <span className="font-bold text-purple-600">{stats.requests}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                <Store className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Vendor Tools</h2>
                <p className="text-gray-600 text-sm">Manage your business efficiently</p>
              </div>
            </div>
            <div className="space-y-3">
              <Link
                to="/vendor/add-item"
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Plus className="w-5 h-5 text-emerald-600" />
                <span className="text-gray-700">Add New Product</span>
              </Link>
              <Link
                to="/vendor/products"
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Package className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700">Manage Products</span>
              </Link>
              <Link
                to="/vendor/transactions"
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ShoppingCart className="w-5 h-5 text-purple-600" />
                <span className="text-gray-700">View Orders</span>
              </Link>
              <Link
                to="/vendor/product-requests"
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <MessageSquare className="w-5 h-5 text-teal-600" />
                <span className="text-gray-700">Customer Requests</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VendorDashboard
