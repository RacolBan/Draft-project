
const bcrypt = require('bcrypt')
const { UserModel, AccountModel } = require("../models");
const sequelize = require('../models/config.model');

const getInfor = async (req, res) => {
    try {
        const { accountId } = req.params;

        const inforUser = await UserModel.findOne({
            where: {
                accountId
            }
        })

        if (!inforUser) {
            return res.status(404).json({ message: "Not Found Information" })
        };

        res.status(200).json(inforUser)
    } catch (error) {
        return res.status(500).json({ message: error.message })

    }

};

const createNewInfor = async (req, res) => {
    const t = await sequelize.transaction();


    try {
        const { firstName, lastName, email, address, phone, username, password } = req.body;

        // First, we start a transaction and save it into a variable


        const found = await AccountModel.findOne({
            where: {
                username,
            },
        }, { transaction: t });
        if (found) {
            return res.status(409).json({ message: "username has existed" });
        }
        // validate password
        if (password.length < 6) {
            return res.status(400).json({ message: "Password is at least 6 characters long." })
        };

        //password Encryption
        const passwordHash = await bcrypt.hash(password, 10);

        const account = {
            username: username,
            hashPwd: passwordHash,

        };

        // SAVE ACCOUNT
        const newAccount = await AccountModel.create(account, { transaction: t });
        // prevent hashPash from showing on UI
        delete newAccount.dataValues.hashPwd;

        if (!newAccount) {
            // ROLLBACK TRANSACTION
            return res.status(400).json({ message: "create new Account unsuccesfully" });
        }


        const foundProfile = await UserModel.findOne({
            where: {
                accountId: newAccount.id
            }
        }, { transaction: t });

        if (foundProfile) {
            // ROLLBACK TRANSACTION
            return res.status(400).json({ message: "user has been existed" })
        }

        const profile = {
            firstName,
            lastName,
            email,
            address,
            phone,
            accountId: newAccount.id
        }


        // save data to DB
        const newInfor = await UserModel.create(profile, { transaction: t });

        if (!newInfor) {
            await t.rollback();
            return res.status(400).json({ message: "create new Profile unsuccesfully" })
        };

        res.status(201).json({ newInfor, newAccount });

        // COMMIT TRANSACTION
        await t.commit();
    } catch (error) {
        await t.rollback();
        return res.status(500).json({ message: error.message });
    }
}
const updateInfor = async (req, res) => {
    try {
        const { accountId } = req.params;
        const { firstName, lastName, address } = req.body;

        const update = {};
        if (firstName) update.firstName = firstName;
        if (lastName) update.lastName = lastName;
        if (address) update.address = address;

        const foundInfor = await UserModel.findOne({
            where: {
                accountId,
            }
        })

        if (!foundInfor) {
            return res.status(404).json({ message: "Not Found Information" })
        };

        const updateInfor = await UserModel.update(update, {
            where: {
                accountId
            }
        });


        if (!updateInfor) {
            return res.status(400).json({ message: "update fail" })
        }


        res.status(200).json({ message: "update succesfully" })


    } catch (error) {
        return res.status(500).json({ message: error.message })

    }

};

const removeInfor = async (req, res) => {
    try {
        const { accountId } = req.params;

        const foundInfor = await UserModel.findOne({
            where: {
                accountId,
            }
        })

        if (!foundInfor) {
            return res.status(404).json({ message: "not found information" })
        };

        await UserModel.destroy({
            where: {
                accountId
            }
        })
        res.json({ message: "delete successfully" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}

const uploadAvatar = async (req, res) => {
    try {
        const { id } = req.params;
        const file = req.file
        if (!file) {
            return res.status(401).json({ message: "Pls provide an image" })
        }

        const found = await UserModel.findOne({
            where: {
                id,
            }
        })
        if (!found) {
            return res.status(404).json({ message: "Not Found User" })
        }

        await UserModel.update({ avatar: file.filename }, { where: { id } });

        res.json({ message: "avatar uploaded", filename: file.filename });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

module.exports = {
    getInfor,
    createNewInfor,
    updateInfor,
    removeInfor,
    uploadAvatar
}