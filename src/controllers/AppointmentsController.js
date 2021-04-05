const AppointmentModels = require('../models/AppointmentModel')

class AppointmentsController {
  async findByDate(req, res) {
    let app = await AppointmentModels.findByDate(req.params.date)

    return res.status(200).send({ status: true, res: app.res })
  }

  async create(req, res) {
    let { clientId, description, date, timeStart, timeEnd } = req.body

    await AppointmentModels.create(
      clientId,
      description,
      date,
      timeStart,
      timeEnd
    )

    return res.status(200).send({ status: true, res: 'Create event!' })
  }
}

module.exports = new AppointmentsController()
