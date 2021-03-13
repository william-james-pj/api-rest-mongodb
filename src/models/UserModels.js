const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserDB = require('../database/UserDB')
const user = mongoose.model('User', UserDB)

const PasswordToken = require('./PasswordTokenModels')

class UsersModels {
  async findAll() {
    try {
      let result = await user.find({}, { password: 0 })

      return { status: true, res: result }
    } catch (error) {
      console.log(error)
      return { status: false, res: [] }
    }
  }

  async findById(id) {
    try {
      let result = await user.findById(id)
      if (result) return { status: true, res: result }
      else return { status: false, res: undefined }
    } catch (error) {
      console.log(error)
      return { status: false, res: undefined }
    }
  }

  async findByEmail(email) {
    try {
      let result = await user.find({ email })

      if (result.length > 0) return { status: true, res: result[0] }
      else return { status: false, res: undefined }
    } catch (error) {
      console.log(error)
      return { status: false, res: undefined }
    }
  }

  async create(name, email, password, role = 0) {
    try {
      let hash = await bcrypt.hash(password, 10)

      let newUser = new user({
        name,
        email,
        password: hash,
        role,
      })

      await newUser.save()
    } catch (error) {
      console.log(error)
      return { status: false, res: error }
    }
  }

  async update(id, name, email, role) {
    let usesUpdate = await this.findById(id)
    let editUser = {}

    if (!usesUpdate.status)
      return { status: false, res: 'The user does not exist!' }

    if (email !== undefined && email !== usesUpdate.res.email) {
      let res = await this.findByEmail(email)

      if (!res.res) editUser.email = email
      else return { status: false, res: 'Email is already registered' }
    }

    if (name !== undefined) editUser.name = name

    if (role !== undefined) editUser.role = role

    try {
      await user.findByIdAndUpdate(id, editUser)

      return { status: true, res: '' }
    } catch (error) {
      console.log(error)
      return { status: false, res: error }
    }
  }

  async delete(id) {
    let usesDelete = await this.findById(id)

    if (usesDelete === undefined)
      return { status: false, res: 'The user does not exist!' }

    try {
      await user.findByIdAndDelete(id)

      return { status: true, res: '' }
    } catch (error) {
      console.log(error)
      return { status: false, res: error }
    }
  }

  async changePassword(newPassword, id, token) {
    let hash = await bcrypt.hash(newPassword, 10)

    try {
      await PasswordToken.setUsed(token)
      await user.findByIdAndUpdate(id, { password: hash })
    } catch (error) {
      console.log(error)
      return { status: false, res: error }
    }
  }
}

module.exports = new UsersModels()
