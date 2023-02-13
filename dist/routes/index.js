"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = exports.productsRoutes = exports.categoriesRoutes = void 0;
var categories_1 = __importDefault(require("./categories"));
exports.categoriesRoutes = categories_1.default;
var products_1 = __importDefault(require("./products"));
exports.productsRoutes = products_1.default;
var auth_1 = __importDefault(require("./auth"));
exports.authRoutes = auth_1.default;
//# sourceMappingURL=index.js.map