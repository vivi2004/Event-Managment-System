import { useEffect, useState } from 'react'
import { vendorAPI } from '../../services/api.js'
import toast from 'react-hot-toast'
import { ShoppingCart, User, Check, X, MessageSquare } from 'lucide-react'

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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <ShoppingCart className="w-8 h-8 text-purple-600" />
        <div>
          <h1 className="text-2xl font-bold">Product Requests</h1>
          <p className="text-gray-600">Customer requests for custom products</p>
        </div>
      </div>

      {requests.length > 0 ? (
        <div className="space-y-4">
          {requests.map((request) => (
            <div key={request._id} className="card">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-gray-400" />
                  <span className="font-medium">{request.userId?.name || 'Unknown'}</span>
                  <span className="text-gray-400 text-sm">({request.userId?.email || 'N/A'})</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  request.status === 'approved' ? 'bg-green-100 text-green-800' :
                  request.status === 'rejected' ? 'bg-red-100 text-red-800' :
                  request.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {request.status}
                </span>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-lg">{request.productName}</h3>
                <p className="text-gray-600 mt-1">{request.description}</p>
                <div className="flex items-center space-x-6 mt-3 text-sm">
                  <span className="text-gray-600">
                    <strong>Expected Price:</strong> ${request.expectedPrice}
                  </span>
                  <span className="text-gray-600">
                    <strong>Quantity:</strong> {request.quantity}
                  </span>
                </div>
              </div>

              {request.responseMessage && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Your Response:</strong> {request.responseMessage}
                  </p>
                </div>
              )}

              {request.status === 'pending' && (
                <div className="mt-4 space-y-3">
                  {selectedRequest === request._id ? (
                    <>
                      <div>
                        <label className="form-label flex items-center space-x-2">
                          <MessageSquare className="w-4 h-4" />
                          <span>Response Message (Optional)</span>
                        </label>
                        <textarea
                          value={responseMessage}
                          onChange={(e) => setResponseMessage(e.target.value)}
                          className="input h-20 resize-none"
                          placeholder="Enter your response message..."
                        />
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => setSelectedRequest(null)}
                          className="btn-secondary flex-1"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleRespond(request._id, 'approved')}
                          className="btn-success flex-1 flex items-center justify-center space-x-2"
                        >
                          <Check className="w-4 h-4" />
                          <span>Approve</span>
                        </button>
                        <button
                          onClick={() => handleRespond(request._id, 'rejected')}
                          className="btn-danger flex-1 flex items-center justify-center space-x-2"
                        >
                          <X className="w-4 h-4" />
                          <span>Reject</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <button
                      onClick={() => setSelectedRequest(request._id)}
                      className="btn-primary w-full"
                    >
                      Respond to Request
                    </button>
                  )}
                </div>
              )}

              <p className="text-xs text-gray-400 mt-4">
                Requested on: {new Date(request.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No product requests</h3>
          <p className="text-gray-500 mt-2">Customer requests will appear here</p>
        </div>
      )}
    </div>
  )
}

export default ProductRequests
