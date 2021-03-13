const express = require('express')
const router = express.Router()

const UsersController = require('../controllers/UsersController')

router.get('/user', UsersController.findAllUser)
router.get('/user/:id', UsersController.findUserId)
router.delete('/user/:id', UsersController.deleteUser)
router.put('/user', UsersController.updateUser)
router.post(
  '/user',
  UsersController.validate('create'),
  UsersController.createUser
)

router.post('/login', UsersController.login)

router.post('/recoverpassword', UsersController.recoverPassword)
router.post('/changepassword', UsersController.changePasword)

module.exports = router
