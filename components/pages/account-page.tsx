'use client'

import { useState } from 'react'
import { ArrowLeft, Shield, Phone, Trash2, Download, Key } from 'lucide-react'

interface AccountPageProps {
  onBack: () => void
}

export default function AccountPage({ onBack }: AccountPageProps) {
  const [twoStepEnabled, setTwoStepEnabled] = useState(false)

  const accountItems = [
    {
      icon: Key,
      title: 'Two-step verification',
      subtitle: 'Add an extra layer of security to your account',
      action: () => setTwoStepEnabled(!twoStepEnabled),
      toggle: true,
      enabled: twoStepEnabled
    },
    {
      icon: Phone,
      title: 'Change number',
      subtitle: 'Change your phone number on WhatsApp',
      action: () => alert('Change number feature coming soon!')
    },
    {
      icon: Download,
      title: 'Request account info',
      subtitle: 'Request a report of your WhatsApp account information',
      action: () => alert('Account info request sent!')
    },
    {
      icon: Trash2,
      title: 'Delete my account',
      subtitle: 'Delete your account and erase your message history',
      action: () => {
        if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
          alert('Account deletion process started. You will receive a confirmation email.')
        }
      },
      danger: true
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
          <h1 className="text-xl font-medium text-white">Account</h1>
        </div>
      </div>

      <div className="p-4 max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm">
          {accountItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0 ${
                item.danger ? 'hover:bg-red-50' : 'hover:bg-gray-50'
              } transition-colors cursor-pointer`}
              onClick={item.action}
            >
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                  item.danger ? 'bg-red-100' : 'bg-green-100'
                }`}>
                  <item.icon className={`w-5 h-5 ${
                    item.danger ? 'text-red-600' : 'text-green-600'
                  }`} />
                </div>
                <div>
                  <p className={`font-medium ${
                    item.danger ? 'text-red-600' : 'text-gray-800'
                  }`}>{item.title}</p>
                  <p className="text-sm text-gray-600">{item.subtitle}</p>
                </div>
              </div>
              {item.toggle && (
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={item.enabled}
                    onChange={() => item.action()}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
