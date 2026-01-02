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
// router.delete(
//   "/:id",
//   authMiddleware,
//   requireRole(["admin"]),
//   UserController.deleteUser
// );

/** POST /users/group
 * Tạo nhóm người dùng mới (bắt buộc token)
 */
router.post(
  "/group",
  authMiddleware,
  UserController.createGroup
);

/** POST /users/group/add
 * Thêm người dùng vào nhóm (bắt buộc token)
 */
router.post(
  "/group/add",
  authMiddleware,
  UserController.addUserToGroup
);

/** DELETE /users/group
 * Xóa người dùng khỏi nhóm (bắt buộc token)
 */
router.delete(
  "/group",
  authMiddleware,
  UserController.deleteGroupMember
);

/** GET /users/group
 * Lấy danh sách thành viên trong nhóm của người dùng hiện tại (bắt buộc token)
 */
router.get(
  "/group",
  authMiddleware,
  UserController.getMyGroup
);

export default router;
