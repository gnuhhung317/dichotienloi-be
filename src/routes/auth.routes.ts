import { Router } from "express";
import { AuthController } from "../modules/auth/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Đăng ký tài khoản mới
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password, name]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Đăng ký thành công (00035)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Dữ liệu không hợp lệ (00025, 00026, 00027, 00028, 00039, 00040)
 *       409:
 *         description: Email đã tồn tại (00032)
 *       404:
 *         description: Không tìm thấy tài khoản (00036)
 */
router.post("/register", AuthController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Đăng nhập
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đăng nhập thành công (00047)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         description: Thông tin đăng nhập không hợp lệ (00045)
 *       403:
 *         description: Tài khoản chưa được kích hoạt hoặc xác minh (00043, 00044)
 *       404:
 *         description: Không tìm thấy tài khoản (00042)
 */
router.post("/login", AuthController.login);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Lấy thông tin người dùng hiện tại
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Thông tin người dùng hiện tại
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         description: Token không hợp lệ hoặc hết hạn (00055, 00061, 00062, 00063)
 */
router.get("/me", authMiddleware, AuthController.me);

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Làm mới token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [refreshToken]
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token đã được làm mới thành công (00065)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Thiếu refresh token (00059)
 *       401:
 *         description: Token không hợp lệ hoặc hết hạn (00055, 00062, 00063)
 */
router.post("/refresh", AuthController.refresh);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Đăng xuất
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [refreshToken]
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đăng xuất thành công (00050)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Thiếu refresh token (00059)
 *       401:
 *         description: Token không hợp lệ hoặc hết hạn (00055, 00061, 00062, 00063)
 */
router.post("/logout", authMiddleware, AuthController.logout);

export default router;
