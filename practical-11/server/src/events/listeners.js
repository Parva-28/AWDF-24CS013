const taskEvents = require('./taskEvents')

const NOTIFY_DELAY_MS = Number(process.env.NOTIFY_DELAY_MS) || 2000

function stamp() {
  return new Date().toISOString()
}

// emit() calls this listener synchronously, right after the response has been handed to the socket.
// The slow part (a stand-in for sending an email) is scheduled with setTimeout, so it never
// delays the API response.
taskEvents.on('task-created', ({ task, user }) => {
  console.log(`[Notification] listener started at ${stamp()} for "${task.title}"`)
  setTimeout(() => {
    try {
      // Lab demo only: a title containing "fail-notify" makes the handler throw
      if (process.env.NODE_ENV !== 'production' && task.title.includes('fail-notify')) {
        throw new Error(`Notification service rejected task "${task.title}"`)
      }
      console.log(
        `[Notification] Task "${task.title}" created by ${user.email} — notification finished at ${stamp()}`,
      )
    } catch (err) {
      // Errors inside the handler are reported through the 'error' event instead of crashing
      taskEvents.emit('error', err)
    }
  }, NOTIFY_DELAY_MS)
})

// Supplementary problem: a second event with its own listener
taskEvents.on('task-deleted', ({ task, user }) => {
  console.log(`[Audit] Task "${task.title}" deleted by ${user.email} at ${stamp()}`)
})

// An 'error' event with no listener would crash the process, so one is always registered
taskEvents.on('error', (err) => {
  console.error(`[Notification error] ${err.message} (logged at ${stamp()})`)
})
