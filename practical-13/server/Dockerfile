# Backend image: Node/Express API
# node:22 instead of the handout's node:18 because Mongoose 9 needs Node 20.19 or newer
FROM node:22-alpine
WORKDIR /app

# Install dependencies inside the image (node_modules is never copied from the host)
COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

ENV NODE_ENV=production
EXPOSE 5000
CMD ["node", "src/server.js"]
