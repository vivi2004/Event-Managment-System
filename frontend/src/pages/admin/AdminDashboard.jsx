import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { adminAPI } from '../../services/api.js'
import toast from 'react-hot-toast'
import { Users, Store, CreditCard, TrendingUp, Activity, Shield, Settings, Database } from 'lucide-react'
import BackButton from '../../components/BackButton.jsx'

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    vendors: 0,
    memberships: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [usersRes, vendorsRes] = await Promise.all([
        adminAPI.getUsers(),
        adminAPI.getVendors(),
      ])

      setStats({
        users: usersRes.data.count || 0,
        vendors: vendorsRes.data.count || 0,
        memberships: vendorsRes.data.vendors?.filter(v => v.membership?.length > 0).length || 0,
      })
    } catch (error) {
      toast.error('Failed to load dashboard stats')
    } finally {
      setLoading(false)
    }
  }

  const dashboardCards = [
    {
      title: 'Total Users',
      count: stats.users,
      icon: Users,
      color: 'from-blue-500 to-cyan-600',
      link: '/admin/maintain-user',
      description: 'Manage system users',
      image: 'https://picsum.photos/seed/admin-users/400/300.jpg',
    },
    {
      title: 'Active Vendors',
      count: stats.vendors,
      icon: Store,
      color: 'from-green-500 to-teal-600',
      link: '/admin/maintain-vendor',
      description: 'Manage vendors',
      image: 'https://picsum.photos/seed/admin-vendors/400/300.jpg',
    },
    {
      title: 'Memberships',
      count: stats.memberships,
      icon: CreditCard,
      color: 'from-purple-500 to-pink-600',
      link: '/admin/add-membership',
      description: 'Active memberships',
      image: 'https://picsum.photos/seed/admin-memberships/400/300.jpg',
    },
  ]

  const quickActions = [
    { 
      label: 'Add Membership', 
      link: '/admin/add-membership', 
      icon: CreditCard,
      color: 'from-purple-600 to-pink-600' 
    },
    { 
      label: 'Manage Users', 
      link: '/admin/maintain-user', 
      icon: Users,
      color: 'from-blue-600 to-cyan-600' 
    },
    { 
      label: 'Manage Vendors', 
      link: '/admin/maintain-vendor', 
      icon: Store,
      color: 'from-green-600 to-teal-600' 
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-purple-600/90 to-pink-600/90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <BackButton className="mb-6" />
          
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Admin Dashboard
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Complete control over your event management system
            </p>
            <div className="flex items-center justify-center space-x-2 mt-4">
              <Activity className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-medium">System Status: Operational</span>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16 text-gray-900" fill="currentColor" viewBox="0 0 1440 100">
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
                    <span className="text-sm">Manage now</span>
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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
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
                      <div className="flex items-center text-purple-600 group-hover:text-purple-700 font-medium transition-colors">
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

        {/* System Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Settings className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Available Actions</h2>
                <p className="text-gray-600 text-sm">System management features</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Add/Update Memberships</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Add/Update Users & Vendors</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Users Management (CRUD)</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Vendor Management (CRUD)</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Database className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">System Features</h2>
                <p className="text-gray-600 text-sm">Platform capabilities</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-700">Role-based access control</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-700">Membership duration tracking</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-700">Real-time statistics</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-700">Secure authentication</span>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-6">System Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Users className="w-8 h-8" />
              </div>
              <p className="text-3xl font-bold">{stats.users}</p>
              <p className="text-white/80 text-sm">Total Users</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Store className="w-8 h-8" />
              </div>
              <p className="text-3xl font-bold">{stats.vendors}</p>
              <p className="text-white/80 text-sm">Active Vendors</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-3">
                <CreditCard className="w-8 h-8" />
              </div>
              <p className="text-3xl font-bold">{stats.memberships}</p>
              <p className="text-white/80 text-sm">Memberships</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Activity className="w-8 h-8" />
              </div>
              <p className="text-3xl font-bold">100%</p>
              <p className="text-white/80 text-sm">Uptime</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
