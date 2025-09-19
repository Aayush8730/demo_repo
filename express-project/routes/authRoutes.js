import express from 'express'
const authRoutes = express.Router();
import { register , login } from '../controllers/authController.js';


authRoutes.post('/register',register);
authRoutes.post('/login', login);


export default authRoutes;