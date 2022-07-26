const sequelize = require('./config.model.js')
const DataTypes = require('sequelize');

const ManufactureModel = sequelize.define("manufactures",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
    },

    {
        timestamps: true,
    }

);

module.exports = ManufactureModel;
