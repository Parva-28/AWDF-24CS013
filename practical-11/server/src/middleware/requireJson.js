// Supplementary problem: POST and PUT must send Content-Type: application/json
function requireJson(req, res, next) {
  if (!req.is('application/json')) {
    return res.status(415).json({ error: 'Content-Type must be application/json' })
  }
  next()
}

module.exports = requireJson
