const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  // Each task belongs to the user who created it
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
})

taskSchema.pre('save', function trimTitle() {
  if (typeof this.title === 'string') this.title = this.title.trim()
})

module.exports = mongoose.model('Task', taskSchema)
