const mongoose = require('mongoose')
const UserModels = require('../models/UserModels')

const user = mongoose.model('User', UserModels)

class UsersController {
  constructor() {
    this.create = this.create.bind(this)
    this.delete = this.delete.bind(this)
    this.update = this.update.bind(this)
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
}

module.exports = new UsersController()
