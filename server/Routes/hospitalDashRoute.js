const router = require('express').Router();
const hospitalDashController = require('../controllers/hospitalDashController');

router.get('/', hospitalDashController.getHospital);
router.post("/add-patient", hospitalDashController.addPatient);
router.get("/get-current-user", hospitalDashController.getCurrentUser);
router.delete('/delete-patient/:id', hospitalDashController.deletePatient);
router.put('/update-patient/:id', hospitalDashController.updatePatient);

module.exports = router;