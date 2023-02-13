"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
var sequelize_1 = require("sequelize");
var _1 = require(".");
exports.Category = _1.sequelize.define("category", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
        },
    },
    order: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, { tableName: "categories" });
//# sourceMappingURL=category.js.map