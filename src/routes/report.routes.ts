import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { ReportController } from "../modules/report/report.controller";

const router = Router();

router.use(authMiddleware);

/**
 * @swagger
 * /api/report/shopping:
 *   get:
 *     summary: Get shopping report
 *     tags: [Report]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *     responses:
 *       200:
 *         description: Shopping report data
 */
router.get("/shopping", ReportController.getShoppingReport);

/**
 * @swagger
 * /api/report/consumption:
 *   get:
 *     summary: Get consumption report
 *     tags: [Report]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *     responses:
 *       200:
 *         description: Consumption report data
 */
router.get("/consumption", ReportController.getConsumptionReport);

export default router;
