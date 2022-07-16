const { Op } = require("sequelize");
const { UserModel } = require("../models");

const getInfor = async (req, res) => {
    try {
        const { accountId } = req.params;

        if (!accountId) return res.status(404).json({ msg: " not found" });

        const inforUser = await UserModel.findOne({
            where: {
                accountId
            }
        })

        if (!inforUser) return res.status(404).json({ msg: "not found" });

        return res.status(200).json(inforUser)
    } catch (error) {
        return res.status(500).json({ msg: error.message })

    }

};

const createNewInfor = async (req, res) => {
    try {
        const { accountId } = req.params;

        const { firstName, lastName, email, address, phone } = req.body;
        console.log(req.body);
        const foundProfile = await UserModel.findOne({
            where: {
                [Op.or]: {
                    accountId,
                    email
                }
            }
        });
        console.log(foundProfile);
        if (foundProfile) return res.status(400).json({ msg: "user or email has been existed" })

        const profile = {
            firstName,
            lastName,
            email,
            address,
            phone,
            accountId
        }


        // save data to DB
        const newInfor = await UserModel.create(profile);

        if (!newInfor) return res.status(400).json({ message: "create new Profile unsuccesfully" });

        // true
        return res.status(201).json(newInfor);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
const updateInfor = async (req, res) => {
    try {
        const { accountId } = req.params;
        const { firstName, lastName, email, address, phone } = req.body;

        const update = {};
        if (firstName) update.firstName = firstName;
        if (lastName) update.lastName = lastName;
        if (email) update.email = email;
        if (phone) update.phone = phone;
        if (address) update.address = address;
        const foundInfor = await UserModel.findOne({
            where: {
                accountId,
            }
        })

        if (!foundInfor) return res.status(404).json({ msg: "not found" })

        const updateInfor = await UserModel.update(update, {
            where: {
                accountId
            }
        });


        if (!updateInfor) return res.status(400).json({ msg: "update fail" })


        return res.status(200).json({ msg: "update succesfully" })


    } catch (error) {
        return res.status(500).json({ msg: error.message })

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

        if (!foundInfor) return res.status(404).json({ msg: "not found" })

        await UserModel.destroy({
            where: {
                accountId
            }
        })
        return res.json({ msg: "delete successfully" })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }



}






module.exports = {
    getInfor,
    createNewInfor,
    updateInfor,
    removeInfor
}