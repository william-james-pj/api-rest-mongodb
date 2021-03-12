require('dotenv').config()

const mongoose = require('mongoose')

mongoose.connect(process.env.URL_DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

module.exports = mongoose
