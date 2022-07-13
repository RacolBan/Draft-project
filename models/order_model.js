const connection = require('./config_model.js');
const DataTypes = require('sequelize');

const OrderModel = connection.define("orders",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
    },
    {
        timestamps: true
    }
);
module.exports = OrderModel