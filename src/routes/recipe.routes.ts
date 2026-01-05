import { Router } from "express";
import multer from "multer";

import { authMiddleware } from "../middlewares/auth.middleware";
import { RecipeController } from "../modules/recipe/recipe.controller";

const router = Router();



import { uploadMemory, uploadToCloudinary } from "../middlewares/cloudinary.middleware";

router.use(authMiddleware);

router.post("/", uploadMemory.single("image"), uploadToCloudinary('recipes'), RecipeController.createRecipe);
router.get("/", RecipeController.getRecipes);
router.get("/suggest", RecipeController.suggestRecipes);
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


// ... (phần còn lại của file không thay đổi)

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
 * /api/recipe/{recipeId}/clone:
 *   post:
 *     summary: Sao chép công thức (Import)
 *     tags: [Recipe]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của công thức cần sao chép
 *     responses:
 *       201:
 *         description: Công thức đã sao chép thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
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
router.post("/:recipeId/clone", RecipeController.cloneRecipe);

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
router.put("/", uploadMemory.single("image"), uploadToCloudinary('recipes'), RecipeController.updateRecipe);

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