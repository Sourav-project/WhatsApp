'use client'

import { ArrowLeft, Star, Search } from 'lucide-react'
import { useState } from 'react'

interface StarredPageProps {
  onBack: () => void
}

export default function StarredPage({ onBack }: StarredPageProps) {
  const [searchQuery, setSearchQuery] = useState('')

  // Mock starred messages
  const starredMessages = [
    {
      id: '1',
      text: 'Important meeting tomorrow at 10 AM',
      sender: 'John Doe',
      timestamp: '2024-01-07 14:30',
      chatName: 'Work Group'
    },
    {
      id: '2',
      text: 'Don\'t forget to buy groceries',
      sender: 'You',
      timestamp: '2024-01-06 18:45',
      chatName: 'Family'
    },
    {
      id: '3',
      text: 'Great job on the presentation!',
      sender: 'Manager',
      timestamp: '2024-01-05 16:20',
      chatName: 'Manager'
    }
  ]

  const filteredMessages = starredMessages.filter(msg =>
    msg.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.sender.toLowerCase().includes(searchQuery.toLowerCase())
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
          <h1 className="text-xl font-medium text-white">Starred Messages</h1>
        </div>
      </div>

      <div className="p-4">
        {/* Search */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search starred messages"
              className="w-full pl-12 pr-4 py-2 bg-white rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-green-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Starred Messages */}
        {filteredMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <Star className="w-16 h-16 mb-4 text-gray-300" />
            <p className="text-lg font-medium">No starred messages</p>
            <p className="text-sm">Tap and hold on any message to star it</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredMessages.map((message) => (
              <div key={message.id} className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-medium text-gray-800">{message.sender}</span>
                    <span className="text-sm text-gray-500">in {message.chatName}</span>
                  </div>
                  <span className="text-xs text-gray-400">{message.timestamp}</span>
                </div>
                <p className="text-gray-700">{message.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
