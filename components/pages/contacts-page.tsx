'use client'

import { ArrowLeft, Search, UserPlus, Phone, MessageCircle } from 'lucide-react'
import { useState } from 'react'

interface ContactsPageProps {
  onBack: () => void
}

export default function ContactsPage({ onBack }: ContactsPageProps) {
  const [searchQuery, setSearchQuery] = useState('')

  // Mock contacts
  const contacts = [
    { id: '1', name: 'Alice Johnson', phone: '+1234567890', status: 'online' },
    { id: '2', name: 'Bob Smith', phone: '+1234567891', status: 'offline' },
    { id: '3', name: 'Carol Davis', phone: '+1234567892', status: 'online' },
    { id: '4', name: 'David Wilson', phone: '+1234567893', status: 'offline' },
    { id: '5', name: 'Emma Brown', phone: '+1234567894', status: 'online' }
  ]

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.includes(searchQuery)
  )

  return (
    <div className="flex-1 whatsapp-chat-bg">
      {/* Header */}
      <div className="bg-green-600 px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-green-700 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <h1 className="text-xl font-medium text-white">Contacts</h1>
          </div>
          <button className="p-2 hover:bg-green-700 rounded-full transition-colors">
            <UserPlus className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      <div className="p-4">
        {/* Search */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search contacts"
              className="w-full pl-12 pr-4 py-2 bg-white rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-green-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Contacts List */}
        <div className="space-y-2">
          {filteredContacts.map((contact) => (
            <div key={contact.id} className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {contact.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                      contact.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                    }`}></div>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">{contact.name}</h3>
                    <p className="text-sm text-gray-600">{contact.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <Phone className="w-5 h-5 text-green-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <MessageCircle className="w-5 h-5 text-green-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
