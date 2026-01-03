import { Request, Response } from "express";
import { FridgeService } from "./fridge.service";

export class FridgeController {
    static async createFridgeItem(req: any, res: Response) {
        try {
            const { foodName, quantity, expiredAt } = req.body;

            if (!foodName || quantity == null || !expiredAt) {
                return res.status(400).json({
                code: 'MISSING_REQUIRED_FIELDS'
                });
            }

            const parsedQuantity = Number(quantity);
            if (Number.isNaN(parsedQuantity)) {
                return res.status(400).json({
                code: 'INVALID_QUANTITY'
                });
            }

            const fridgeItem = await FridgeService.createFridgeItem(
                req.user.userId,
                foodName,
                parsedQuantity,
                expiredAt
            );

            const response = {
                ...fridgeItem.toObject(),
                quantity: Number(fridgeItem.quantity.toString())
                };

            return res.status(201).json(response);
            } catch (error: any){
            res.status(400).json({ code: error.message });
        }
    }

    static async getFridgeItems(req: any, res: Response) {
        try {
            const fridgeItems = await FridgeService.getFridgeItemsByGroup(
                req.user.userId
            );
            const response = fridgeItems.map(item => ({
                ...item.toObject(),
                quantity: Number(item.quantity.toString())
            }));
            return res.status(200).json(response);
        } catch (error: any) {
            res.status(400).json({ code: error.message });
        }
    }

    static async updateFridgeItem(req: any, res: Response) {
        try {
            const { itemId, quantity, expiredAt } = req.body;
            if(!itemId) {
                return res.status(400).json({
                    code: 'MISSING_ITEM_ID'
                });
            }
            const parsedQuantity = Number(quantity);
            if (Number.isNaN(parsedQuantity)) {
                return res.status(400).json({
                code: 'INVALID_QUANTITY'
                });
            }
            const updatedItem = await FridgeService.updateFridgeItem(
                req.user.userId,
                itemId,
                parsedQuantity,
                expiredAt
            );
            const response = {
                ...updatedItem.toObject(),
                quantity: Number(updatedItem.quantity.toString())
            };
            return res.status(200).json(response);
        } catch (error: any) {
            res.status(400).json({ code: error.message });
        }

        
    }
    static async deleteFridgeItem(req: any, res: Response) {
        try {
            const { itemId } = req.body;
            if(!itemId) {
                return res.status(400).json({
                    code: 'MISSING_ITEM_ID'
                });
            }
            await FridgeService.deleteFridgeItem(
                req.user.userId,
                itemId
            );
            return res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ code: error.message });
        }
    }
}