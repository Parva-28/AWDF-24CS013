export default function Spinner() {
  return (
    <div className="loading" role="status">
      <span className="spinner" aria-hidden="true" />
      <span>Loading repositories…</span>
    </div>
  )
}
