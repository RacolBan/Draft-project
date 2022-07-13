const express = require('express');
const router = express.Router();
const { register, login, logout, refreshToken } = require('../controller/userCtrl');
const { userHasNotExisted, isPWD, userExisted, } = require('../middleware/auth');

router.post("/register", register);

router.post("/login", login);

router.get('/logout', logout);

router.get('/refresh_token', refreshToken);




module.exports = router;