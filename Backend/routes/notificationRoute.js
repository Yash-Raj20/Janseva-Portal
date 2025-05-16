import express from 'express';
import { getNotifications, readNotification } from '../controllers/NotificationController/notifyController.js';
import authMiddleware  from '../middleware/authMiddleware.js';

const router = express.Router();

// Protect these routes with the authMiddleware
router.get('/', authMiddleware, getNotifications);
router.put('/:id/read', authMiddleware, readNotification);

export default router;
