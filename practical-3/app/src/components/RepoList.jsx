export default function RepoList({ repos }) {
  if (repos.length === 0) {
    return <p className="muted">No repositories match this filter.</p>
  }

  return (
    <ul className="repo-list">
      {repos.map((repo) => (
        <li key={repo.id} className="repo-card">
          <a href={repo.html_url} target="_blank" rel="noreferrer">
            {repo.name}
          </a>
          <p>{repo.description || 'No description provided.'}</p>
          <span className="stars">★ {repo.stargazers_count}</span>
        </li>
      ))}
    </ul>
  )
}
