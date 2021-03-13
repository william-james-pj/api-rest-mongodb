const mongoose = require('mongoose')

const PasswordTokenModels = new mongoose.Schema({
  user_id: { type: String, required: true },
  token: { type: String, required: true },
  used: { type: Boolean, default: false },
})

module.exports = PasswordTokenModels
