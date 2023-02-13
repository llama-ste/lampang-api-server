import { Sequelize } from "sequelize";
import * as pg from "pg";

import dbConfig from "../config/db.config";

export const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: "postgres",
    dialectModule: pg,
    port: dbConfig.port,
    pool: dbConfig.pool,
  }
);
