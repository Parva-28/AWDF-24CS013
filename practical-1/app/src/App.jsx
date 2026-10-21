import Header from './components/Header.jsx'
import NavBar from './components/NavBar.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Footer from './components/Footer.jsx'

const STUDENT = {
  name: 'Your Name',
  email: 'you@example.com',
  bio: 'I am a B.Tech student learning full stack web development with React and Node.js.',
  themeColor: '#1f4e79',
}

const SKILLS = ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB']

const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export default function App() {
  return (
    <>
      <Header name={STUDENT.name} themeColor={STUDENT.themeColor} />
      <NavBar sections={SECTIONS} />
      <main>
        <About bio={STUDENT.bio} />
        <Skills skillList={SKILLS} />
        <Projects />
      </main>
      <Footer name={STUDENT.name} email={STUDENT.email} />
    </>
  )
}
