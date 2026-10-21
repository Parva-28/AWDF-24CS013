export default function Skills({ skillList }) {
  return (
    <section id="skills" className="section">
      <h2>Skills</h2>
      <ul className="skill-list">
        {skillList.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </section>
  )
}
