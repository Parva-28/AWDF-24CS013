const Task = require('../models/Task')
const cache = require('../cache')

// Read routes check the cache first. Write routes invalidate the affected keys after
// a successful write, so stale data is never served.

async function getAllTasks(req, res, next) {
  try {
    const key = cache.keys.allTasks(req.user.id)
    const cached = cache.get(key)
    if (cached) {
      res.set('X-Cache', 'HIT')
      return res.status(200).type('application/json').send(cached)
    }
    // lean() returns plain objects; the serialised JSON is cached so a hit skips
    // both the database query and JSON.stringify
    const tasks = await Task.find({ owner: req.user.id }).sort({ createdAt: 1 }).lean()
    const body = JSON.stringify(tasks)
    cache.set(key, body)
    res.set('X-Cache', 'MISS')
    res.status(200).type('application/json').send(body)
  } catch (err) {
    next(err)
  }
}

// Supplementary problem: the single-task endpoint has its own cache entry
async function getTaskById(req, res, next) {
  try {
    const key = cache.keys.oneTask(req.user.id, req.params.id)
    const cached = cache.get(key)
    if (cached) {
      res.set('X-Cache', 'HIT')
      return res.status(200).type('application/json').send(cached)
    }
    const task = await Task.findOne({ _id: req.params.id, owner: req.user.id }).lean()
    if (!task) return res.status(404).json({ error: `Task ${req.params.id} not found` })
    const body = JSON.stringify(task)
    cache.set(key, body)
    res.set('X-Cache', 'MISS')
    res.status(200).type('application/json').send(body)
  } catch (err) {
    next(err)
  }
}

async function createTask(req, res, next) {
  try {
    const { title, description, completed, priority } = req.body
    const task = await Task.create({ title, description, completed, priority, owner: req.user.id })
    cache.del(cache.keys.allTasks(req.user.id))
    res.status(201).json(task)
  } catch (err) {
    next(err)
  }
}

async function updateTask(req, res, next) {
  try {
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
    cache.del([cache.keys.allTasks(req.user.id), cache.keys.oneTask(req.user.id, req.params.id)])
    res.status(200).json(task)
  } catch (err) {
    next(err)
  }
}

async function deleteTask(req, res, next) {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user.id })
    if (!task) return res.status(404).json({ error: `Task ${req.params.id} not found` })
    cache.del([cache.keys.allTasks(req.user.id), cache.keys.oneTask(req.user.id, req.params.id)])
    res.status(200).json({ message: 'Task deleted', task })
  } catch (err) {
    next(err)
  }
}

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask }
