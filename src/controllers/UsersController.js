require('dotenv').config()
const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const UserModels = require('../models/UserModels')
const PasswordTokenModels = require('../models/PasswordTokenModels')

class UsersController {
  async findAllUser(req, res) {
    let users = await UserModels.findAll()

    return res.status(200).send({ status: true, res: users.res })
  }

  async findUserId(req, res) {
    let user = await UserModels.findById(req.params.id)
    if (user.res === undefined)
      return res
        .status(400)
        .send({ status: false, res: 'The user does not exist!' })
    else return res.status(200).send({ status: true, res: user.res })
  }

  async updateUser(req, res) {
    let { id, name, email, role } = req.body
    let result = await UserModels.update(id, name, email, role)

    if (result.res === undefined)
      return res
        .status(500)
        .send({ status: false, res: 'Internal Server Error' })

    if (!result.status)
      return res.status(406).send({ status: false, res: result.res })

    return res.status(200).send({ status: true, res: 'Updated user!' })
  }

  async deleteUser(req, res) {
    let id = req.body.id

    if (id === undefined)
      return res.status(406).send({ status: false, res: 'Invalid user!' })

    let result = await UserModels.delete(id)

    if (result.status === false)
      return res.status(406).send({ status: false, res: result.res })

    return res.status(200).send({ status: true, res: 'Deleted user!' })
  }

  async createUser(req, res) {
    let erros = validationResult(req).formatWith(({ msg }) => msg)
    if (!erros.isEmpty())
      return res.status(400).send({ status: false, res: erros.array() })

    let { name, email, password, role } = req.body
    let emailExists = await UserModels.findByEmail(email)

    if (emailExists.res)
      return res
        .status(406)
        .send({ status: false, res: 'The email is already registered!' })

    await UserModels.create(name, email, password, role)

    return res.status(200).send({ status: true, res: 'Create user!' })
  }

  async recoverPassword(req, res) {
    let email = req.body.email
    let user = await UserModels.findByEmail(email)

    let result = await PasswordTokenModels.createToken(user)

    if (result.res === undefined)
      res.status(406).send({ status: false, res: result.res })

    return res.status(200).send({ status: true, res: '' + result.res })
  }

  async changePasword(req, res) {
    let { token, password } = req.body
    let isTokenValid = await PasswordTokenModels.validateToken(token)

    if (!isTokenValid.status)
      return res.status(406).send({ status: false, res: 'Invalid token' })

    await UserModels.changePassword(
      password,
      isTokenValid.res.user_id,
      isTokenValid.res.token
    )

    return res.status(200).send({ status: true, res: 'Password changed' })
  }

  async login(req, res) {
    let { email, password } = req.body

    let user = await UserModels.findByEmail(email)
    if (user === undefined)
      return res.status(406).send({ status: false, res: 'Invalid email' })

    let result = await bcrypt.compare(password, user.res.password)
    if (!result)
      return res.status(406).send({ status: false, res: 'Invalid password' })

    var token = jwt.sign({ email, role: user.res.role }, process.env.SECRET)

    return res
      .status(200)
      .send({ status: true, res: { token, id: user.res._id } })
  }

  validate(method) {
    switch (method) {
      case 'create': {
        return [
          body('name').exists().withMessage("Name doesn't exists"),
          body('email').exists().isEmail().withMessage('Invalid email'),
          body('password')
            .exists()
            .isLength({ min: 4 })
            .withMessage('Invalid password'),
          body('role')
            .optional()
            .isInt({ min: 0, max: 3 })
            .withMessage('Invalid role'),
        ]
      }
    }
  }
}

module.exports = new UsersController()
