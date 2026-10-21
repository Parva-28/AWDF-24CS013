# ITUE301 – Advanced Web Development Frameworks: Practicals 1–13

Student ID: 24CS013 · Academic year 2025-26

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

## Before submitting

1. Fill in **Student Name** in each `Practical-N-Submission.docx`.
2. Push this repository to GitHub, then replace `<your-username>` in every document's GitHub link (and in `practical-12/README.md` for the CI badge).
3. Add the items marked **TO ADD** in the documents:
   - Practical 11: `docker-compose up --build` and `docker ps` screenshots (Docker was not available when this was prepared).
   - Practical 12: the failed and the passed run from the GitHub Actions tab (they only appear after pushing).
   - Practical 13: a screenshot with a real `OPENAI_API_KEY`; the success screenshot included is a simulated response.
4. The documents' page header reads "CSE304: Full Stack Development 24CSXXX", copied from `File-Format.docx`, while the handouts say ITUE301. Change it if your department expects the ITUE301 header.

## Running the server practicals

They need MongoDB (local `mongod` or MongoDB Atlas). Copy `server/.env.example` to `server/.env` and fill it in; `.env` files are git-ignored and never committed.
