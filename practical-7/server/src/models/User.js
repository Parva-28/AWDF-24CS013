const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    // Only the bcrypt hash is stored. select: false keeps it out of normal query results.
    password: { type: String, required: true, select: false },
  },
  { timestamps: true },
)

module.exports = mongoose.model('User', userSchema)
