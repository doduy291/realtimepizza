const { Router } = require('express');
const express = require('express');
const authController = require('../controllers/auth.Controller.js');
const role = require('../middleware/role');

const router = express.Router();

router.route('/login').get(role.notSignIfLogged, authController.getLogin).post(authController.userLogin);
router.route('/register').get(role.notSignIfLogged, authController.getRegister).post(authController.userRegister);
router.route('/logout').get(authController.getLogout);

module.exports = router;
