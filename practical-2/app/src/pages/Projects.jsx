import { PROJECTS } from '../data/student.js'

export default function Projects() {
  return (
    <section className="section">
      <h2>Projects</h2>
      <ul className="project-list">
        {PROJECTS.map((project) => (
          <li key={project.title} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
