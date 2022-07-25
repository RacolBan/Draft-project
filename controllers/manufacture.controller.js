const { ManufactureModel } = require("../models")

const getManufacturer = async (req, res) => {
    try {

        const manufacturers = await ManufactureModel.findAll()


        return res.status(200).json(manufacturers)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


const getManufacturerById = async (req, res) => {
    try {
        const { manufactureId: id } = req.params;
        const manufacturer = await ManufactureModel.findByPk(id)

        if (!manufacturer) {
            return res.status(404).json({ message: "Not Found Manufacturer" })
        }

        res.status(200).json(manufacturer)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const initManufacturer = async (req, res) => {
    try {
        const { name } = req.body;
        const foundManufacturer = await ManufactureModel.findOne({
            where: {
                name
            }
        })
        if (foundManufacturer) {
            return res.status(400).json({ message: "manufacturer has been existed" })
        }
        // save data
        const newManufacture = await ManufactureModel.create({ name })
        if (!newManufacture) {
            return res.status(400).json({ message: "Create Manufacturer Unsuccessfully" })
        }

        res.status(200).json(newManufacture)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const removeManufacturer = async (req, res) => {
    try {
        const { manufactureId: id } = req.params;
        const foundManufacturer = await ManufactureModel.findOne({
            where: {
                id
            }
        })
        if (!foundManufacturer) {
            return res.status(404).json({ message: "Not Found Data" })
        }

        // Delete data
        await ManufactureModel.destroy({
            where: {
                id
            }
        })
        res.status(200).json({ message: "Delete successfully" })


    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const updateManufacturer = async (req, res) => {
    try {
        const { manufactureId: id } = req.params;
        const { name } = req.body
        const foundManufacturer = await ManufactureModel.findByPk(id)

        if (!foundManufacturer) {
            return res.status(404).json({ message: "Not Found Data" })
        }

        const update = {};

        if (name) {
            const foundName = await ManufactureModel.findOne({
                where: {
                    name
                }
            })
            if (foundName) {
                return res.status(409).json({ message: "name existed" })
            }

            update.name = name;
        }


        await ManufactureModel.update(update, {
            where: {
                id
            }
        })
        res.status(200).json({ message: "update successfully" })


    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getManufacturer,
    initManufacturer,
    removeManufacturer,
    updateManufacturer,
    getManufacturerById

}