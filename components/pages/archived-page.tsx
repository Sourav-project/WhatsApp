'use client'

import { ArrowLeft, Archive, Search } from 'lucide-react'
import { useState } from 'react'

interface ArchivedPageProps {
  onBack: () => void
}

export default function ArchivedPage({ onBack }: ArchivedPageProps) {
  const [searchQuery, setSearchQuery] = useState('')

  // Mock archived chats
  const archivedChats = [
    {
      id: '1',
      name: 'Old Work Group',
      lastMessage: 'Thanks everyone for the great work!',
      timestamp: '2023-12-15',
      unreadCount: 0
    },
    {
      id: '2',
      name: 'College Friends',
      lastMessage: 'See you at the reunion!',
      timestamp: '2023-11-20',
      unreadCount: 3
    }
  ]

  const filteredChats = archivedChats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
          <h1 className="text-xl font-medium text-white">Archived Chats</h1>
        </div>
      </div>

      <div className="p-4">
        {/* Search */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search archived chats"
              className="w-full pl-12 pr-4 py-2 bg-white rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-green-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Archived Chats */}
        {filteredChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <Archive className="w-16 h-16 mb-4 text-gray-300" />
            <p className="text-lg font-medium">No archived chats</p>
            <p className="text-sm">Swipe down on any chat to archive it</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredChats.map((chat) => (
              <div key={chat.id} className="bg-white rounded-lg p-4 shadow-sm hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {chat.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">{chat.name}</h3>
                      <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 mb-1">{chat.timestamp}</p>
                    {chat.unreadCount > 0 && (
                      <div className="bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {chat.unreadCount}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
