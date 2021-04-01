class AppointmentsFactories {
  Build(simplesAppointments) {
    let day = simplesAppointments.date.getDate() + 1
    let month = simplesAppointments.date.getMonth()
    let year = simplesAppointments.date.getFullYear()
    let hour = Number.parseInt(simplesAppointments.time.split(':')[0])
    let minutes = Number.parseInt(simplesAppointments.time.split(':')[1])

    let startDate = new Date(year, month, day, hour, minutes, 0, 0)
    startDate.setHours(startDate.getHours() - 3)

    let appointment = {
      id: simplesAppointments._id,
      title: simplesAppointments.name + ' - ' + simplesAppointments.description,
      start: startDate,
      end: startDate,
    }

    return appointment
  }
}

module.exports = new AppointmentsFactories()
