const express = require('express');
const adminTrackOrderController = require('../controllers/admin/track-order.Controller');
const role = require('../middleware/role');
const router = express.Router();

router.route('/track-order').get(adminTrackOrderController.getTrackOrder);

module.exports = router;
