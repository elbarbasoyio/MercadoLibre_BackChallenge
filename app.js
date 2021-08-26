const express = require('express')
const app = express()
const api = require('./api/routes')

app.use(express.json())
app.use('/api', api)

// Error handler
app.use((req, res) => res.status(404).send({ message: 'URL inválida.' }))

app.use((error, req, res, next) => {
  if (error instanceof SyntaxError) {
    res.status(400).send({ message: 'Hay un error en el request.' })
  }
})

module.exports = app
