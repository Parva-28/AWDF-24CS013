export default function TaskItem({ task, onToggle, onDelete, busy }) {
  return (
    <li className={task.completed ? 'task done' : 'task'} aria-busy={busy}>
      <label className="task-main">
        <input type="checkbox" checked={task.completed} disabled={busy} onChange={() => onToggle(task)} />
        <span>
          <strong>{task.title}</strong>
          {task.description && <span className="task-desc">{task.description}</span>}
          {task.pending && <span className="pending">Saving…</span>}
        </span>
      </label>
      <button type="button" className="danger small" disabled={busy || task.pending} onClick={() => onDelete(task)}>
        Delete
      </button>
    </li>
  )
}
