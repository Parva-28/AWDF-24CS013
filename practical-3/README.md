# Practical 3 – API Integration and Data Rendering in React

The Projects page now lists repositories from the public GitHub REST API.

- API: `GET https://api.github.com/users/<username>/repos` (no key needed; 60 requests per hour per IP without authentication).
- Set your GitHub username in `app/src/data/student.js` (`GITHUB_USER`). `/projects?user=<name>` overrides it, which is handy for testing the error path.
- `useEffect` fetches on mount, with an `AbortController` cleanup. Three pieces of state: `repos`, `loading`, `error`.
- `fetch` only rejects on network failure, so `res.ok` is checked and an HTTP 404 becomes an error message.
- `Spinner` while loading, `ErrorMessage` with a **Retry** button on failure (supplementary), and each repository's name (linked), description and star count (supplementary).
- A search box filters the list by name (supplementary).

## Run

```bash
cd app && npm install && npm run dev
```

Screenshots and the browser test log are in `output/`.
