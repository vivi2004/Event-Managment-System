import { Link } from 'react-router-dom'
import { User, Store, ShoppingCart, Users, Package, ClipboardList, Calendar, Heart, Star } from 'lucide-react'
import BackButton from '../../components/BackButton.jsx'

const UserPortal = () => {
  const features = [
    {
      title: 'View Vendors',
      description: 'Browse all available vendors and their products',
      icon: Store,
      link: '/user/vendors',
      color: 'from-blue-500 to-purple-600',
      image: 'https://picsum.photos/seed/vendors-marketplace/400/300.jpg',
    },
    {
      title: 'My Cart',
      description: 'View and manage your shopping cart',
      icon: ShoppingCart,
      link: '/user/cart',
      color: 'from-green-500 to-teal-600',
      image: 'https://picsum.photos/seed/shopping-cart/400/300.jpg',
    },
    {
      title: 'Guest List',
      description: 'Manage your event guests',
      icon: Users,
      link: '/user/guest-list',
      color: 'from-purple-500 to-pink-600',
      image: 'https://picsum.photos/seed/guest-management/400/300.jpg',
    },
    {
      title: 'Order Status',
      description: 'Track your orders and view history',
      icon: ClipboardList,
      link: '/user/order-status',
      color: 'from-orange-500 to-red-600',
      image: 'https://picsum.photos/seed/order-tracking/400/300.jpg',
    },
    {
      title: 'Request Item',
      description: 'Request custom products from vendors',
      icon: Package,
      link: '/user/request-item',
      color: 'from-pink-500 to-rose-600',
      image: 'https://picsum.photos/seed/custom-request/400/300.jpg',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 via-pink-600/90 to-blue-600/90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="absolute top-0 left-0">
            <BackButton className="mb-6" />
          </div>
          
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                <User className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              User Portal
            </h1>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Welcome! Manage your event needs from one place.
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

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Link
                key={feature.title}
                to={feature.link}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="aspect-w-16 aspect-h-12">
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center shadow-lg`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold">{feature.title}</h3>
                    </div>
                    <p className="text-white/90 text-sm mb-4">{feature.description}</p>
                    <div className="flex items-center space-x-2 text-sm">
                      <span className={`px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full`}>
                        Access Now
                      </span>
                      <span className="text-white/70 group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Plan Events</h3>
            <p className="text-gray-600 text-sm">Organize your perfect event with our tools</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6 text-pink-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Manage Guests</h3>
            <p className="text-gray-600 text-sm">Keep track of all your event attendees</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Quality Service</h3>
            <p className="text-gray-600 text-sm">Connect with verified vendors</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link 
              to="/user/vendors" 
              className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl hover:shadow-lg transition-all duration-200 group"
            >
              <Store className="w-8 h-8 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
              <p className="font-medium text-gray-900">Browse Vendors</p>
              <p className="text-sm text-gray-600">Find services</p>
            </Link>

            <Link 
              to="/user/cart" 
              className="p-4 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl hover:shadow-lg transition-all duration-200 group"
            >
              <ShoppingCart className="w-8 h-8 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
              <p className="font-medium text-gray-900">View Cart</p>
              <p className="text-sm text-gray-600">Checkout items</p>
            </Link>

            <Link 
              to="/user/guest-list" 
              className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl hover:shadow-lg transition-all duration-200 group"
            >
              <Users className="w-8 h-8 text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
              <p className="font-medium text-gray-900">Guest List</p>
              <p className="text-sm text-gray-600">Manage guests</p>
            </Link>

            <Link 
              to="/user/order-status" 
              className="p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl hover:shadow-lg transition-all duration-200 group"
            >
              <ClipboardList className="w-8 h-8 text-orange-600 mb-2 group-hover:scale-110 transition-transform" />
              <p className="font-medium text-gray-900">Track Orders</p>
              <p className="text-sm text-gray-600">View status</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserPortal
