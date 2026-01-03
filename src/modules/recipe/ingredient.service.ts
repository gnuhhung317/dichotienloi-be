import { RecipeModel } from '../../models/Recipe';
import { FoodModel } from '../../models/Food';

export class IngredientService {
    static async addIngredient(userId: string, recipeId: string, foodId: string, quantity: number) {
        const recipe = await RecipeModel.findById(recipeId);
        if (!recipe) {
            throw new Error("RECIPE_NOT_FOUND");
        }
        if (recipe.ownerId.toString() !== userId) {
            throw new Error("NOT_AUTHORIZED");
        }
        const food = await FoodModel.findById(foodId);
        if (!food) {
            throw new Error("FOOD_NOT_FOUND");
        }
        const unitId = food.unitId;
        recipe.ingredients.push({ foodId, quantity , unitId });
        await recipe.save();
        return recipe;
    }

    static async editIngredient(userId: string, recipeId: string, foodId: string, newQuantity: number) {
        const recipe = await RecipeModel.findById(recipeId);
        if (!recipe) {
            throw new Error("RECIPE_NOT_FOUND");
        }
        if (recipe.ownerId.toString() !== userId) {
            throw new Error("NOT_AUTHORIZED");
        }
        const ingredient = recipe.ingredients.find((ing: any) => ing.foodId.toString() === foodId);
        if (!ingredient) {
            throw new Error("INGREDIENT_NOT_FOUND");
        } 
        ingredient.quantity = newQuantity;
        await recipe.save();
        return recipe;
    }

    static async removeIngredient(userId: string, recipeId: string, foodId: string) {
        const recipe = await RecipeModel.findById(recipeId);
        if (!recipe) {
            throw new Error("RECIPE_NOT_FOUND");
        }
        if (recipe.ownerId.toString() !== userId) {
            throw new Error("NOT_AUTHORIZED");
        }
        const ingredientIndex = recipe.ingredients.findIndex((ing: any) => ing.foodId.toString() === foodId);
        if (ingredientIndex === -1) {
            throw new Error("INGREDIENT_NOT_FOUND");
        }
        recipe.ingredients.splice(ingredientIndex, 1);
        await recipe.save();
        return recipe;
    }
}