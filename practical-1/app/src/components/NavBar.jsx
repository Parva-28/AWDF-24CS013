import { useEffect, useState } from 'react'

export default function NavBar({ sections }) {
  const [activeId, setActiveId] = useState(sections[0].id)

  useEffect(() => {
    function updateActive() {
      // The last section whose top has scrolled to the top area is the active one
      let current = sections[0].id
      for (const section of sections) {
        const el = document.getElementById(section.id)
        if (el && el.getBoundingClientRect().top <= 120) {
          current = section.id
        }
      }
      setActiveId(current)
    }

    updateActive()
    window.addEventListener('scroll', updateActive, { passive: true })
    return () => window.removeEventListener('scroll', updateActive)
  }, [sections])

  return (
    <nav className="navbar">
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={activeId === section.id ? 'nav-link active' : 'nav-link'}
        >
          {section.label}
        </a>
      ))}
    </nav>
  )
}
