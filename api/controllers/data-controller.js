const fn = require('./data-functions.js')
const _ = require('underscore')
let satellites = []// Creamos una variable para "cachear" los datos recibidos de los satelites

module.exports = {

  setSatelliteData: (req, res) => {
    // Actualizamos nuestro registro de datos de satelites
    satellites = satellites.filter(s => s.name !== req.params.satellite_name)

    try {
      satellites.push({
        name: req.params.satellite_name,
        distance: req.body.distance,
        message: req.body.message
      })
    } catch (e) {
      console.log('error: ', e)
      res.status(500).send({ message: 'Error al registrar los datos' })
    }
    res.status(200).send({ message: 'Datos registrados correctamente' })
  },

  getLocationSplit: (req, res) => {
    let sourceData = null

    // Chequeamos la cantidad de satelites registrados
    if (satellites.length > 2) {
      const distances = {}
      _.each(satellites, sat => { distances[sat.name] = sat.distance })
      // Obtenemos posición y mensaje
      const position = fn.getLocation(distances)
      const message = fn.getMessage(_.pluck(satellites, 'message'))

      if ((position) && (message)) {
        sourceData = { position, message }
      }
    } else sourceData = false

    if (sourceData) {
      res.status(200).send(sourceData)
    } else {
      res.status(404).send({ message: 'No se pudo determinar la ubicación o el mensaje.' })
    }
  },

  getLocation: (req, res) => {
    // Chequear si algún dato no está definido
    if (_.some(req.body.satellites, s => (typeof s.distance === 'undefined') || (typeof s.name === 'undefined') || (typeof s.message === 'undefined'))) {
      res.status(404).send({ message: 'No se pudo determinar la ubicación o el mensaje. (faltan datos)' })
    }

    satellites = []
    const distances = {}

    // Registro los datos en nuestra variable local a modo de "caché" y seteo las distancias para la función getLocation
    _.each(req.body.satellites, sat => {
      satellites.push({
        name: sat.name,
        distance: sat.distance,
        message: sat.message
      })
      distances[sat.name] = sat.distance
    })

    // Obtengo la posición y el mensaje
    const position = fn.getLocation(distances)
    const message = fn.getMessage(_.pluck(req.body.satellites, 'message'))

    if ((position) && (message)) {
      res.status(200).send({
        position: position,
        message: message
      })
    } else {
      res.status(404).send({ message: 'No se pudo determinar la ubicación o el mensaje.' })
    }
  }

}
