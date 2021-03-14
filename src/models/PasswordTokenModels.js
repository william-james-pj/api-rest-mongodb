const mongoose = require('mongoose')

const PasswordTokenDB = require('../database/PasswordTokenDB')
const passwordModels = mongoose.model('PasswordToken', PasswordTokenDB)

class PasswordToken {
  async createToken(user) {
    if (user.res === undefined)
      return { status: false, res: 'The email does not exist!' }

    try {
      let token = Date.now()

      let newToken = new passwordModels({
        user_id: user.res.id,
        used: 0,
        token,
      })

      await newToken.save()

      return { status: true, res: token }
    } catch (error) {
      console.log(error)
      return { status: false, res: error }
    }
  }

  async validateToken(token) {
    try {
      let result = await passwordModels.find({ token })

      if (result.length === 0) return { status: false, res: '' }

      let tk = result[0]
      if (tk.used) return { status: false, res: '' }

      return { status: true, res: tk }
    } catch (error) {
      console.log(error)
      return { status: false, res: error }
    }
  }

  async setUsed(token) {
    try {
      await passwordModels.findOneAndUpdate({ token }, { used: 1 })
      return { status: true, res: '' }
    } catch (error) {
      console.log(error)
      return { status: false, res: error }
    }
  }
}

module.exports = new PasswordToken()
