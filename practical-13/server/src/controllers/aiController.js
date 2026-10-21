const { generateDescription } = require('../services/aiService')

const FALLBACK_MESSAGE = 'AI suggestions are unavailable right now. You can still write the description yourself.'

// Graceful degradation: any failure (bad key, timeout, quota, network) still answers 200 with
// fallback: true, so the task form keeps working without the AI feature.
async function suggestDescription(req, res) {
  const title = req.body.title.trim()
  try {
    const description = await generateDescription(title)
    res.status(200).json({ description, fallback: false, aiGenerated: true })
  } catch (err) {
    // Log the reason on the server only; the key and provider details never reach the client
    console.error(`[AI] suggestion failed for "${title}": ${err.message}`)
    res.status(200).json({ description: '', fallback: true, message: FALLBACK_MESSAGE })
  }
}

module.exports = { suggestDescription }
