import express from 'express'
const blogRoutes = express.Router();
import { createBlog, deleteBlog, getAllBlogs } from '../controllers/blogController.js'
import { authMiddleware } from '../middlewares/authMIddleware.js';

blogRoutes.post('/createBlog',authMiddleware,createBlog);
blogRoutes.post('/deleteBlog/:id',authMiddleware,deleteBlog);
blogRoutes.get('/',authMiddleware,getAllBlogs);

export default blogRoutes;