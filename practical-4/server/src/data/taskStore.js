// Temporary in-memory storage (Practical 4). Practical 5 replaces this with MongoDB.
let tasks = []
let nextId = 1

function findAll() {
  return tasks
}

function findById(id) {
  return tasks.find((task) => task.id === id)
}

function create({ title, description = '' }) {
  const task = { id: nextId++, title, description, completed: false, createdAt: new Date().toISOString() }
  tasks.push(task)
  return task
}

// Only editable fields are copied, so a client cannot change id or createdAt
function update(id, changes) {
  const task = findById(id)
  if (!task) return null
  const { title, description, completed } = changes
  if (title !== undefined) task.title = title
  if (description !== undefined) task.description = description
  if (completed !== undefined) task.completed = completed
  return task
}

function remove(id) {
  const index = tasks.findIndex((task) => task.id === id)
  if (index === -1) return null
  const [removed] = tasks.splice(index, 1)
  return removed
}

module.exports = { findAll, findById, create, update, remove }
