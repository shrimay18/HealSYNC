const route = require('express').Router();
const patientHistoryController = require('../controllers/patientHistoryController');

route.post('/addPatientHistory', patientHistoryController.addPatientHistory);
route.get('/', patientHistoryController.getPatientHistory);
route.get('/server-date', patientHistoryController.getServerDate);
route.get('/:patientId', patientHistoryController.getSinglePatientHistory);
route.delete('/:patientId', patientHistoryController.deletePatient);

module.exports = route;