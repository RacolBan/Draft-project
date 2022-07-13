const connection = require('./config_model.js')
const DataTypes = require('sequelize');

const ManufactureModel = connection.define("manufactures",
    {
        name_manufacture: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: {
                    args: [3, 25],
                    msg: "wrong manufacturer"
                }
            }
        },



    },

    {
        timestamps: true,
    }

);

module.exports = ManufactureModel;
