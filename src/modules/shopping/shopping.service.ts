import { ShoppingItemModel } from "../../models/ShoppingItem";
import { GroupMemberModel } from "../../models/GroupMember";

export class ShoppingService {
    static async addItemToShoppingList(userId: string, foodId: string, quantity: number) {
        const membership = await GroupMemberModel.findOne({ userId });
        if (!membership) {
            throw new Error("USER_NOT_IN_GROUP");
        }
        const groupId = membership.groupId;

        if (!foodId) {
            throw new Error("MISSING_FOOD_ID");
        }
        if (quantity <= 0) {
            throw new Error("INVALID_QUANTITY");
        }
        return ShoppingItemModel.create({
            groupId,
            foodId,
            quantity
        });
    }

    static async getShoppingItems(userId: string) {
        const membership = await GroupMemberModel.findOne({ userId });
        if (!membership) {
            throw new Error("USER_NOT_IN_GROUP");
        }
        const groupId = membership.groupId;

        return ShoppingItemModel.find({ groupId })
            .populate({
                path: 'foodId',
                select: 'name unitId',
                populate: {
                    path: 'unitId',
                    select: 'name'
                }
            });
    }

    static async markItemAsBought(userId: string, itemId: string, isBought: boolean) {
        const membership = await GroupMemberModel.findOne({ userId });
        if (!membership) {
            throw new Error("USER_NOT_IN_GROUP");
        }
        const groupId = membership.groupId;

        const item = await ShoppingItemModel.findOne({ _id: itemId, groupId });
        if (!item) {
            throw new Error("ITEM_NOT_FOUND");
        }
        item.is_bought = isBought;
        return item.save();
    }

    static async updateItemQuantity(userId: string, itemId: string, newQuantity: number) {
        const membership = await GroupMemberModel.findOne({ userId });
        if (!membership) {
            throw new Error("USER_NOT_IN_GROUP");
        }
        const groupId = membership.groupId;
        const item = await ShoppingItemModel.findOne({ _id: itemId, groupId });
        if (!item) {
            throw new Error("ITEM_NOT_FOUND");
        }
        if (newQuantity <= 0) {
            throw new Error("INVALID_QUANTITY");
        }
        item.quantity = newQuantity;
        return item.save();
    }

    static async removeItem(userId: string, itemId: string) {
        const membership = await GroupMemberModel.findOne({ userId });
        if (!membership) {
            throw new Error("USER_NOT_IN_GROUP");
        }
        const groupId = membership.groupId;

        const item = await ShoppingItemModel.findOne({ _id: itemId, groupId });
        if (!item) {
            throw new Error("ITEM_NOT_FOUND");
        }
        await ShoppingItemModel.deleteOne({ _id: itemId });
    }
}