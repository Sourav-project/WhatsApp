import { NextRequest } from 'next/server'
import { Server as SocketIOServer } from 'socket.io'
import { Server as HTTPServer } from 'http'

export async function GET(req: NextRequest) {
  // This is handled by the socket.io server in a separate process
  // or you can use a different approach for WebSocket handling
  return new Response('Socket.IO server should be running separately', {
    status: 200,
  })
}
