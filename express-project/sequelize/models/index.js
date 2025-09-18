import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Sequelize from "sequelize";
import dotenv from "dotenv";
import configFile from "../config/config.js";
import { pathToFileURL } from "url";

dotenv.config(); // load .env variables

//import.meta.url -----> "file:///Users/aayush/project/models/index.js"
const __filename = fileURLToPath(import.meta.url); // "/Users/aayush/project/models/index.js"
const __dirname = path.dirname(__filename); // '/Users/aayush/project/models'
const basename = path.basename(__filename); // 'index.js' -- > the current file

const env = process.env.NODE_ENV || "development";
const config = configFile[env];

const db = {};



// Create Sequelize instance
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: false, // set true if you want SQL logs
  });
}

// Import all models in this folder

async function loadModels(){

const files = fs.readdirSync(__dirname).filter(
  (file) =>
    file.indexOf(".") !== 0 && // no file that starts with . like .env
    file !== basename && // not the current file
    file.slice(-3) === ".js" && // should be .js file
    !file.endsWith(".test.js") // do not end with .test.js
);
for (const file of files) {
  const modelImport = await import(pathToFileURL(path.join(__dirname, file)));

  // Handle both styles:
  // 1. Default export is a function → call it with (sequelize, DataTypes)
  // 2. Default export is already a Sequelize model → use directly
  let model;
  if (typeof modelImport.default === "function") {
    model = modelImport.default(sequelize, Sequelize.DataTypes);
  } else {
    model = modelImport.default;
  }

  db[model.name] = model;
  console.log(`Loaded model: ${model.name}`);
}


Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

await sequelize.sync();
console.log("All models synchronized (tables created/updated).");
}

await loadModels();


export default db;
