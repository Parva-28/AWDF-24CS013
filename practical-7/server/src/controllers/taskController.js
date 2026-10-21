const Task = require('../models/Task')

// Every query is limited to the logged-in user's tasks (req.user.id comes from the verified token)
async function getAllTasks(req, res, next) {
  try {
    const tasks = await Task.find({ owner: req.user.id }).sort({ createdAt: 1 })
    res.status(200).json(tasks)
  } catch (err) {
    next(err)
  }
}

async function getTaskById(req, res, next) {
  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.user.id })
    if (!task) return res.status(404).json({ error: `Task ${req.params.id} not found` })
    res.status(200).json(task)
  } catch (err) {
    next(err)
  }
}

async function createTask(req, res, next) {
  try {
    const { title, description, completed, priority } = req.body
    const task = await Task.create({ title, description, completed, priority, owner: req.user.id })
    res.status(201).json(task)
  } catch (err) {
    next(err)
  }
}

async function updateTask(req, res, next) {
  try {
    // Only send the fields the client actually provided
    const changes = {}
    for (const field of ['title', 'description', 'completed', 'priority']) {
      if (req.body[field] !== undefined) changes[field] = req.body[field]
    }
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      changes,
      { new: true, runValidators: true },
    )
    if (!task) return res.status(404).json({ error: `Task ${req.params.id} not found` })
    res.status(200).json(task)
  } catch (err) {
    next(err)
  }
}

async function deleteTask(req, res, next) {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user.id })
    if (!task) return res.status(404).json({ error: `Task ${req.params.id} not found` })
    res.status(200).json({ message: 'Task deleted', task })
  } catch (err) {
    next(err)
  }
}

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask }
