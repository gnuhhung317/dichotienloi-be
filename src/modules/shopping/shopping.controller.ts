import { Request, Response } from "express";
import { ShoppingService } from "./shopping.service";

export class ShoppingController {
    static async addItemToShoppingList(req: any, res: Response) {
        try {
            const { foodId, quantity } = req.body;
            const userId = req.user.userId;
            const item = await ShoppingService.addItemToShoppingList(userId, foodId, quantity);
            res.status(201).json(item);
        } catch (error: any) {
            res.status(400).json({ code: error.message });
        }
    }

    static async getShoppingItems(req: any, res: Response) {
        try {
            const userId = req.user.userId;
            const items = await ShoppingService.getShoppingItems(userId);
            const response = items.map((item: any) => ({
                ...item.toObject(),
                quantity: Number(item.quantity.toString())
            }));
            res.status(200).json(response);
        } catch (error: any) {
            res.status(400).json({ code: error.message });
        }
    }

    static async markItemAsBought(req: any, res: Response) {
        try {
            const { itemId, isBought } = req.body;
            const userId = req.user.userId;
            const item = await ShoppingService.markItemAsBought(userId, itemId, isBought);
            res.status(200).json(item);
        } catch (error: any) {
            res.status(400).json({ code: error.message });
        }
    }

    static async updateItemQuantity(req: any, res: Response) {
        try {
            const { itemId, newQuantity } = req.body;
            const userId = req.user.userId;
            const item = await ShoppingService.updateItemQuantity(userId, itemId, newQuantity);
            res.status(200).json(item);
        } catch (error: any) {
            res.status(400).json({ code: error.message });
        }
    }

    static async deleteItem(req: any, res: Response) {
        try {
            const { itemId } = req.body;
            const userId = req.user.userId;
            await ShoppingService.removeItem(userId, itemId);
            res.status(200).json({ message: "Item deleted successfully" });
        } catch (error: any) {
            res.status(400).json({ code: error.message });
        }
    }
}