export interface Message {
  _id?: string
  wa_id: string
  text: string
  timestamp: string
  type: 'text' | 'image' | 'audio' | 'video' | 'document'
  from: 'user' | 'contact'
  status: 'sent' | 'delivered' | 'read'
  meta_msg_id?: string
}

export interface Chat {
  wa_id: string
  name: string
  avatar?: string
  lastMessage?: string
  lastMessageTime?: string
  unreadCount?: number
  isOnline?: boolean
  lastSeen?: string
  isPinned?: boolean
  isMuted?: boolean
}

export interface User {
  id: string
  name: string
  phoneNumber: string
  avatar?: string
  isOnline: boolean
}

export interface WebhookPayload {
  id: string
  wa_id: string
  text?: string
  timestamp: string
  type: string
  status?: string
  meta_msg_id?: string
}
