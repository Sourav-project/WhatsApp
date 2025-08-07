'use client'

import { useRef } from 'react'
import { Camera, Image, FileText, User, MapPin, Music } from 'lucide-react'

interface FileUploadMenuProps {
  onFileSelect: (file: File, type: string) => void
  onClose: () => void
}

export default function FileUploadMenu({ onFileSelect, onClose }: FileUploadMenuProps) {
  const imageInputRef = useRef<HTMLInputElement>(null)
  const documentInputRef = useRef<HTMLInputElement>(null)
  const audioInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = event.target.files?.[0]
    if (file) {
      onFileSelect(file, type)
      onClose()
    }
  }

  const uploadOptions = [
    {
      icon: Camera,
      label: 'Camera',
      color: 'bg-pink-500',
      onClick: () => cameraInputRef.current?.click(),
      accept: 'image/*',
      capture: 'environment' as const,
      ref: cameraInputRef,
      type: 'camera'
    },
    {
      icon: Image,
      label: 'Gallery',
      color: 'bg-purple-500',
      onClick: () => imageInputRef.current?.click(),
      accept: 'image/*,video/*',
      ref: imageInputRef,
      type: 'media'
    },
    {
      icon: FileText,
      label: 'Document',
      color: 'bg-blue-500',
      onClick: () => documentInputRef.current?.click(),
      accept: '.pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx',
      ref: documentInputRef,
      type: 'document'
    },
    {
      icon: Music,
      label: 'Audio',
      color: 'bg-orange-500',
      onClick: () => audioInputRef.current?.click(),
      accept: 'audio/*',
      ref: audioInputRef,
      type: 'audio'
    },
    {
      icon: User,
      label: 'Contact',
      color: 'bg-green-500',
      onClick: () => alert('Contact sharing feature coming soon!'),
      type: 'contact'
    },
    {
      icon: MapPin,
      label: 'Location',
      color: 'bg-red-500',
      onClick: () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords
              alert(`Location: ${latitude}, ${longitude}\nLocation sharing feature coming soon!`)
            },
            (error) => {
              alert('Unable to get location. Please enable location services.')
            }
          )
        } else {
          alert('Geolocation is not supported by this browser.')
        }
      },
      type: 'location'
    }
  ]

  return (
    <div className="absolute bottom-16 left-12 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50">
      <div className="grid grid-cols-3 gap-4 w-48">
        {uploadOptions.map((option, index) => (
          <div key={index} className="flex flex-col items-center">
            <button
              onClick={option.onClick}
              className={`w-12 h-12 ${option.color} rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg`}
            >
              <option.icon className="w-6 h-6" />
            </button>
            <span className="text-xs text-gray-600 mt-2">{option.label}</span>
            
            {option.ref && (
              <input
                ref={option.ref}
                type="file"
                accept={option.accept}
                capture={option.capture}
                onChange={(e) => handleFileUpload(e, option.type)}
                className="hidden"
              />
            )}
          </div>
        ))}
      </div>

      {/* Close overlay */}
      <div 
        className="fixed inset-0 z-40" 
        onClick={onClose}
      />
    </div>
  )
}
