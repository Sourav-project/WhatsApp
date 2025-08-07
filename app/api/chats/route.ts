import { NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const db = await getDatabase()
    
    if (!db) {
      // Return sample data when database is not available
      return NextResponse.json([
        {
          wa_id: '1234567890',
          name: 'CS - A',
          lastMessage: 'Avadhi: 📄 4. Personality.pptx - 32 pages',
          lastMessageTime: new Date(Date.now() - 86400000).toISOString(),
          unreadCount: 0,
          isPinned: true
        },
        {
          wa_id: '0987654321',
          name: 'CS A IET(DAVV) Unofficial',
          lastMessage: '~Piyush Rawat: gt hena aaj?',
          lastMessageTime: new Date(Date.now() - 172800000).toISOString(),
          unreadCount: 0
        },
        {
          wa_id: '1122334455',
          name: 'Coding Club India : Coder',
          lastMessage: '~coding Club: 😊 😊 Junior: Bhaiya ek baat poochu? 🤔 Senior:...',
          lastMessageTime: new Date().toISOString(),
          unreadCount: 537
        },
        {
          wa_id: '5566778899',
          name: 'Ritik(Cse)',
          lastMessage: 'Hn',
          lastMessageTime: new Date(Date.now() - 3600000).toISOString(),
          unreadCount: 0
        },
        {
          wa_id: '9988776655',
          name: 'The family group🔥',
          lastMessage: 'Neelu: 📷 Image',
          lastMessageTime: new Date(Date.now() - 7200000).toISOString(),
          unreadCount: 3
        }
      ])
    }

    const collection = db.collection('processed_messages')
    
    const chats = await collection.aggregate([
      {
        $sort: { timestamp: -1 }
      },
      {
        $group: {
          _id: '$wa_id',
          name: { $first: '$wa_id' },
          lastMessage: { $first: '$text' },
          lastMessageTime: { $first: '$timestamp' },
          unreadCount: { 
            $sum: { 
              $cond: [{ $eq: ['$from', 'contact'] }, 1, 0] 
            }
          }
        }
      },
      {
        $project: {
          wa_id: '$_id',
          name: { $concat: ['Contact ', '$_id'] },
          lastMessage: 1,
          lastMessageTime: 1,
          unreadCount: { $min: ['$unreadCount', 99] }
        }
      },
      {
        $sort: { lastMessageTime: -1 }
      }
    ]).toArray()

    return NextResponse.json(chats)
  } catch (error) {
    console.error('Error fetching chats:', error)
    return NextResponse.json([])
  }
}
