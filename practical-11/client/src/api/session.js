// The JWT is kept in localStorage so the user stays logged in after a page refresh.
// localStorage can be blocked (private mode, disabled storage), so every access is guarded.
const KEY = 'task-manager-token'

export function getToken() {
  try {
    return localStorage.getItem(KEY)
  } catch {
    return null
  }
}

export function setToken(token) {
  try {
    localStorage.setItem(KEY, token)
  } catch {
    // Storage unavailable: the user will simply need to log in again after a refresh
  }
}

export function clearToken() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    // Nothing to clear
  }
}
