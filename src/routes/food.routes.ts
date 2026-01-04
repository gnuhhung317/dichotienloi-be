import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { FoodController } from "../modules/food/food.controller";

import { uploadMiddleware } from "../middlewares/upload.middleware";

const router = Router();

router.use(authMiddleware);

router.post("/", uploadMiddleware.single("image"), FoodController.createFood);
router.get("/", FoodController.getFoodInGroup);
router.put("/", uploadMiddleware.single("image"), FoodController.editFood);
router.delete("/", FoodController.deleteFood);
router.get("/category", FoodController.getAllCategories);
router.get("/unit", FoodController.getAllUnits);
router.get("/log", FoodController.getFoodLogs);

export default router;