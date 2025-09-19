import express from "express"
import db from "./sequelize/models/index.js"
import router from "./routes/authRoutes.js";
import { authMiddleware } from "./middlewares/authMIddleware.js";

const startServer = async () => {
  try {
    await db.sequelize.authenticate(); 
    console.log("Database connected successfully.");

    const app = express();
    app.use(express.json());
    app.use('/auth', router)
    app.listen(3000, () => {
      console.log(" Server running on port 3000");
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer();
