const express = require('express')
const requestLogger = require('./middleware/logger')
const notFound = require('./middleware/notFound')
const errorHandler = require('./middleware/errorHandler')
const taskRoutes = require('./routes/taskRoutes')

const app = express()

// 1. Parse JSON bodies so req.body is available (undefined without this)
app.use(express.json())
// 2. Log every request
app.use(requestLogger)

// 3. Routes
app.use('/tasks', taskRoutes)

// Lab demo only: throws on purpose so the error handler can be shown working
if (process.env.NODE_ENV !== 'production') {
  app.get('/debug/error', () => {
    throw new Error('Deliberate test error for the lab demo')
  })
}

// 4. Anything not handled above
app.use(notFound)

// 5. Global error handler is always last
app.use(errorHandler)

module.exports = app
