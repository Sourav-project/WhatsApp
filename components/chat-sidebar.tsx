'use client'

import { useState } from 'react'
import { Search, MoreVertical, MessageCircle, Users, Archive, Settings } from 'lucide-react'
import { Chat } from '@/types'
import { formatTime } from '@/lib/utils'

interface ChatSidebarProps {
  chats: Chat[]
  selectedChat: Chat | null
  onChatSelect: (chat: Chat) => void
}

export default function ChatSidebar({ chats, selectedChat, onChatSelect }: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="w-full md:w-96 border-r border-gray-200 flex flex-col bg-white">
      {/* Header */}
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-gray-600" />
            </div>
            <h1 className="text-lg font-semibold text-gray-800">WhatsApp</h1>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-200 rounded-full">
              <Users className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-200 rounded-full">
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="p-3 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search or start new chat"
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg border-none outline-none focus:bg-white focus:ring-2 focus:ring-green-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex border-b border-gray-200">
        <button className="flex-1 py-3 text-center text-green-600 border-b-2 border-green-600 font-medium">
          All
        </button>
        <button className="flex-1 py-3 text-center text-gray-500 hover:text-gray-700">
          Unread
        </button>
        <button className="flex-1 py-3 text-center text-gray-500 hover:text-gray-700">
          Groups
        </button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <MessageCircle className="w-16 h-16 mb-4 text-gray-300" />
            <p className="text-lg font-medium">No chats found</p>
            <p className="text-sm">Start a new conversation</p>
          </div>
        ) : (
          filteredChats.map((chat) => (
            <div
              key={chat.wa_id}
              className={`flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 ${
                selectedChat?.wa_id === chat.wa_id ? 'bg-gray-100' : ''
              }`}
              onClick={() => onChatSelect(chat)}
            >
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-white font-semibold text-lg">
                  {chat.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {chat.name}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {chat.lastMessageTime && formatTime(chat.lastMessageTime)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 truncate">
                  {chat.lastMessage || 'No messages yet'}
                </p>
              </div>
              {chat.unreadCount && chat.unreadCount > 0 && (
                <div className="bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-2">
                  {chat.unreadCount}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
