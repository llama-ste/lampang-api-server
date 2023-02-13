"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("../controllers");
var router = (0, express_1.Router)();
router.post("/sign_in", controllers_1.authControllers.signIn);
exports.default = router;
//# sourceMappingURL=auth.js.map