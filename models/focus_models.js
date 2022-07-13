const CartModel = require("./cart_model");
const CategoryModel = require("./cate_model");
const UserModel = require("./user_model");
const ManufactureModel = require("./manufacture_model");
const OrderModel = require("./order_model");
const OrderDetail = require("./orderDetail");
const PayModel = require("./payment_model");
const ProductModel = require("./product_model");
const AccountModel = require("./account_model");

// UserModel vs AccountModel: one-to-one
AccountModel.hasOne(UserModel, {
    foreignKey: {
        name: "accountID",
    }
});

UserModel.belongsTo(AccountModel, {
    foreignKey: {
        name: "accountID",
    },
});

// Account vs OrderModel : one to many
AccountModel.hasMany(OrderModel, {
    foreignKey: {
        name: "accountID",
    }
});

OrderModel.belongsTo(AccountModel, {
    foreignKey: {
        name: "accountID",
    },
});

// Account vs Cart: one to many
AccountModel.hasMany(CartModel, {
    foreignKey: {
        name: "accountID",
    }
});

CartModel.belongsTo(AccountModel, {
    foreignKey: {
        name: "accountID",
    },
});

// OrderModel vs PayModel: one to one
OrderModel.hasMany(PayModel, {
    foreignKey: {
        name: "orderID",
    }
});

PayModel.belongsTo(OrderModel, {
    foreignKey: {
        name: "orderID",
    },
});

//OrderModel vs OrderDetail: one to many

OrderModel.hasMany(OrderDetail, {
    foreignKey: {
        name: "orderID",
    }
});

OrderDetail.belongsTo(OrderModel, {
    foreignKey: {
        name: "orderID",
    },
});

//ProductModel vs OrderDetail: one to many

ProductModel.hasMany(OrderDetail, {
    foreignKey: {
        name: "productID",
    }
});

OrderDetail.belongsTo(ProductModel, {
    foreignKey: {
        name: "productID",
    },
});

// ProductModel vs CartModel: one to many

ProductModel.hasMany(CartModel, {
    foreignKey: {
        name: "productID",
    }
});

CartModel.belongsTo(ProductModel, {
    foreignKey: {
        name: "productID",
    },
});

//ManufactureModel vs ProductModel: one to many

ManufactureModel.hasMany(ProductModel, {
    foreignKey: {
        name: "manufactureID",
    }
});

ProductModel.belongsTo(ManufactureModel, {
    foreignKey: {
        name: "manufactureID",
    },
});



//ManufactureModel vs CategoryModel: one to many

ManufactureModel.hasOne(CategoryModel, {
    foreignKey: {
        name: "manufactureID",
    }
});

CategoryModel.belongsTo(ManufactureModel, {
    foreignKey: {
        name: "manufactureID",
    },
});















AccountModel.sync();
ProductModel.sync();
ManufactureModel.sync();
CategoryModel.sync();
OrderModel.sync();
OrderDetail.sync();
CartModel.sync();
PayModel.sync();
UserModel.sync();


module.exports = {
    UserModel,
    AccountModel,
    ProductModel,
    ManufactureModel,
    CategoryModel,
    OrderDetail,
    OrderModel,
    CartModel,
    PayModel,

}