import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { RecipeController } from "../modules/recipe/recipe.controller";

const router = Router();

router.use(authMiddleware);

import { uploadMiddleware } from "../middlewares/upload.middleware";

router.post("/", uploadMiddleware.single("image"), RecipeController.createRecipe);
router.get("/", RecipeController.getRecipes);
router.get("/:recipeId", RecipeController.getRecipeById);
/**
 * @swagger
 * /api/recipe/:
 *   post:
 *     summary: Tạo công thức mới
 *     tags: [Recipe]
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
 *                 description: Tên công thức
 *               description:
 *                 type: string
 *                 description: Mô tả công thức
 *               groupOnly:
 *                 type: boolean
 *                 description: Chỉ dành cho nhóm
 *     responses:
 *       201:
 *         description: Công thức đã tạo thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 groupOnly:
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
router.post("/", RecipeController.createRecipe);

/**
 * @swagger
 * /api/recipe/:
 *   get:
 *     summary: Lấy danh sách công thức
 *     tags: [Recipe]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               groupOnly:
 *                 type: boolean
 *                 description: Chỉ lấy công thức nhóm
 *     responses:
 *       200:
 *         description: Danh sách công thức
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
 *                   description:
 *                     type: string
 *                   groupOnly:
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
router.get("/", RecipeController.getRecipes);

/**
 * @swagger
 * /api/recipe/id:
 *   get:
 *     summary: Lấy công thức theo ID
 *     tags: [Recipe]
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
 *             properties:
 *               recipeId:
 *                 type: string
 *                 description: ID của công thức
 *     responses:
 *       200:
 *         description: Chi tiết công thức
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 groupOnly:
 *                   type: boolean
 *                 userId:
 *                   type: string
 *                 ingredients:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       foodId:
 *                         type: string
 *                       quantity:
 *                         type: number
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
router.get("/id", RecipeController.getRecipeById);

/**
 * @swagger
 * /api/recipe/:
 *   put:
 *     summary: Cập nhật công thức
 *     tags: [Recipe]
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
 *             properties:
 *               recipeId:
 *                 type: string
 *                 description: ID của công thức
 *               newName:
 *                 type: string
 *                 description: Tên mới
 *               newDescription:
 *                 type: string
 *                 description: Mô tả mới
 *     responses:
 *       200:
 *         description: Công thức đã cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 groupOnly:
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
router.put("/", RecipeController.updateRecipe);

/**
 * @swagger
 * /api/recipe/:
 *   delete:
 *     summary: Xóa công thức
 *     tags: [Recipe]
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
 *             properties:
 *               recipeId:
 *                 type: string
 *                 description: ID của công thức cần xóa
 *     responses:
 *       204:
 *         description: Công thức đã xóa thành công
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
router.delete("/", RecipeController.deleteRecipe);

/**
 * @swagger
 * /api/recipe/ingredient:
 *   post:
 *     summary: Thêm nguyên liệu vào công thức
 *     tags: [Recipe]
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
 *               - foodId
 *               - quantity
 *             properties:
 *               recipeId:
 *                 type: string
 *                 description: ID của công thức
 *               foodId:
 *                 type: string
 *                 description: ID của thực phẩm
 *               quantity:
 *                 type: number
 *                 description: Số lượng
 *     responses:
 *       200:
 *         description: Nguyên liệu đã thêm thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 ingredients:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       foodId:
 *                         type: string
 *                       quantity:
 *                         type: number
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
router.post("/ingredient", RecipeController.addIngredient);

/**
 * @swagger
 * /api/recipe/ingredient:
 *   put:
 *     summary: Chỉnh sửa nguyên liệu trong công thức
 *     tags: [Recipe]
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
 *               - foodId
 *               - newQuantity
 *             properties:
 *               recipeId:
 *                 type: string
 *                 description: ID của công thức
 *               foodId:
 *                 type: string
 *                 description: ID của thực phẩm
 *               newQuantity:
 *                 type: number
 *                 description: Số lượng mới
 *     responses:
 *       200:
 *         description: Nguyên liệu đã chỉnh sửa thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 ingredients:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       foodId:
 *                         type: string
 *                       quantity:
 *                         type: number
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
router.put("/ingredient", RecipeController.editIngredient);

/**
 * @swagger
 * /api/recipe/ingredient:
 *   delete:
 *     summary: Xóa nguyên liệu khỏi công thức
 *     tags: [Recipe]
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
 *               - foodId
 *             properties:
 *               recipeId:
 *                 type: string
 *                 description: ID của công thức
 *               foodId:
 *                 type: string
 *                 description: ID của thực phẩm cần xóa
 *     responses:
 *       200:
 *         description: Nguyên liệu đã xóa thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 ingredients:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       foodId:
 *                         type: string
 *                       quantity:
 *                         type: number
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
router.delete("/ingredient", RecipeController.removeIngredient);

export default router;