'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Paperclip, Smile, Mic, MoreVertical, Phone, Video, Search, ArrowLeft, UserPlus, Archive, Star, Trash2, BlocksIcon as Block } from 'lucide-react'
import { Chat, Message } from '@/types'
import MessageBubble from './message-bubble'
import EmojiPicker from './emoji-picker'
import FileUploadMenu from './file-upload-menu'
import VoiceRecorder from './voice-recorder'
import { getInitials } from '@/lib/utils'

interface ChatWindowProps {
  chat: Chat
  messages: Message[]
  onSendMessage: (text: string, file?: File, fileType?: string) => void
  onNavigate: (page: string) => void
}

export default function ChatWindow({ chat, messages, onSendMessage, onNavigate }: ChatWindowProps) {
  const [messageText, setMessageText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showChatMenu, setShowChatMenu] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [showFileUpload, setShowFileUpload] = useState(false)
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [isContactTyping, setIsContactTyping] = useState(false)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSend = () => {
    if (messageText.trim()) {
      // Show typing indicator briefly before sending
      setIsContactTyping(true)
      setTimeout(() => setIsContactTyping(false), 2000)
    
      onSendMessage(messageText)
      setMessageText('')
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageText(e.target.value)
    setIsTyping(e.target.value.length > 0)
  }

  const handleEmojiSelect = (emoji: string) => {
    const newText = messageText + emoji
    setMessageText(newText)
    setIsTyping(newText.length > 0)
    setShowEmojiPicker(false)
    inputRef.current?.focus()
  }

  const handleFileSelect = async (file: File, fileType: string) => {
    try {
      // Validate file size (max 100MB)
      if (file.size > 100 * 1024 * 1024) {
        alert('File size too large. Maximum size is 100MB.')
        return
      }

      // Create a message with file info
      const fileName = file.name
      const fileSize = (file.size / 1024 / 1024).toFixed(2) + ' MB'
      
      let messageContent = ''
      
      switch (fileType) {
        case 'camera':
        case 'media':
          if (file.type.startsWith('image/')) {
            messageContent = `📷 Image: ${fileName} (${fileSize})`
          } else if (file.type.startsWith('video/')) {
            messageContent = `🎥 Video: ${fileName} (${fileSize})`
          }
          break
        case 'document':
          messageContent = `📄 Document: ${fileName} (${fileSize})`
          break
        case 'audio':
          messageContent = `🎵 Audio: ${fileName} (${fileSize})`
          break
        default:
          messageContent = `📎 File: ${fileName} (${fileSize})`
      }

      // Send the message with file info
      onSendMessage(messageContent, file, fileType)
      
      // Show success message
      alert(`File "${fileName}" uploaded successfully!`)
      
    } catch (error) {
      console.error('Error handling file:', error)
      alert('Error uploading file. Please try again.')
    }
  }

  const handleVoiceMessage = (transcript: string, audioBlob?: Blob) => {
    if (transcript.trim()) {
      const voiceMessage = `🎤 Voice message: "${transcript}"`
      onSendMessage(voiceMessage)
      setShowVoiceRecorder(false)
      
      // If we have audio blob, we could upload it too
      if (audioBlob) {
        console.log('Audio blob available for upload:', audioBlob)
      }
    }
  }

  const handleVideoCall = () => {
    alert(`Starting video call with ${chat.name}...`)
  }

  const handleVoiceCall = () => {
    alert(`Starting voice call with ${chat.name}...`)
  }

  const handleSearch = () => {
    onNavigate('search-messages')
  }

  const chatMenuItems = [
    { icon: UserPlus, label: 'Add to contacts', action: () => alert('Adding to contacts...') },
    { icon: Star, label: 'Star messages', action: () => onNavigate('starred') },
    { icon: Archive, label: 'Archive chat', action: () => alert('Chat archived') },
    { icon: Block, label: 'Block contact', action: () => alert('Contact blocked') },
    { icon: Trash2, label: 'Delete chat', action: () => alert('Chat deleted') },
  ]

  return (
    <div className="flex-1 flex flex-col relative">
      {/* Chat Header */}
      <div className="bg-gray-800 px-4 py-3 border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-600">
            {chat.avatar ? (
              <img 
                src={chat.avatar || "/placeholder.svg"} 
                alt={chat.name} 
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-white font-semibold">
                {getInitials(chat.name)}
              </span>
            )}
          </div>
          <div>
            <h2 className="font-medium text-white">{chat.name}</h2>
            <p className="text-sm text-gray-400">
              {chat.isOnline ? 'online' : 'last seen recently'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={handleVideoCall}
            className="p-2 hover:bg-gray-700 rounded-full transition-colors"
            title="Video call"
          >
            <Video className="w-5 h-5 text-gray-300" />
          </button>
          <button 
            onClick={handleVoiceCall}
            className="p-2 hover:bg-gray-700 rounded-full transition-colors"
            title="Voice call"
          >
            <Phone className="w-5 h-5 text-gray-300" />
          </button>
          <button 
            onClick={handleSearch}
            className="p-2 hover:bg-gray-700 rounded-full transition-colors"
            title="Search messages"
          >
            <Search className="w-5 h-5 text-gray-300" />
          </button>
          <div className="relative">
            <button 
              onClick={() => setShowChatMenu(!showChatMenu)}
              className="p-2 hover:bg-gray-700 rounded-full transition-colors"
              title="More options"
            >
              <MoreVertical className="w-5 h-5 text-gray-300" />
            </button>

            {/* Chat Menu Dropdown */}
            {showChatMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                {chatMenuItems.map((item, index) => (
                  <button 
                    key={index}
                    onClick={() => {
                      item.action()
                      setShowChatMenu(false)
                    }}
                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center transition-colors"
                  >
                    <item.icon className="w-4 h-4 mr-3 text-gray-500" />
                    <span className="text-sm">{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto whatsapp-chat-bg p-4 scrollbar-thin">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-400">
              <div className="w-32 h-32 mx-auto mb-4 opacity-20">
                <svg viewBox="0 0 212 212" className="w-full h-full">
                  <defs>
                    <linearGradient id="a" x1="50%" x2="50%" y1="100%" y2="0%">
                      <stop offset="0%" stopColor="#1fa2f3" stopOpacity=".08"></stop>
                      <stop offset="100%" stopColor="#1fa2f3" stopOpacity=".02"></stop>
                    </linearGradient>
                  </defs>
                  <path fill="url(#a)" d="M106.251.5C164.653.5 212 47.846 212 106.25S164.653 212 106.25 212C47.846 212 .5 164.654.5 106.25S47.846.5 106.251.5z"></path>
                </svg>
              </div>
              <p className="text-lg">Start the conversation</p>
              <p className="text-sm">Send a message to begin chatting</p>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {/* Typing Indicator */}
            {isContactTyping && (
              <div className="flex justify-start mb-1">
                <div className="max-w-xs lg:max-w-md px-3 py-2 rounded-lg message-bubble-received text-white">
                  <div className="flex items-center space-x-1">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-xs text-gray-400 ml-2">typing...</span>
                  </div>
                </div>
              </div>
            )}
            
            {messages.map((message, index) => (
              <MessageBubble
                key={message._id || index}
                message={message}
                isOwn={message.from === 'user'}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="bg-gray-800 px-4 py-3 flex items-center space-x-3 relative">
        <div className="relative">
          <button 
            onClick={() => {
              setShowEmojiPicker(!showEmojiPicker)
              setShowFileUpload(false)
              setShowVoiceRecorder(false)
            }}
            className="p-2 hover:bg-gray-700 rounded-full transition-colors"
            title="Emoji"
          >
            <Smile className="w-6 h-6 text-gray-400" />
          </button>
          
          {showEmojiPicker && (
            <EmojiPicker
              onEmojiSelect={handleEmojiSelect}
              onClose={() => setShowEmojiPicker(false)}
            />
          )}
        </div>

        <div className="relative">
          <button 
            onClick={() => {
              setShowFileUpload(!showFileUpload)
              setShowEmojiPicker(false)
              setShowVoiceRecorder(false)
            }}
            className="p-2 hover:bg-gray-700 rounded-full transition-colors"
            title="Attach file"
          >
            <Paperclip className="w-6 h-6 text-gray-400" />
          </button>
          
          {showFileUpload && (
            <FileUploadMenu
              onFileSelect={handleFileSelect}
              onClose={() => setShowFileUpload(false)}
            />
          )}
        </div>
        
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a message"
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border-none outline-none focus:bg-gray-600 transition-colors placeholder-gray-400"
            value={messageText}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
        </div>
        
        {messageText.trim() ? (
          <button
            onClick={handleSend}
            className="p-2 bg-green-600 hover:bg-green-700 rounded-full text-white transition-colors"
            title="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        ) : (
          <div className="relative">
            <button 
              onClick={() => {
                setShowVoiceRecorder(!showVoiceRecorder)
                setShowEmojiPicker(false)
                setShowFileUpload(false)
              }}
              className="p-2 hover:bg-gray-700 rounded-full transition-colors"
              title="Voice message"
            >
              <Mic className="w-6 h-6 text-gray-400" />
            </button>
            
            {showVoiceRecorder && (
              <VoiceRecorder
                onVoiceMessage={handleVoiceMessage}
                onClose={() => setShowVoiceRecorder(false)}
              />
            )}
          </div>
        )}
      </div>

      {/* Click outside to close menus */}
      {(showChatMenu || showEmojiPicker || showFileUpload || showVoiceRecorder) && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => {
            setShowChatMenu(false)
            setShowEmojiPicker(false)
            setShowFileUpload(false)
            setShowVoiceRecorder(false)
          }}
        />
      )}
    </div>
  )
}
