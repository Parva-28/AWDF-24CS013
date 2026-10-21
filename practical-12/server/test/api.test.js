// API tests (Node's built-in test runner + supertest). Run locally with `npm test`;
// GitHub Actions runs them on every push. They need a MongoDB: MONGO_URI_TEST, or a
// local mongod on the default port.
// Jest was tried first, but inside Jest's sandbox the MongoDB 7 driver's handshake fails
// ("Missing required sub-document 'driver' in the client metadata document").
require('dotenv').config({ quiet: true })
process.env.NODE_ENV = 'test'
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret'

const { describe, test, before, after } = require('node:test')
const assert = require('node:assert/strict')
const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../src/app')

const MONGO_URI = process.env.MONGO_URI_TEST || 'mongodb://127.0.0.1:27017/taskdb_test'

describe('Task API', () => {
  let token

  before(async () => {
    await mongoose.connect(MONGO_URI)
    await mongoose.connection.db.dropDatabase()
  })

  after(async () => {
    await mongoose.connection.db.dropDatabase()
    await mongoose.disconnect()
  })

  test('GET /health returns 200', async () => {
    const res = await request(app).get('/health')
    assert.equal(res.statusCode, 200)
    assert.deepEqual(res.body, { status: 'ok' })
  })

  test('GET /tasks without a token returns 401', async () => {
    const res = await request(app).get('/tasks')
    assert.equal(res.statusCode, 401)
  })

  test('register then login returns a JWT', async () => {
    const user = { email: 'ci@example.com', password: 'ci-password-1' }
    const registered = await request(app).post('/auth/register').send(user)
    assert.equal(registered.statusCode, 201)

    const loggedIn = await request(app).post('/auth/login').send(user)
    assert.equal(loggedIn.statusCode, 200)
    assert.equal(typeof loggedIn.body.token, 'string')
    token = loggedIn.body.token
  })

  test('GET /tasks returns 200', async () => {
    const res = await request(app).get('/tasks').set('Authorization', `Bearer ${token}`)
    assert.equal(res.statusCode, 201) // deliberately wrong: demonstrates a failing pipeline
    assert.ok(Array.isArray(res.body))
  })

  test('POST /tasks without a title returns 400', async () => {
    const res = await request(app)
      .post('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ description: 'no title' })
    assert.equal(res.statusCode, 400)
    assert.ok(res.body.details.title)
  })

  test('POST /tasks creates a task and GET /tasks lists it', async () => {
    const created = await request(app)
      .post('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Write CI tests' })
    assert.equal(created.statusCode, 201)

    const list = await request(app).get('/tasks').set('Authorization', `Bearer ${token}`)
    assert.ok(list.body.map((task) => task.title).includes('Write CI tests'))
  })

  test('an unknown route returns a JSON 404', async () => {
    const res = await request(app).get('/no-such-route')
    assert.equal(res.statusCode, 404)
    assert.match(res.body.error, /not found/)
  })
})
