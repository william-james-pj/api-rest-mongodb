const mongoose = require('mongoose')

const AppointmentDB = new mongoose.Schema({
  clientId: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  timeStart: { type: String, required: true },
  timeEnd: { type: String, required: true },
  finished: { type: Boolean, required: true },
})

module.exports = AppointmentDB
