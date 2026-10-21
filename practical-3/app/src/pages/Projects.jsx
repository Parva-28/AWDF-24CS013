import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Spinner from '../components/Spinner.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import RepoList from '../components/RepoList.jsx'
import { GITHUB_USER } from '../data/student.js'

export default function Projects() {
  // ?user=<name> overrides the default user, which makes the error path easy to test
  const [searchParams] = useSearchParams()
  const user = searchParams.get('user') || GITHUB_USER

  // key={user} remounts the panel for a new user, so its loading state starts fresh
  return <RepoPanel key={user} user={user} />
}

function RepoPanel({ user }) {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [attempt, setAttempt] = useState(0) // changing this re-runs the fetch (Retry button)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    fetch(`https://api.github.com/users/${user}/repos`, { signal: controller.signal })
      .then((res) => {
        // fetch only rejects on network failure, so a 404 must be turned into an error here
        if (!res.ok) throw new Error(`GitHub responded with ${res.status} for "${user}"`)
        return res.json()
      })
      .then((data) => setRepos(data))
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [user, attempt])

  function handleRetry() {
    setError(null)
    setLoading(true)
    setAttempt((n) => n + 1)
  }

  const visibleRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(query.trim().toLowerCase()),
  )

  return (
    <section className="section">
      <h2>Projects from GitHub</h2>
      <p className="muted">Repositories for <strong>{user}</strong></p>

      {loading && <Spinner />}

      {error && <ErrorMessage message={error} onRetry={handleRetry} />}

      {!loading && !error && (
        <>
          <input
            type="search"
            className="search"
            placeholder="Filter by repository name"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <RepoList repos={visibleRepos} />
        </>
      )}
    </section>
  )
}
