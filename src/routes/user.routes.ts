import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/role.middleware";
import { UserController } from "../modules/user/user.controller";

const router = Router();

/**
 * GET /user/me
 * Lấy thông tin user hiện tại (bắt buộc token)
 */
router.get("/me", authMiddleware, UserController.getMe);

/**
 * PUT /user/me
 * Cập nhật thông tin user hiện tại (bắt buộc token)
 */
router.put("/me", authMiddleware, UserController.updateMe);

/**
 * DELETE /users/:id
 * Chỉ admin mới được xóa user
 */
// router.delete(
//   "/:id",
//   authMiddleware,
//   requireRole(["admin"]),
//   UserController.deleteUser
// );

/** POST /user/group
 * Tạo nhóm người dùng mới (bắt buộc token)
 */
router.post(
  "/group",
  authMiddleware,
  UserController.createGroup
);

/** POST /user/group/add
 * Thêm người dùng vào nhóm (bắt buộc token)
 */
router.post(
  "/group/add",
  authMiddleware,
  UserController.addUserToGroup
);

/** DELETE /user/group
 * Xóa người dùng khỏi nhóm (bắt buộc token)
 */
router.delete(
  "/group",
  authMiddleware,
  UserController.deleteGroupMember
);

/** GET /user/group
 * Lấy danh sách thành viên trong nhóm của người dùng hiện tại (bắt buộc token)
 */
router.get(
  "/group",
  authMiddleware,
  UserController.getMyGroup
);

export default router;
