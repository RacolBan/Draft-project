const { UserModel } = require('../models/focus_models');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const bcrypt = require('bcrypt')

const privateKey = process.env.PRIVATEKEY;
// const permission = require('../config/permission');

const userHasNotExisted = async (req, res, next) => {

};


const userExisted = async (req, res, next) => {
    //get data from fe
    const { username, password: pwd } = req.body;
    try {
        const found = await UserModel.findOne({
            where: {
                username,
            }
        });

        if (!found) {
            return res.status(404).json({ message: "User no longer exist" });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const isPWD = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const found = await UserModel.findOne({
            where: {
                username,
            }
        });
        const isMatch = await bcrypt.compare(password, found.has_pwd)
        if (!isMatch) return res.status(400).json({ msg: "Incorrect password." })

        next();
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}
// login to get token, after appending that token into header

const verifyTok = async (req, res, next) => {
    const tok = req.headers["x-access-token"];

    if (!tok) {
        return res.status(403).json({ message: "forbidden" });
    }

    try {
        const { username } = jwt.verify(tok, privateKey);
        req.username = username;
        next();
    } catch (error) {
        return res.status(401).json({ message: "unauthorized!" })
    }
};




module.exports = {
    userExisted,
    userHasNotExisted,
    isPWD,
    verifyTok,

}