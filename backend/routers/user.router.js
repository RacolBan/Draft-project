const express = require('express');
const { register, login, logout, refreshToken } = require('../controllers/user.controller');
const userRouter = express.Router();

userRouter.post("/register", register);

userRouter.post("/login", login);

userRouter.get('/logout', logout);

userRouter.get('/refresh_token', refreshToken);




module.exports = userRouter;