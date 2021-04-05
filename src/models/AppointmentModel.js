const mongoose = require('mongoose')

const AppointmentDB = require('../database/AppointmentDB')
const Appointment = mongoose.model('Appointment', AppointmentDB)

class AppointmentModel {
  async findByDate(date) {
    try {
      let result = await Appointment.find({ date })

      return { status: true, res: result }
    } catch (error) {
      console.log(error)
      return { status: false, res: [] }
    }
  }

  async create(clientId, description, date, timeStart, timeEnd) {
    try {
      let newAppointment = new Appointment({
        clientId,
        description,
        date,
        timeStart,
        timeEnd,
        finished: false,
      })

      await newAppointment.save()
    } catch (error) {
      console.log(error)
      return { status: false, res: error }
    }
  }
}

module.exports = new AppointmentModel()
