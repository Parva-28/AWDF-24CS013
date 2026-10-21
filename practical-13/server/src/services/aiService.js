const OpenAI = require('openai')

// Created on first use so the server still starts without a key (the AI feature then
// simply returns the fallback).
let client = null

function getClient() {
  if (!process.env.OPENAI_API_KEY) return null
  if (!client) {
    client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      timeout: 10_000, // never let a slow AI call hold the request for long
      maxRetries: 0,
    })
  }
  return client
}

// Only the task title is sent to the external service: no user email, ids or other data.
async function generateDescription(title) {
  const ai = getClient()
  if (!ai) throw new Error('OPENAI_API_KEY is not configured')

  const completion = await ai.chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    max_tokens: 120,
    messages: [
      {
        role: 'system',
        content: 'You write short, practical task descriptions (one or two sentences, under 40 words). Plain text only.',
      },
      { role: 'user', content: `Write a short task description for: ${title}` },
    ],
  })

  const text = completion.choices[0]?.message?.content?.trim()
  if (!text) throw new Error('The AI service returned an empty answer')
  return text
}

module.exports = { generateDescription }
