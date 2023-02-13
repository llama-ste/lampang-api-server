"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
var sequelize_1 = require("sequelize");
var db_config_1 = __importDefault(require("../config/db.config"));
exports.sequelize = new sequelize_1.Sequelize(db_config_1.default.database, db_config_1.default.username, db_config_1.default.password, {
    host: db_config_1.default.host,
    dialect: "postgres",
    port: db_config_1.default.port,
    pool: db_config_1.default.pool,
});
//# sourceMappingURL=index.js.map