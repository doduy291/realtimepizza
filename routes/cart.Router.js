const express = require('express');
const cartController = require('../controllers/cart.Controller');

const router = express.Router();

router.route('/').get(cartController.getCart);

module.exports = router;
