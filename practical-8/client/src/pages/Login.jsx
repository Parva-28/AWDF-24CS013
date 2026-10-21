import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { login, register } from '../api/taskApi.js'
import { setToken } from '../api/session.js'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const [mode, setMode] = useState('login') // 'login' or 'register'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  // Set by the task page when a token has expired
  const notice = location.state?.expired ? 'Your session expired. Please log in again.' : null

  async function handleSubmit(event) {
    event.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      if (mode === 'register') {
        await register(email, password)
      }
      const { token } = await login(email, password)
      setToken(token)
      navigate(location.state?.from || '/tasks', { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="section narrow">
      <h2>{mode === 'login' ? 'Log in' : 'Create account'}</h2>
      {notice && <p className="notice">{notice}</p>}
      <form className="stack" onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input
          type="password"
          placeholder="Password (at least 8 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error-text" role="alert">{error}</p>}
        <button type="submit" disabled={submitting}>
          {submitting ? 'Please wait…' : mode === 'login' ? 'Log in' : 'Register and log in'}
        </button>
      </form>
      <p className="muted">
        {mode === 'login' ? 'No account yet? ' : 'Already registered? '}
        <button type="button" className="link-button" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
          {mode === 'login' ? 'Create one' : 'Log in instead'}
        </button>
      </p>
    </section>
  )
}
