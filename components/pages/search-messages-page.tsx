'use client'

import { useState, Suspense } from 'react'
import { ArrowLeft, Search, Calendar, User, Image, FileText, Mic } from 'lucide-react'

interface SearchMessagesPageProps {
  onBack: () => void
}

function SearchContent({ onBack }: SearchMessagesPageProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')

  // Mock search results
  const searchResults = [
    {
      id: '1',
      text: 'Hello! How are you doing?',
      sender: 'CS - A',
      timestamp: '2024-01-07 10:05',
      type: 'text'
    },
    {
      id: '2',
      text: 'I\'m doing great! Thanks for asking.',
      sender: 'You',
      timestamp: '2024-01-07 10:06',
      type: 'text'
    },
    {
      id: '3',
      text: 'Check out this document',
      sender: 'CS - A',
      timestamp: '2024-01-06 14:30',
      type: 'document'
    },
    {
      id: '4',
      text: 'Voice message',
      sender: 'You',
      timestamp: '2024-01-05 16:20',
      type: 'audio'
    }
  ]

  const filters = [
    { id: 'all', label: 'All', icon: Search },
    { id: 'text', label: 'Text', icon: FileText },
    { id: 'media', label: 'Media', icon: Image },
    { id: 'audio', label: 'Audio', icon: Mic },
    { id: 'documents', label: 'Documents', icon: FileText }
  ]

  const filteredResults = searchResults.filter(result => {
    const matchesQuery = result.text.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = selectedFilter === 'all' || result.type === selectedFilter
    return matchesQuery && matchesFilter
  })

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText className="w-4 h-4 text-blue-500" />
      case 'audio':
        return <Mic className="w-4 h-4 text-green-500" />
      case 'image':
        return <Image className="w-4 h-4 text-purple-500" />
      default:
        return null
    }
  }

  return (
    <div className="flex-1 whatsapp-chat-bg">
      {/* Header */}
      <div className="bg-gray-800 px-4 py-3 border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-gray-700 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg border-none outline-none focus:bg-gray-600 transition-colors placeholder-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 px-4 py-3 border-b border-gray-700">
        <div className="flex space-x-2 overflow-x-auto">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                selectedFilter === filter.id
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <filter.icon className="w-4 h-4" />
              <span>{filter.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Search Results */}
      <div className="flex-1 overflow-y-auto p-4">
        {searchQuery.trim() === '' ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <Search className="w-16 h-16 mb-4 text-gray-600" />
            <p className="text-lg font-medium">Search messages</p>
            <p className="text-sm">Type to search through your conversation</p>
          </div>
        ) : filteredResults.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <Search className="w-16 h-16 mb-4 text-gray-600" />
            <p className="text-lg font-medium">No results found</p>
            <p className="text-sm">Try searching with different keywords</p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-gray-400 mb-4">
              {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''} found
            </p>
            {filteredResults.map((result) => (
              <div key={result.id} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 cursor-pointer transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-white text-sm">{result.sender}</span>
                    {getMessageIcon(result.type)}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-400">{result.timestamp}</span>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">
                  {result.text.split(new RegExp(`(${searchQuery})`, 'gi')).map((part, index) =>
                    part.toLowerCase() === searchQuery.toLowerCase() ? (
                      <mark key={index} className="bg-yellow-400 text-black px-1 rounded">
                        {part}
                      </mark>
                    ) : (
                      part
                    )
                  )}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function SearchLoadingFallback() {
  return (
    <div className="flex-1 whatsapp-chat-bg flex items-center justify-center">
      <div className="text-center text-gray-400">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto mb-4"></div>
        <p>Loading search...</p>
      </div>
    </div>
  )
}

export default function SearchMessagesPage({ onBack }: SearchMessagesPageProps) {
  return (
    <Suspense fallback={<SearchLoadingFallback />}>
      <SearchContent onBack={onBack} />
    </Suspense>
  )
}
