"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var passport_1 = __importDefault(require("passport"));
var controllers_1 = require("../controllers");
var router = (0, express_1.Router)();
router
    .get("/", controllers_1.catrgoryControllers.getCategories)
    .get("/:categoryId/products", controllers_1.catrgoryControllers.getCategoryInProducts)
    .post("/", passport_1.default.authenticate("jwt", { session: false }), controllers_1.catrgoryControllers.createCategory)
    .patch("/order", passport_1.default.authenticate("jwt", { session: false }), controllers_1.catrgoryControllers.updateCategoryOrder)
    .patch("/:id", passport_1.default.authenticate("jwt", { session: false }), controllers_1.catrgoryControllers.updateCategory)
    .delete("/:id", passport_1.default.authenticate("jwt", { session: false }), controllers_1.catrgoryControllers.deleteCatrgory);
exports.default = router;
//# sourceMappingURL=categories.js.map