import { useEffect } from 'react'

// Shows a success or failure message and removes itself after a few seconds
export function Toast({ id, type, message, onDismiss }) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(id), 3500)
    return () => clearTimeout(timer)
  }, [id, onDismiss])

  return (
    <div className={`toast toast-${type}`} role="status">
      <span>{message}</span>
      <button type="button" className="toast-close" onClick={() => onDismiss(id)} aria-label="Dismiss">
        ×
      </button>
    </div>
  )
}

export function ToastContainer({ toasts, onDismiss }) {
  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onDismiss={onDismiss} />
      ))}
    </div>
  )
}
