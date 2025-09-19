import jwt from 'jsonwebtoken'
import bcrypt, { hash } from 'bcrypt'
import dotenv from 'dotenv'
import db from "../sequelize/models/index.js";
import { where } from 'sequelize';
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

export async function login(req,res){

  const {email, password} = req.body;

   //check if the user exists with the email
    try{
    const user = await User.findOne({where : {email}});
    if(!user)return res.status(401).json({
      message : "Invalid Credentials"
    })

    //compare the hashed passwords
    const hashedPassword = user.password;
    const matchPassword = await bcrypt.compare(password,hashedPassword)
   
    if(!matchPassword)return res.status(401).json({message : "Invalid Credentials"});

   //genrate the token
   const payload = {
     id : user.id,
     email : user.email,
     username : user.username
   }
   const token  = jwt.sign(payload , process.env.JWT_SECRET , {expiresIn : "1h"});

   //send the token 
   return res.status(200).json({token})

    }catch(err){
      return res.status(500).json({
        error : err.message
      })
    }
}



