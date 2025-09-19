import jwt from "jsonwebtoken";
import db from "../sequelize/models/index.js";

const { User } = db;

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    
    req.user = user;
    console.log(user.id);
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
