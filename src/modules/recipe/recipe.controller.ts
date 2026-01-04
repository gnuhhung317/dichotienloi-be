import { Request, Response } from "express";
import { RecipeService } from "./recipe.service";
import { IngredientService } from "./ingredient.service";

export class RecipeController {
    static async createRecipe(req: any, res: Response) {
        try {
            const { name, description, groupOnly } = req.body;
            const userId = req.user.userId;
            const recipe = await RecipeService.createRecipe(userId, name, description, groupOnly);
            res.status(201).json(recipe);
        } catch (error: any) {
            res.status(400).json({ code: error.message });
        }
    }

    static async getRecipes(req: any, res: Response) {
        try {
            const { groupOnly } = req.body;
            const userId = req.user.userId;
            const recipes = await RecipeService.getRecipes(userId, groupOnly);
            res.status(200).json(recipes);
        } catch (error: any) {
            res.status(400).json({ code: error.message });
        }
    }

    static async getRecipeById(req: any, res: Response) {
        try {
            const { recipeId } = req.body;
            const recipe = await RecipeService.getRecipeById(recipeId);

            const response = {
                ...recipe.toObject(),
                ingredients: recipe.ingredients.map((ing: any) => ({
                    ...ing.toObject(),
                    quantity: Number(ing.quantity.toString())
                }))
            };
            res.status(200).json(response);
        } catch (error: any) {
            res.status(400).json({ code: error.message });
        }
    }

    static async updateRecipe(req: any, res: Response) {
        try {
            const { recipeId, newName, newDescription } = req.body;
            const userId = req.user.userId;
            const recipe = await RecipeService.updateRecipe(userId, recipeId, newName, newDescription);
            res.status(200).json(recipe);
        } catch (error: any) {
            res.status(400).json({ code: error.message });
        }
    }

    static async deleteRecipe(req: any, res: Response) {
        try {
            const { recipeId } = req.body;
            const userId = req.user.userId;
            await RecipeService.deleteRecipe(userId, recipeId);
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ code: error.message });
        }
    }

    static async addIngredient(req: any, res: Response) {
        try {
            const { recipeId, foodId, quantity } = req.body;
            const userId = req.user.userId;
            const recipe = await IngredientService.addIngredient(userId, recipeId, foodId, quantity);
            res.status(200).json(recipe);
        } catch (error: any) {
            res.status(400).json({ code: error.message });
        }
    }

    static async editIngredient(req: any, res: Response) {
        try {
            const { recipeId, foodId, newQuantity } = req.body;
            const userId = req.user.userId;
            const recipe = await IngredientService.editIngredient(userId, recipeId, foodId, newQuantity);
            res.status(200).json(recipe);
        } catch (error: any) {
            res.status(400).json({ code: error.message });
        }
    }

    static async removeIngredient(req: any, res: Response) {
        try {
            const { recipeId, foodId } = req.body;
            const userId = req.user.userId;
            const recipe = await IngredientService.removeIngredient(userId, recipeId, foodId);
            res.status(200).json(recipe);
        } catch (error: any) {
            res.status(400).json({ code: error.message });
        }
    }
}