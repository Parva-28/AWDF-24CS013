// Supplementary problem: at most one AI request per task title, per user, per minute.
// Kept in memory, like the Practical 9 cache.
const WINDOW_MS = 60_000
const lastRequest = new Map()

function aiRateLimit(req, res, next) {
  const key = `${req.user.id}:${String(req.body.title).trim().toLowerCase()}`
  const now = Date.now()
  const previous = lastRequest.get(key)

  if (previous && now - previous < WINDOW_MS) {
    const retryAfterSeconds = Math.ceil((WINDOW_MS - (now - previous)) / 1000)
    res.set('Retry-After', String(retryAfterSeconds))
    return res.status(429).json({
      error: `Please wait ${retryAfterSeconds} s before asking again for this task.`,
      retryAfterSeconds,
    })
  }

  lastRequest.set(key, now)
  next()
}

module.exports = aiRateLimit
