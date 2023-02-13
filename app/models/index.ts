import { Sequelize } from "sequelize";
import dbConfig from "../config/db.config";

export const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: "postgres",
    port: dbConfig.port,
    pool: dbConfig.pool,
  }
);
