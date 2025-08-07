'use client'

import { useState } from 'react'
import { ArrowLeft, Bell, BellOff, Volume2, VolumeX } from 'lucide-react'

interface NotificationsPageProps {
  onBack: () => void
}

export default function NotificationsPage({ onBack }: NotificationsPageProps) {
  const [messageNotifications, setMessageNotifications] = useState(true)
  const [groupNotifications, setGroupNotifications] = useState(true)
  const [callNotifications, setCallNotifications] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [vibrationEnabled, setVibrationEnabled] = useState(true)

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
          <h1 className="text-xl font-medium text-white">Notifications</h1>
        </div>
      </div>

      <div className="p-4 max-w-2xl mx-auto">
        {/* Notification Types */}
        <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <h2 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
            <Bell className="w-5 h-5 mr-2 text-green-600" />
            Notification Types
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <Bell className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Messages</p>
                  <p className="text-sm text-gray-600">New message notifications</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={messageNotifications}
                  onChange={(e) => setMessageNotifications(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <Bell className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Groups</p>
                  <p className="text-sm text-gray-600">Group message notifications</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={groupNotifications}
                  onChange={(e) => setGroupNotifications(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <Bell className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Calls</p>
                  <p className="text-sm text-gray-600">Incoming call notifications</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={callNotifications}
                  onChange={(e) => setCallNotifications(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Sound & Vibration */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
            <Volume2 className="w-5 h-5 mr-2 text-green-600" />
            Sound & Vibration
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {soundEnabled ? (
                  <Volume2 className="w-6 h-6 text-green-600 mr-3" />
                ) : (
                  <VolumeX className="w-6 h-6 text-gray-400 mr-3" />
                )}
                <div>
                  <p className="font-medium text-gray-800">Sound</p>
                  <p className="text-sm text-gray-600">Play notification sounds</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={soundEnabled}
                  onChange={(e) => setSoundEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-6 h-6 mr-3 flex items-center justify-center">
                  <div className={`w-4 h-4 rounded ${vibrationEnabled ? 'bg-green-600' : 'bg-gray-400'}`}></div>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Vibration</p>
                  <p className="text-sm text-gray-600">Vibrate for notifications</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={vibrationEnabled}
                  onChange={(e) => setVibrationEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
