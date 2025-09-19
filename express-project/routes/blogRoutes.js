import express, { Router } from 'express'
const blogRoutes = express.Router();
import { createBlog } from '../controllers/blogController.js'
import { authMiddleware } from '../middlewares/authMIddleware.js';

blogRoutes.post('/createBlog',authMiddleware,createBlog);

export default blogRoutes;