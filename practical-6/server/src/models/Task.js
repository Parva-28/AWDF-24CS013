const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  // Supplementary problem: priority restricted to an enum
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
})

// Supplementary problem: pre-save hook that trims whitespace from the title
taskSchema.pre('save', function trimTitle() {
  if (typeof this.title === 'string') this.title = this.title.trim()
})

module.exports = mongoose.model('Task', taskSchema)
