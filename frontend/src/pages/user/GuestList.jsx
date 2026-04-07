import { useEffect, useState } from 'react'
import { userAPI } from '../../services/api.js'
import toast from 'react-hot-toast'
import { Users, Plus, Edit2, Trash2, X, Check, Mail, Phone } from 'lucide-react'

const GuestList = () => {
  const [guests, setGuests] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedGuest, setSelectedGuest] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventName: '',
    status: 'invited',
    notes: '',
  })

  useEffect(() => {
    fetchGuests()
  }, [])

  const fetchGuests = async () => {
    try {
      const response = await userAPI.getGuestList()
      setGuests(response.data.guests || [])
    } catch (error) {
      toast.error('Failed to load guest list')
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async (e) => {
    e.preventDefault()
    try {
      await userAPI.addGuest(formData)
      toast.success('Guest added successfully')
      setShowAddModal(false)
      setFormData({ name: '', email: '', phone: '', eventName: '', status: 'invited', notes: '' })
      fetchGuests()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add guest')
    }
  }

  const handleEdit = async (e) => {
    e.preventDefault()
    try {
      await userAPI.updateGuest(selectedGuest._id, formData)
      toast.success('Guest updated successfully')
      setShowEditModal(false)
      setSelectedGuest(null)
      fetchGuests()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update guest')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to remove this guest?')) return
    try {
      await userAPI.deleteGuest(id)
      toast.success('Guest removed successfully')
      fetchGuests()
    } catch (error) {
      toast.error('Failed to remove guest')
    }
  }

  const openEditModal = (guest) => {
    setSelectedGuest(guest)
    setFormData({
      name: guest.name,
      email: guest.email,
      phone: guest.phone || '',
      eventName: guest.eventName,
      status: guest.status,
      notes: guest.notes || '',
    })
    setShowEditModal(true)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'declined': return 'bg-red-100 text-red-800'
      case 'attended': return 'bg-blue-100 text-blue-800'
      default: return 'bg-yellow-100 text-yellow-800'
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
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Users className="w-8 h-8 text-purple-600" />
          <div>
            <h1 className="text-2xl font-bold">Guest List</h1>
            <p className="text-gray-600">Manage your event guests</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Guest</span>
        </button>
      </div>

      {guests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {guests.map((guest) => (
            <div key={guest._id} className="card">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold">{guest.name}</h3>
                  <p className="text-sm text-gray-600">{guest.eventName}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(guest.status)}`}>
                  {guest.status}
                </span>
              </div>
              
              <div className="mt-3 space-y-1 text-sm">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{guest.email}</span>
                </div>
                {guest.phone && (
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{guest.phone}</span>
                  </div>
                )}
              </div>

              {guest.notes && (
                <p className="mt-3 text-sm text-gray-500 bg-gray-50 p-2 rounded">
                  {guest.notes}
                </p>
              )}

              <div className="mt-4 flex items-center justify-end space-x-2">
                <button
                  onClick={() => openEditModal(guest)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(guest._id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <Users className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium">No guests yet</h3>
          <p className="text-gray-500 mt-2">Add guests to your event</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="mt-6 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Add First Guest
          </button>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="card w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Add Guest</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="form-label">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input"
                  required
                />
              </div>
              <div>
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input"
                  required
                />
              </div>
              <div>
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="input"
                />
              </div>
              <div>
                <label className="form-label">Event Name *</label>
                <input
                  type="text"
                  value={formData.eventName}
                  onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                  className="input"
                  required
                />
              </div>
              <div>
                <label className="form-label">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="input"
                >
                  <option value="invited">Invited</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="declined">Declined</option>
                  <option value="attended">Attended</option>
                </select>
              </div>
              <div>
                <label className="form-label">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="input h-20 resize-none"
                />
              </div>
              <div className="flex space-x-3">
                <button type="button" onClick={() => setShowAddModal(false)} className="btn-secondary flex-1">
                  Cancel
                </button>
                <button type="submit" className="btn-primary flex-1 flex items-center justify-center space-x-2">
                  <Check className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="card w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Edit Guest</h2>
              <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleEdit} className="space-y-4">
              <div>
                <label className="form-label">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input"
                  required
                />
              </div>
              <div>
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input"
                  required
                />
              </div>
              <div>
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="input"
                />
              </div>
              <div>
                <label className="form-label">Event Name *</label>
                <input
                  type="text"
                  value={formData.eventName}
                  onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                  className="input"
                  required
                />
              </div>
              <div>
                <label className="form-label">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="input"
                >
                  <option value="invited">Invited</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="declined">Declined</option>
                  <option value="attended">Attended</option>
                </select>
              </div>
              <div>
                <label className="form-label">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="input h-20 resize-none"
                />
              </div>
              <div className="flex space-x-3">
                <button type="button" onClick={() => setShowEditModal(false)} className="btn-secondary flex-1">
                  Cancel
                </button>
                <button type="submit" className="btn-primary flex-1 flex items-center justify-center space-x-2">
                  <Check className="w-4 h-4" />
                  <span>Update</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default GuestList
