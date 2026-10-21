// Logs method, URL and timestamp for every incoming request, then continues the pipeline
function requestLogger(req, res, next) {
  // Jest sets NODE_ENV=test; skip the log line there to keep test output readable
  if (process.env.NODE_ENV !== 'test') {
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`)
  }
  next()
}

module.exports = requestLogger
