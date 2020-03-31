const express = require('express')
const bodyParser = require('body-parser')
const middleware = require('./middleware')

const PORT = process.env.PORT || 1337

const app = express()
app.use(bodyParser.json())

const router = require('./route')
app.use(router)

app.use(middleware.handleError)
app.use(middleware.notFound)

const server = app.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}`)
)

if (require.main !== module) {
  module.exports = server
}
