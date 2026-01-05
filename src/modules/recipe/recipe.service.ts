import { RecipeModel } from '../../models/Recipe';
import { GroupMemberModel } from '../../models/GroupMember';

export class RecipeService {
    static async createRecipe(userId: string, name: string, description: string, groupOnly: boolean, ingredients: any[] = [], image?: string) {
        let ownerType = groupOnly ? 'group' : 'global';
        let groupId = null;
        if (groupOnly) {
            const membership = await GroupMemberModel.findOne({ userId });
            if (!membership) {
                throw new Error("USER_NOT_IN_GROUP");
            }
            groupId = membership.groupId;
        }
        if (!name) {
            throw new Error("MISSING_RECIPE_NAME");
        }

        const processedIngredients = [];
        if (ingredients && ingredients.length > 0) {
            processedIngredients.push(...ingredients);
        }

        return RecipeModel.create({
            name,
            description,
            ownerType,
            ownerId: userId,
            groupId,
            ingredients: processedIngredients,
            image
        });
    }

    static async getRecipes(userId: string, groupOnly: boolean) {
        if (groupOnly) {
            const membership = await GroupMemberModel.findOne({ userId });
            if (!membership) {
                throw new Error("USER_NOT_IN_GROUP");
            }
            const groupId = membership.groupId;
            return RecipeModel.find({ ownerType: 'group', groupId });
        } else {
            return RecipeModel.find({ ownerType: 'global' });
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

    static async updateRecipe(userId: string, recipeId: string, name?: string, description?: string, ingredients?: any[], imageUrl?: string) {
        const recipe = await RecipeModel.findById(recipeId);
        if (!recipe) {
            throw new Error("RECIPE_NOT_FOUND");
        }
        if (recipe.ownerId.toString() !== userId) {
            throw new Error("NOT_AUTHORIZED");
        }
        if (name) {
            recipe.name = name;
        }
        if (description) {
            recipe.description = description;
        }
        if (ingredients) {
            recipe.ingredients = ingredients;
        }
        if (imageUrl) {
            recipe.image = imageUrl;
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