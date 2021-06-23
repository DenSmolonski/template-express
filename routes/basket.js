const express = require('express');
const controller = require('../controllers/basket');
const router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');

router.post('/', connectEnsureLogin.ensureLoggedIn(), controller.add);
router.delete('/', connectEnsureLogin.ensureLoggedIn(), controller.delete);
router.get('/', connectEnsureLogin.ensureLoggedIn(), controller.get);

module.exports = router;
