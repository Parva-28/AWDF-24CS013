const express = require('express')
const controller = require('../controllers/taskController')
const requireJson = require('../middleware/requireJson')
const validateId = require('../middleware/validateId')

const router = express.Router()

router.get('/', controller.getAllTasks)
router.post('/', requireJson, controller.createTask)
router.put('/:id', requireJson, validateId, controller.updateTask)
router.delete('/:id', validateId, controller.deleteTask)

module.exports = router
