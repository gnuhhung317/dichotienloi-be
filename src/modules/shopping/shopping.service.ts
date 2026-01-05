import { ShoppingItemModel } from "../../models/ShoppingItem";
import { ShoppingListModel } from "../../models/ShoppingList";
import { GroupMemberModel } from "../../models/GroupMember";

export class ShoppingService {
    static async getGroup(userId: string) {
        const membership = await GroupMemberModel.findOne({ userId });
        if (!membership) {
            throw new Error("USER_NOT_IN_GROUP");
        }
        return membership.groupId;
    }

    static async getShoppingLists(userId: string) {
        const groupId = await this.getGroup(userId);
        return ShoppingListModel.find({ groupId }).sort({ date: -1 });
    }

    static async getShoppingListByDate(groupId: string, date: Date) {
        // Normalize date to start of day
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        return await ShoppingListModel.findOne({
            groupId,
            date: startOfDay
        });
    }

    static async createShoppingList(userId: string, groupId: string, date: Date) {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        return await ShoppingListModel.create({
            groupId,
            date: startOfDay,
            createdBy: userId,
            status: 'active'
        });
    }

    static async addItemToShoppingList(userId: string, foodId: string, quantity: number, dateStr?: string, assignedTo?: string) {
        const groupId = await this.getGroup(userId);

        if (!foodId) {
            throw new Error("MISSING_FOOD_ID");
        }
        if (quantity <= 0) {
            throw new Error("INVALID_QUANTITY");
        }

        let shoppingListId = null;
        if (dateStr) {
            const date = new Date(dateStr);
            let shoppingList = await this.getShoppingListByDate(groupId, date);
            if (!shoppingList) {
                shoppingList = await this.createShoppingList(userId, groupId, date);
            }
            shoppingListId = shoppingList._id;
        }

        if (assignedTo) {
            // Validate assigned user is in group
            const member = await GroupMemberModel.findOne({ groupId, userId: assignedTo });
            if (!member) {
                throw new Error("ASSIGNED_USER_NOT_IN_GROUP");
            }
        }

        return ShoppingItemModel.create({
            groupId,
            foodId,
            quantity,
            shoppingListId,
            assignedTo
        });
    }

    static async getShoppingItems(userId: string, dateStr?: string) {
        const groupId = await this.getGroup(userId);
        const query: any = { groupId };

        if (dateStr) {
            const date = new Date(dateStr);
            const shoppingList = await this.getShoppingListByDate(groupId, date);
            if (shoppingList) {
                query.shoppingListId = shoppingList._id;
            } else {
                return []; // No list for this date
            }
        } else {
            // Optional: if no date, maybe return all or those without shoppingListId?
            // For now, let's just return all for backward compatibility or simple view
        }

        return ShoppingItemModel.find(query)
            .populate({
                path: 'foodId',
                select: 'name unitId image',
                populate: {
                    path: 'unitId',
                    select: 'name'
                }
            })
            .populate('assignedTo', 'fullName avatarUrl');
    }

    static async markItemAsBought(userId: string, itemId: string, isBought: boolean) {
        const groupId = await this.getGroup(userId);
        const item = await ShoppingItemModel.findOne({ _id: itemId, groupId });

        if (!item) {
            throw new Error("ITEM_NOT_FOUND");
        }
        item.is_bought = isBought;
        return item.save();
    }

    static async updateItem(userId: string, itemId: string, quantity?: number, assignedTo?: string) {
        const groupId = await this.getGroup(userId);
        const item = await ShoppingItemModel.findOne({ _id: itemId, groupId });

        if (!item) {
            throw new Error("ITEM_NOT_FOUND");
        }

        if (quantity !== undefined) {
            if (quantity <= 0) throw new Error("INVALID_QUANTITY");
            item.quantity = quantity;
        }

        if (assignedTo !== undefined) {
            if (assignedTo) {
                const member = await GroupMemberModel.findOne({ groupId, userId: assignedTo });
                if (!member) throw new Error("ASSIGNED_USER_NOT_IN_GROUP");
            }
            item.assignedTo = assignedTo;
        }

        return item.save();
    }

    static async removeItem(userId: string, itemId: string) {
        const groupId = await this.getGroup(userId);
        const item = await ShoppingItemModel.findOne({ _id: itemId, groupId });

        if (!item) {
            throw new Error("ITEM_NOT_FOUND");
        }
        await ShoppingItemModel.deleteOne({ _id: itemId });
    }
}