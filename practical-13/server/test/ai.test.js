// Practical 13: the AI route must degrade gracefully. No key is set here, so every call
// takes the fallback path; this needs no network and no real API key.
require('dotenv').config({ quiet: true })
process.env.NODE_ENV = 'test'
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret'
delete process.env.OPENAI_API_KEY

const { describe, test, before, after } = require('node:test')
const assert = require('node:assert/strict')
const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../src/app')

// Separate database: node --test runs test files in parallel
const MONGO_URI = (process.env.MONGO_URI_TEST || 'mongodb://127.0.0.1:27017/taskdb_test') + '_ai'

describe('AI description route', () => {
  let auth

  before(async () => {
    await mongoose.connect(MONGO_URI)
    await mongoose.connection.db.dropDatabase()
    const user = { email: 'ai@example.com', password: 'ai-password-1' }
    await request(app).post('/auth/register').send(user)
    const res = await request(app).post('/auth/login').send(user)
    auth = `Bearer ${res.body.token}`
  })

  after(async () => {
    await mongoose.connection.db.dropDatabase()
    await mongoose.disconnect()
  })

  test('requires a token', async () => {
    const res = await request(app).post('/api/ai/generate-description').send({ title: 'x' })
    assert.equal(res.statusCode, 401)
  })

  test('requires a title', async () => {
    const res = await request(app).post('/api/ai/generate-description').set('Authorization', auth).send({})
    assert.equal(res.statusCode, 400)
  })

  test('returns a fallback instead of an error when the AI service is unavailable', async () => {
    const res = await request(app)
      .post('/api/ai/generate-description')
      .set('Authorization', auth)
      .send({ title: 'Plan the sprint' })
    assert.equal(res.statusCode, 200)
    assert.equal(res.body.fallback, true)
    assert.equal(res.body.description, '')
    assert.match(res.body.message, /unavailable/)
  })

  test('limits each task title to one request per minute', async () => {
    const res = await request(app)
      .post('/api/ai/generate-description')
      .set('Authorization', auth)
      .send({ title: 'Plan the sprint' })
    assert.equal(res.statusCode, 429)
    assert.ok(Number(res.headers['retry-after']) > 0)
  })

  test('task creation still works while AI is unavailable', async () => {
    const res = await request(app).post('/tasks').set('Authorization', auth).send({ title: 'Plan the sprint' })
    assert.equal(res.statusCode, 201)
  })
})
