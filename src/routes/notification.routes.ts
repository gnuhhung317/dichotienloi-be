import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { NotificationController } from "../modules/notification/notification.controller";

const router = Router();

router.use(authMiddleware);

/**
 * @swagger
 * /api/notification/:
 *   get:
 *     summary: Get user notifications
 *     tags: [Notification]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *     responses:
 *       200:
 *         description: List of notifications
 */
router.get("/", NotificationController.getNotifications);

/**
 * @swagger
 * /api/notification/{id}/read:
 *   put:
 *     summary: Mark a notification as read
 *     tags: [Notification]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notification marked as read
 */
router.put("/:id/read", NotificationController.markAsRead);

/**
 * @swagger
 * /api/notification/read-all:
 *   put:
 *     summary: Mark all notifications as read
 *     tags: [Notification]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All notifications marked as read
 */
router.put("/read-all", NotificationController.markAllAsRead);

export default router;
