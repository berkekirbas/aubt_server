const { config } = require("dotenv");

config({ path: `.env.${process.env.NODE_ENV || "production"}` });

module.exports = CREDENTIALS = process.env.CREDENTIALS === "true";
module.exports = {
  NODE_ENV,
  PORT,
  ORIGIN,
  DB_URL,
  MANAGER_USERNAME,
  MANAGER_PASSWORD,
  JWT_SECRET,
} = process.env;
