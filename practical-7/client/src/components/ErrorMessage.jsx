export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error" role="alert">
      <p>{message}</p>
      {onRetry && (
        <button type="button" className="theme-toggle" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  )
}
