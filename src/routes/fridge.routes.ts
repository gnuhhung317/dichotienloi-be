import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { FridgeController } from "../modules/fridge/fridge.controller";

const router = Router();

router.use(authMiddleware);

router.post("/", FridgeController.createFridgeItem);
router.get("/", FridgeController.getFridgeItems);
router.put("/", FridgeController.updateFridgeItem);
router.delete("/", FridgeController.deleteFridgeItem);

export default router;