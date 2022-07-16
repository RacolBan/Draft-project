const { ManufactureModel } = require("../models")

const getManufacturer = async (req, res) => {
    try {

        const manufacturer = await ManufactureModel.findAll()
        return res.status(200).json(manufacturer)
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

const initManufacturer = async (req, res) => {
    try {
        const { name } = req.body;
        console.log(name);
        const foundManufacturer = await ManufactureModel.findOne({
            where: {
                name
            }
        })
        if (foundManufacturer) return res.status(400).json({ msg: "manufacturer has been existed" })
        // save data
        const newManufacture = await ManufactureModel.create({ name })
        if (!newManufacture) return res.status(400).json({ msg: "Create fail" })

        return res.status(200).json(newManufacture)
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}
const removeManufacturer = async (req, res) => {
    try {
        const { name } = req.body;
        const foundManufacturer = await ManufactureModel.findOne({
            where: {
                name
            }
        })
        if (!foundManufacturer) return res.status(404).json({ msg: "Not Found" })

        // Delete data
        await ManufactureModel.destroy({
            where: {
                name
            }
        })
        return res.status(200).json({ msg: "Delete successfully" })


    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

const updateManufacturer = async (req, res) => {
    try {
        const { id, name } = req.body;
        const foundManufacturer = await ManufactureModel.findByPk(id)

        if (!foundManufacturer) return res.status(404).json({ msg: "Not Found" })

        const update = {};

        if (name) update.name = name;

        await ManufactureModel.update(update, {
            where: {
                id
            }
        })
        const updatedManufacturer = await ManufactureModel.findByPk(id)
        return res.status(200).json({ msg: "update successfully", updatedManufacturer })


    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

module.exports = {
    getManufacturer,
    initManufacturer,
    removeManufacturer,
    updateManufacturer

}