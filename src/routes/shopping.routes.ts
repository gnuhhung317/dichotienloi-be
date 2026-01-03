import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { ShoppingController } from "../modules/shopping/shopping.controller";

const router = Router();

router.use(authMiddleware);

router.post("/", ShoppingController.addItemToShoppingList);
router.get("/", ShoppingController.getShoppingItems);
router.put("/marker", ShoppingController.markItemAsBought);
router.put("/", ShoppingController.updateItemQuantity);
router.delete("/", ShoppingController.deleteItem);

export default router;