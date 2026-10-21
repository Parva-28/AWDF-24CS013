import About from '../components/About.jsx'
import Skills from '../components/Skills.jsx'
import { STUDENT, SKILLS } from '../data/student.js'

export default function Home() {
  return (
    <>
      <About bio={STUDENT.bio} />
      <Skills skillList={SKILLS} />
    </>
  )
}
