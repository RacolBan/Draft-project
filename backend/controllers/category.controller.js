const { Op } = require("sequelize")
const { CategoryModel } = require("../models")

const getCategory = async (req, res) => {
    try {

        const categories = await CategoryModel.findAll()
        return res.status(200).json(categories)
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}
const initCategory = async (req, res) => {
    try {
        const { manufactureId } = req.params;
        const { name } = req.body;

        const foundCategory = await CategoryModel.findOne({
            where: {
                [Op.and]: {
                    manufactureId,
                    name
                }
            }
        })
        if (foundCategory) return res.status(400).json({ msg: "category has been existed" })

        // save data
        const newCategory = await CategoryModel.create({ name, manufactureId })
        if (!newCategory) return res.status(400).json({ msg: "Create fail" })

        return res.status(200).json(newCategory)
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

const updateCategory = async (req, res) => {
    try {
        const { manufactureId } = req.params;
        const { name, id } = req.body;

        const foundCategory = await CategoryModel.findOne({
            where: {
                [Op.and]: {
                    manufactureId,
                    id
                }
            }
        })
        if (!foundCategory) return res.status(404).json({ msg: "Not Found" })

        const update = {};
        if (name) update.name = name;

        await CategoryModel.update(update, {
            where: {
                [Op.and]: {
                    id,
                    manufactureId
                }
            }
        })


        return res.status(200).json({ msg: "update successfully" })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

const removeCategory = async (req, res) => {
    try {
        const { manufactureId } = req.params;
        const { name, id } = req.body;

        const foundCategory = await CategoryModel.findOne({
            where: {
                [Op.and]: {
                    manufactureId,
                    name
                }
            }
        })
        if (!foundCategory) return res.status(404).json({ msg: "Not Found" })


        await CategoryModel.destroy({
            where: {
                [Op.and]: {
                    name,
                    manufactureId
                }
            }
        })

        return res.status(200).json({ msg: "delete successfully" })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

module.exports = {
    getCategory,
    initCategory,
    removeCategory,
    updateCategory

}