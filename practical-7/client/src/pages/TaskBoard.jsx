import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTasks, createTask, updateTask, deleteTask } from '../api/taskApi.js'
import TaskForm from '../components/TaskForm.jsx'
import TaskItem from '../components/TaskItem.jsx'
import Spinner from '../components/Spinner.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import ConfirmDialog from '../components/ConfirmDialog.jsx'
import AccountBar from '../components/AccountBar.jsx'
import { ToastContainer } from '../components/Toast.jsx'

export default function TaskBoard() {
  const navigate = useNavigate()
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)
  const [busyIds, setBusyIds] = useState(() => new Set())
  const [toasts, setToasts] = useState([])
  const [pendingDelete, setPendingDelete] = useState(null)

  // A 401 means the session is gone: send the user to the login page.
  // Returns true when the error was handled this way.
  const handleAuthError = useCallback(
    (err) => {
      if (err.status !== 401) return false
      navigate('/login', { replace: true, state: { expired: true } })
      return true
    },
    [navigate],
  )

  useEffect(() => {
    let cancelled = false
    getTasks()
      .then((data) => {
        if (!cancelled) setTasks(data)
      })
      .catch((err) => {
        if (!cancelled && !handleAuthError(err)) setLoadError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [reloadKey, handleAuthError])

  const notify = useCallback((type, message) => {
    setToasts((list) => [...list, { id: `${Date.now()}-${Math.random()}`, type, message }])
  }, [])

  const dismissToast = useCallback((id) => {
    setToasts((list) => list.filter((toast) => toast.id !== id))
  }, [])

  function setBusy(id, busy) {
    setBusyIds((current) => {
      const next = new Set(current)
      if (busy) next.add(id)
      else next.delete(id)
      return next
    })
  }

  function handleRetryLoad() {
    setLoadError(null)
    setLoading(true)
    setReloadKey((n) => n + 1)
  }

  async function handleCreate(input) {
    const tempId = `temp-${Date.now()}`
    setTasks((list) => [...list, { _id: tempId, ...input, completed: false, pending: true }])
    try {
      const saved = await createTask(input)
      setTasks((list) => list.map((task) => (task._id === tempId ? saved : task)))
      notify('success', `Added "${saved.title}"`)
    } catch (err) {
      setTasks((list) => list.filter((task) => task._id !== tempId))
      if (!handleAuthError(err)) notify('error', `Could not add task: ${err.message}`)
    }
  }

  async function handleToggle(task) {
    setBusy(task._id, true)
    try {
      const updated = await updateTask(task._id, { completed: !task.completed })
      setTasks((list) => list.map((item) => (item._id === updated._id ? updated : item)))
      notify('success', updated.completed ? 'Marked as done' : 'Marked as not done')
    } catch (err) {
      if (!handleAuthError(err)) notify('error', `Could not update task: ${err.message}`)
    } finally {
      setBusy(task._id, false)
    }
  }

  async function confirmDelete() {
    const task = pendingDelete
    setPendingDelete(null)
    setBusy(task._id, true)
    try {
      await deleteTask(task._id)
      setTasks((list) => list.filter((item) => item._id !== task._id))
      notify('success', `Deleted "${task.title}"`)
    } catch (err) {
      if (!handleAuthError(err)) notify('error', `Could not delete task: ${err.message}`)
    } finally {
      setBusy(task._id, false)
    }
  }

  return (
    <>
      <section className="section">
        <h2>Tasks</h2>
        <AccountBar onAuthError={handleAuthError} />
        <TaskForm onCreate={handleCreate} />
      </section>

      <section className="section">
        {loading && <Spinner label="Loading tasks…" />}

        {loadError && <ErrorMessage message={`Could not load tasks: ${loadError}`} onRetry={handleRetryLoad} />}

        {!loading && !loadError && tasks.length === 0 && <p className="muted">No tasks yet. Add one above.</p>}

        {!loading && !loadError && tasks.length > 0 && (
          <ul className="task-list">
            {tasks.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                busy={busyIds.has(task._id)}
                onToggle={handleToggle}
                onDelete={setPendingDelete}
              />
            ))}
          </ul>
        )}
      </section>

      {pendingDelete && (
        <ConfirmDialog
          message={`Delete "${pendingDelete.title}"? This cannot be undone.`}
          onConfirm={confirmDelete}
          onCancel={() => setPendingDelete(null)}
        />
      )}

      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </>
  )
}
