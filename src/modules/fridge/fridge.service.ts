import mongoose from "mongoose";
import { FridgeItemModel } from "../../models/FridgeItem";
import { GroupMemberModel } from "../../models/GroupMember";
import { FoodModel } from "../../models/Food";

export class FridgeService {
    static async createFridgeItem(userId: string, foodName: string, quantity: number, expiredAt: Date) {
        const membership = await GroupMemberModel.findOne({ userId });
        if (!membership) {
            throw new Error("USER_NOT_IN_GROUP");
        }

        const food = await FoodModel.findOne({
            name: foodName.trim(),
            groupId: membership.groupId
        });
        if (!food) {
            throw new Error("FOOD_NOT_FOUND");
        }

        if (quantity <= 0) {
            throw new Error("INVALID_QUANTITY");
        }

        const expiredAtDate = new Date(expiredAt);

        if (isNaN(expiredAtDate.getTime())) {
            throw new Error("INVALID_EXPIRED_DATE");
        }

        const status = expiredAtDate.getTime() < Date.now() ? "expired" : "available";
        return FridgeItemModel.create({
            groupId: membership.groupId,
            foodId: food._id,
            unitId: food.unitId,
            quantity: mongoose.Types.Decimal128.fromString(quantity.toString()),
            expiredAt,
            status
        });
    }

    static async getFridgeItemsByGroup(userId: string) {
        const membership = await GroupMemberModel.findOne({ userId });
        if (!membership) {
            throw new Error("USER_NOT_IN_GROUP");
        }
        return FridgeItemModel.find({ groupId: membership.groupId })
            .populate({
            path: 'foodId',
            select: 'name categoryId'
            })
            .populate({
            path: 'unitId',
            select: 'name'
            })
            .sort({ expiredAt: 1 });
        
    }

    static async updateFridgeItem(userId: string, itemId: string, newQuantity: number, newExpiredAt: Date) {
        const membership = await GroupMemberModel.findOne({ userId });
        if (!membership) {
            throw new Error("USER_NOT_IN_GROUP");
        }
        const fridgeItem = await FridgeItemModel.findOne({ _id: itemId, groupId: membership.groupId });
        if (!fridgeItem) {
            throw new Error("FRIDGE_ITEM_NOT_FOUND");
        }
        if (newQuantity != null) {
            if (newQuantity <= 0) {
                throw new Error("INVALID_QUANTITY");
            }
            fridgeItem.quantity = mongoose.Types.Decimal128.fromString(newQuantity.toString());
        }
        if (newExpiredAt) {
            const expiredAtDate = new Date(newExpiredAt);
            if (isNaN(expiredAtDate.getTime())) {
                throw new Error("INVALID_EXPIRED_DATE");
            }
            fridgeItem.expiredAt = expiredAtDate;
            fridgeItem.status = expiredAtDate.getTime() < Date.now() ? "expired" : "available";
        }
        await fridgeItem.save();
        return fridgeItem;
    }

    static async deleteFridgeItem(userId: string, itemId: string) {
        const membership = await GroupMemberModel.findOne({ userId });
        if (!membership) {
            throw new Error("USER_NOT_IN_GROUP");
        }
        const fridgeItem = await FridgeItemModel.findOneAndDelete({ _id: itemId, groupId: membership.groupId });
        if (!fridgeItem) {
            throw new Error("FRIDGE_ITEM_NOT_FOUND");
        }
        return fridgeItem;
    }
}
