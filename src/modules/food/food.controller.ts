import { Request, Response } from "express";
import { FoodService } from "./food.service";

export class FoodController {
    static async createFood(req: any, res: Response) {
        try {
            const { name, foodCategoryName, unitName } = req.body;
            const file = req.image;

            const food = await FoodService.createFood(req.user.userId, name, foodCategoryName, unitName, file);
            res.status(201).json(food);
        } catch (error: any) {
            res.status(400).json({ code: error.message });
        }
    }
}