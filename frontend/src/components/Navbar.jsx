import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { UserCircle, LogOut, Menu, X, Sparkles, ShoppingCart, Package, Users } from 'lucide-react'
import { useState } from 'react'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const getDashboardLink = () => {
    if (!user) return '/'
    switch (user.role) {
      case 'admin':
        return '/admin/dashboard'
      case 'vendor':
        return '/vendor/dashboard'
      case 'user':
        return '/user/portal'
      default:
        return '/'
    }
  }

  const getNavLinks = () => {
    if (!user) {
      return []
    }

    switch (user.role) {
      case 'admin':
        return [
          { to: '/admin/dashboard', label: 'Dashboard', icon: null },
          { to: '/admin/maintain-user', label: 'Users', icon: Users },
          { to: '/admin/maintain-vendor', label: 'Vendors', icon: Package },
          { to: '/admin/add-membership', label: 'Membership', icon: null },
        ]
      case 'vendor':
        return [
          { to: '/vendor/dashboard', label: 'Dashboard', icon: null },
          { to: '/vendor/add-item', label: 'Add Item', icon: null },
          { to: '/vendor/products', label: 'Products', icon: Package },
          { to: '/vendor/transactions', label: 'Transactions', icon: null },
        ]
      case 'user':
        return [
          { to: '/user/portal', label: 'Portal', icon: null },
          { to: '/user/vendors', label: 'Vendors', icon: Package },
          { to: '/user/cart', label: 'Cart', icon: ShoppingCart },
          { to: '/user/guest-list', label: 'Guest List', icon: Users },
          { to: '/user/order-status', label: 'Orders', icon: null },
        ]
      default:
        return []
    }
  }

  return (
    <nav className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white shadow-xl sticky top-0 z-50 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={getDashboardLink()} className="flex items-center space-x-2 group">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm group-hover:bg-white/30 transition-all duration-200">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold hidden sm:block">Event Management</span>
            <span className="text-lg font-bold sm:hidden">EM</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center space-x-1">
            {getNavLinks().map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-200 text-sm font-medium"
              >
                {link.icon && <link.icon className="w-4 h-4" />}
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {user ? (
              <>
                <div className="hidden sm:flex items-center space-x-2 px-3 py-2 bg-white/10 rounded-lg backdrop-blur-sm">
                  <UserCircle className="w-5 h-5 text-white/80" />
                  <span className="text-sm font-medium hidden lg:block">{user.name}</span>
                  <span className="text-xs text-white/60 capitalize">({user.role})</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-all duration-200 backdrop-blur-sm"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline text-sm font-medium">Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/"
                className="px-3 sm:px-4 py-2 bg-white text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-all duration-200 shadow-lg hover:shadow-xl text-sm"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg hover:bg-white/20 transition-all duration-200"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden py-4 border-t border-white/20">
            <div className="flex flex-col space-y-1">
              {user && (
                <div className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-lg mb-2">
                  <UserCircle className="w-5 h-5 text-white/80" />
                  <div>
                    <span className="text-sm font-medium block">{user.name}</span>
                    <span className="text-xs text-white/60 capitalize">({user.role})</span>
                  </div>
                </div>
              )}
              {getNavLinks().map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-200"
                >
                  {link.icon && <link.icon className="w-4 h-4" />}
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
