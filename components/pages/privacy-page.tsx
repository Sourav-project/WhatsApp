'use client'

import { useState } from 'react'
import { ArrowLeft, Eye, Clock, Users, Shield, BlocksIcon as Block } from 'lucide-react'

interface PrivacyPageProps {
  onBack: () => void
}

export default function PrivacyPage({ onBack }: PrivacyPageProps) {
  const [lastSeen, setLastSeen] = useState('Everyone')
  const [profilePhoto, setProfilePhoto] = useState('Everyone')
  const [about, setAbout] = useState('Everyone')
  const [status, setStatus] = useState('My contacts')
  const [readReceipts, setReadReceipts] = useState(true)

  const privacyOptions = ['Everyone', 'My contacts', 'Nobody']

  const privacyItems = [
    {
      icon: Clock,
      title: 'Last seen',
      subtitle: 'Who can see when you were last online',
      value: lastSeen,
      setValue: setLastSeen
    },
    {
      icon: Eye,
      title: 'Profile photo',
      subtitle: 'Who can see your profile photo',
      value: profilePhoto,
      setValue: setProfilePhoto
    },
    {
      icon: Users,
      title: 'About',
      subtitle: 'Who can see your about information',
      value: about,
      setValue: setAbout
    },
    {
      icon: Shield,
      title: 'Status',
      subtitle: 'Who can see your status updates',
      value: status,
      setValue: setStatus
    }
  ]

  const handleOptionSelect = (setValue: (value: string) => void, option: string) => {
    setValue(option)
  }

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
          <h1 className="text-xl font-medium text-white">Privacy</h1>
        </div>
      </div>

      <div className="p-4 max-w-2xl mx-auto space-y-4">
        {/* Privacy Settings */}
        <div className="bg-white rounded-lg shadow-sm">
          {privacyItems.map((item, index) => (
            <div key={index} className="p-4 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <item.icon className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.subtitle}</p>
                  </div>
                </div>
                <span className="text-sm text-green-600 font-medium">{item.value}</span>
              </div>
              <div className="ml-14 flex space-x-2">
                {privacyOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect(item.setValue, option)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      item.value === option
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Read Receipts */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <Eye className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Read receipts</p>
                <p className="text-sm text-gray-600">Send read receipts in chats</p>
              </div>
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
        </div>

        {/* Blocked Contacts */}
        <div className="bg-white rounded-lg shadow-sm">
          <button className="w-full p-4 flex items-center hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-4">
              <Block className="w-5 h-5 text-red-600" />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-800">Blocked contacts</p>
              <p className="text-sm text-gray-600">0 contacts</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
