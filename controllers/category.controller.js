const { Op } = require("sequelize")
const { CategoryModel } = require("../models")

const getCategory = async (req, res) => {
    try {

        const categories = await CategoryModel.findAll()
        if (!categories) {
            return res.status(404).json({ message: "Not found" })
        }
        return res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const getCategoryByManufactureId = async (req, res) => {
    try {
        const { manufactureId } = req.params;

        const category = await CategoryModel.findAll({
            where: {
                manufactureId
            }
        })
        if (!category) {
            return res.status(404).json({ message: "Not found" })
        }
        return res.status(200).json(category)
    } catch (error) {
        return res.status(500).json({ message: error.message })
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
        if (foundCategory) {
            return res.status(400).json({ message: "category has been existed" })
        }

        // save data
        const newCategory = await CategoryModel.create({ name, manufactureId })
        if (!newCategory) {
            return res.status(400).json({ message: "Create fail" })
        }

        return res.status(200).json(newCategory)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const updateCategory = async (req, res) => {
    try {
        const { manufactureId } = req.params;
        const { name, id } = req.body;

        const foundCategory = await CategoryModel.findByPk(id)

        if (!foundCategory) {
            return res.status(404).json({ message: "Not Found Category" })
        }

        const update = {};
        if (name) {
            const foundName = await CategoryModel.findOne({
                where: {
                    [Op.and]: {
                        manufactureId,
                        name
                    }
                }
            })
            if (foundName) {
                return res.status(409).json({ message: "name existed" })
            }

            update.name = name;
        }

        await CategoryModel.update(update, {
            where: {
                id
            }
        })


        return res.status(200).json({ message: "update successfully" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const removeCategory = async (req, res) => {
    try {
        const { id } = req.params

        const foundCategory = await CategoryModel.findByPk(id)

        if (!foundCategory) {
            return res.status(404).json({ message: "Not Found Data" })
        }


        await CategoryModel.destroy({
            where: {
                id
            }
        })

        return res.status(200).json({ message: "delete successfully" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getCategory,
    initCategory,
    removeCategory,
    updateCategory,
    getCategoryByManufactureId

}