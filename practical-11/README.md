# Practical 11 – Containerization with Docker and Docker Compose

The full stack from Practicals 8–10 (`client/`, `server/`) plus MongoDB, started with one command.

```
docker-compose.yml
 ├── frontend  build ./client  (multi-stage: Node build -> nginx)   host 5173 -> container 80
 ├── backend   build ./server  (node:22-alpine)                     host 5000 -> container 5000
 └── mongodb   image mongo:7, named volume mongo-data               host 27017
Network: app-network (bridge)     frontend -> backend -> mongodb
```

## Run

```bash
cp .env.example .env          # set JWT_SECRET
docker-compose up --build     # open http://localhost:5173
docker ps                     # three containers should be running
```

## Notes

- The backend reaches the database at `mongodb://mongodb:27017/taskdb`, the Compose service name, not `localhost`. Inside a container, `localhost` is the container itself.
- `EXPOSE` in a Dockerfile only documents the port; `ports:` in Compose actually publishes it on the host.
- `node_modules` is never copied into an image (`.dockerignore`); dependencies are installed inside the image with `npm ci`, so they match the container's OS.
- The backend waits for the MongoDB health check (`depends_on: condition: service_healthy`) before starting.
- Supplementary: `.dockerignore` files, a multi-stage frontend build (the final image is nginx with only the built files), and a named volume so data survives container restarts.
- `node:22` is used instead of the handout's `node:18` because Mongoose 9 requires Node 20.19 or newer.
- The browser calls the API at `VITE_API_URL` (build argument, default `http://localhost:5000`).

## Verification status

Docker was not available on the machine used to prepare this practical, so `docker-compose up` has **not** been run. The checks in `output/11.1-setup-checks.txt` ran each Dockerfile's steps by hand (`npm ci --omit=dev` and the production server, `npm ci` and the production build) and parsed the Compose file. Run the commands above on a machine with Docker Desktop and add the `docker ps` screenshot to the submission.
