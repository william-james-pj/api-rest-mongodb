const express = require('express')
const router = express.Router()

const UsersController = require('../controllers/UsersController')

router.get('/user', UsersController.findAll)
router.post('/user', UsersController.createUser)

module.exports = router