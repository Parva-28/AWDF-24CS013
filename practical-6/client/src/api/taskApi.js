// One place for the backend address, so every request uses the same base URL
export const BASE_URL = 'http://localhost:5000'

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  const body = await res.json().catch(() => ({}))
  if (!res.ok) {
    // Error responses from the server look like { error: '...' } or { error, details }
    const message = body.error || `Request failed with status ${res.status}`
    throw new Error(message)
  }
  return body
}

export const getTasks = () => request('/tasks')
export const createTask = (task) => request('/tasks', { method: 'POST', body: JSON.stringify(task) })
export const updateTask = (id, changes) =>
  request(`/tasks/${id}`, { method: 'PUT', body: JSON.stringify(changes) })
export const deleteTask = (id) => request(`/tasks/${id}`, { method: 'DELETE' })
