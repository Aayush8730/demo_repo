import express from "express"
import db from "./sequelize/models/index.js"


const startServer = async () => {
  try {
    await db.sequelize.authenticate(); // Connect to DB
    console.log("Database connected successfully.");

    // Optional: sync models (creates tables if they don’t exist)
    // await db.sequelize.sync(); // or { force: true } to drop & recreate tables : called in index.js

    // Start your server after DB connection is ready
    const app = express();
    app.listen(3000, () => {
      console.log(" Server running on port 3000");
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer();
