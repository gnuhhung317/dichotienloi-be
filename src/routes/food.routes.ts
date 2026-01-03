import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { FoodController } from "../modules/food/food.controller";

const router = Router();

router.use(authMiddleware);

router.post("/", FoodController.createFood);
router.get("/", FoodController.getFoodInGroup);
router.put("/", FoodController.editFood);
router.delete("/", FoodController.deleteFood);
router.get("/category", FoodController.getAllCategories);
router.get("/unit", FoodController.getAllUnits);
router.get("/log", FoodController.getFoodLogs);

export default router;