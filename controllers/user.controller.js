const { UserModel } = require("../models");

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
    try {
        const { accountId } = req.params;

        const { firstName, lastName, email, address, phone } = req.body;

        const foundProfile = await UserModel.findOne({
            where: {
                accountId
            }
        });

        if (foundProfile) {
            return res.status(400).json({ message: "user has been existed" })
        }

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

        if (!newInfor) {
            return res.status(400).json({ message: "create new Profile unsuccesfully" })
        };

        // true
        res.status(201).json(newInfor);

    } catch (error) {
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