const mongoose = require('mongoose')
const UserModels = require('../models/UserModels')

const user = mongoose.model('User', UserModels)

class UsersController {
  constructor() {
    this.createUser = this.createUser.bind(this)
    this.deleteUser = this.deleteUser.bind(this)
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
      if (result.length > 0) return { status: true, res: result[0] }
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

  async createUser(req, res) {
    let { name, email, password, role } = req.body

    let emailExists = await this.findByEmail(email)

    if (emailExists.status)
      return res
        .status(406)
        .send({ status: false, res: 'The email is already registered!' })

    let newUser = new user({
      name,
      email,
      password,
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

  async deleteUser(req, res) {
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
}

module.exports = new UsersController()
