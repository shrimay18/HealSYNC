const router = require('express').Router();
const patientHistoryController = require('../Controllers/patientHistoryController');

router.post('/addPatientHistory', patientHistoryController.addPatientHistory);
router.get('/', patientHistoryController.getPatientHistory);
router.get('/getPatientName', patientHistoryController.getPatientName);

// route.get('/getPatientHistoryById/:id', patientHistoryController.getPatientHistoryById);
// route.put('/updatePatientHistory/:id', patientHistoryController.updatePatientHistory);
// route.delete('/deletePatientHistory/:id', patientHistoryController.deletePatientHistory);

module.exports = router;