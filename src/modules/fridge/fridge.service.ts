import mongoose from "mongoose";
import { FridgeItemModel } from "../../models/FridgeItem";
import { GroupMemberModel } from "../../models/GroupMember";
import { FoodModel } from "../../models/Food";
import { FoodService } from "../food/food.service";
import { ExpiryNotificationModel } from "../../models/ExpiryNotification";


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
        const fridgeItem = await FridgeItemModel.create({
            groupId: membership.groupId,
            foodId: food._id,
            unitId: food.unitId,
            quantity: mongoose.Types.Decimal128.fromString(quantity.toString()),
            expiredAt,
            status
        });

        // Create expiry notification
        const notifyAt = new Date(expiredAt);
        notifyAt.setDate(notifyAt.getDate() - 2); // Notify 2 days before

        await ExpiryNotificationModel.create({
            fridgeItemId: fridgeItem._id,
            notifyAt: notifyAt,
            status: 'pending'
        });

        return fridgeItem;
    }

    static async getFridgeItemsByGroup(userId: string) {
        const membership = await GroupMemberModel.findOne({ userId });
        if (!membership) {
            throw new Error("USER_NOT_IN_GROUP");
        }
        return FridgeItemModel.find({ groupId: membership.groupId })
            .populate({
                path: 'foodId',
                select: 'name categoryId image'
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

            // Update expiry notification
            const notifyAt = new Date(newExpiredAt);
            notifyAt.setDate(notifyAt.getDate() - 2);

            await ExpiryNotificationModel.findOneAndUpdate(
                { fridgeItemId: fridgeItem._id },
                {
                    notifyAt: notifyAt,
                    status: 'pending',
                    sentAt: null
                },
                { upsert: true, new: true }
            );
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
        // Delete notification
        await ExpiryNotificationModel.deleteOne({ fridgeItemId: itemId });

        return fridgeItem;
    }

    static async takeOutFridgeItem(userId: string, itemId: string, quantity: number, action: string) {
        const membership = await GroupMemberModel.findOne({ userId });
        if (!membership) {
            throw new Error("USER_NOT_IN_GROUP");
        }
        const fridgeItem = await FridgeItemModel.findOne({ _id: itemId, groupId: membership.groupId });
        if (!fridgeItem) {
            throw new Error("FRIDGE_ITEM_NOT_FOUND");
        }
        const currentQuantity = parseFloat(fridgeItem.quantity.toString());
        if (quantity <= 0 || quantity > currentQuantity) {
            throw new Error("INVALID_QUANTITY");
        }
        const newQuantity = currentQuantity - quantity;
        fridgeItem.quantity = mongoose.Types.Decimal128.fromString(newQuantity.toString());
        if (newQuantity === 0) {
            await fridgeItem.deleteOne();
            await ExpiryNotificationModel.deleteOne({ fridgeItemId: itemId });
        } else {
            await fridgeItem.save();
        }
        await FoodService.createFoodLog(fridgeItem.foodId, action, quantity, membership.groupId);
        return fridgeItem;
    }
}
