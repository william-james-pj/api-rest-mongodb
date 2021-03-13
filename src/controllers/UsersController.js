require('dotenv').config()
const { body, validationResult } = require('express-validator')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const UserModels = require('../models/UserModels')
const user = mongoose.model('User', UserModels)

class UsersController {
  constructor() {
    this.create = this.create.bind(this)
    this.delete = this.delete.bind(this)
    this.update = this.update.bind(this)
    this.login = this.login.bind(this)
  }

  async findAll(req, res) {
    try {
      let result = await user.find({})
      return res.status(200).send({ status: true, res: result })
    } catch (error) {
      console.log(error)
      return res.status(406).send({ status: false, res: [] })
    }
  }

  async findById(id) {
    try {
      let result = await user.findById(id)
      if (result.email !== undefined) return { status: true, res: result }
      return { status: false, res: undefined }
    } catch (error) {
      console.log(error)
      return { status: false, res: undefined }
    }
  }

  async findByEmail(email) {
    try {
      let result = await user.find({ email })
      console.log(result)
      if (result.length > 0) return { status: true, res: result[0] }
      return { status: false, res: undefined }
    } catch (error) {
      console.log(error)
      return { status: false, res: undefined }
    }
  }

  async create(req, res) {
    let erros = validationResult(req).formatWith(({ msg }) => msg)
    if (!erros.isEmpty())
      return res.status(400).send({ status: false, res: erros.array() })

    let { name, email, password, role } = req.body

    let emailExists = await this.findByEmail(email)

    if (emailExists.status)
      return res
        .status(406)
        .send({ status: false, res: 'The email is already registered!' })

    let hash = await bcrypt.hash(password, 10)

    let newUser = new user({
      name,
      email,
      password: hash,
      role,
    })

    try {
      await newUser.save()
      res.status(200).send({ status: true, res: 'Create user!' })
    } catch (error) {
      console.log(error)
      return res.status(406).send({ status: false, res: error })
    }
  }

  async update(req, res) {
    let { id, name, email, role } = req.body
    let editUser = {}

    let usesUpdate = await this.findById(id)
    if (usesUpdate.res === undefined)
      return res
        .status(406)
        .send({ status: false, res: 'The user does not exist!' })

    if (email !== undefined && email !== usesUpdate.res.email) {
      let emailExists = await this.findByEmail(email)

      if (!emailExists.res) editUser.email = email
      else
        return res
          .status(406)
          .send({ status: false, res: 'Email is already registered' })
    }

    if (name !== undefined) editUser.name = name

    if (role !== undefined) editUser.role = role

    try {
      await user.findByIdAndUpdate(id, editUser)

      return res.status(200).send({ status: true, res: 'Updated user!' })
    } catch (error) {
      console.log(error)
      return res.status(406).send({ status: false, res: error })
    }
  }

  async delete(req, res) {
    let id = req.params.id

    let usesDelete = await this.findById(id)

    if (usesDelete === undefined)
      return { status: false, res: 'The user does not exist!' }

    try {
      let result = await user.findByIdAndDelete(id)
      if (result.status === false)
        return res.status(406).send({ status: false, res: result.res })
      return res.status(200).send({ status: true, res: 'Deleted user!' })
    } catch (error) {
      console.log(error)
      return res.status(406).send({ status: false, res: error })
    }
  }

  async login(req, res) {
    let { email, password } = req.body

    let user = await this.findByEmail(email)
    if (user === undefined)
      return res.status(406).send({ status: false, res: 'Invalid email' })

    let result = await bcrypt.compare(password, user.res.password)
    if (!result)
      return res.status(406).send({ status: false, res: 'Invalid password' })

    var token = jwt.sign({ email, role: user.res.role }, process.env.SECRET)

    return res.status(200).send({ status: true, res: token })
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
