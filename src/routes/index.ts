import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import adminRoutes from "./admin.routes";
import foodRoutes from "./food.routes";
import fridgeRoutes from "./fridge.routes";
import recipeRoutes from "./recipe.routes";
import shoppingRoutes from "./shopping.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/admin", adminRoutes);
router.use("/food", foodRoutes);
router.use("/fridge", fridgeRoutes);
router.use("/recipe", recipeRoutes);
router.use("/shopping", shoppingRoutes);

export default router;
