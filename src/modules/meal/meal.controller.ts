import { Request, Response } from "express";
import { MealService } from "./meal.service";

export class MealController {
    static async addRecipeToMealPlan(req: any, res: Response) {
        try {
            const { recipeId, date, mealType } = req.body;
            const userId = req.user.userId;
            const mealRecipe = await MealService.addRecipeToMealPlan(userId, recipeId, new Date(date), mealType);
            res.status(201).json(mealRecipe);
        } catch (error: any) {
            res.status(400).json({ code: error.message });
        }
    }
    static async getMealPlan(req: any, res: Response) {
        try {
            const { date, mealType } = req.body;
            const userId = req.user.userId;
            const mealPlan = await MealService.getMealPlan(userId, new Date(date), mealType);
            res.status(200).json(mealPlan);
        } catch (error: any) {
            res.status(400).json({ code: error.message });
        }
    }

    static async removeRecipeFromMealPlan(req: any, res: Response) {
        try {
            const { mealRecipeId } = req.body;
            const userId = req.user.userId;
            await MealService.removeRecipeFromMealPlan(userId, mealRecipeId);
            res.status(200).json({ message: "Meal recipe removed successfully" });
        } catch (error: any) {
            res.status(400).json({ code: error.message });
        }
    }
}