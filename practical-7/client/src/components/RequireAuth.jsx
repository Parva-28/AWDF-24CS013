import { Navigate, useLocation } from 'react-router-dom'
import { getToken } from '../api/session.js'

// Sends visitors without a token to the login page
export default function RequireAuth({ children }) {
  const location = useLocation()
  if (!getToken()) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }
  return children
}
