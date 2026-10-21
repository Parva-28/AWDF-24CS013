import { useState } from 'react'

export default function Contact() {
  const [message, setMessage] = useState('')
  const [showHelp, setShowHelp] = useState(false)

  return (
    <section className="section">
      <h2>Contact</h2>
      <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
        <div className="label-row">
          <label htmlFor="message">Message</label>
          <button
            type="button"
            className="help-toggle"
            onClick={() => setShowHelp((visible) => !visible)}
            aria-expanded={showHelp}
          >
            {showHelp ? 'Hide help' : 'Show help'}
          </button>
        </div>
        {showHelp && (
          <p className="tooltip" role="note">
            Type a short note. Nothing is sent anywhere in this practical.
          </p>
        )}
        <input
          id="message"
          type="text"
          value={message}
          placeholder="Write your message"
          onChange={(event) => setMessage(event.target.value)}
        />
        <p className="counter">{message.length} characters</p>
        <p className="preview">
          <strong>Live preview:</strong> {message || 'Start typing to see your message here.'}
        </p>
      </form>
    </section>
  )
}
