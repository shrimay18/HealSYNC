const router = require('express').Router();
const dashBoardController = require('../controllers/dashBoardController');

router.get('/', dashBoardController.getHospital);
router.post("/hospital", dashBoardController.addHospital);
module.exports = router;