const mongoose = require('mongoose')

// Connects once at startup; throws if the URI is wrong or the database is unreachable
async function connectDB() {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not set. Copy .env.example to .env and fill it in.')
  }
  await mongoose.connect(process.env.MONGO_URI)
  console.log('MongoDB connected')
}

module.exports = connectDB
