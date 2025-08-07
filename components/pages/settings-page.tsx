'use client'

import { useState } from 'react'
import { ArrowLeft, User, Bell, Shield, Palette, Globe, HelpCircle, Info } from 'lucide-react'

interface SettingsPageProps {
  onBack: () => void
  onNavigate?: (page: string) => void
}

export default function SettingsPage({ onBack, onNavigate }: SettingsPageProps) {
  const [notifications, setNotifications] = useState(true)
  const [readReceipts, setReadReceipts] = useState(true)
  const [lastSeen, setLastSeen] = useState(true)

  const handleNavigateToPage = (page: string) => {
    if (onNavigate) {
      onNavigate(page)
    }
  }

  const settingsItems = [
    {
      icon: User,
      title: 'Account',
      subtitle: 'Security notifications, change number',
      onClick: () => handleNavigateToPage('account')
    },
    {
      icon: Shield,
      title: 'Privacy',
      subtitle: 'Block contacts, disappearing messages',
      onClick: () => handleNavigateToPage('privacy')
    },
    {
      icon: Bell,
      title: 'Notifications',
      subtitle: 'Message, group & call tones',
      onClick: () => handleNavigateToPage('notifications')
    },
    {
      icon: Palette,
      title: 'Theme',
      subtitle: 'Light, dark, system default',
      onClick: () => handleNavigateToPage('theme')
    },
    {
      icon: Globe,
      title: 'Language',
      subtitle: 'English (device\'s language)',
      onClick: () => handleNavigateToPage('language')
    },
    {
      icon: HelpCircle,
      title: 'Help',
      subtitle: 'Help center, contact us, privacy policy',
      onClick: () => handleNavigateToPage('help')
    },
    {
      icon: Info,
      title: 'About',
      subtitle: 'Version, terms of service',
      onClick: () => alert('WhatsApp Web v2.2024.1\n\nTerms of Service: https://whatsapp.com/legal\nPrivacy Policy: https://whatsapp.com/legal/privacy-policy')
    }
  ]

  return (
    <div className="flex-1 whatsapp-chat-bg">
      {/* Header */}
      <div className="bg-green-600 px-4 py-6">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-green-700 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-xl font-medium text-white">Settings</h1>
        </div>
      </div>

      <div className="p-4 max-w-2xl mx-auto">
        {/* Quick Settings */}
        <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Quick Settings</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Notifications</p>
                <p className="text-sm text-gray-600">Receive notifications for new messages</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Read Receipts</p>
                <p className="text-sm text-gray-600">Send read receipts in chats</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={readReceipts}
                  onChange={(e) => setReadReceipts(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Last Seen</p>
                <p className="text-sm text-gray-600">Show when you were last online</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={lastSeen}
                  onChange={(e) => setLastSeen(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Settings Menu */}
        <div className="bg-white rounded-lg shadow-sm">
          {settingsItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className="w-full flex items-center p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 text-left"
            >
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <item.icon className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">{item.title}</p>
                <p className="text-sm text-gray-600">{item.subtitle}</p>
              </div>
              <div className="text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
