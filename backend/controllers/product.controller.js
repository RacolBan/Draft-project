const { Op } = require("sequelize");
const { ProductModel, CategoryModel, ManufactureModel } = require("../models");

const getAllProduct = async (req, res) => {
    try {

        const productList = await ProductModel.findAll();

        res.status(200).json(productList);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getProductById = async (req, res) => {
    try {
        const { productId } = req.params;
        const found = await ProductModel.findOne({where:{
            id: productId
        }})
        if(!found) {
            return res.status(404).json({message:"Not found Product"})
        }
        res.status(200).json({message:"Get product successfully",found});
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// search data by manufactureid
const getProductByManufactureId = async (req, res) => {
    try {
        const { manufactureId } = req.params;

        const products = await ProductModel.findAll({
            where: {
                manufactureId
            }
        })

        res.status(200).json(products)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

// search data by category ID
const getProductByCategoryId = async (req, res) => {
    try {
        const { categoryId } = req.params;

        const products = await ProductModel.findAll({
            where: {
                categoryId
            }
        })

        res.status(200).json(products)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const pagination = async (req, res) => {

    try {

        let { offset, limit } = req.query;

        page = typeof page === "string" ? parseInt(page) : page;
        size = typeof size === "string" ? parseInt(size) : size;

        let { count, rows } = await ProductModel.findAndCountAll({
            limit,
            offset,
        });

        // transform rows
        rows = rows.map((singleRow) => {
            return singleRow.dataValues;
        });

        res.status(200).json({
            count,
            limit,
            offset,
            rows,
        });
    } catch (error) {
        res.status(500).json({ message: error.message })

    }

}

const initProduct = async (req, res) => {
    try {
        const { name, price, description, nameManufacture, nameCategory } = req.body;
        const file = req.file

        if (!file) {
            return res.status(404).json({ message: "Pls provide an image" })
        };
        // find manufacturer
        const foundManufacturer = await ManufactureModel.findOne({
            where: {
                name: nameManufacture,
            }
        });
        if (!foundManufacturer) {
            return res.status(404).json({ message: "Not Found Manufacturer" })
        };

        // find category
        const foundCategory = await CategoryModel.findOne({
            where: {
                name: nameCategory,
                manufactureId: foundManufacturer.id
            }
        });
        if (!foundCategory) {
            return res.status(404).json({ message: "Not Found Category" })
        };



        // find product by manufacture 
        const foundProduct = await ProductModel.findOne({
            where: {
                [Op.and]: {
                    manufactureId: foundManufacturer.id,
                    name
                }
            }
        })
        if (foundProduct) {
            return res.status(409).json({ message: "product has been existed" })
        };



        const product = {
            name,
            price,
            description,
            image: file.filename,
            categoryId: foundCategory.id,
            manufactureId: foundManufacturer.id
        }

        // save data to DB
        const newProduct = await ProductModel.create(product)

        if (!newProduct) {
            return res.status(400).json({ message: "Create product unsuccessfully" })
        }
        res.status(201).json({message:"Created New Product",newProduct});

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }


}

const updateProduct = async (req, res) => {
    try {
        const { name, price, description, image, categoryId, manufactureId } = req.body;
        const {productId} = req.params

        const foundProduct = await ProductModel.findByPk(productId)



        if (!foundProduct) {
            return res.status(404).json({ message: "Not Found Product" })
        }

        const update = {}
        if (name) update.name = name;
        if (price) update.price = price;
        if (description) update.description = description;
        if (image) update.name = name;
        if (categoryId) update.categoryId = categoryId;
        if (manufactureId) update.manufactureId = manufactureId;




        await ProductModel.update(update, {
            where: {
               id:  productId
            }
        })

        const foundProductUpdate = await ProductModel.findByPk(productId)


        res.status(201).json({
            message: "update product successfully",
            foundProductUpdate
        });

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }


}

const removeProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        const foundProduct = await ProductModel.findByPk(productId)

        if (!foundProduct) {
            return res.status(404).json({ message: "Not Found" })
        }

        // delete data from DB
        await ProductModel.destroy({
            where: {
                productId
            }
        })

        res.status(201).json({
            msg: "Delete successfully",
        });

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }


}


module.exports = {
    getAllProduct,
    getProductById,
    getProductByCategoryId,
    getProductByManufactureId,
    pagination,
    initProduct,
    updateProduct,
    removeProduct

}