import express from 'express';
const router = express.Router();

import { registerUser, loginUser, profile } from '../controllers/UserController/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authMiddleware, profile); // ✅ Protected route

export default router;