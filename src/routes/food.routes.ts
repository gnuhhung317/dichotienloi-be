import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { FoodController } from "../modules/food/food.controller";

const router = Router();

router.use(authMiddleware);

router.post("/", FoodController.createFood);

export default router;