const route = require('express').Router();
const patientHistoryController = require('../controllers/patientHistoryController');

route.post('/addPatientHistory', patientHistoryController.addPatientHistory);
route.get('/', patientHistoryController.getPatientHistory);
route.delete('/:patientId', patientHistoryController.deletePatient);

module.exports = route;