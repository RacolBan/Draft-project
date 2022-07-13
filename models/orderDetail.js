const connection = require('./config_model.js')
const DataTypes = require('sequelize');

const OrderDetail = connection.define("orderdetails",
    {
        quantity_product: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },

        VAT: {
            type: DataTypes.STRING,
            allowNull: true,
        },


    },

    {
        timestamps: true,
    }

);

module.exports = OrderDetail;
