// Supplementary problem: structured JSON for any route that does not exist.
// Mounted after all routes, so it only runs when nothing else responded.
function notFound(req, res) {
  res.status(404).json({ error: `Route ${req.method} ${req.originalUrl} not found` })
}

module.exports = notFound
