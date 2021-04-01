const mongoose = require('mongoose')

const userDB = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: Number, min: 0, max: 3, default: 0 },
})

module.exports = userDB
