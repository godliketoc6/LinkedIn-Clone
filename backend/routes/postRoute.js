import express from 'express';
import { protectedRoute } from '../middleware/middlewareAuth.js';
import { getFeedPosts, createPost, deletePost, getPostById, createComment, likePost } from '../controllers/postController.js';

const router = express.Router();

router.get("/", protectedRoute, getFeedPosts);
router.post("/create", protectedRoute, createPost);
router.delete("/delete/:id", protectedRoute, deletePost);
router.get("/:id", protectedRoute, getPostById);
router.post("/:id/comment", protectedRoute, createComment);
router.post("/:id/like", protectedRoute, likePost);

export default router;
