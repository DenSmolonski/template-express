const express = require("express");
const controller = require("../controllers/products");
const router = express.Router();
const connectEnsureLogin = require("connect-ensure-login");

router.get("/", controller.getAll);
router.get("/:id", controller.getProduct);
router.post("/:id", controller.updateProduct);
router.post("/count/:id", controller.updateProductCount);
router.post("/add", connectEnsureLogin.ensureLoggedIn(), controller.add);

module.exports = router;
