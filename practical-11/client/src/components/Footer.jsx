export default function Footer({ name, email }) {
  return (
    <footer id="contact" className="site-footer">
      <p>Contact: {email}</p>
      <p>© {name}. All rights reserved.</p>
    </footer>
  )
}
