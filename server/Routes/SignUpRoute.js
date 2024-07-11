const router = require('express').Router();
const signUpController = require('../Controllers/SignupController');
const multer = require('multer');
const Upload = multer({ dest: 'uploads/' });

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });


router.post('/', Upload.single("file"), signUpController.createUser);

module.exports = router;