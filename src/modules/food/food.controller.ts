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
            console.log(error.stack);
            res.status(400).json({ code: error.message });
        }
    }

    static async getFoodInGroup(req: any, res: Response) {
        try {
            const foods = await FoodService.getFoodInGroup(req.user.userId);
            res.status(200).json(foods);
        } catch (error: any) {
            res.status(400).json({ code: error.message });
        }
    }

    static async editFood(req: any, res: Response) {
        try {
            const { name, newCategory, newUnit } = req.body;
            const file = req.image;
            const food = await FoodService.editFood(req.user.userId, name, newCategory, newUnit, file);
            res.status(200).json(food);
        } catch (error: any) {
            res.status(400).json({ code: error.message });
        }
    }

    static async deleteFood(req: any, res: Response) {
        try {
            const { name } = req.body;
            await FoodService.deleteFood(req.user.userId, name);
            res.status(200).json({ message: "FOOD_DELETED" });
        } catch (error: any) {
            res.status(400).json({ code: error.message });
        }
    }

    static async getAllCategories(req: any, res: Response) {
        try {
            const categories = await FoodService.getAllCategories();
            res.status(200).json(categories);
        } catch (error: any) {
            res.status(400).json({ code: error.message });
        }
    }

    static async getAllUnits(req: any, res: Response) {
        try {
            const units = await FoodService.getAllUnits();
            res.status(200).json(units);
        } catch (error: any) {
            res.status(400).json({ code: error.message });
        }
    }

    static async getFoodLogs(req: any, res: Response) {
        try {
            const foodLogs = await FoodService.getFoodLogsByGroup(req.user.userId);
            const response = foodLogs.map(log => ({
                ...log.toObject(),
                quantity: Number(log.quantity.toString())
            }));
            res.status(200).json(response);
        } catch (error: any) {
            res.status(400).json({ code: error.message });
        }
    }
}