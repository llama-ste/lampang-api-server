"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var passport_1 = __importDefault(require("passport"));
var models_1 = require("./models");
var routes_1 = require("./routes");
var controllers_1 = require("./controllers");
var passport_config_1 = __importDefault(require("./config/passport.config"));
process.env.NODE_ENV === "localhost"
    ? dotenv_1.default.config({ path: ".env.local" })
    : dotenv_1.default.config({ path: ".env" });
var app = (0, express_1.default)();
var origin = process.env.ORIGIN;
var port = process.env.PORT || 8080;
app.use((0, cors_1.default)({ origin: origin }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(passport_1.default.initialize());
(0, passport_config_1.default)();
app.use("/auth", routes_1.authRoutes);
app.use("/categories", routes_1.categoriesRoutes);
app.use("/products", routes_1.productsRoutes);
app.use("*", controllers_1.errorControllers.get404);
models_1.sequelize
    .sync()
    .then(function () {
    console.log("DB connected");
})
    .catch(function (err) { return console.log(err); });
app.listen(port, function () {
    console.log("app listening on port ".concat(port));
});
//# sourceMappingURL=index.js.map