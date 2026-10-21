import { useState } from 'react'
import { generateDescription } from '../api/taskApi.js'

export default function TaskForm({ onCreate }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  // idle | loading | suggested | unavailable
  const [ai, setAi] = useState({ status: 'idle', message: '' })

  async function handleSuggest() {
    setAi({ status: 'loading', message: '' })
    try {
      const result = await generateDescription(title.trim())
      if (result.fallback) {
        setAi({ status: 'unavailable', message: result.message })
      } else {
        // The suggestion goes into the normal, editable field: the user decides what is saved
        setDescription(result.description)
        setAi({ status: 'suggested', message: '' })
      }
    } catch (err) {
      setAi({ status: 'unavailable', message: err.message })
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (title.trim() === '') return
    onCreate({ title: title.trim(), description: description.trim() })
    setTitle('')
    setDescription('')
    setAi({ status: 'idle', message: '' })
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task title (required)"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description (optional)"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <button type="submit">Add task</button>

      <div className="ai-row">
        <button
          type="button"
          className="theme-toggle"
          onClick={handleSuggest}
          disabled={title.trim() === '' || ai.status === 'loading'}
        >
          {ai.status === 'loading' ? 'Generating…' : 'Suggest description (AI)'}
        </button>
        {ai.status === 'loading' && <span className="spinner" aria-hidden="true" />}
        {ai.status === 'suggested' && (
          <p className="ai-note" role="note">
            AI-generated suggestion. Review and edit it before saving.
          </p>
        )}
        {ai.status === 'unavailable' && (
          <p className="ai-note muted" role="status">
            {ai.message}
          </p>
        )}
      </div>
    </form>
  )
}
