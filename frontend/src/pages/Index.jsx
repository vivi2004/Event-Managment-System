import { Link } from 'react-router-dom'
import { User, Store, ShoppingBag, Sparkles, Calendar, Heart, Star } from 'lucide-react'

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 via-pink-600/90 to-blue-600/90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Event Management
              <span className="block text-3xl md:text-4xl mt-2 text-purple-100">Made Simple</span>
            </h1>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Transform your events with our comprehensive platform. Connect with vendors, manage guests, and create unforgettable experiences.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/user/login" className="group px-8 py-4 bg-white text-purple-600 rounded-full font-semibold hover:bg-purple-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Get Started
                <ShoppingBag className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/admin/login" className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-full font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30">
                Admin Portal
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-24 text-purple-50" fill="currentColor" viewBox="0 0 1440 100">
            <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z"></path>
          </svg>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Choose Your Role</h2>
          <p className="text-lg text-gray-600">Select how you'd like to use our platform</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Admin Card */}
          <Link to="/admin/login" className="group">
            <div className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="aspect-w-16 aspect-h-12">
                <img 
                  src="https://picsum.photos/seed/admin-dashboard/400/300.jpg" 
                  alt="Admin Dashboard"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                    <User className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold">Administrator</h3>
                </div>
                <p className="text-white/90 text-sm mb-4">Manage users, vendors, and system settings</p>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">Full Control</span>
                  <span className="text-white/70">→</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Vendor Card */}
          <Link to="/vendor/login" className="group">
            <div className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="aspect-w-16 aspect-h-12">
                <img 
                  src="https://picsum.photos/seed/vendor-products/400/300.jpg" 
                  alt="Vendor Products"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                    <Store className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold">Vendor</h3>
                </div>
                <p className="text-white/90 text-sm mb-4">Showcase products and manage orders</p>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">Sell Products</span>
                  <span className="text-white/70">→</span>
                </div>
              </div>
            </div>
          </Link>

          {/* User Card */}
          <Link to="/user/login" className="group">
            <div className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="aspect-w-16 aspect-h-12">
                <img 
                  src="https://picsum.photos/seed/event-planning/400/300.jpg" 
                  alt="Event Planning"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold">User</h3>
                </div>
                <p className="text-white/90 text-sm mb-4">Plan events and shop for products</p>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">Plan Events</span>
                  <span className="text-white/70">→</span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Event Planning</h3>
            <p className="text-gray-600 text-sm">Organize and manage your events seamlessly</p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Store className="w-6 h-6 text-pink-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Vendor Marketplace</h3>
            <p className="text-gray-600 text-sm">Connect with trusted service providers</p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Guest Management</h3>
            <p className="text-gray-600 text-sm">Keep track of your event attendees</p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Quality Service</h3>
            <p className="text-gray-600 text-sm">Verified vendors and secure payments</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust our platform for their event management needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/user/signup" className="px-8 py-3 bg-white text-purple-600 rounded-full font-semibold hover:bg-purple-50 transition-colors">
              Sign Up Free
            </Link>
            <Link to="/vendor/signup" className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white rounded-full font-semibold hover:bg-white/30 transition-colors border border-white/30">
              Become a Vendor
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index
