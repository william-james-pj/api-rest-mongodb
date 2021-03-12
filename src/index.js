require('dotenv').config()

const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const route = require('./routes/routes')
const connection = require('./database/connection')

const app = express()

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

connection

app.use('/', route)

app.listen(process.env.PORT, () => {
  console.log(`Listening on port: ${process.env.PORT}`)
})
