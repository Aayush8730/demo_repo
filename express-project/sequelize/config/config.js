import dotenv from "dotenv";
dotenv.config();

export default {
  development: {
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    dialect: process.env.PG_DIALECT
  },
  test: {
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE + "_test",
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    dialect: process.env.PG_DIALECT
  },
  production: {
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE + "_prod",
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    dialect: process.env.PG_DIALECT
  }
};

// THE TEST AND PRODUCTION ARE NOT NECESSARY FOR NOW 


