'use client'

export default function WelcomeScreen() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center whatsapp-chat-bg">
      <div className="text-center max-w-md">
        <div className="w-80 h-80 mx-auto mb-8 opacity-20">
          <svg viewBox="0 0 303 172" className="w-full h-full">
            <defs>
              <linearGradient id="a" x1="50%" x2="50%" y1="100%" y2="0%">
                <stop offset="0%" stopColor="#1fa2f3" stopOpacity=".08"></stop>
                <stop offset="100%" stopColor="#1fa2f3" stopOpacity=".02"></stop>
              </linearGradient>
            </defs>
            <path fill="url(#a)" d="M229.221 12.739L0 12.739v158.89h303V.42z"></path>
            <path fill="#eee" fillOpacity=".08" d="M229.221 12.739L0 12.739v158.89h303V.42z"></path>
          </svg>
        </div>
        
        <h1 className="text-3xl font-light text-gray-300 mb-4">Welcome to WhatsApp Web</h1>
        <p className="text-gray-400 leading-relaxed mb-6">
          Send and receive messages without keeping your phone online.
          Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
        </p>
        
        <div className="border-t border-gray-700 pt-6">
          <p className="text-sm text-gray-500 flex items-center justify-center">
            <span className="mr-2">🔒</span>
            Your personal messages are end-to-end encrypted
          </p>
        </div>
      </div>
    </div>
  )
}
