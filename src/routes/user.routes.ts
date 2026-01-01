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

/** POST /users/group
 * Tạo nhóm người dùng mới (bắt buộc token)
 */
router.post(
  "/group",
  authMiddleware,
  UserController.createGroup
);

export default router;
