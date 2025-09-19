// models/index.js

import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { Sequelize,DataTypes} from "sequelize";
import dotenv from "dotenv";
import configFile from "../config/config.js";

dotenv.config(); // load .env variables

// import.meta.url -----> gives the full URL of this file
const __filename = fileURLToPath(import.meta.url); // absolute path of this file
const __dirname = path.dirname(__filename); // folder path of this file
const basename = path.basename(__filename); // 'index.js' -- current file name

const env = process.env.NODE_ENV || "development";
const config = configFile[env];

const db = {};

// Create Sequelize instance
let sequelize;
if (config.use_env_variable) {
  // if DB connection string is provided in .env
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // if DB config is provided in config.js
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: false, // set true if you want SQL query logs
  });
}

// Import all models in this folder
async function loadModels() {
  const files = fs.readdirSync(__dirname).filter(
    (file) =>
      file.indexOf(".") !== 0 && // skip hidden files like .env
      file !== basename && // skip index.js
      file.slice(-3) === ".js" && // only .js files
      !file.endsWith(".test.js") // skip test files
  );

  for (const file of files) {
    // dynamically import each model
    const modelImport = await import(pathToFileURL(path.join(__dirname, file)).href);

    // Handle both export styles:
    // 1. Default export is a function → call it with (sequelize, DataTypes)
    // 2. Default export is already a Sequelize model → use directly
    const model =
      typeof modelImport.default === "function"
        ? modelImport.default(sequelize,DataTypes)
        : modelImport.default;

    db[model.name] = model;
    console.log(`Loaded model: ${model.name}`);
  }

  // Run associations if defined in the model
  Object.values(db).forEach((model) => {
    if (model.associate) {
      model.associate(db);
    }
  });

  // Add Sequelize instance and constructor to db object
  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  // Sync all models with DB
  // Useful in development, but in production use migrations instead
  await sequelize.sync({alter : true});
  console.log("All models synchronized (tables created/updated).");
}

// Run model loader immediately
await loadModels();

export default db;
