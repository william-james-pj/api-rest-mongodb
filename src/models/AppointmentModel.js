const mongoose = require('mongoose')

const AppointmentFactorie = require('../factories/AppointmentsFactorie')
const AppointmentDB = require('../database/AppointmentDB')
const Appointment = mongoose.model('Appointment', AppointmentDB)

class AppointmentModel {
  async findAll() {
    try {
      let result = await Appointment.find({})
      let appointmests = []

      result.forEach((appointment) => {
        if (appointment.date != undefined)
          appointmests.push(AppointmentFactorie.Build(appointment))
      })

      return { status: true, res: appointmests }
    } catch (error) {
      console.log(error)
      return { status: false, res: [] }
    }
  }

  async findNotFinished() {
    try {
      let result = await Appointment.find({ finished: false })
      let appointmests = []

      result.forEach((appointment) => {
        if (appointment.date != undefined)
          appointmests.push(AppointmentFactorie.Build(appointment))
      })

      return { status: true, res: appointmests }
    } catch (error) {
      console.log(error)
      return { status: false, res: [] }
    }
  }

  async create(name, cpf, telefone, description, date, time) {
    try {
      let newAppointment = new Appointment({
        name,
        cpf,
        telefone,
        description,
        date,
        time,
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
