import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { RecipeController } from "../modules/recipe/recipe.controller";

const router = Router();

router.use(authMiddleware);

router.post("/", RecipeController.createRecipe);
router.get("/", RecipeController.getRecipes);
router.get("/id", RecipeController.getRecipeById);
router.put("/", RecipeController.updateRecipe);
router.delete("/", RecipeController.deleteRecipe);

router.post("/ingredient", RecipeController.addIngredient);
router.put("/ingredient", RecipeController.editIngredient);
router.delete("/ingredient", RecipeController.removeIngredient);

export default router;