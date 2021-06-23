const express = require('express');
const controller = require('../controllers/products');
const router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');

router.get('/', controller.getAll);
router.get('/:id', controller.getProduct);
router.post(
  '/count/:id',
  connectEnsureLogin.ensureLoggedIn(),
  controller.updateProductCount
);

module.exports = router;
