// Validation + sanitisation before the controller and the database see the request.
// Only the fields a client may set are kept.
const PRIORITIES = ['low', 'medium', 'high']

function validateTaskInput(req, res, next) {
  const { title, description, completed, priority } = req.body
  const problems = {}

  if (req.method === 'POST' && title === undefined) {
    problems.title = 'title is required'
  } else if (title !== undefined && (typeof title !== 'string' || title.trim() === '')) {
    problems.title = 'title must be a non-empty string'
  } else if (typeof title === 'string' && title.trim().length > 200) {
    problems.title = 'title must be at most 200 characters'
  }
  if (description !== undefined && typeof description !== 'string') problems.description = 'description must be a string'
  if (completed !== undefined && typeof completed !== 'boolean') problems.completed = 'completed must be true or false'
  if (priority !== undefined && !PRIORITIES.includes(priority)) problems.priority = 'priority must be low, medium or high'

  if (Object.keys(problems).length > 0) {
    return res.status(400).json({ error: 'Validation failed', details: problems })
  }

  req.body = {
    title: typeof title === 'string' ? title.trim() : undefined,
    description: typeof description === 'string' ? description.trim() : undefined,
    completed,
    priority,
  }
  next()
}

module.exports = validateTaskInput
