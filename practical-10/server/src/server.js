require('dotenv').config()
const app = require('./app')
const connectDB = require('./db')

const PORT = process.env.PORT || 5000

if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET is not set. Add it to .env (never hard-code it).')
  process.exit(1)
}

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .catch((err) => {
    console.error('Could not start server:', err.message)
    process.exit(1)
  })
