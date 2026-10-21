import { useEffect, useState } from 'react'

// Fallback while a lazy route chunk downloads. It stays hidden for 300 ms so that
// fast connections do not flash a loading state.
export default function PageLoader() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null
  return (
    <div className="section">
      <div className="loading" role="status">
        <span className="spinner" aria-hidden="true" />
        <span>Loading page…</span>
      </div>
    </div>
  )
}
