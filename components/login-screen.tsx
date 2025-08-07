'use client'

import { useState, Suspense } from 'react'
import { QrCode, Smartphone, Shield, MessageCircle, RefreshCw, Scan } from 'lucide-react'
import QRCodeGenerator from './qr-code-generator'

interface LoginScreenProps {
  onLogin: (phoneNumber: string) => void
}

function LoginContent({ onLogin }: LoginScreenProps) {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [showQR, setShowQR] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [qrKey, setQrKey] = useState(Date.now())

  const handlePhoneLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!phoneNumber.trim()) return

    setIsLoading(true)
    // Simulate login process
    setTimeout(() => {
      onLogin(phoneNumber)
      setIsLoading(false)
    }, 2000)
  }

  const refreshQR = () => {
    setQrKey(Date.now())
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex flex-col">
      {/* Enhanced Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              {/* Enhanced WhatsApp Logo */}
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg ring-4 ring-green-100">
                  <svg width="28" height="28" viewBox="0 0 24 24" className="text-white drop-shadow-sm">
                    <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.051 3.488"/>
                  </svg>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse border-2 border-white"></div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-light text-gray-800 tracking-wide">WhatsApp</span>
                <span className="text-sm text-green-600 font-medium tracking-wider">WEB</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-6xl w-full">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="flex flex-col lg:flex-row min-h-[600px]">
              {/* Left Side - Info */}
              <div className="lg:w-1/2 p-6 lg:p-12 bg-gradient-to-br from-green-50 via-green-25 to-white relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-full opacity-20 -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-green-200 rounded-full opacity-20 translate-y-12 -translate-x-12"></div>
                
                <div className="text-center lg:text-left relative z-10 h-full flex flex-col justify-center">
                  <div className="flex items-center justify-center lg:justify-start mb-6 lg:mb-8">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-2xl shadow-lg mr-4">
                      <MessageCircle className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                    </div>
                    <h1 className="text-2xl lg:text-4xl font-light text-gray-800">WhatsApp Web</h1>
                  </div>
                  
                  <h2 className="text-xl lg:text-2xl font-light text-gray-700 mb-6 lg:mb-8 leading-relaxed">
                    Use WhatsApp on your
                    mobile and  computer
                  </h2>
                  
                  {/* Updated Steps Section */}
                  <div className="space-y-4 lg:space-y-6 text-gray-600 mb-6 lg:mb-10">
                    <div className="flex items-center">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mr-3 lg:mr-4 shadow-lg flex-shrink-0">
                        <span className="text-white font-bold text-sm lg:text-lg">1</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm lg:text-lg font-medium text-gray-800">Open WhatsApp on your phone</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mr-3 lg:mr-4 shadow-lg flex-shrink-0">
                        <span className="text-white font-bold text-sm lg:text-lg">2</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm lg:text-lg font-medium text-gray-800">
                          Tap <strong>Menu</strong> or <strong>Settings</strong> and select <strong>Linked Devices</strong>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mr-3 lg:mr-4 shadow-lg flex-shrink-0">
                        <span className="text-white font-bold text-sm lg:text-lg">3</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm lg:text-lg font-medium text-gray-800">
                          Point your phone to this screen to capture the code
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 lg:p-6 bg-white rounded-xl border border-green-200 shadow-sm">
                    <div className="flex items-center text-gray-600">
                      <Shield className="w-4 h-4 lg:w-5 lg:h-5 mr-3 text-green-600 flex-shrink-0" />
                      <span className="text-xs lg:text-sm">Your personal messages are end-to-end encrypted</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Login */}
              <div className="lg:w-1/2 p-6 lg:p-12 bg-white flex items-center justify-center">
                <div className="w-full max-w-md">
                  {showQR ? (
                    <div className="space-y-6 lg:space-y-8">
                      <div className="flex items-center justify-center space-x-3 mb-4 lg:mb-6">
                        <Scan className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" />
                        <h3 className="text-xl lg:text-2xl font-medium text-gray-800">
                          Scan QR Code
                        </h3>
                      </div>
                      
                      {/* Enhanced QR Code Container - Mobile Optimized */}
                      <div className="relative mx-auto w-64 h-64 lg:w-80 lg:h-80">
                        {/* Animated border */}
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-green-500 to-green-600 rounded-3xl p-1 animate-pulse">
                          <div className="w-full h-full bg-white rounded-3xl"></div>
                        </div>
                        
                        {/* QR Code */}
                        <div className="absolute inset-3 lg:inset-4 bg-white rounded-2xl shadow-inner flex items-center justify-center overflow-hidden">
                          <div className="relative">
                            <QRCodeGenerator 
                              key={qrKey}
                              value={`whatsapp-web-${qrKey}`}
                              size={200}
                              className="rounded-xl transform hover:scale-105 transition-transform duration-300"
                            />
                            
                            {/* WhatsApp logo overlay */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-xl shadow-lg flex items-center justify-center border-2 border-green-500">
                                <svg width="20" height="20" viewBox="0 0 24 24" className="text-green-600">
                                  <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.051 3.488"/>
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Corner decorations */}
                        <div className="absolute top-2 left-2 w-4 h-4 lg:w-6 lg:h-6 border-l-4 border-t-4 border-green-500 rounded-tl-lg"></div>
                        <div className="absolute top-2 right-2 w-4 h-4 lg:w-6 lg:h-6 border-r-4 border-t-4 border-green-500 rounded-tr-lg"></div>
                        <div className="absolute bottom-2 left-2 w-4 h-4 lg:w-6 lg:h-6 border-l-4 border-b-4 border-green-500 rounded-bl-lg"></div>
                        <div className="absolute bottom-2 right-2 w-4 h-4 lg:w-6 lg:h-6 border-r-4 border-b-4 border-green-500 rounded-br-lg"></div>
                      </div>

                      <div className="space-y-4 text-center">
                        <p className="text-gray-600 text-base lg:text-lg">
                          Scan this QR code with your phone's WhatsApp
                        </p>
                        
                        <button
                          onClick={refreshQR}
                          className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 font-medium transition-colors"
                        >
                          <RefreshCw className="w-4 h-4" />
                          <span>Refresh QR Code</span>
                        </button>
                      </div>

                      <button
                        onClick={() => setShowQR(false)}
                        className="w-full text-green-600 hover:text-green-700 font-medium text-base lg:text-lg transition-colors"
                      >
                        Use phone number instead
                      </button>
                    </div>
                  ) : (
                    // Phone number login section remains the same
                    <div className="space-y-6 lg:space-y-8">
                      <div className="flex items-center justify-center space-x-3 mb-4 lg:mb-6">
                        <Smartphone className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" />
                        <h3 className="text-xl lg:text-2xl font-medium text-gray-800">
                          Enter Phone Number
                        </h3>
                      </div>

                      <form onSubmit={handlePhoneLogin} className="space-y-6">
                        <div>
                          <input
                            type="tel"
                            placeholder="Enter your phone number"
                            className="w-full px-4 lg:px-6 py-3 lg:py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-green-500 outline-none transition-all text-base lg:text-lg"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isLoading}
                          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-3 lg:py-4 px-6 rounded-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg text-base lg:text-lg"
                        >
                          {isLoading ? (
                            <div className="flex items-center justify-center">
                              <div className="animate-spin rounded-full h-5 w-5 lg:h-6 lg:w-6 border-b-2 border-white mr-3"></div>
                              Connecting...
                            </div>
                          ) : (
                            'Continue'
                          )}
                        </button>
                      </form>

                      <button
                        onClick={() => setShowQR(true)}
                        className="w-full text-green-600 hover:text-green-700 font-medium text-base lg:text-lg transition-colors"
                      >
                        Use QR code instead
                      </button>
                    </div>
                  )}

                  <div className="mt-8 lg:mt-12 pt-6 lg:pt-8 border-t border-gray-200">
                    <div className="flex items-center justify-center text-gray-500 text-sm lg:text-base">
                      <Smartphone className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                      <span>Need help getting started?</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t py-6">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-500">
          <p>© 2024 WhatsApp LLC</p>
        </div>
      </div>
    </div>
  )
}

function LoginLoadingFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg">Loading login screen...</p>
      </div>
    </div>
  )
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  return (
    <Suspense fallback={<LoginLoadingFallback />}>
      <LoginContent onLogin={onLogin} />
    </Suspense>
  )
}
