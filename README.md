# ITUE301 – Advanced Web Development Frameworks: Practicals 1–13

Parva Chhatrola · Student ID 24CS013 · CSE304: Full Stack Development · Academic year 2025-26

Repository: https://github.com/Parva-28/AWDF-24CS013

Open `index.html` for the practical guide pages. Each `practical-N/` folder holds the working code at the end of that practical, its evidence in `output/`, a `README.md`, and the filled-in submission document `Practical-N-Submission.docx`. There is one git commit per practical.

| # | Topic | Code |
| --- | --- | --- |
| 1 | React components and props (Vite) | `practical-1/app` |
| 2 | useState and React Router v6 | `practical-2/app` |
| 3 | REST API data with loading/error states | `practical-3/app` |
| 4 | Express REST API and middleware | `practical-4/server` |
| 5 | MongoDB with Mongoose schemas | `practical-5/server` |
| 6 | Full stack React + Express + MongoDB | `practical-6/client`, `practical-6/server` |
| 7 | JWT authentication and validation | `practical-7/client`, `practical-7/server` |
| 8 | Lazy loading and code splitting | `practical-8/client` (uses the Practical 7 server) |
| 9 | In-memory caching (node-cache) | `practical-9/server` |
| 10 | EventEmitter background processing | `practical-10/server` |
| 11 | Docker and Docker Compose | `practical-11/` |
| 12 | GitHub Actions CI | `practical-12/`, `.github/workflows/ci.yml` |
| 13 | AI API integration | `practical-13/` |

## Still to add before submitting

Each submission document already has the name, student ID, header and GitHub link filled in. Three items marked **TO ADD** need screenshots that could not be produced on the machine used to build this:

- Practical 11: `docker-compose up --build` and `docker ps` (Docker was not available).
- Practical 12: one failed and one passed run from the GitHub Actions tab.
- Practical 13: a suggestion made with a real `OPENAI_API_KEY` (the included success screenshot is a simulated response).

## Running the server practicals

They need MongoDB (local `mongod` or MongoDB Atlas). Copy `server/.env.example` to `server/.env` and fill it in; `.env` files are git-ignored and never committed.
