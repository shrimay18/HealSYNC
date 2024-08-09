const route = require('express').Router();
const patientHistoryController = require('../controllers/patientHistoryController');

route.post('/addPatientHistory', patientHistoryController.addPatientHistory);
route.get('/', patientHistoryController.getPatientHistory);

module.exports = route;
