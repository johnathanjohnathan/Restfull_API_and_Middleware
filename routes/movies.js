const express = require('express')
const router = express.Router()
const MovieController = require('../controllers/movies_controller.js')

router.post('/', MovieController.create)
router.get('/', MovieController.get)
router.get('/:id', MovieController.getOne)
router.delete('/:id', MovieController.delete)
router.patch('/:id', MovieController.updateOne)

module.exports = router