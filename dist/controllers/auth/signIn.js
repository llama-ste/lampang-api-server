"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var passport_1 = __importDefault(require("passport"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var signIn = function (req, res, next) {
    try {
        passport_1.default.authenticate("local", { session: false }, function (err, user) {
            if (err || !user)
                return res.status(400).json(err);
            req.login(user, { session: false }, function (err) {
                if (err)
                    return res.status(400).json(err);
                if (process.env.JWT_SECRET_KEY !== undefined) {
                    var token = jsonwebtoken_1.default.sign(user.toJSON(), process.env.JWT_SECRET_KEY, {
                        expiresIn: "1d",
                    });
                    return res.json({ username: user.name, token: token });
                }
            });
        })(req, res);
    }
    catch (err) {
        return res.status(400).json(err);
    }
};
exports.default = signIn;
//# sourceMappingURL=signIn.js.map