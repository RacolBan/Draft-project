const { Op } = require("sequelize");
const { UserModel } = require("../models");

const getProfile = async (req, res) => {
    try {
        const { accountId } = req.params;

        if (!accountId) return res.status(404).json({ msg: " not found" });

        const profileUser = await UserModel.findOne({
            where: {
                accountId
            }
        })

        if (!profileUser) return res.status(404).json({ msg: "not found" });

        return res.status(200).json(profileUser)
    } catch (error) {
        return res.status(500).json({ msg: error.message })

    }

};

const newProfile = async (req, res) => {
    const { accountId } = req.params;

    const { firstName, lastName, email, address, phone } = req.body;
    try {
        const foundProfile = await UserModel.findOne({
            where: {
                accountId,
            }

        });
        if (!foundProfile) {

            const profile = {
                firstName,
                lastName,
                email,
                address,
                phone,
                accountId
            }


            // save data
            const newProfile = await UserModel.create(profile);



            if (!newProfile) {
                return res
                    .status(400)
                    .json({ message: "create new Profile unsuccesfully" });
            }

            return res.status(201).json(newProfile);
        }
        else {
            const update = {};
            if (firstName) update.firstName = firstName;
            if (lastName) update.lastName = lastName;
            if (email) update.email = email;
            if (phone) update.firstName = firstName;
            if (address) update.firstName = firstName;




            const updateProfile = await UserModel.update(update, {
                where: {
                    accountId
                }
            });


            if (!updateProfile) return res.status(400).json({ msg: "update fail" })
            return res.status(200).json({
                msg: "update succesfully",
            })
        }


    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

};

module.exports = {
    getProfile,
    newProfile
}