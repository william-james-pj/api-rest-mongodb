const AppointmentModels = require('../models/AppointmentModel')

class AppointmentsController {
  async findAll(req, res) {
    let appointments = await AppointmentModels.findAll()

    return res.status(200).send({ status: true, res: appointments.res })
  }

  async findNotFinished(req, res) {
    let appointments = await AppointmentModels.findNotFinished()

    return res.status(200).send({ status: true, res: appointments.res })
  }

  async create(req, res) {
    let { name, cpf, telefone, description, date, time } = req.body

    await AppointmentModels.create(name, cpf, telefone, description, date, time)

    return res.status(200).send({ status: true, res: 'Create user!' })
  }
}

module.exports = new AppointmentsController()
