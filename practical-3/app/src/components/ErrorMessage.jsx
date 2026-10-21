export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error" role="alert">
      <p>Could not load repositories: {message}</p>
      <button type="button" className="theme-toggle" onClick={onRetry}>
        Retry
      </button>
    </div>
  )
}
