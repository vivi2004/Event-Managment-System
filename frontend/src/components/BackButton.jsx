import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const BackButton = ({ to = -1, className = '' }) => {
  const navigate = useNavigate()

  const handleBack = () => {
    if (to === -1) {
      navigate(-1)
    } else {
      navigate(to)
    }
  }

  return (
    <button
      onClick={handleBack}
      className={`flex items-center space-x-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-lg transition-all duration-200 ${className}`}
    >
      <ArrowLeft className="w-4 h-4" />
      <span className="text-sm font-medium">Back</span>
    </button>
  )
}

export default BackButton
