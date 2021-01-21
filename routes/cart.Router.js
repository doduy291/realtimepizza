const express = require('express');
const cartController = require('../controllers/cart.Controller');
const role = require('../middleware/role');
const router = express.Router();

router.route('/').get(cartController.getCart);
router.route('/add-cart').post(cartController.addCart);
router.route('/order').post(cartController.orderCart);
router.route('/bill-order').get(role.notAccessBillOrder, cartController.billorderCart);
router.route('/bill-order/:id').get(role.notAccessBillOrder, cartController.billorderdetailCart);
router.route('/remove-cart').post(cartController.removeCart);

module.exports = router;
