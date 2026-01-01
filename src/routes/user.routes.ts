import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/role.middleware";
import { UserController } from "../modules/user/user.controller";

const router = Router();

/**
 * GET /users/me
 * Lấy thông tin user hiện tại (bắt buộc token)
 */
router.get("/me", authMiddleware, UserController.getMe);

/**
 * DELETE /users/:id
 * Chỉ admin mới được xóa user
 */
router.delete(
  "/:id",
  authMiddleware,
  requireRole(["admin"]),
  UserController.deleteUser
);

export default router;
