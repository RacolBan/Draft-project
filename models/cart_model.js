const connection = require('./config_model.js');
const DataTypes = require('sequelize');

const CartModel = connection.define("carts",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        quantity_product: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    },
    {
        timestamps: true
    }
);
module.exports = CartModel