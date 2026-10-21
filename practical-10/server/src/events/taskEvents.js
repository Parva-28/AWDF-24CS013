// One shared emitter for task events (Node's built-in events module, no external queue)
const EventEmitter = require('events')

class TaskEvents extends EventEmitter {}

module.exports = new TaskEvents()
