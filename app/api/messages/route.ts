import { NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { Message } from '@/types'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const message: Omit<Message, '_id'> = await request.json()
    const db = await getDatabase()
    
    if (!db) {
      // Return mock saved message when database is not available
      return NextResponse.json({
        _id: 'mock-' + Date.now(),
        ...message,
        timestamp: new Date().toISOString()
      })
    }

    const collection = db.collection('processed_messages')
    
    const result = await collection.insertOne({
      ...message,
      timestamp: new Date().toISOString()
    })

    const savedMessage = await collection.findOne({ _id: result.insertedId })
    
    return NextResponse.json(savedMessage)
  } catch (error) {
    console.error('Error saving message:', error)
    return NextResponse.json({ error: 'Failed to save message' }, { status: 500 })
  }
}
