import express from 'express'
const blogRoutes = express.Router();
import { createBlog, deleteBlog, getAllBlogs, getBlogById, updateBlog } from '../controllers/blogController.js'
import { authMiddleware } from '../middlewares/authMIddleware.js';

blogRoutes.get('/',getAllBlogs);
blogRoutes.get('/:id',getBlogById);

// protected routes
blogRoutes.post('/createBlog',authMiddleware,createBlog);
blogRoutes.post('/deleteBlog/:id',authMiddleware,deleteBlog);
blogRoutes.put('/:id',authMiddleware,updateBlog);

export default blogRoutes;