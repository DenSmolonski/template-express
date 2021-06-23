const express = require("express");
const controller = require("../controllers/sizes");
const router = express.Router();
const connectEnsureLogin = require("connect-ensure-login");

router.post("/add", connectEnsureLogin.ensureLoggedIn(), controller.add);

module.exports = router;
