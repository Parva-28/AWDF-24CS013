// In-memory cache shared by the whole process (node-cache).
// It lives in this server's memory only: a second server instance would have its own copy,
// and a restart empties it.
const NodeCache = require('node-cache')

const TTL_SECONDS = Number(process.env.CACHE_TTL_SECONDS) || 60
// CACHE_ENABLED=false turns caching off so uncached response times can be measured
const ENABLED = process.env.CACHE_ENABLED !== 'false'

// useClones: false — node-cache would otherwise deep-copy the value on every get/set.
// We store the response as a ready-made JSON string, which is never mutated.
const cache = new NodeCache({ stdTTL: TTL_SECONDS, useClones: false })

// Tasks belong to users, so every key includes the user id
const keys = {
  allTasks: (userId) => `tasks:${userId}`,
  oneTask: (userId, taskId) => `task:${userId}:${taskId}`,
}

function get(key) {
  return ENABLED ? cache.get(key) : undefined
}

function set(key, value) {
  if (ENABLED) cache.set(key, value)
}

function del(keyOrKeys) {
  cache.del(keyOrKeys)
}

function stats() {
  return { enabled: ENABLED, ttlSeconds: TTL_SECONDS, ...cache.getStats(), cachedKeys: cache.keys() }
}

module.exports = { keys, get, set, del, stats }
