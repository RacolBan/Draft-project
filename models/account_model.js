const connection = require('./config_model.js')
const DataTypes = require('sequelize');

const AccountModel = connection.define("accounts",
    {
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: {
                    args: [3, 12],
                    msg: "invalid username"
                }
            }
        },
        hash_pwd: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        role: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isIn: {
                    args: [[0, 1, 2]],
                    msg: "fail rule role"
                }
            }

        },
    },

    {
        timestamps: true,
    }

);

module.exports = AccountModel;
