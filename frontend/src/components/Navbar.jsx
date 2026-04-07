import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { UserCircle, LogOut, Menu, X } from 'lucide-react'
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
      return [
        { to: '/', label: 'Home' },
      ]
    }

    switch (user.role) {
      case 'admin':
        return [
          { to: '/admin/dashboard', label: 'Dashboard' },
          { to: '/admin/maintain-user', label: 'Users' },
          { to: '/admin/maintain-vendor', label: 'Vendors' },
          { to: '/admin/add-membership', label: 'Add Membership' },
        ]
      case 'vendor':
        return [
          { to: '/vendor/dashboard', label: 'Dashboard' },
          { to: '/vendor/add-item', label: 'Add Item' },
          { to: '/vendor/products', label: 'Products' },
          { to: '/vendor/transactions', label: 'Transactions' },
        ]
      case 'user':
        return [
          { to: '/user/portal', label: 'Portal' },
          { to: '/user/vendors', label: 'Vendors' },
          { to: '/user/cart', label: 'Cart' },
          { to: '/user/guest-list', label: 'Guest List' },
          { to: '/user/order-status', label: 'Orders' },
        ]
      default:
        return []
    }
  }

  return (
    <nav className="bg-primary-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={getDashboardLink()} className="text-xl font-bold">
            Event Management
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {getNavLinks().map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-3 py-2 rounded-md hover:bg-primary-700 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center space-x-2">
                  <UserCircle className="w-6 h-6" />
                  <span className="hidden md:inline">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-primary-700 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden md:inline">Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/"
                className="px-4 py-2 bg-white text-primary-600 rounded-md font-medium hover:bg-gray-100 transition-colors"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-primary-700 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-primary-500">
            <div className="flex flex-col space-y-2">
              {getNavLinks().map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-md hover:bg-primary-700 transition-colors"
                >
                  {link.label}
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
