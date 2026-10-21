const express = require('express')
const requestLogger = require('./middleware/logger')
const notFound = require('./middleware/notFound')
const errorHandler = require('./middleware/errorHandler')
const taskRoutes = require('./routes/taskRoutes')

const app = express()

app.use(express.json())
app.use(requestLogger)

app.use('/tasks', taskRoutes)

if (process.env.NODE_ENV !== 'production') {
  app.get('/debug/error', () => {
    throw new Error('Deliberate test error for the lab demo')
  })
}

app.use(notFound)
app.use(errorHandler)

module.exports = app
