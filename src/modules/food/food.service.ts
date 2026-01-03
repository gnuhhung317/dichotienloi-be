import { FoodModel } from "../../models/Food";
import { GroupMemberModel } from "../../models/GroupMember";
import { CategoryModel } from "../../models/Category";
import { UnitModel } from "../../models/Unit";
import { FoodLogModel } from "../../models/FoodLog";

export class FoodService {
    static async createFood(userId: string, name: string, categoryName: string, unitName: string, file: any) {
        const membership = await GroupMemberModel.findOne({ userId });
        if (!membership) {
            throw new Error("USER_NOT_IN_GROUP");
        }

        const category = await CategoryModel.findOne({
            name: categoryName.trim()
        });
        if (!category) {
            throw new Error("CATEGORY_NOT_FOUND");
        }

        const unit = await UnitModel.findOne({
            name: unitName.trim()
        });
        if (!unit) {
            throw new Error("UNIT_NOT_FOUND");
        }

        return FoodModel.create({
            name: name.trim(),
            categoryId: category._id,
            unitId: unit._id,
            groupId: membership.groupId,
        });
    }

    static async getFoodInGroup(userId: string) {
        const membership = await GroupMemberModel.findOne({ userId });
        if (!membership) {
            throw new Error("USER_NOT_IN_GROUP");
        }
        return FoodModel.find({ groupId: membership.groupId })
            .populate({
            path: 'categoryId',
            select: 'name'
            })
            .populate({
            path: 'unitId',
            select: 'name'
            });
    }

    static async editFood(userId: string, name: string, newCategory: string, newUnit: string, file: any) {
        const membership = await GroupMemberModel.findOne({ userId });
        if (!membership) {
            throw new Error("USER_NOT_IN_GROUP");
        }

        const food = await FoodModel.findOne({
            name: name.trim(),
            groupId: membership.groupId
        });
        if (!food) {
            throw new Error("FOOD_NOT_FOUND");
        }

        const category = await CategoryModel.findOne({
            name: newCategory.trim()
        });
        if (!category) {
            throw new Error("CATEGORY_NOT_FOUND");
        }

        const unit = await UnitModel.findOne({
            name: newUnit.trim()
        });
        if (!unit) {
            throw new Error("UNIT_NOT_FOUND");
        }

        food.categoryId = category._id;
        food.unitId = unit._id;
        await food.save();

        return food;
    }

    static async deleteFood(userId: string, name: string) {
        const membership = await GroupMemberModel.findOne({ userId });
        if (!membership) {
            throw new Error("USER_NOT_IN_GROUP");
        }

        const food = await FoodModel.findOne({
            name: name.trim(),
            groupId: membership.groupId
        });
        if (!food) {
            throw new Error("FOOD_NOT_FOUND");
        }

        await food.deleteOne();
    }

    static async getAllCategories() {
        return CategoryModel.find().sort({ name: 1 });
    }

    static async getAllUnits() {
        return UnitModel.find().sort({ name: 1 });
    }

    static async createFoodLog(foodId: string, action: string, quantity: number, groupId: string) {
        return FoodLogModel.create({
            foodId,
            action,
            quantity,
            groupId
        });
    }
    static async getFoodLogsByGroup(userId: string) {
        const membership = await GroupMemberModel.findOne({ userId });
        if (!membership) {
            throw new Error("USER_NOT_IN_GROUP");
        }
        return FoodLogModel.find({ groupId: membership.groupId })
            .populate({
                path: 'foodId',
                select: 'name',
                populate: {
                    path: 'unitId',
                    select: 'name'
                }
            })
            .sort({ createdAt: -1 });
    }
}