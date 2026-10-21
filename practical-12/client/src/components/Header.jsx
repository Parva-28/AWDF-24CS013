export default function Header({ name, themeColor = '#1f4e79' }) {
  return (
    <header className="site-header" style={{ backgroundColor: themeColor }}>
      <h1>{name}</h1>
      <p>Student Portfolio</p>
    </header>
  )
}
