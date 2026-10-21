// Inserts many tasks for one user so that caching has a measurable effect.
// Usage: node scripts/seed-tasks.js <email> <count>
require('dotenv').config()
const mongoose = require('mongoose')
const User = require('../src/models/User')
const Task = require('../src/models/Task')

async function main() {
  const [email, countArg] = process.argv.slice(2)
  const count = Number(countArg) || 2000
  await mongoose.connect(process.env.MONGO_URI)
  const user = await User.findOne({ email })
  if (!user) throw new Error(`No user with email ${email}; register first`)
  const docs = Array.from({ length: count }, (_, i) => ({
    title: `Seeded task ${i + 1}`,
    description: 'Sample data for the caching measurement',
    priority: ['low', 'medium', 'high'][i % 3],
    owner: user._id,
  }))
  await Task.insertMany(docs)
  console.log(`Inserted ${count} tasks for ${email}`)
  await mongoose.disconnect()
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
