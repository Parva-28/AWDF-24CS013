import { useEffect, useState } from 'react'
import { getMe } from '../api/taskApi.js'

// Calls GET /auth/me (decoded token) to show who is logged in and when the token expires
export default function AccountBar({ onAuthError }) {
  const [me, setMe] = useState(null)

  useEffect(() => {
    let cancelled = false
    getMe()
      .then((data) => {
        if (!cancelled) setMe(data)
      })
      .catch((err) => {
        if (!cancelled) onAuthError(err)
      })
    return () => {
      cancelled = true
    }
  }, [onAuthError])

  if (!me) return null
  return (
    <p className="muted">
      Signed in as <strong>{me.email}</strong> · token expires {new Date(me.tokenExpires).toLocaleTimeString()}
    </p>
  )
}
