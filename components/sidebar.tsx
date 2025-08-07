'use client'

import { useState } from 'react'
import { Search, MoreVertical, MessageCircle, Archive, Star, Settings, Users, Filter } from 'lucide-react'
import { Chat } from '@/types'
import { formatTime, getInitials } from '@/lib/utils'
import ChatItem from './chat-item'

interface SidebarProps {
  chats: Chat[]
  selectedChat: Chat | null
  onChatSelect: (chat: Chat) => void
  onNavigate: (page: string) => void
  loading: boolean
}

export default function Sidebar({ chats, selectedChat, onChatSelect, onNavigate, loading }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')

  const getFilteredChats = () => {
    let filtered = chats.filter(chat =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (chat.lastMessage && chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()))
    )

    switch (activeTab) {
      case 'unread':
        return filtered.filter(chat => chat.unreadCount && chat.unreadCount > 0)
      case 'groups':
        return filtered.filter(chat => chat.name.toLowerCase().includes('group') || chat.name.toLowerCase().includes('club'))
      default:
        return filtered
    }
  }

  const filteredChats = getFilteredChats()

  return (
    <div className="w-96 whatsapp-sidebar border-r border-gray-700 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gray-800">
        <div className="flex items-center space-x-3">
          <h2 className="text-white text-lg font-medium">Chats</h2>
        </div>
        <div className="flex items-center space-x-1">
          <button 
            onClick={() => onNavigate('contacts')}
            className="p-2 hover:bg-gray-700 rounded-full transition-colors"
            title="Contacts"
          >
            <Users className="w-5 h-5 text-gray-300" />
          </button>
          <button 
            onClick={() => onNavigate('new-chat')}
            className="p-2 hover:bg-gray-700 rounded-full transition-colors"
            title="New Chat"
          >
            <MessageCircle className="w-5 h-5 text-gray-300" />
          </button>
          <button className="p-2 hover:bg-gray-700 rounded-full transition-colors">
            <MoreVertical className="w-5 h-5 text-gray-300" />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search or start new chat"
            className="w-full pl-12 pr-4 py-2 bg-gray-700 text-white rounded-lg border-none outline-none focus:bg-gray-600 transition-colors placeholder-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center px-3 mb-2">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
            activeTab === 'all' 
              ? 'bg-green-600 text-white' 
              : 'text-gray-300 hover:bg-gray-700'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setActiveTab('unread')}
          className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ml-2 ${
            activeTab === 'unread' 
              ? 'bg-green-600 text-white' 
              : 'text-gray-300 hover:bg-gray-700'
          }`}
        >
          Unread
        </button>
        <button
          onClick={() => setActiveTab('groups')}
          className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ml-2 ${
            activeTab === 'groups' 
              ? 'bg-green-600 text-white' 
              : 'text-gray-300 hover:bg-gray-700'
          }`}
        >
          Groups
        </button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
          </div>
        ) : filteredChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <MessageCircle className="w-16 h-16 mb-4 text-gray-600" />
            <p className="text-lg font-medium">
              {activeTab === 'unread' ? 'No unread chats' : 
               activeTab === 'groups' ? 'No groups found' : 'No chats found'}
            </p>
            <p className="text-sm">
              {activeTab === 'all' ? 'Start a new conversation' : 'Try a different filter'}
            </p>
          </div>
        ) : (
          filteredChats.map((chat) => (
            <ChatItem
              key={chat.wa_id}
              chat={chat}
              isSelected={selectedChat?.wa_id === chat.wa_id}
              onClick={() => onChatSelect(chat)}
            />
          ))
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="border-t border-gray-700 p-2">
        <div className="flex justify-around">
          <button 
            onClick={() => onNavigate('starred')}
            className="p-3 hover:bg-gray-700 rounded-full transition-colors"
            title="Starred Messages"
          >
            <Star className="w-5 h-5 text-gray-400" />
          </button>
          <button 
            onClick={() => onNavigate('archived')}
            className="p-3 hover:bg-gray-700 rounded-full transition-colors"
            title="Archived Chats"
          >
            <Archive className="w-5 h-5 text-gray-400" />
          </button>
          <button 
            onClick={() => onNavigate('settings')}
            className="p-3 hover:bg-gray-700 rounded-full transition-colors"
            title="Settings"
          >
            <Settings className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  )
}
