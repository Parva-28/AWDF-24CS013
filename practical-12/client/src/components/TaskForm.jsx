import { useState } from 'react'

export default function TaskForm({ onCreate }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    if (title.trim() === '') return
    onCreate({ title: title.trim(), description: description.trim() })
    setTitle('')
    setDescription('')
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
    </form>
  )
}
