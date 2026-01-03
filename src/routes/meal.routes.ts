import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { MealController } from "../modules/meal/meal.controller";

const router = Router();

router.use(authMiddleware);

router.post("/", MealController.addRecipeToMealPlan);
router.get("/", MealController.getMealPlan);
router.delete("/", MealController.removeRecipeFromMealPlan);

export default router;