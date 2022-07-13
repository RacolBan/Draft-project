const connection = require('./config_model.js')
const DataTypes = require('sequelize');

const CategoryModel = connection.define("categories",
    {
        kindOFProduct: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: {
                    args: [3, 100],
                    msg: "wrong kind of product"
                }
            }
        },



    },

    {
        timestamps: true,
    }

);

module.exports = CategoryModel;
