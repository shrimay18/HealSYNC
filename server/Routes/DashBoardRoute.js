const router = require('express').Router();
const dashBoardController = require('../controllers/dashBoardController');

router.get('/', dashBoardController.getHospital);
router.post("/hospital", dashBoardController.addHospital);
router.get("/get-current-user", dashBoardController.getCurrentUser);
router.delete('/delete-hospital/:id', dashBoardController.deleteHospital);
router.put('/update-hospital/:id', dashBoardController.updateHospital);
router.get('/hospital/:id', dashBoardController.getHospitalById);

module.exports = router;