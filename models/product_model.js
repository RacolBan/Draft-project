const connection = require('./config_model.js')
const DataTypes = require('sequelize');

const ProductModel = connection.define("products",
    {
        productName: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: {
                    args: [3, 100],
                    msg: "wrong product name"
                }
            }
        },

        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
        },

        brief_description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        illustrated_image: {
            type: DataTypes.BLOB("medium"),
            allowNull: true
        }


    },

    {
        timestamps: true,
    }

);

module.exports = ProductModel;
