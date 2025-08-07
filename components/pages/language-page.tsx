'use client'

import { useState } from 'react'
import { ArrowLeft, Globe, Check } from 'lucide-react'

interface LanguagePageProps {
  onBack: () => void
}

export default function LanguagePage({ onBack }: LanguagePageProps) {
  const [selectedLanguage, setSelectedLanguage] = useState('en')

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'es', name: 'Spanish', nativeName: 'Español' },
    { code: 'fr', name: 'French', nativeName: 'Français' },
    { code: 'de', name: 'German', nativeName: 'Deutsch' },
    { code: 'it', name: 'Italian', nativeName: 'Italiano' },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
    { code: 'ru', name: 'Russian', nativeName: 'Русский' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'zh', name: 'Chinese', nativeName: '中文' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語' },
    { code: 'ko', name: 'Korean', nativeName: '한국어' }
  ]

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode)
    // Here you would typically save the language preference
    alert(`Language changed to ${languages.find(l => l.code === languageCode)?.name}`)
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
          <h1 className="text-xl font-medium text-white">Language</h1>
        </div>
      </div>

      <div className="p-4 max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center">
              <Globe className="w-5 h-5 text-green-600 mr-2" />
              <h2 className="text-lg font-medium text-gray-800">App Language</h2>
            </div>
            <p className="text-sm text-gray-600 mt-1">Choose your preferred language for WhatsApp Web</p>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageSelect(language.code)}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
              >
                <div className="text-left">
                  <p className="font-medium text-gray-800">{language.name}</p>
                  <p className="text-sm text-gray-600">{language.nativeName}</p>
                </div>
                {selectedLanguage === language.code && (
                  <Check className="w-5 h-5 text-green-600" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Language changes will take effect after refreshing the page. 
            Some features may not be available in all languages.
          </p>
        </div>
      </div>
    </div>
  )
}
