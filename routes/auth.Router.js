const { Router } = require('express');
const express = require('express');
const authController = require('../controllers/auth.Controller.js');
const passportMDW = require('../middleware/passport');

const router = express.Router();

router.route('/login').get(passportMDW.userLogged, authController.getLogin).post(authController.userLogin);
router.route('/register').get(passportMDW.userLogged, authController.getRegister).post(authController.userRegister);
router.route('/logout').get(authController.getLogout);

module.exports = router;
