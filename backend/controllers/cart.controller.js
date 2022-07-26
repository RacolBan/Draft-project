const { response } = require('express');
const { Op } = require('sequelize');
const { CartModel } = require('../models');

const getCartById = async () => {
    try {
        const { id } = req.params;

        const cart = await CartModel.findOne({
            where: {
                id
            }
        });

        if (!cart) {
            return res.status(404).json({ message: "Not Found Cart" })
        };

        res.status(200).json(cart);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const getCartByUserId = async () => {
    try {
        const { userId } = req.params;

        const carts = await CartModel.findAll({
            where: {
                userId
            }
        });

        res.status(200).json(carts);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
};

const getCartByProductId = async () => {
    try {
        const { productId } = req.query;

        const carts = await CartModel.findAll({
            where: {
                productId
            }
        });

        res.status(200).json(carts);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
};

const initCart = async (req, res) => {
    try {
        const { userId, productId } = req.params;
        const foundCart = await CartModel.findOne({
            where: {
                [Op.and]: {
                    userId,
                    productId
                }
            }
        })

        if (foundCart) {
            return res.status(500).json({ message: "Cart existed" })
        }

        const newCart = await CartModel.create({ userId, productId });
        if (!newCart) {
            return res.status(400).json({ message: "Create Cart Unsuccessully" })
        }
        res.status().json(newCart)
    } catch (error) {
        return res.status(500).json({ mesage: error.message })
    }

};

module.exports = {
    getCartById,
    getCartByProductId,
    getCartByUserId,
    initCart
}
