import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import adminRoutes from "./admin.routes";
import foodRoutes from "./food.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/admin", adminRoutes);
router.use("/food", foodRoutes);

export default router;
