'use client'

import { Pin } from 'lucide-react'
import { Chat } from '@/types'
import { formatTime, getInitials } from '@/lib/utils'

interface ChatItemProps {
  chat: Chat
  isSelected: boolean
  onClick: () => void
}

export default function ChatItem({ chat, isSelected, onClick }: ChatItemProps) {
  return (
    <div
      className={`flex items-center p-3 hover:bg-gray-700 cursor-pointer transition-colors ${
        isSelected ? 'bg-gray-700' : ''
      }`}
      onClick={onClick}
    >
      {/* Avatar */}
      <div className="w-12 h-12 rounded-full flex items-center justify-center mr-3 flex-shrink-0 bg-gray-600">
        {chat.avatar ? (
          <img 
            src={chat.avatar || "/placeholder.svg"} 
            alt={chat.name} 
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <span className="text-white font-semibold text-lg">
            {getInitials(chat.name)}
          </span>
        )}
      </div>

      {/* Chat Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center">
            <h3 className="font-medium text-white truncate mr-2">
              {chat.name}
            </h3>
            {chat.isPinned && (
              <Pin className="w-4 h-4 text-gray-400 transform rotate-45" />
            )}
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-xs text-gray-400">
              {chat.lastMessageTime && formatTime(chat.lastMessageTime)}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-400 truncate flex-1">
            {chat.lastMessage || 'No messages yet'}
          </p>
          
          <div className="flex items-center space-x-2 ml-2">
            {chat.unreadCount && chat.unreadCount > 0 && (
              <div className="bg-green-500 text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center px-1">
                {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
              </div>
            )}
            {chat.isMuted && (
              <div className="w-4 h-4 rounded-full bg-gray-600 flex items-center justify-center">
                <span className="text-xs text-gray-400">🔇</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
