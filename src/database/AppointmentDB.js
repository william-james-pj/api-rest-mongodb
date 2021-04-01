const mongoose = require('mongoose')

const AppointmentDB = new mongoose.Schema({
  name: { type: String, required: true },
  cpf: { type: String, required: true },
  telefone: { type: String, required: true },
  description: { type: String, required: false },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  finished: { type: Boolean, required: true },
})

module.exports = AppointmentDB
