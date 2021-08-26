'use strict'

const _ = require('underscore')
const satellitesData = require('./config-satellites')
// Función para recuperar el mensaje recepcionado
const getMessage = (messages) => {
  messages = _.zip(...messages) // Agrupar las distintas palabras de los mensajes en orden de llegada
  messages = messages.map((message) => _.compact(message)) // Remover palabras vacías ("")
  messages = _.flatten(messages) // Unificar palabras en un array único

  const decriptedMessage = []

  // Comparamos y removemos las palabras consecutivas (repetidas)
  for (let i = 0, length = messages.length; i < length; i++) {
    if (i === 0 || messages[i - 1].toString() !== messages[i].toString()) {
      decriptedMessage.push(messages[i])
    }
  }

  // Convertimos el array a un string, reemplazamos caracteres de separación
  const originalMessage = decriptedMessage.join(' ').replace(',', ' ')

  return originalMessage
}

// Función para calcular la posición de la fuente por trilateración
const getLocation = (distances) => {
  const x1 = satellitesData.currentPosition.kenobi.x
  const y1 = satellitesData.currentPosition.kenobi.y

  const x2 = satellitesData.currentPosition.skywalker.x
  const y2 = satellitesData.currentPosition.skywalker.y

  const x3 = satellitesData.currentPosition.sato.x
  const y3 = satellitesData.currentPosition.sato.y

  const r1 = distances.kenobi
  const r2 = distances.skywalker
  const r3 = distances.sato

  const A = ((-2) * x1 + 2 * x2)
  const B = ((-2) * y1 + 2 * y2)
  const C = (r1 ** 2) - (r2 ** 2) - (x1 ** 2) + (x2 ** 2) - (y1 ** 2) + (y2 ** 2)
  const D = ((-2) * x2 + 2 * x3)
  const E = ((-2) * y2 + 2 * y3)
  const F = (r2 ** 2) - (r3 ** 2) - (x2 ** 2) + (x3 ** 2) - (y2 ** 2) + (y3 ** 2)
  const x = (C * E - F * B) / (E * A - B * D)
  const y = (C * D - A * F) / (B * D - A * E)

  if (Number.isNaN(x) || Number.isNaN(y)) return false

  const location = { x: parseFloat(x.toFixed(2)), y: parseFloat(y.toFixed(2)) }

  return location
}

module.exports = {
  getLocation,
  getMessage
}
