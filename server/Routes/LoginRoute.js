const router = require('express').Router();
const loginController = require('../controllers/LoginController');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/', loginController.getUser);

router.get("/get-current-user", authMiddleware, loginController.getCurrentUser);



module.exports = router;