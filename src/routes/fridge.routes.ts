import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { FridgeController } from "../modules/fridge/fridge.controller";

const router = Router();

router.use(authMiddleware);

/**
 * @swagger
 * /api/fridge/:
 *   post:
 *     summary: Thêm thực phẩm vào tủ lạnh
 *     tags: [Fridge]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - foodName
 *               - quantity
 *               - expiredAt
 *             properties:
 *               foodName:
 *                 type: string
 *                 description: Tên thực phẩm
 *               quantity:
 *                 type: number
 *                 description: Số lượng
 *               expiredAt:
 *                 type: string
 *                 format: date
 *                 description: Ngày hết hạn
 *     responses:
 *       201:
 *         description: Thực phẩm đã thêm thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 foodName:
 *                   type: string
 *                 quantity:
 *                   type: number
 *                 expiredAt:
 *                   type: string
 *                   format: date
 *                 groupId:
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
 *                   example: "MISSING_REQUIRED_FIELDS hoặc INVALID_QUANTITY"
 */
router.post("/", FridgeController.createFridgeItem);

/**
 * @swagger
 * /api/fridge/:
 *   get:
 *     summary: Lấy danh sách thực phẩm trong tủ lạnh
 *     tags: [Fridge]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách thực phẩm trong tủ lạnh
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
 *                   expiredAt:
 *                     type: string
 *                     format: date
 *                   groupId:
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
router.get("/", FridgeController.getFridgeItems);

/**
 * @swagger
 * /api/fridge/:
 *   put:
 *     summary: Cập nhật thực phẩm trong tủ lạnh
 *     tags: [Fridge]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - itemId
 *             properties:
 *               itemId:
 *                 type: string
 *                 description: ID của item
 *               quantity:
 *                 type: number
 *                 description: Số lượng mới
 *               expiredAt:
 *                 type: string
 *                 format: date
 *                 description: Ngày hết hạn mới
 *     responses:
 *       200:
 *         description: Thực phẩm đã cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 foodName:
 *                   type: string
 *                 quantity:
 *                   type: number
 *                 expiredAt:
 *                   type: string
 *                   format: date
 *                 groupId:
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
 *                   example: "MISSING_ITEM_ID hoặc INVALID_QUANTITY"
 */
router.put("/", FridgeController.updateFridgeItem);

/**
 * @swagger
 * /api/fridge/:
 *   patch:
 *     summary: Lấy thực phẩm ra khỏi tủ lạnh
 *     tags: [Fridge]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - itemId
 *               - quantity
 *               - action
 *             properties:
 *               itemId:
 *                 type: string
 *                 description: ID của item
 *               quantity:
 *                 type: number
 *                 description: Số lượng lấy ra
 *               action:
 *                 type: string
 *                 description: Hành động, ví dụ eat hoặc throw
 *     responses:
 *       200:
 *         description: Thực phẩm đã lấy ra thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 foodName:
 *                   type: string
 *                 quantity:
 *                   type: number
 *                 expiredAt:
 *                   type: string
 *                   format: date
 *                 groupId:
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
 *                   example: "MISSING_REQUIRED_FIELDS"
 */
router.patch("/", FridgeController.takeOutFridgeItem);

/**
 * @swagger
 * /api/fridge/:
 *   delete:
 *     summary: Xóa thực phẩm khỏi tủ lạnh
 *     tags: [Fridge]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - itemId
 *             properties:
 *               itemId:
 *                 type: string
 *                 description: ID của item cần xóa
 *     responses:
 *       204:
 *         description: Thực phẩm đã xóa thành công
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
 *                   example: "MISSING_ITEM_ID"
 */
router.delete("/", FridgeController.deleteFridgeItem);

export default router;