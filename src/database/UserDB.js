const mongoose = require('mongoose')

const userModels = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: Number, min: 0, max: 3, default: 0 },
})

module.exports = userModels
