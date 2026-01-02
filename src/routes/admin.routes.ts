import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/role.middleware";
import { AdminController } from "../modules/admin/admin.controller";

const router = Router();

router.use(authMiddleware, requireRole(["admin"]));

router.post("/categories", AdminController.createCategory);
router.put("/categories", AdminController.editCategory);
router.delete("/categories", AdminController.deleteCategory);

router.post("/units", AdminController.createUnit);
router.put("/units", AdminController.editUnit);
router.delete("/units", AdminController.deleteUnit);

export default router;