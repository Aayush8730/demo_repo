import express from "express"
import db from "./sequelize/models/index.js"
import authRoutes from './routes/authRoutes.js'
import blogRoutes from "./routes/blogRoutes.js";

const startServer = async () => {
  try {
    await db.sequelize.authenticate(); 
    console.log("Database connected successfully.");

    const app = express();
    app.use(express.json());
    app.use('/auth', authRoutes)
    app.use('/blog',blogRoutes)

    app.listen(3000, () => {
      console.log(" Server running on port 3000");
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer();
