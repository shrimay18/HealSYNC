const router = require('express').Router();
const loginController = require('../Controllers/LoginController');

router.post('/', loginController.getUser);

module.exports = router;