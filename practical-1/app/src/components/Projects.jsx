const PROJECTS = [
  { title: 'Campus Event Planner', description: 'A React app for browsing and registering for college events.' },
  { title: 'Budget Tracker', description: 'A small tool for logging expenses and viewing monthly totals.' },
  { title: 'Library Catalogue', description: 'A searchable list of books with availability status.' },
]

export default function Projects() {
  return (
    <section id="projects" className="section">
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
