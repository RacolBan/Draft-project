const express = require('express');
const { register, login, changePassword, resetPassword, forgotPassword } = require('../controllers/account.controller');
const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.put("/change/:accountId", changePassword)

router.post("/forgot_password", forgotPassword)

router.put("/reset_password/:accountId", resetPassword)




module.exports = router;