const jwt = require('jsonwebtoken')

// Verifies "Authorization: Bearer <token>" and puts the decoded payload on req.user
function authenticate(req, res, next) {
  const [scheme, token] = (req.headers.authorization || '').split(' ')
  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Missing or malformed Authorization header' })
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET) // { id, email, iat, exp }
    next()
  } catch (err) {
    // Expired, tampered or wrongly signed tokens all land here. Never let them crash the server.
    res.status(401).json({ error: 'Invalid or expired token' })
  }
}

module.exports = authenticate
