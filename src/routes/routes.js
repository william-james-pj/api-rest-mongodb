const express = require('express')
const router = express.Router()

const AdminAuth = require('../middleware/AdminAuth')
const TokenAuth = require('../middleware/TokenAuth')

const ValidateController = require('../controllers/ValidateController')
const UsersController = require('../controllers/UsersController')

router.get('/user', AdminAuth, UsersController.findAllUser)
router.get('/user/:id', AdminAuth, UsersController.findUserId)
router.delete('/user/:id', AdminAuth, UsersController.deleteUser)
router.put('/user', AdminAuth, UsersController.updateUser)
router.post(
  '/user',
  UsersController.validate('create'),
  UsersController.createUser
)

router.post('/login', UsersController.login)

router.post('/recoverpassword', UsersController.recoverPassword)
router.post('/changepassword', UsersController.changePasword)

router.post('/validate', AdminAuth, ValidateController.validate)
router.post('/validatetoken', TokenAuth, ValidateController.validate)

module.exports = router
