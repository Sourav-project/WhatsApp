import { NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { WebhookPayload } from '@/types'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const payload: WebhookPayload = await request.json()
    const db = await getDatabase()
    
    if (!db) {
      return NextResponse.json({ success: true, message: 'Database not available' })
    }

    const collection = db.collection('processed_messages')
    
    if (payload.type === 'message' && payload.text) {
      const message = {
        wa_id: payload.wa_id,
        text: payload.text,
        timestamp: payload.timestamp,
        type: 'text',
        from: 'contact',
        status: 'delivered',
        meta_msg_id: payload.meta_msg_id
      }
      
      await collection.insertOne(message)
    } else if (payload.status && (payload.id || payload.meta_msg_id)) {
      const filter = payload.id 
        ? { _id: payload.id }
        : { meta_msg_id: payload.meta_msg_id }
      
      await collection.updateOne(filter, {
        $set: { status: payload.status }
      })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json({ error: 'Failed to process webhook' }, { status: 500 })
  }
}
