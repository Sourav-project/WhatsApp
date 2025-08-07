'use client'

import { useState } from 'react'
import { MoreVertical, LogOut, Settings, User, Bell, Archive, Star, HelpCircle } from 'lucide-react'

interface HeaderProps {
  user: {
    name: string
    phoneNumber: string
    avatar?: string
  }
  onLogout: () => void
  onNavigate: (page: string) => void
}

export default function Header({ user, onLogout, onNavigate }: HeaderProps) {
  const [showDropdown, setShowDropdown] = useState(false)

  const handleMenuClick = (page: string) => {
    setShowDropdown(false)
    onNavigate(page)
  }

  const menuItems = [
    { icon: User, label: 'Profile', action: 'profile' },
    { icon: Star, label: 'Starred messages', action: 'starred' },
    { icon: Archive, label: 'Archived chats', action: 'archived' },
    { icon: Settings, label: 'Settings', action: 'settings' },
    { icon: Bell, label: 'Notifications', action: 'notifications' },
    { icon: HelpCircle, label: 'Help', action: 'help' },
  ]

  return (
    <div className="bg-gray-800 border-b border-gray-700 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Enhanced WhatsApp Logo */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 px-3 py-2 rounded-lg shadow-lg">
            <div className="relative">
              <svg width="28" height="28" viewBox="0 0 24 24" className="text-white drop-shadow-sm">
                <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.051 3.488"/>
              </svg>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <span className="text-white font-semibold text-lg tracking-wide">WhatsApp</span>
          </div>
        </div>

        {/* User Info & Actions */}
        <div className="flex items-center space-x-4">
          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center ring-2 ring-green-500 ring-opacity-50">
              {user.avatar ? (
                <img 
                  src={user.avatar || "/placeholder.svg"} 
                  alt={user.name} 
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-white text-sm font-medium">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div className="hidden md:block">
              <p className="text-white text-sm font-medium">{user.name}</p>
              <p className="text-gray-400 text-xs">{user.phoneNumber}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="p-2 hover:bg-gray-700 rounded-full transition-colors"
              title="Menu"
            >
              <MoreVertical className="w-5 h-5 text-gray-300" />
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                {menuItems.map((item, index) => (
                  <button 
                    key={index}
                    onClick={() => handleMenuClick(item.action)}
                    className="w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-100 flex items-center transition-colors"
                  >
                    <item.icon className="w-5 h-5 mr-3 text-gray-500" />
                    <span className="text-sm">{item.label}</span>
                  </button>
                ))}
                <hr className="my-2" />
                <button 
                  onClick={onLogout}
                  className="w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 flex items-center transition-colors"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  <span className="text-sm">Log out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {showDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  )
}
