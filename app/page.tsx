'use client'

import { useState, useEffect } from 'react'
import LoginScreen from '@/components/login-screen'
import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import ChatWindow from '@/components/chat-window'
import WelcomeScreen from '@/components/welcome-screen'
import ProfilePage from '@/components/pages/profile-page'
import SettingsPage from '@/components/pages/settings-page'
import NotificationsPage from '@/components/pages/notifications-page'
import StarredPage from '@/components/pages/starred-page'
import ArchivedPage from '@/components/pages/archived-page'
import ContactsPage from '@/components/pages/contacts-page'
import HelpPage from '@/components/pages/help-page'
import SearchMessagesPage from '@/components/pages/search-messages-page'
import { Message, Chat, User } from '@/types'
import { useSocket } from '@/hooks/use-socket'
import AccountPage from '@/components/pages/account-page'
import PrivacyPage from '@/components/pages/privacy-page'
import ThemePage from '@/components/pages/theme-page'
import LanguagePage from '@/components/pages/language-page'

export default function WhatsAppClone() {
  const [user, setUser] = useState<User | null>(null)
  const [chats, setChats] = useState<Chat[]>([])
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState<string>('chats')
  const socket = useSocket()

  // Remove watermarks on component mount
  useEffect(() => {
    const removeWatermarks = () => {
      const watermarkSelectors = [
        '[data-v0-watermark]',
        '[class*="v0-watermark"]',
        '[id*="v0-watermark"]',
        '[class*="built-with"]',
        '[id*="built-with"]',
        '[aria-label*="v0"]',
        '[title*="v0"]'
      ];
      
      watermarkSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => el.remove());
      });
    };

    removeWatermarks();
    const interval = setInterval(removeWatermarks, 500);
    
    return () => clearInterval(interval);
  }, []);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('whatsapp_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  // Load chats when user is logged in
  useEffect(() => {
    if (user) {
      loadChats()
    }
  }, [user])

  // Socket event listeners
  useEffect(() => {
    if (socket && user) {
      socket.on('newMessage', (message: Message) => {
        setMessages(prev => [...prev, message])
        updateChatLastMessage(message)
      })

      socket.on('messageStatusUpdate', (update: { messageId: string, status: string }) => {
        setMessages(prev => prev.map(msg => 
          msg._id === update.messageId 
            ? { ...msg, status: update.status }
            : msg
        ))
      })

      return () => {
        socket.off('newMessage')
        socket.off('messageStatusUpdate')
      }
    }
  }, [socket, user])

  const handleLogin = (phoneNumber: string) => {
    const newUser: User = {
      id: Date.now().toString(),
      name: `User ${phoneNumber.slice(-4)}`,
      phoneNumber,
      avatar: undefined,
      isOnline: true
    }
    
    setUser(newUser)
    localStorage.setItem('whatsapp_user', JSON.stringify(newUser))
  }

  const handleLogout = () => {
    setUser(null)
    setChats([])
    setSelectedChat(null)
    setMessages([])
    setCurrentPage('chats')
    localStorage.removeItem('whatsapp_user')
    socket?.disconnect()
  }

  const handleNavigate = (page: string) => {
    setCurrentPage(page)
    if (page !== 'chats' && page !== 'search-messages') {
      setSelectedChat(null)
    }
  }

  const handleBack = () => {
    setCurrentPage('chats')
  }

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser)
    localStorage.setItem('whatsapp_user', JSON.stringify(updatedUser))
  }

  const loadChats = async () => {
    if (!user) return
    
    setLoading(true)
    try {
      const response = await fetch('/api/chats')
      if (response.ok) {
        const data = await response.json()
        setChats(Array.isArray(data) ? data : [])
      }
    } catch (error) {
      console.error('Error loading chats:', error)
      setChats([])
    } finally {
      setLoading(false)
    }
  }

  const loadMessages = async (chatId: string) => {
    try {
      const response = await fetch(`/api/messages/${chatId}`)
      if (response.ok) {
        const data = await response.json()
        setMessages(Array.isArray(data) ? data : [])
      }
    } catch (error) {
      console.error('Error loading messages:', error)
      setMessages([])
    }
  }

  const updateChatLastMessage = (message: Message) => {
    setChats(prev => prev.map(chat => 
      chat.wa_id === message.wa_id
        ? { 
            ...chat, 
            lastMessage: message.text, 
            lastMessageTime: message.timestamp,
            unreadCount: message.from === 'contact' ? (chat.unreadCount || 0) + 1 : chat.unreadCount
          }
        : chat
    ))
  }

  const handleChatSelect = (chat: Chat) => {
    setSelectedChat(chat)
    setCurrentPage('chats')
    loadMessages(chat.wa_id)
    
    // Mark messages as read
    setChats(prev => prev.map(c => 
      c.wa_id === chat.wa_id ? { ...c, unreadCount: 0 } : c
    ))
  }

  const handleSendMessage = async (text: string, file?: File, fileType?: string) => {
    if (!selectedChat || (!text.trim() && !file) || !user) return

    const newMessage: Omit<Message, '_id'> = {
      wa_id: selectedChat.wa_id,
      text: text || `📎 ${file?.name}`,
      timestamp: new Date().toISOString(),
      type: file ? (fileType as any) || 'file' : 'text',
      from: 'user',
      status: 'sent'
    }

    // Optimistically add message
    const tempMessage = { ...newMessage, _id: 'temp-' + Date.now() }
    setMessages(prev => [...prev, tempMessage])
    updateChatLastMessage(tempMessage)

    try {
      // If there's a file, we could upload it to a server here
      if (file) {
        console.log('File to upload:', file)
        // In a real app, you'd upload the file to your server/cloud storage
        // const formData = new FormData()
        // formData.append('file', file)
        // const uploadResponse = await fetch('/api/upload', { method: 'POST', body: formData })
      }

      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMessage),
      })

      if (response.ok) {
        const savedMessage = await response.json()
        setMessages(prev => prev.map(msg => 
          msg._id === tempMessage._id ? savedMessage : msg
        ))
        
        // Emit to socket
        socket?.emit('sendMessage', savedMessage)

        // Auto-reply system (only for text messages)
        if (!file) {
          setTimeout(() => {
            generateAutoReply(text, selectedChat)
          }, 1000 + Math.random() * 3000)
        }
      }
    } catch (error) {
      console.error('Error sending message:', error)
      setMessages(prev => prev.filter(msg => msg._id !== tempMessage._id))
    }
  }

  const generateAutoReply = async (userMessage: string, chat: Chat) => {
    const replies = getSmartReply(userMessage, chat.name)
    const selectedReply = replies[Math.floor(Math.random() * replies.length)]

    const replyMessage: Omit<Message, '_id'> = {
      wa_id: chat.wa_id,
      text: selectedReply,
      timestamp: new Date().toISOString(),
      type: 'text',
      from: 'contact',
      status: 'delivered'
    }

    // Add reply message
    const tempReply = { ...replyMessage, _id: 'reply-' + Date.now() }
    setMessages(prev => [...prev, tempReply])
    updateChatLastMessage(tempReply)

    // Save to database
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(replyMessage),
      })

      if (response.ok) {
        const savedReply = await response.json()
        setMessages(prev => prev.map(msg => 
          msg._id === tempReply._id ? savedReply : msg
        ))
      }
    } catch (error) {
      console.error('Error saving reply:', error)
    }
  }

  const getSmartReply = (message: string, contactName: string): string[] => {
    const lowerMessage = message.toLowerCase()
    
    // Greeting responses
    if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('hey')) {
      return [
        `Hi there! 👋`,
        `Hello! How are you doing?`,
        `Hey! Good to hear from you!`,
        `Hi! What's up?`,
        `Hello! Hope you're having a great day!`
      ]
    }
    
    // How are you responses
    if (lowerMessage.includes('how are you') || lowerMessage.includes('how r u')) {
      return [
        `I'm doing great, thanks for asking! How about you?`,
        `Pretty good! Just busy with some work. You?`,
        `All good here! What about you?`,
        `I'm fine, thanks! How's your day going?`,
        `Great! Thanks for asking 😊`
      ]
    }
    
    // Question responses
    if (lowerMessage.includes('?')) {
      return [
        `That's a good question! Let me think about it.`,
        `Hmm, I'm not sure about that one.`,
        `Interesting question! What do you think?`,
        `I'd need to look into that more.`,
        `Good point! I hadn't thought of that.`
      ]
    }
    
    // Thanks responses
    if (lowerMessage.includes('thank') || lowerMessage.includes('thx')) {
      return [
        `You're welcome! 😊`,
        `No problem at all!`,
        `Happy to help!`,
        `Anytime!`,
        `Glad I could help! 👍`
      ]
    }
    
    // Work/study related (for CS groups)
    if (contactName.toLowerCase().includes('cs') || lowerMessage.includes('assignment') || lowerMessage.includes('project')) {
      return [
        `Yeah, that assignment is pretty challenging!`,
        `I'm working on it too. Want to collaborate?`,
        `Did you check the resources shared earlier?`,
        `The deadline is coming up fast!`,
        `Let me know if you need any help with that.`
      ]
    }
    
    // Group chat responses
    if (contactName.toLowerCase().includes('group') || contactName.toLowerCase().includes('club')) {
      return [
        `Thanks for sharing that with the group!`,
        `That's really helpful for everyone.`,
        `Good point! Others might find this useful too.`,
        `Appreciate you keeping us updated!`,
        `This is exactly what we needed to know.`
      ]
    }
    
    // Time-based responses
    const hour = new Date().getHours()
    if (hour < 12) {
      return [
        `Good morning! ☀️`,
        `Morning! Hope you slept well.`,
        `Early bird today! 🐦`,
        `Good morning! Ready for the day?`
      ]
    } else if (hour < 17) {
      return [
        `Good afternoon! 🌤️`,
        `Hope your day is going well!`,
        `Afternoon! How's everything?`,
        `Good to hear from you this afternoon!`
      ]
    } else {
      return [
        `Good evening! 🌙`,
        `Evening! How was your day?`,
        `Hope you had a good day!`,
        `Evening! Time to relax now.`
      ]
    }
    
    // Default responses
    return [
      `That's interesting!`,
      `I see what you mean.`,
      `Tell me more about that.`,
      `That sounds good!`,
      `I agree with you on that.`,
      `Really? That's cool!`,
      `Nice! 👍`,
      `Awesome! 😄`,
      `Got it! Thanks for letting me know.`,
      `That makes sense.`,
      `Interesting perspective!`,
      `I hadn't thought of it that way.`,
      `Good to know!`,
      `Thanks for sharing that.`,
      `That's helpful information.`
    ]
  }

  // Show login screen if user is not logged in
  if (!user) {
    return <LoginScreen onLogin={handleLogin} />
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'profile':
        return <ProfilePage user={user} onBack={handleBack} onUpdateUser={handleUpdateUser} />
      case 'settings':
        return <SettingsPage onBack={handleBack} onNavigate={handleNavigate} />
      case 'account':
        return <AccountPage onBack={handleBack} />
      case 'privacy':
        return <PrivacyPage onBack={handleBack} />
      case 'theme':
        return <ThemePage onBack={handleBack} />
      case 'language':
        return <LanguagePage onBack={handleBack} />
      case 'notifications':
        return <NotificationsPage onBack={handleBack} />
      case 'starred':
        return <StarredPage onBack={handleBack} />
      case 'archived':
        return <ArchivedPage onBack={handleBack} />
      case 'contacts':
        return <ContactsPage onBack={handleBack} />
      case 'help':
        return <HelpPage onBack={handleBack} />
      case 'search-messages':
        return <SearchMessagesPage onBack={handleBack} />
      case 'chats':
      default:
        return (
          <div className="flex flex-1 overflow-hidden">
            <Sidebar 
              chats={chats}
              selectedChat={selectedChat}
              onChatSelect={handleChatSelect}
              onNavigate={handleNavigate}
              loading={loading}
            />
            {selectedChat ? (
              <ChatWindow 
                chat={selectedChat}
                messages={messages}
                onSendMessage={handleSendMessage}
                onNavigate={handleNavigate}
              />
            ) : (
              <WelcomeScreen />
            )}
          </div>
        )
    }
  }

  return (
    <div className="flex flex-col h-screen whatsapp-bg">
      <Header user={user} onLogout={handleLogout} onNavigate={handleNavigate} />
      {renderCurrentPage()}
    </div>
  )
}
