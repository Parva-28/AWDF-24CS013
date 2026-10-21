import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="section not-found">
      <h2>404 – Page not found</h2>
      <p>The page you asked for does not exist.</p>
      <Link to="/" className="back-link">Go back home</Link>
    </section>
  )
}
