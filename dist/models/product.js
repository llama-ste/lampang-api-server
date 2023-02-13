"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
var sequelize_1 = require("sequelize");
var _1 = require(".");
var category_1 = require("./category");
var user_1 = require("./user");
exports.Product = _1.sequelize.define("product", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    affiliateUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    imageUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: user_1.User,
            key: "id",
        },
        field: "userId",
        onDelete: "CASCADE",
    },
    categoryId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: category_1.Category,
            key: "id",
        },
        field: "categoryId",
        onDelete: "CASCADE",
    },
}, {
    tableName: "products",
});
// Product.belongsTo(Category, {
//   constraints: true,
//   onDelete: "CASCADE",
// });
// Product.belongsTo(User, {
//   constraints: true,
//   onDelete: "CASCADE",
// });
//# sourceMappingURL=product.js.map