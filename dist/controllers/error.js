"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get404 = void 0;
var get404 = function (req, res) {
    res.status(404).json({ message: "Not Found!" });
};
exports.get404 = get404;
//# sourceMappingURL=error.js.map