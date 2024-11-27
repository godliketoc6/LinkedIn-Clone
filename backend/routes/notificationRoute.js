import express from 'express';
import { protectedRoute } from '../middleware/middlewareAuth.js';
import { getUserNotifications, markNotificationAsRead, deleteNotification } from '../controllers/notificationController.js';

const router = express.Router();

router.get("/", protectedRoute, getUserNotifications);

router.put("/:id/read", protectedRoute, markNotificationAsRead);

router.delete("/:id", protectedRoute, deleteNotification);

export default router;