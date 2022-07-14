const UserModel = require("../models/user-model");
const permission = require("../config/permission")


const isAdmin = async ( req, res, next) => {
    const { username } = req;

    // get 1 user to check username == username from fe;
    const foundUser = await UserModel.findOne({
        where:{
            username,
        }
    })

    if(foundUser) {
        // check user in data is admin, isn't he?
        if(foundUser.iam_role !== permission.admin) {
            return res.status(401).json({message : "Unauthorized! You must have Admin Role to access"})
        }
        next();
    }
}

const isMember = async(req, res, next) => {
    const { username } = req;

    // get 1 user to check username == username from fe;
    const foundUser = await UserModel.findOne({
        where:{
            username,
        }
    })

    if(foundUser) {
        // check user in data is admin, isn't he?
        if(foundUser.iam_role !== permission.member) {
            return res.status(401).json({message: "Unauthorized! You must have Memeber Role to access"})
        }
        next();
    }
}

module.exports = {
    isAdmin,
    isMember
}