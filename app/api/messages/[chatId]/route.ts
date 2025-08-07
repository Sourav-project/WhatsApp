import { NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'

export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  { params }: { params: { chatId: string } }
) {
  try {
    const db = await getDatabase()
    
    if (!db) {
      // Return sample messages when database is not available
      return NextResponse.json([
        {
          _id: 'sample1',
          wa_id: params.chatId,
          text: 'Hello! How are you doing?',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          type: 'text',
          from: 'contact',
          status: 'delivered'
        },
        {
          _id: 'sample2',
          wa_id: params.chatId,
          text: 'I\'m doing great! Thanks for asking.',
          timestamp: new Date(Date.now() - 3000000).toISOString(),
          type: 'text',
          from: 'user',
          status: 'read'
        }
      ])
    }

    const collection = db.collection('processed_messages')
    
    const messages = await collection
      .find({ wa_id: params.chatId })
      .sort({ timestamp: 1 })
      .toArray()

    return NextResponse.json(messages)
  } catch (error) {
    console.error('Error fetching messages:', error)
    return NextResponse.json([])
  }
}
