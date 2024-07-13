const router = require('express').Router();
const signUpController = require('../controllers/SignUpController');
const GsignUpController = require('../controllers/GSignUpController');

const multer = require('multer');
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, dir); // Use the absolute path of the uploads directory
    },
    filename: function(req, file, cb) {
        const date = new Date().toISOString().replace(/:/g, '-');
        cb(null, date + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/', upload.single("file"), signUpController.createUser);
router.post('/Gsignup', upload.single("file"), GsignUpController.createUser);

module.exports = router;
