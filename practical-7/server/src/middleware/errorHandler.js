// Global error handler: must be the LAST app.use(). It never sends stack traces to the client.
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  console.error(err.stack)

  // Mongoose validation failure: return a clean, structured message (not the raw ValidationError)
  if (err.name === 'ValidationError') {
    const details = {}
    for (const [field, problem] of Object.entries(err.errors)) {
      details[field] = problem.message
    }
    return res.status(400).json({ error: 'Validation failed', details })
  }

  const status = err.status || err.statusCode || 500
  if (status >= 500) {
    return res.status(500).json({ error: 'Something went wrong' })
  }
  res.status(status).json({ error: err.message })
}

module.exports = errorHandler
