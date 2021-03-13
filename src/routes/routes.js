const express = require('express')
const router = express.Router()

const UsersController = require('../controllers/UsersController')

router.get('/user', UsersController.findAll)
router.post('/user', UsersController.validate('create'), UsersController.create)
router.delete('/user/:id', UsersController.delete)
router.put('/user', UsersController.update)
router.post('/login', UsersController.login)

module.exports = router
