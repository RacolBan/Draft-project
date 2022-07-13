const { AccountModel } = require('../models/focus_models');
var jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
// const sendMail = require('../service/email.service');

require("dotenv").config();

const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '11m' })
}
const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}


const register = async (req, res) => {
    const { username, password, role } = req.body;

    try {

        const found = await AccountModel.findOne({
            where: {
                username,
            }
        });

        if (found) return res.status(409).json({ message: "username has existed" });

        // validate password
        if (password.length < 6)
            return res.status(400).json({ msg: "Password is at least 6 characters long." });


        //password Encryption
        const passwordHash = await bcrypt.hash(password, 10);

        const account = {
            userName: username,
            hash_pwd: passwordHash,
            role,
        };


        // save data
        const newAccount = await AccountModel.create(account);

        // // send email to notify
        // await sendMail(
        //     `${email}`,
        //     `Congratulation! the account of ${username} has created!`,
        //     "You has created successfully an account in HOCMAI"
        // )

        if (!newAccount) {
            return res.status(400).json({ message: "create new Account unsuccesfully" });
        }
        const accesstoken = createAccessToken({ id: newAccount.id });
        const refreshtoken = createRefreshToken({ id: newAccount.id });

        res.cookie('refreshtoken', refreshtoken, {
            httpOnly: true,
            path: '/user/refresh_token',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7d
        });

        res.status(201).json(newAccount);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}



const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const account = await AccountModel.findOne({
            where: {
                userName: username,
            }
        });

        if (!account) return res.status(400).json({ msg: "User does not exist." })

        // Compare encrypted password with hash_pwd
        const isMatch = await bcrypt.compare(password, account.hash_pwd)
        if (!isMatch) return res.status(400).json({ msg: "Incorrect password." })

        // If login success , create access token and refresh token
        const accesstoken = createAccessToken({ id: account.id })
        const refreshtoken = createRefreshToken({ id: account.id })

        // create refreshtoken cookie
        res.cookie('refreshtoken', refreshtoken, {
            httpOnly: true,
            path: '/user/refresh_token',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7d
        })
        res.json({
            msg: "login successful",
            accesstoken,
            id: account.id
        })

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }

};

const logout = async (req, res) => {
    try {
        res.clearCookie('refreshtoken', { path: '/user/refresh_token' })
        console.log(req.cookies);
        return res.json({ msg: "Logged out" })

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }

}

const refreshToken = async (req, res) => {
    try {
        const rf_token = req.cookies.refreshtoken;

        console.log(req.cookies);
        res.json({ rf_token })

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }

}


module.exports = {
    register,
    login,
    logout,
    refreshToken
}