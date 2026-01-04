import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { ShoppingController } from "../modules/shopping/shopping.controller";

const router = Router();

router.use(authMiddleware);

/**
 * @swagger
 * /api/shopping/:
 *   post:
 *     summary: Thêm item vào danh sách mua sắm
 *     tags: [Shopping]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - foodId
 *               - quantity
 *             properties:
 *               foodId:
 *                 type: string
 *                 description: ID của thực phẩm
 *               quantity:
 *                 type: number
 *                 description: Số lượng
 *     responses:
 *       201:
 *         description: Item đã thêm thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 foodId:
 *                   type: string
 *                 quantity:
 *                   type: number
 *                 isBought:
 *                   type: boolean
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
router.post("/", ShoppingController.addItemToShoppingList);

/**
 * @swagger
 * /api/shopping/:
 *   get:
 *     summary: Lấy danh sách mua sắm
 *     tags: [Shopping]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách item mua sắm
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   foodId:
 *                     type: string
 *                   quantity:
 *                     type: number
 *                   isBought:
 *                     type: boolean
 *                   userId:
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
router.get("/", ShoppingController.getShoppingItems);

/**
 * @swagger
 * /api/shopping/marker:
 *   put:
 *     summary: Đánh dấu item đã mua
 *     tags: [Shopping]
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
 *               - isBought
 *             properties:
 *               itemId:
 *                 type: string
 *                 description: ID của item
 *               isBought:
 *                 type: boolean
 *                 description: Trạng thái đã mua
 *     responses:
 *       200:
 *         description: Item đã cập nhật trạng thái
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 foodId:
 *                   type: string
 *                 quantity:
 *                   type: number
 *                 isBought:
 *                   type: boolean
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
router.put("/marker", ShoppingController.markItemAsBought);

/**
 * @swagger
 * /api/shopping/:
 *   put:
 *     summary: Cập nhật số lượng item
 *     tags: [Shopping]
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
 *               - newQuantity
 *             properties:
 *               itemId:
 *                 type: string
 *                 description: ID của item
 *               newQuantity:
 *                 type: number
 *                 description: Số lượng mới
 *     responses:
 *       200:
 *         description: Item đã cập nhật số lượng
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 foodId:
 *                   type: string
 *                 quantity:
 *                   type: number
 *                 isBought:
 *                   type: boolean
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
router.put("/", ShoppingController.updateItemQuantity);

/**
 * @swagger
 * /api/shopping/:
 *   delete:
 *     summary: Xóa item khỏi danh sách mua sắm
 *     tags: [Shopping]
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
 *       200:
 *         description: Item đã xóa thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Item deleted successfully"
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
router.delete("/", ShoppingController.deleteItem);

export default router;