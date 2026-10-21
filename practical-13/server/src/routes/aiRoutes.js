const express = require('express')
const authenticate = require('../middleware/authenticate')
const requireJson = require('../middleware/requireJson')
const aiRateLimit = require('../middleware/aiRateLimit')
const { suggestDescription } = require('../controllers/aiController')

const router = express.Router()

function requireTitle(req, res, next) {
  const { title } = req.body
  if (typeof title !== 'string' || title.trim() === '' || title.length > 200) {
    return res.status(400).json({ error: 'Validation failed', details: { title: 'a title of 1-200 characters is required' } })
  }
  next()
}

router.post('/generate-description', authenticate, requireJson, requireTitle, aiRateLimit, suggestDescription)

module.exports = router
