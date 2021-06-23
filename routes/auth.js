const express = require('express');
const controller = require('../controllers/auth');
const router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');

router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/logout', controller.logout);
router.get('/user', connectEnsureLogin.ensureLoggedIn(), controller.user);

module.exports = router;
