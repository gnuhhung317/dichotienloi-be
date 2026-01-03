import { RecipeModel } from '../../models/Recipe';
import { GroupMemberModel } from '../../models/GroupMember';

export class RecipeService {
    static async createRecipe(userId: string, name: string, description: string, groupOnly: boolean) {
        let ownerType = groupOnly ? 'group' : 'global';
        let groupId = null;
        if(groupOnly) {
            const membership = await GroupMemberModel.findOne({ userId });
            if (!membership) {
                throw new Error("USER_NOT_IN_GROUP");
            }
            groupId = membership.groupId;
        }
        if(!name) {
            throw new Error("MISSING_RECIPE_NAME");
        }
        return RecipeModel.create({
            name,
            description,
            ownerType,
            ownerId: userId,
            groupId
        });
    }

    static async getRecipes(userId: string, groupOnly: boolean) {
        if(groupOnly) {
            const membership = await GroupMemberModel.findOne({ userId });
            if (!membership) {
                throw new Error("USER_NOT_IN_GROUP");
            }
            const groupId = membership.groupId;
            return RecipeModel.find({ ownerType: 'group', groupId });
        } else {
            return RecipeModel.find({ownerType: 'global' });
        }
    }

    static async getRecipeById(recipeId: string) {
        const recipe = await RecipeModel.findById(recipeId)
            .populate({
            path: 'ingredients.foodId',
            select: 'name'
        })
            .populate({
            path: 'ingredients.unitId',
            select: 'name'
        });
        if (!recipe) {
            throw new Error("RECIPE_NOT_FOUND");
        }
        return recipe;
    }

    static async updateRecipe(userId: string, recipeId: string, newName: string, newDescription: string) {
        const recipe = await RecipeModel.findById(recipeId);
        if (!recipe) {
            throw new Error("RECIPE_NOT_FOUND");
        }
        if (recipe.ownerId.toString() !== userId) {
            throw new Error("NOT_AUTHORIZED");
        }
        if(newName) {
            recipe.name = newName;
        }
        if(newDescription) {
            recipe.description = newDescription;
        }
        await recipe.save();
        return recipe;
    }

    static async deleteRecipe(userId: string, recipeId: string) {
        const recipe = await RecipeModel.findById(recipeId);
        if (!recipe) {
            throw new Error("RECIPE_NOT_FOUND");
        }
        if (recipe.ownerId.toString() !== userId) {
            throw new Error("NOT_AUTHORIZED");
        }
        await RecipeModel.deleteOne({ _id: recipeId });
        return;
    }
}