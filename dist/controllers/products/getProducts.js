"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var product_1 = require("../../models/product");
var getProducts = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, page, per, order, numPage, limit, offset, orderOptions, defaultOrderOption, isValidOrder, orderOption, products, totalCount, totalPage, isLastPage, nextPage, pagination, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.query, page = _a.page, per = _a.per, order = _a.order;
                numPage = Number(page) || 1;
                limit = Number(per) || 12;
                offset = (numPage - 1) * limit;
                orderOptions = {
                    highestPrice: [["price", "DESC"]],
                    lowestPrice: [["price", "ASC"]],
                    idDesc: [["id", "DESC"]],
                    idAsc: [["id", "ASC"]],
                };
                defaultOrderOption = orderOptions.idDesc;
                isValidOrder = order === "highestPrice" ||
                    order === "lowestPrice" ||
                    order === "idDesc" ||
                    order === "idAsc";
                orderOption = isValidOrder ? orderOptions[order] : defaultOrderOption;
                return [4 /*yield*/, product_1.Product.findAndCountAll({
                        offset: offset,
                        limit: limit,
                        order: orderOption,
                    })];
            case 1:
                products = _b.sent();
                totalCount = products.count;
                totalPage = totalCount % limit === 0
                    ? totalCount / limit
                    : Math.ceil(totalCount / limit);
                isLastPage = totalCount - limit * numPage <= 0 &&
                    totalCount - limit * numPage >= -limit;
                nextPage = totalCount - limit * numPage > 0 ? numPage + 1 : null;
                pagination = {
                    per: limit,
                    totalCount: totalCount,
                    totalPage: totalPage,
                    currentPage: numPage,
                    nextPage: nextPage,
                    isLastPage: isLastPage,
                };
                return [2 /*return*/, res.json({ products: products.rows, pagination: pagination })];
            case 2:
                err_1 = _b.sent();
                return [2 /*return*/, res.status(400).json(err_1)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.default = getProducts;
//# sourceMappingURL=getProducts.js.map