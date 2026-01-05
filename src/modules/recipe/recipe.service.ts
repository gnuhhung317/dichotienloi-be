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
                select: 'name image'
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

    static async suggestRecipes(userId: string) {
        // 1. Get available food items from fridge
        const membership = await GroupMemberModel.findOne({ userId });
        if (!membership) {
            throw new Error("USER_NOT_IN_GROUP");
        }
        const fridgeItems = await FridgeItemModel.find({ groupId: membership.groupId })
            .select('foodId quantity unitId');

        const availableFoodIds = fridgeItems.map(item => item.foodId.toString());

        if (availableFoodIds.length === 0) {
            return [];
        }

        // 2. Find recipes that use these ingredients
        // We want recipes where at least one ingredient matches
        const recipes = await RecipeModel.find({
            'ingredients.foodId': { $in: availableFoodIds },
            $or: [
                { ownerType: 'global' },
                { ownerType: 'group', groupId: membership.groupId }
            ]
        })
            .populate({
                path: 'ingredients.foodId',
                select: 'name image'
            })
            .populate({
                path: 'ingredients.unitId',
                select: 'name'
            });

        // 3. Score and Sort Recipes
        const scoredRecipes = recipes.map(recipe => {
            const recipeObj = recipe.toObject();
            let matchCount = 0;
            const missingIngredients: any[] = [];

            recipeObj.ingredients.forEach((ing: any) => {
                const isAvailable = availableFoodIds.includes(ing.foodId._id.toString());
                if (isAvailable) {
                    matchCount++;
                    ing.isAvailable = true;
                } else {
                    missingIngredients.push(ing);
                    ing.isAvailable = false;
                }
            });

            const totalIngredients = recipeObj.ingredients.length;
            const matchPercentage = totalIngredients > 0 ? (matchCount / totalIngredients) * 100 : 0;

            return {
                ...recipeObj,
                matchCount,
                totalIngredients,
                matchPercentage,
                missingIngredients
            };
        });

        // Sort by match percentage (descending)
        scoredRecipes.sort((a, b) => b.matchPercentage - a.matchPercentage);

        return scoredRecipes;
    }
}