'use client'

import { Check, CheckCheck } from 'lucide-react'
import { Message } from '@/types'
import { formatTime } from '@/lib/utils'

interface MessageBubbleProps {
  message: Message
  isOwn: boolean
}

export default function MessageBubble({ message, isOwn }: MessageBubbleProps) {
  const getStatusIcon = () => {
    if (!isOwn) return null
    
    switch (message.status) {
      case 'sent':
        return <Check className="w-4 h-4 text-gray-400" />
      case 'delivered':
        return <CheckCheck className="w-4 h-4 text-gray-400" />
      case 'read':
        return <CheckCheck className="w-4 h-4 text-blue-400" />
      default:
        return null
    }
  }

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-1`}>
      <div
        className={`max-w-xs lg:max-w-md px-3 py-2 rounded-lg ${
          isOwn
            ? 'message-bubble-sent text-white'
            : 'message-bubble-received text-white'
        }`}
      >
        <p className="text-sm leading-relaxed break-words">{message.text}</p>
        <div className={`flex items-center justify-end mt-1 space-x-1 ${
          isOwn ? 'text-gray-300' : 'text-gray-400'
        }`}>
          <span className="text-xs">
            {formatTime(message.timestamp)}
          </span>
          {getStatusIcon()}
        </div>
      </div>
    </div>
  )
}
