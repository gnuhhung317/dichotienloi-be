import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/role.middleware";
import { AdminController } from "../modules/admin/admin.controller";

const router = Router();

router.use(authMiddleware, requireRole(["admin"]));

router.post("/category", AdminController.createCategory);
router.get("/category", AdminController.getCategory);
router.put("/category", AdminController.editCategory);
router.delete("/category", AdminController.deleteCategory);

router.post("/unit", AdminController.createUnit);
router.get("/unit", AdminController.getUnit);
router.put("/unit", AdminController.editUnit);
router.delete("/unit", AdminController.deleteUnit);

export default router;