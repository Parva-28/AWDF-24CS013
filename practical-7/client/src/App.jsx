import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Header from './components/Header.jsx'
import NavBar from './components/NavBar.jsx'
import Footer from './components/Footer.jsx'
import RequireAuth from './components/RequireAuth.jsx'
import Home from './pages/Home.jsx'
import TaskBoard from './pages/TaskBoard.jsx'
import Login from './pages/Login.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'
import { STUDENT } from './data/student.js'
import { getToken, clearToken } from './api/session.js'

export default function App() {
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = useState(false)
  const loggedIn = Boolean(getToken())

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  function handleLogout() {
    clearToken()
    navigate('/login', { replace: true })
  }

  return (
    <>
      <Header name={STUDENT.name} themeColor={STUDENT.themeColor} />
      <NavBar
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode((mode) => !mode)}
        loggedIn={loggedIn}
        onLogout={handleLogout}
      />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/tasks"
            element={
              <RequireAuth>
                <TaskBoard />
              </RequireAuth>
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer name={STUDENT.name} email={STUDENT.email} />
    </>
  )
}
