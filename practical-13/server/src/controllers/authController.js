const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

async function register(req, res, next) {
  try {
    const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : ''
    const { password } = req.body

    const details = {}
    if (!EMAIL_PATTERN.test(email)) details.email = 'a valid email is required'
    if (typeof password !== 'string' || password.length < 8) details.password = 'password must be at least 8 characters'
    if (Object.keys(details).length > 0) return res.status(400).json({ error: 'Validation failed', details })

    if (await User.exists({ email })) {
      return res.status(409).json({ error: 'An account with this email already exists' })
    }

    // bcrypt adds a salt automatically; the plain password is never stored
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({ email, password: hashedPassword })
    res.status(201).json({ id: user._id, email: user.email })
  } catch (err) {
    next(err)
  }
}

async function login(req, res, next) {
  try {
    const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : ''
    const password = typeof req.body.password === 'string' ? req.body.password : ''

    const user = await User.findOne({ email }).select('+password')
    const isMatch = user ? await bcrypt.compare(password, user.password) : false
    if (!isMatch) {
      // Same message for "no such user" and "wrong password" so attackers learn nothing extra
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const token = jwt.sign({ id: user._id.toString(), email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })
    res.status(200).json({ token, expiresIn: '1h' })
  } catch (err) {
    next(err)
  }
}

// Returns the details stored inside the verified token (no database call needed)
function me(req, res) {
  res.status(200).json({ id: req.user.id, email: req.user.email, tokenExpires: new Date(req.user.exp * 1000).toISOString() })
}

module.exports = { register, login, me }
