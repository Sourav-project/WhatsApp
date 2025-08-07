import { MongoClient, Db } from 'mongodb'

let client: MongoClient | null = null
let clientPromise: Promise<MongoClient> | null = null

export async function getDatabase(): Promise<Db | null> {
  if (!process.env.MONGODB_URI) {
    console.warn('MongoDB URI not provided')
    return null
  }

  try {
    if (!clientPromise) {
      const uri = process.env.MONGODB_URI
      const options = {}

      if (process.env.NODE_ENV === 'development') {
        let globalWithMongo = global as typeof globalThis & {
          _mongoClientPromise?: Promise<MongoClient>
        }

        if (!globalWithMongo._mongoClientPromise) {
          client = new MongoClient(uri, options)
          globalWithMongo._mongoClientPromise = client.connect()
        }
        clientPromise = globalWithMongo._mongoClientPromise
      } else {
        client = new MongoClient(uri, options)
        clientPromise = client.connect()
      }
    }

    const connectedClient = await clientPromise
    return connectedClient.db('whatsapp')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    return null
  }
}

export default clientPromise
