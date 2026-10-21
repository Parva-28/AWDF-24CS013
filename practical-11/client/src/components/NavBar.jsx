import { NavLink } from 'react-router-dom'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/tasks', label: 'Tasks' },
  { to: '/contact', label: 'Contact' },
]

export default function NavBar({ darkMode, onToggleTheme, loggedIn, onLogout }) {
  return (
    <nav className="navbar">
      {LINKS.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.to === '/'}
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          {link.label}
        </NavLink>
      ))}
      {loggedIn ? (
        <button type="button" className="theme-toggle" onClick={onLogout}>
          Log out
        </button>
      ) : (
        <NavLink to="/login" className="nav-link">
          Log in
        </NavLink>
      )}
      <button type="button" className="theme-toggle" onClick={onToggleTheme} aria-pressed={darkMode}>
        {darkMode ? 'Light mode' : 'Dark mode'}
      </button>
    </nav>
  )
}
