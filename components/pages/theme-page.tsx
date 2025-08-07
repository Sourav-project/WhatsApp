'use client'

import { useState } from 'react'
import { ArrowLeft, Sun, Moon, Monitor, Palette } from 'lucide-react'

interface ThemePageProps {
  onBack: () => void
}

export default function ThemePage({ onBack }: ThemePageProps) {
  const [selectedTheme, setSelectedTheme] = useState('system')
  const [wallpaper, setWallpaper] = useState('default')

  const themes = [
    {
      id: 'light',
      name: 'Light',
      icon: Sun,
      description: 'Use light theme'
    },
    {
      id: 'dark',
      name: 'Dark',
      icon: Moon,
      description: 'Use dark theme'
    },
    {
      id: 'system',
      name: 'System default',
      icon: Monitor,
      description: 'Use system setting'
    }
  ]

  const wallpapers = [
    { id: 'default', name: 'Default', preview: '#0b141a' },
    { id: 'dark', name: 'Dark', preview: '#000000' },
    { id: 'light', name: 'Light', preview: '#ffffff' },
    { id: 'green', name: 'Green', preview: '#25d366' },
    { id: 'blue', name: 'Blue', preview: '#1e88e5' }
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
          <h1 className="text-xl font-medium text-white">Theme</h1>
        </div>
      </div>

      <div className="p-4 max-w-2xl mx-auto space-y-6">
        {/* Theme Selection */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-lg font-medium text-gray-800 mb-2">Choose theme</h2>
            <p className="text-sm text-gray-600">Select your preferred theme for WhatsApp Web</p>
          </div>
          
          <div className="p-4 space-y-3">
            {themes.map((theme) => (
              <label
                key={theme.id}
                className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <input
                  type="radio"
                  name="theme"
                  value={theme.id}
                  checked={selectedTheme === theme.id}
                  onChange={(e) => setSelectedTheme(e.target.value)}
                  className="sr-only"
                />
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                  selectedTheme === theme.id ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  <theme.icon className={`w-5 h-5 ${
                    selectedTheme === theme.id ? 'text-green-600' : 'text-gray-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${
                    selectedTheme === theme.id ? 'text-green-600' : 'text-gray-800'
                  }`}>{theme.name}</p>
                  <p className="text-sm text-gray-600">{theme.description}</p>
                </div>
                {selectedTheme === theme.id && (
                  <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Wallpaper Selection */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-lg font-medium text-gray-800 mb-2">Chat wallpaper</h2>
            <p className="text-sm text-gray-600">Choose a wallpaper for your chats</p>
          </div>
          
          <div className="p-4">
            <div className="grid grid-cols-5 gap-3">
              {wallpapers.map((wp) => (
                <button
                  key={wp.id}
                  onClick={() => setWallpaper(wp.id)}
                  className={`aspect-square rounded-lg border-2 transition-all ${
                    wallpaper === wp.id 
                      ? 'border-green-600 ring-2 ring-green-200' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  style={{ backgroundColor: wp.preview }}
                >
                  <div className="w-full h-full rounded-md flex items-center justify-center">
                    {wallpaper === wp.id && (
                      <div className="w-6 h-6 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-3 text-center">
              <p className="text-sm text-gray-600">Selected: {wallpapers.find(w => w.id === wallpaper)?.name}</p>
            </div>
          </div>
        </div>

        {/* Custom Wallpaper */}
        <div className="bg-white rounded-lg shadow-sm">
          <button className="w-full p-4 flex items-center hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
              <Palette className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-800">Upload custom wallpaper</p>
              <p className="text-sm text-gray-600">Choose your own image as wallpaper</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
