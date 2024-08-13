const router = require('express').Router();
const doctorNoteController = require('../controllers/doctorNoteController');

router.get('/', doctorNoteController.getDoctorNotes);
router.post('/add-note', doctorNoteController.addDoctorNote);

module.exports = router;