import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { FoodController } from "../modules/food/food.controller";

const router = Router();

router.use(authMiddleware);

/**
 * @swagger
 * /api/food/:
 *   post:
 *     summary: Tạo thực phẩm mới
 *     tags: [Food]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - foodCategoryName
 *               - unitName
 *             properties:
 *               name:
 *                 type: string
 *                 description: Tên thực phẩm
 *               foodCategoryName:
 *                 type: string
 *                 description: Tên danh mục thực phẩm
 *               unitName:
 *                 type: string
 *                 description: Tên đơn vị
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Hình ảnh thực phẩm
 *     responses:
 *       201:
 *         description: Thực phẩm đã tạo thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 foodCategoryName:
 *                   type: string
 *                 unitName:
 *                   type: string
 *                 imageUrl:
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
router.post("/", FoodController.createFood);

/**
 * @swagger
 * /api/food/:
 *   get:
 *     summary: Lấy danh sách thực phẩm trong nhóm
 *     tags: [Food]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách thực phẩm
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   foodCategoryName:
 *                     type: string
 *                   unitName:
 *                     type: string
 *                   imageUrl:
 *                     type: string
 *       401:
 *         description: Chưa đăng nhập
 *       400:
 *         description: Lỗi xử lý
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 */
router.get("/", FoodController.getFoodInGroup);

/**
 * @swagger
 * /api/food/:
 *   put:
 *     summary: Chỉnh sửa thực phẩm
 *     tags: [Food]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Tên thực phẩm hiện tại
 *               newCategory:
 *                 type: string
 *                 description: Tên danh mục mới
 *               newUnit:
 *                 type: string
 *                 description: Tên đơn vị mới
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Hình ảnh mới
 *     responses:
 *       200:
 *         description: Thực phẩm đã chỉnh sửa thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 foodCategoryName:
 *                   type: string
 *                 unitName:
 *                   type: string
 *                 imageUrl:
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
router.put("/", FoodController.editFood);

/**
 * @swagger
 * /api/food/:
 *   delete:
 *     summary: Xóa thực phẩm
 *     tags: [Food]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Tên thực phẩm cần xóa
 *     responses:
 *       200:
 *         description: Thực phẩm đã xóa thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "FOOD_DELETED"
 *       401:
 *         description: Chưa đăng nhập
 *       400:
 *         description: Lỗi xử lý
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 */
router.delete("/", FoodController.deleteFood);

/**
 * @swagger
 * /api/food/category:
 *   get:
 *     summary: Lấy danh sách tất cả danh mục thực phẩm
 *     tags: [Food]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách danh mục
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *       401:
 *         description: Chưa đăng nhập
 *       400:
 *         description: Lỗi xử lý
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 */
router.get("/category", FoodController.getAllCategories);

/**
 * @swagger
 * /api/food/unit:
 *   get:
 *     summary: Lấy danh sách tất cả đơn vị
 *     tags: [Food]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách đơn vị
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   unitName:
 *                     type: string
 *       401:
 *         description: Chưa đăng nhập
 *       400:
 *         description: Lỗi xử lý
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 */
router.get("/unit", FoodController.getAllUnits);

/**
 * @swagger
 * /api/food/log:
 *   get:
 *     summary: Lấy nhật ký thực phẩm trong nhóm
 *     tags: [Food]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách nhật ký thực phẩm
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   foodName:
 *                     type: string
 *                   quantity:
 *                     type: number
 *                   action:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Chưa đăng nhập
 *       400:
 *         description: Lỗi xử lý
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 */
router.get("/log", FoodController.getFoodLogs);

export default router;