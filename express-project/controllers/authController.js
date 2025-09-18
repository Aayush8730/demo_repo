import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import db from "../sequelize/models/index.js";
const { User } = db;
dotenv.config(); // using the env variables

// it is the callback function in the controller

export async function register(req, res) {
  const { username, email, password } = req.body;

  try {
    // check if user exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: "User created",
      user_id: user.id
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}





