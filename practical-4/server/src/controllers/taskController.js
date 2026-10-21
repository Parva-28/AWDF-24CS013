const store = require('../data/taskStore')

// Each controller passes unexpected errors to next(err) so the global error handler responds
function getAllTasks(req, res, next) {
  try {
    res.status(200).json(store.findAll())
  } catch (err) {
    next(err)
  }
}

function createTask(req, res, next) {
  try {
    const { title, description } = req.body
    if (typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ error: 'title is required' })
    }
    const task = store.create({ title: title.trim(), description })
    res.status(201).json(task)
  } catch (err) {
    next(err)
  }
}

function updateTask(req, res, next) {
  try {
    const task = store.update(req.params.id, req.body)
    if (!task) return res.status(404).json({ error: `Task ${req.params.id} not found` })
    res.status(200).json(task)
  } catch (err) {
    next(err)
  }
}

function deleteTask(req, res, next) {
  try {
    const task = store.remove(req.params.id)
    if (!task) return res.status(404).json({ error: `Task ${req.params.id} not found` })
    res.status(200).json({ message: 'Task deleted', task })
  } catch (err) {
    next(err)
  }
}

module.exports = { getAllTasks, createTask, updateTask, deleteTask }
