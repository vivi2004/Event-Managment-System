import { Link } from 'react-router-dom'
import { User, Store, ShoppingBag, Sparkles, Calendar, Heart, Star } from 'lucide-react'

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative flex items-center justify-center" style={{ minHeight: 'calc(100vh - 64px)' }}>
        {/* Background with pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
          <div className="absolute inset-0 bg-black/20"></div>
          {/* Animated background elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-medium mb-6 sm:mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              Now Live: Event Management Platform
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 sm:mb-8 leading-tight">
              Create
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Unforgettable Events
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 sm:mb-12 max-w-3xl mx-auto px-4 leading-relaxed">
              The all-in-one platform for event planning, vendor management, and guest coordination. 
              Transform your vision into reality with powerful tools designed for modern event creators.
            </p>
            
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 px-4">
              <Link 
                to="/user/login" 
                className="group px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25 flex items-center justify-center"
              >
                Start Planning
                <ShoppingBag className="inline-block ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/vendor/login" 
                className="px-8 sm:px-10 py-4 sm:py-5 bg-white/10 backdrop-blur-md text-white rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300 border border-white/20 flex items-center justify-center"
              >
                Become a Vendor
                <Store className="inline-block ml-3 w-5 h-5" />
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-16 sm:mt-20 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">10K+</div>
                <div className="text-gray-300 text-sm sm:text-base">Events Managed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">500+</div>
                <div className="text-gray-300 text-sm sm:text-base">Verified Vendors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">50K+</div>
                <div className="text-gray-300 text-sm sm:text-base">Happy Users</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center text-white/60 animate-bounce">
            <span className="text-sm mb-2">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Choose Your Role</h2>
          <p className="text-base sm:text-lg text-gray-600">Select how you'd like to use our platform</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {/* Admin Card */}
          <Link to="/admin/login" className="group">
            <div className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="aspect-w-16 aspect-h-12">
                <img 
                  src="https://picsum.photos/seed/admin-dashboard/400/300.jpg" 
                  alt="Admin Dashboard"
                  className="w-full h-48 sm:h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                    <User className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold">Administrator</h3>
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
                  className="w-full h-48 sm:h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                    <Store className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold">Vendor</h3>
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
                  className="w-full h-48 sm:h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                    <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold">User</h3>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          <div className="text-center p-4 sm:p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Event Planning</h3>
            <p className="text-gray-600 text-xs sm:text-sm">Organize and manage your events seamlessly</p>
          </div>

          <div className="text-center p-4 sm:p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Store className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Vendor Marketplace</h3>
            <p className="text-gray-600 text-xs sm:text-sm">Connect with trusted service providers</p>
          </div>

          <div className="text-center p-4 sm:p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Guest Management</h3>
            <p className="text-gray-600 text-xs sm:text-sm">Keep track of your event attendees</p>
          </div>

          <div className="text-center p-4 sm:p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Star className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Quality Service</h3>
            <p className="text-gray-600 text-xs sm:text-sm">Verified vendors and secure payments</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 sm:p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg sm:text-xl text-purple-100 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Join thousands of users who trust our platform for their event management needs.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 px-4">
            <Link to="/user/signup" className="px-6 sm:px-8 py-3 bg-white text-purple-600 rounded-full font-semibold hover:bg-purple-50 transition-colors text-sm sm:text-base">
              Sign Up Free
            </Link>
            <Link to="/vendor/signup" className="px-6 sm:px-8 py-3 bg-white/20 backdrop-blur-sm text-white rounded-full font-semibold hover:bg-white/30 transition-colors border border-white/30 text-sm sm:text-base">
              Become a Vendor
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index
