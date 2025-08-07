// MongoDB setup script
// Run this in MongoDB shell or MongoDB Compass

use whatsapp

// Create processed_messages collection with indexes
db.createCollection("processed_messages")

// Create indexes for better performance
db.processed_messages.createIndex({ "wa_id": 1, "timestamp": -1 })
db.processed_messages.createIndex({ "meta_msg_id": 1 })
db.processed_messages.createIndex({ "timestamp": -1 })

// Insert sample data
db.processed_messages.insertMany([
  {
    wa_id: "1234567890",
    text: "Hello! How are you?",
    timestamp: new Date().toISOString(),
    type: "text",
    from: "contact",
    status: "delivered",
    meta_msg_id: "msg_001"
  },
  {
    wa_id: "1234567890",
    text: "I'm doing great, thanks for asking!",
    timestamp: new Date(Date.now() + 60000).toISOString(),
    type: "text",
    from: "user",
    status: "read",
    meta_msg_id: "msg_002"
  },
  {
    wa_id: "0987654321",
    text: "Hey there! Long time no see.",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    type: "text",
    from: "contact",
    status: "delivered",
    meta_msg_id: "msg_003"
  },
  {
    wa_id: "1122334455",
    text: "Junior: Bhaiya ek baat poochu?",
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    type: "text",
    from: "contact",
    status: "delivered",
    meta_msg_id: "msg_004"
  },
  {
    wa_id: "1122334455",
    text: "Senior: Haan poocho",
    timestamp: new Date(Date.now() - 1200000).toISOString(),
    type: "text",
    from: "contact",
    status: "delivered",
    meta_msg_id: "msg_005"
  }
])

console.log("MongoDB setup completed!")
