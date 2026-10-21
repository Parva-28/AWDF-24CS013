// Route-specific middleware: a MongoDB ObjectId is 24 hexadecimal characters.
// Rejecting bad ids here means Mongoose never sees them.
const OBJECT_ID = /^[a-f\d]{24}$/i

function validateId(req, res, next) {
  if (!OBJECT_ID.test(req.params.id)) {
    return res.status(400).json({ error: 'Task id must be a 24-character MongoDB ObjectId' })
  }
  next()
}

module.exports = validateId
