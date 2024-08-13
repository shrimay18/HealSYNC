const route = require('express').Router();
const patientHistoryController = require('../controllers/patientHistoryController');

route.get('/today-appointments', patientHistoryController.getTodayAppointments);
route.post('/addPatientHistory', patientHistoryController.addPatientHistory);
route.get('/', patientHistoryController.getPatientHistory);
route.get('/server-date', patientHistoryController.getServerDate);
route.get('/:patientId', patientHistoryController.getSinglePatientHistory);
route.delete('/:patientId', patientHistoryController.deletePatient);
route.get('/appointment/:appointmentId', patientHistoryController.getAppointment);
route.put('/updateAppointment/:appointmentId', patientHistoryController.updateAppointment);

module.exports = route;