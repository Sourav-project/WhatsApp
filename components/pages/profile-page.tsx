'use client'

import { useState, useRef } from 'react'
import { ArrowLeft, Camera, Edit2, Check, X, Save, Upload } from 'lucide-react'
import { User } from '@/types'

interface ProfilePageProps {
  user: User
  onBack: () => void
  onUpdateUser: (user: User) => void
}

export default function ProfilePage({ user, onBack, onUpdateUser }: ProfilePageProps) {
  const [isEditingName, setIsEditingName] = useState(false)
  const [isEditingAbout, setIsEditingAbout] = useState(false)
  const [name, setName] = useState(user.name)
  const [about, setAbout] = useState('Hey there! I am using WhatsApp.')
  const [avatar, setAvatar] = useState(user.avatar)
  const [hasChanges, setHasChanges] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSaveName = () => {
    setIsEditingName(false)
    setHasChanges(true)
  }

  const handleSaveAbout = () => {
    setIsEditingAbout(false)
    setHasChanges(true)
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB')
      return
    }

    setIsUploading(true)

    try {
      // Create a FileReader to convert image to base64
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setAvatar(result)
        setHasChanges(true)
        setIsUploading(false)
      }
      reader.onerror = () => {
        alert('Error reading file')
        setIsUploading(false)
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Error uploading image')
      setIsUploading(false)
    }
  }

  const handleCameraClick = () => {
    fileInputRef.current?.click()
  }

  const handleSaveChanges = () => {
    const updatedUser: User = {
      ...user,
      name,
      avatar
    }
    onUpdateUser(updatedUser)
    setHasChanges(false)
    alert('Profile updated successfully!')
  }

  const handleDiscardChanges = () => {
    setName(user.name)
    setAvatar(user.avatar)
    setAbout('Hey there! I am using WhatsApp.')
    setHasChanges(false)
    setIsEditingName(false)
    setIsEditingAbout(false)
  }

  return (
    <div className="flex-1 whatsapp-chat-bg">
      {/* Header */}
      <div className="bg-green-600 px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-green-700 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <h1 className="text-xl font-medium text-white">Profile</h1>
          </div>
          {hasChanges && (
            <div className="flex items-center space-x-2">
              <button
                onClick={handleDiscardChanges}
                className="px-4 py-2 text-white hover:bg-green-700 rounded-lg transition-colors"
              >
                Discard
              </button>
              <button
                onClick={handleSaveChanges}
                className="flex items-center space-x-2 bg-white text-green-600 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors font-medium"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="p-6 max-w-md mx-auto">
        {/* Avatar Section */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="w-32 h-32 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
              {avatar ? (
                <img 
                  src={avatar || "/placeholder.svg"} 
                  alt={name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-white text-4xl font-medium">
                  {name.charAt(0).toUpperCase()}
                </span>
              )}
              {isUploading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
              )}
            </div>
            <button 
              onClick={handleCameraClick}
              disabled={isUploading}
              className="absolute bottom-4 right-4 bg-green-600 hover:bg-green-700 p-3 rounded-full text-white transition-colors disabled:opacity-50"
            >
              {isUploading ? (
                <Upload className="w-5 h-5 animate-pulse" />
              ) : (
                <Camera className="w-5 h-5" />
              )}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
          <p className="text-sm text-gray-400">Click the camera icon to change your photo</p>
        </div>

        {/* Name Section */}
        <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <label className="text-sm text-green-600 font-medium">Name</label>
              {isEditingName ? (
                <div className="flex items-center space-x-2 mt-1">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex-1 text-lg text-gray-800 border-b border-green-600 outline-none"
                    autoFocus
                    maxLength={25}
                  />
                  <button 
                    onClick={handleSaveName}
                    className="text-green-600 hover:text-green-700"
                  >
                    <Check className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => {
                      setName(user.name)
                      setIsEditingName(false)
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <p className="text-lg text-gray-800 mt-1">{name}</p>
              )}
            </div>
            {!isEditingName && (
              <button 
                onClick={() => setIsEditingName(true)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Edit2 className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <label className="text-sm text-green-600 font-medium">About</label>
              {isEditingAbout ? (
                <div className="flex items-center space-x-2 mt-1">
                  <input
                    type="text"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    className="flex-1 text-lg text-gray-800 border-b border-green-600 outline-none"
                    autoFocus
                    maxLength={139}
                  />
                  <button 
                    onClick={handleSaveAbout}
                    className="text-green-600 hover:text-green-700"
                  >
                    <Check className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => {
                      setAbout('Hey there! I am using WhatsApp.')
                      setIsEditingAbout(false)
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <p className="text-lg text-gray-800 mt-1">{about}</p>
              )}
            </div>
            {!isEditingAbout && (
              <button 
                onClick={() => setIsEditingAbout(true)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Edit2 className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Phone Section */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <label className="text-sm text-green-600 font-medium">Phone</label>
          <p className="text-lg text-gray-800 mt-1">{user.phoneNumber}</p>
          <p className="text-xs text-gray-500 mt-1">
            This is not your username or pin. This phone number is visible to your WhatsApp contacts.
          </p>
        </div>

        {/* Save Changes Button (Fixed Position) */}
        {hasChanges && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
            <div className="bg-white rounded-full shadow-lg border border-gray-200 px-6 py-3">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleDiscardChanges}
                  className="text-gray-600 hover:text-gray-800 font-medium"
                >
                  Discard
                </button>
                <button
                  onClick={handleSaveChanges}
                  className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
