const express = require('express')
const controller = require('../controllers/taskController')
const authenticate = require('../middleware/authenticate')
const validateTaskInput = require('../middleware/validateTask')
const requireJson = require('../middleware/requireJson')
const validateId = require('../middleware/validateId')

const router = express.Router()

// Every task route needs a valid token
router.use(authenticate)

router.get('/', controller.getAllTasks)
router.get('/:id', validateId, controller.getTaskById)
router.post('/', requireJson, validateTaskInput, controller.createTask)
router.put('/:id', requireJson, validateId, validateTaskInput, controller.updateTask)
router.delete('/:id', validateId, controller.deleteTask)

module.exports = router
