# Practical 7 – Authentication and Middleware Pipeline

JWT login for the Task Manager. Passwords are hashed with bcrypt; every task route requires a valid token.

## Request pipeline (server)

```
POST /auth/register -> validate -> bcrypt.hash(password, 10) -> save User -> 201
POST /auth/login    -> bcrypt.compare -> jwt.sign({ id, email }, JWT_SECRET, { expiresIn: '1h' })
/tasks/*            -> authenticate (Bearer token) -> validateTaskInput -> controller
```

- `src/middleware/authenticate.js` – reads `Authorization: Bearer <token>`, verifies it inside `try/catch`, and returns 401 for missing, malformed, tampered or expired tokens.
- `src/middleware/validateTask.js` – rejects bad input (missing title, wrong types, unknown priority) with 400 before the database is touched, and keeps only the allowed fields.
- `src/models/User.js` – the password field stores only the bcrypt hash and is excluded from queries by default.
- Tasks have an `owner`, so each user sees and changes only their own tasks.
- `GET /auth/me` returns the details from the decoded token (supplementary).

## Client

- `/login` page to log in or register; the token is kept in `localStorage`.
- `/tasks` is wrapped in `RequireAuth`; any 401 from the API clears the token and redirects to `/login` with a "session expired" notice.
- Log out button clears the token (supplementary).

## Run

```bash
cd server && npm install && cp .env.example .env   # set MONGO_URI and a long random JWT_SECRET
npm start
cd ../client && npm install && npm run dev
```

`JWT_SECRET` lives only in `.env`, which is git-ignored.

Evidence of the test run is in `output/`.
