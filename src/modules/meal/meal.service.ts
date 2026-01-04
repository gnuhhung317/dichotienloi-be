import { MealRecipeModel } from "../../models/MealPlanRecipe";
import { GroupMemberModel } from "../../models/GroupMember";

export class MealService {
    static async addRecipeToMealPlan(userId: string, recipeId: string, date: Date, mealType: string) {
        const membership = await GroupMemberModel.findOne({ userId });
        if (!membership) {
            throw new Error("USER_NOT_IN_GROUP");
        }
        const groupId = membership.groupId;

        if (!recipeId) {
            throw new Error("MISSING_RECIPE_ID");
        }

        return MealRecipeModel.create({
            groupId,
            recipeId,
            date,
            mealType
        });
    }

    static async getMealPlan(userId: string, startDate: Date, endDate: Date) {
        const membership = await GroupMemberModel.findOne({ userId });
        if (!membership) {
            throw new Error("USER_NOT_IN_GROUP");
        }
        const groupId = membership.groupId;

        const query: any = {
            groupId,
            date: {
                $gte: startDate,
                $lte: endDate
            }
        };

        return MealRecipeModel.find(query).populate({
            path: 'recipeId',
            select: 'name description image'
        }); // Added description/image to select if available (schema check recommended)
    }

    static async removeRecipeFromMealPlan(userId: string, mealRecipeId: string) {
        const membership = await GroupMemberModel.findOne({ userId });
        if (!membership) {
            throw new Error("USER_NOT_IN_GROUP");
        }
        const groupId = membership.groupId;

        const deleted = await MealRecipeModel.findOneAndDelete({
            _id: mealRecipeId,
            groupId
        });

        if (!deleted) {
            throw new Error("MEAL_RECIPE_NOT_FOUND");
        }

        return deleted;
    }
}