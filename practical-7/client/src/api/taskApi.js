import { getToken, clearToken } from './session.js'

// One place for the backend address, so every request uses the same base URL
export const BASE_URL = 'http://localhost:5000'

export class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
  }
}

async function request(path, options = {}) {
  const headers = { 'Content-Type': 'application/json' }
  const token = getToken()
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers })
  const body = await res.json().catch(() => ({}))

  if (!res.ok) {
    // A 401 from a protected route means the token is missing, invalid or expired
    if (res.status === 401 && token) clearToken()
    const message = body.error || `Request failed with status ${res.status}`
    throw new ApiError(message, res.status)
  }
  return body
}

export const register = (email, password) =>
  request('/auth/register', { method: 'POST', body: JSON.stringify({ email, password }) })
export const login = (email, password) =>
  request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) })
export const getMe = () => request('/auth/me')

export const getTasks = () => request('/tasks')
export const createTask = (task) => request('/tasks', { method: 'POST', body: JSON.stringify(task) })
export const updateTask = (id, changes) =>
  request(`/tasks/${id}`, { method: 'PUT', body: JSON.stringify(changes) })
export const deleteTask = (id) => request(`/tasks/${id}`, { method: 'DELETE' })
