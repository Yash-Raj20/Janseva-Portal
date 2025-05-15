import express from 'express';
const router = express.Router();
import { registerUser, loginUser, profile } from '../controllers/authController.js';

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', profile);

export default router;