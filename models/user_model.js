const connection = require('./config_model.js');
const DataTypes = require('sequelize');

const UserModel = connection.define("user",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [3, 10],
                    msg: "invalid first name"
                }
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [3, 10],
                    msg: "invalid last name"
                }
            }
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: "invalid email"
                },

            }
        },
        phone: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        address: {
            type: DataTypes.STRING,
        },


    },
    {
        timestamps: true,
    },
);

module.exports = UserModel;


