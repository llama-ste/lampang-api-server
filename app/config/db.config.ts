import dotenv from "dotenv";

process.env.NODE_ENV === "localhost"
  ? dotenv.config({ path: ".env.local" })
  : dotenv.config({ path: ".env" });

export default {
  host: process.env.DB_HOST || "localhost",
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "postgres",
  port: Number(process.env.DB_PORT) || 5432,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
