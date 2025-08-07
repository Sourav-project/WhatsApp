import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  return new Response('WebSocket endpoint - use pusher or similar service for production', {
    status: 200,
  })
}

export async function POST(req: NextRequest) {
  return new Response('WebSocket endpoint - use pusher or similar service for production', {
    status: 200,
  })
}
