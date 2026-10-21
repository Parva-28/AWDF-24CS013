// Route-specific middleware: the task id must be a positive whole number.
// It also converts the id from a string to a number for the store lookups.
function validateId(req, res, next) {
  const id = Number(req.params.id)
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: 'Task id must be a positive integer' })
  }
  req.params.id = id
  next()
}

module.exports = validateId
