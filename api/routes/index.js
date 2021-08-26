const express = require('express')
const api = express.Router()
const dataController = require('../controllers/data-controller')

api.post('/topsecret', dataController.getLocation)
api.post('/topsecret_split/:satellite_name', dataController.setSatelliteData)
api.get('/topsecret_split/', dataController.getLocationSplit)

module.exports = api
