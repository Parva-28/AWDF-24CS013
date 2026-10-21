const Task = require('../models/Task')

// Every controller wraps its Mongoose call in try/catch and forwards errors with next(err)
async function getAllTasks(req, res, next) {
  try {
    const tasks = await Task.find().sort({ createdAt: 1 })
    res.status(200).json(tasks)
  } catch (err) {
    next(err)
  }
}

async function getTaskById(req, res, next) {
  try {
    const task = await Task.findById(req.params.id)
    if (!task) return res.status(404).json({ error: `Task ${req.params.id} not found` })
    res.status(200).json(task)
  } catch (err) {
    next(err)
  }
}

async function createTask(req, res, next) {
  try {
    // Only the fields the client may set are passed on; the schema validates the rest
    const { title, description, completed, priority } = req.body
    const task = await Task.create({ title, description, completed, priority })
    res.status(201).json(task)
  } catch (err) {
    next(err)
  }
}

async function updateTask(req, res, next) {
  try {
    const { title, description, completed, priority } = req.body
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, completed, priority },
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
    const task = await Task.findByIdAndDelete(req.params.id)
    if (!task) return res.status(404).json({ error: `Task ${req.params.id} not found` })
    res.status(200).json({ message: 'Task deleted', task })
  } catch (err) {
    next(err)
  }
}

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask }
