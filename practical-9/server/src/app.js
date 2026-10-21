const express = require('express')
const cors = require('cors')
const requestLogger = require('./middleware/logger')
const notFound = require('./middleware/notFound')
const errorHandler = require('./middleware/errorHandler')
const authRoutes = require('./routes/authRoutes')
const taskRoutes = require('./routes/taskRoutes')
const cache = require('./cache')

const app = express()

app.use(cors())
app.use(express.json())
app.use(requestLogger)

app.use('/auth', authRoutes)
app.use('/tasks', taskRoutes)

if (process.env.NODE_ENV !== 'production') {
  // Supplementary problem: cache hit/miss counters for debugging
  app.get('/debug/cache-stats', (req, res) => res.json(cache.stats()))
  app.get('/debug/error', () => {
    throw new Error('Deliberate test error for the lab demo')
  })
}

app.use(notFound)
app.use(errorHandler)

module.exports = app
