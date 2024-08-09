const route = require('express').Router();
const patientHistoryController = require('../controllers/patientHistoryController');

route.post('/addPatientHistory', patientHistoryController.addPatientHistory);
route.get('/', patientHistoryController.getPatientHistory);
// route.get('/getPatientHistoryById/:id', patientHistoryController.getPatientHistoryById);
// route.put('/updatePatientHistory/:id', patientHistoryController.updatePatientHistory);
// route.delete('/deletePatientHistory/:id', patientHistoryController.deletePatientHistory);
module.exports = route;