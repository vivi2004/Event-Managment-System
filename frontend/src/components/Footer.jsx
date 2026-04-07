import { Link } from 'react-router-dom'
import { Sparkles, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-bold">Event Management</span>
            </div>
            <p className="text-gray-300 mb-4 text-sm sm:text-base">
              Transform your events with our comprehensive platform. Connect with vendors, manage guests, and create unforgettable experiences.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <a href="https://www.linkedin.com/in/vivek-kumar-p-3241a2259/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="https://github.com/vivi2004" target="_blank" rel="noopener noreferrer" className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Github className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="https://www.instagram.com/viui_64/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quick Links</h3>
            <ul className="space-y-1 sm:space-y-2">
              <li>
                <Link to="/user/signup" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base">
                  User Registration
                </Link>
              </li>
              <li>
                <Link to="/vendor/signup" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base">
                  Vendor Registration
                </Link>
              </li>
              <li>
                <Link to="/admin/signup" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base">
                  Admin Registration
                </Link>
              </li>
              <li>
                <Link to="/user/vendors" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base">
                  Browse Vendors
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Contact Us</h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                <a href="mailto:vivekpurbey586@gmail.com" className="text-gray-300 hover:text-white text-sm sm:text-base transition-colors">
                  vivekpurbey586@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                <a href="tel:7870094773" className="text-gray-300 hover:text-white text-sm sm:text-base transition-colors">
                  7870094773
                </a>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm sm:text-base">B12/26S, Central Park Kalyani</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
              © 2026 Event Management System. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center sm:justify-end space-x-4 sm:space-x-6">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/support" className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors">
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
