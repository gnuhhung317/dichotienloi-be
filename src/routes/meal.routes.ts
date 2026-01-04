import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { MealController } from "../modules/meal/meal.controller";

const router = Router();

router.use(authMiddleware);

/**
 * @swagger
 * /api/meal/:
 *   post:
 *     summary: Thêm công thức vào kế hoạch bữa ăn
 *     tags: [Meal]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - recipeId
 *               - date
 *               - mealType
 *             properties:
 *               recipeId:
 *                 type: string
 *                 description: ID của công thức
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Ngày của bữa ăn
 *               mealType:
 *                 type: string
 *                 enum: [breakfast, lunch, dinner, snack]
 *                 description: Loại bữa ăn
 *     responses:
 *       201:
 *         description: Công thức đã thêm thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 recipeId:
 *                   type: string
 *                 date:
 *                   type: string
 *                   format: date
 *                 mealType:
 *                   type: string
 *                 userId:
 *                   type: string
 *       401:
 *         description: Chưa đăng nhập
 *       400:
 *         description: Dữ liệu không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 */
router.post("/", MealController.addRecipeToMealPlan);

/**
 * @swagger
 * /api/meal/:
 *   get:
 *     summary: Lấy kế hoạch bữa ăn
 *     tags: [Meal]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Ngày cần lấy kế hoạch
 *               mealType:
 *                 type: string
 *                 enum: [breakfast, lunch, dinner, snack]
 *                 description: Loại bữa ăn (tùy chọn)
 *     responses:
 *       200:
 *         description: Kế hoạch bữa ăn
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   recipeId:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                   date:
 *                     type: string
 *                     format: date
 *                   mealType:
 *                     type: string
 *       401:
 *         description: Chưa đăng nhập
 *       400:
 *         description: Dữ liệu không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 */
router.get("/", MealController.getMealPlan);

/**
 * @swagger
 * /api/meal/:
 *   delete:
 *     summary: Xóa công thức khỏi kế hoạch bữa ăn
 *     tags: [Meal]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mealRecipeId
 *             properties:
 *               mealRecipeId:
 *                 type: string
 *                 description: ID của meal recipe cần xóa
 *     responses:
 *       200:
 *         description: Công thức đã xóa thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Meal recipe removed successfully"
 *       401:
 *         description: Chưa đăng nhập
 *       400:
 *         description: Dữ liệu không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 */
router.delete("/", MealController.removeRecipeFromMealPlan);

export default router;