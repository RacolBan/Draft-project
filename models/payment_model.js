const connection = require('./config_model.js')
const DataTypes = require('sequelize');

const PayModel = connection.define("payments",
    {
        pay_method: {
            type: DataTypes.INTEGER,
            allowNull: false,

        },
        total: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }


    },

    {
        timestamps: true,
    }

);

module.exports = PayModel;
