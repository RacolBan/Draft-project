const express = require('express');
const { register, login, logout, refreshToken, changePassword } = require('../controllers/account.controller');
const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get('/logout', logout);

router.get('/refresh_token', refreshToken);

router.put("/change/:accountId", changePassword)




module.exports = router;