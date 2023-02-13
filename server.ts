import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import passport from "passport";

import { sequelize } from "./app/models";
import { authRoutes, categoriesRoutes, productsRoutes } from "./app/routes";
import { errorControllers } from "./app/controllers";
import passportConfig from "./app/config/passport.config";

process.env.NODE_ENV === "localhost"
  ? dotenv.config({ path: ".env.local" })
  : dotenv.config({ path: ".env" });

const app = express();
const origin = process.env.ORIGIN;
const port = process.env.PORT || 8080;

app.use(cors({ origin }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
passportConfig();

app.use("/auth", authRoutes);
app.use("/categories", categoriesRoutes);
app.use("/products", productsRoutes);
app.use("*", errorControllers.get404);

sequelize
  .sync()
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
