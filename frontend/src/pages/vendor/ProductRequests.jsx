import { useEffect, useState } from 'react'
import { vendorAPI } from '../../services/api.js'
import toast from 'react-hot-toast'
import { ShoppingCart, User, Check, X, MessageSquare } from 'lucide-react'
import BackButton from '../../components/BackButton.jsx'

const ProductRequests = () => {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [responseMessage, setResponseMessage] = useState('')
  const [selectedRequest, setSelectedRequest] = useState(null)

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    try {
      const response = await vendorAPI.getProductRequests()
      setRequests(response.data.requests || [])
    } catch (error) {
      toast.error('Failed to load product requests')
    } finally {
      setLoading(false)
    }
  }

  const handleRespond = async (requestId, status) => {
    try {
      await vendorAPI.respondToRequest(requestId, {
        status,
        responseMessage: responseMessage,
      })
      toast.success(`Request ${status} successfully`)
      setResponseMessage('')
      setSelectedRequest(null)
      fetchRequests()
    } catch (error) {
      toast.error('Failed to respond to request')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

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
                <ShoppingCart className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Product Requests
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Manage customer product requests
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
        {requests.length > 0 ? (
          <div className="space-y-6">
            {requests.map((request) => (
              <div key={request._id} className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <User className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{request.userId?.name || 'Unknown'}</h3>
                      <p className="text-gray-500">{request.userId?.email || 'N/A'}</p>
                    </div>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                    request.status === 'approved' ? 'bg-green-100 text-green-800' :
                    request.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    request.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {request.status}
                  </span>
                </div>

                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{request.productName}</h3>
                  <p className="text-gray-600 mb-4">{request.description}</p>
                  <div className="flex items-center space-x-8 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-500">Expected Price:</span>
                      <span className="font-bold text-emerald-600">${request.expectedPrice}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-500">Quantity:</span>
                      <span className="font-bold text-emerald-600">{request.quantity}</span>
                    </div>
                  </div>
                </div>

                {request.responseMessage && (
                  <div className="mb-6 p-4 bg-blue-50 rounded-xl">
                    <p className="text-sm text-blue-800">
                      <strong>Your Response:</strong> {request.responseMessage}
                    </p>
                  </div>
                )}

                {request.status === 'pending' && (
                  <div className="space-y-4">
                    {selectedRequest === request._id ? (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                            <MessageSquare className="w-4 h-4" />
                            <span>Response Message (Optional)</span>
                          </label>
                          <textarea
                            value={responseMessage}
                            onChange={(e) => setResponseMessage(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors h-20 resize-none"
                            placeholder="Enter your response message..."
                          />
                        </div>
                        <div className="flex space-x-3">
                          <button
                            onClick={() => setSelectedRequest(null)}
                            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleRespond(request._id, 'approved')}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 font-medium flex items-center justify-center space-x-2"
                          >
                            <Check className="w-4 h-4" />
                            <span>Approve</span>
                          </button>
                          <button
                            onClick={() => handleRespond(request._id, 'rejected')}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg hover:from-red-700 hover:to-pink-700 transition-all duration-200 font-medium flex items-center justify-center space-x-2"
                          >
                            <X className="w-4 h-4" />
                            <span>Reject</span>
                          </button>
                        </div>
                      </>
                    ) : (
                      <button
                        onClick={() => setSelectedRequest(request._id)}
                        className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium"
                      >
                        Respond to Request
                      </button>
                    )}
                  </div>
                )}

                <p className="text-xs text-gray-400 mt-6">
                  Requested on: {new Date(request.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No product requests</h3>
            <p className="text-gray-500">Customer requests will appear here</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductRequests
