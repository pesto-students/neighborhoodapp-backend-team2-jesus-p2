import express  from "express";
import { getUser, Register, Login, Logout, updateUserProfile } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import {createPost, editPost, getUserPosts, updatePost, getAllPosts} from '../controllers/Posts.js';
import { createCategory } from '../controllers/Categories.js'

const router = express.Router();

router.post('/categories', verifyToken, createCategory);
router.post('/posts', verifyToken, createPost);
router.get('/user/profile', verifyToken, getUser);
router.get('/user/posts', verifyToken, getUserPosts);
router.patch('/updateProfile', verifyToken, updateUserProfile);
router.get('/editPost', verifyToken, editPost);
router.patch('/updatePost', verifyToken, updatePost);
router.get('/getAllPosts', verifyToken, getAllPosts);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);
// router.post('/posts', Post)

export default router;