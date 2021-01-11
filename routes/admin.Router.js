const express = require('express');
const adminTrackOrderController = require('../controllers/admin/track-order.Controller');
const role = require('../middleware/role');
const router = express.Router();

router.route('/track-order').get(role.notAccessAdmin, adminTrackOrderController.getTrackOrder);
router.route('/track-order/status').post(role.notAccessAdmin, adminTrackOrderController.updateStatusTrackOrder);

module.exports = router;
