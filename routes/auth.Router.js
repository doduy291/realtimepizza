const { Router } = require('express');
const express = require('express');
const authController = require('../controllers/auth.Controller.js');

const router = express.Router();

router.route('/login').get(authController.getLogin);
router.route('/register').get(authController.getRegister);

module.exports = router;
