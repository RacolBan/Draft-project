const express = require('express');
const { register, login, logout, refreshToken, changePassword, resetPassword, forgotPassword } = require('../controllers/account.controller');
const { checkEmail } = require('../middlewares/checkData');
const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get('/logout', logout);

router.get('/refresh_token', refreshToken);

router.put("/change/:accountId", changePassword)

router.post("/forgot_password", checkEmail, forgotPassword)

router.put("/reset_password/:accountId/:tempToken", resetPassword)





module.exports = router;