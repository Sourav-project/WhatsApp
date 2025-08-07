'use client'

import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

export function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    let socketInstance: Socket | null = null

    try {
      // For development, try to connect to Socket.IO
      // In production, this would connect to your WebSocket service
      socketInstance = io(process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '', {
        transports: ['websocket', 'polling']
      })

      socketInstance.on('connect', () => {
        console.log('Connected to WebSocket server')
        setSocket(socketInstance)
      })

      socketInstance.on('disconnect', () => {
        console.log('Disconnected from WebSocket server')
        setSocket(null)
      })

      socketInstance.on('connect_error', (error) => {
        console.log('WebSocket connection error:', error)
        setSocket(null)
      })

    } catch (error) {
      console.log('WebSocket not available, using polling fallback')
      setSocket(null)
    }

    return () => {
      if (socketInstance) {
        socketInstance.disconnect()
      }
    }
  }, [])

  return socket
}
