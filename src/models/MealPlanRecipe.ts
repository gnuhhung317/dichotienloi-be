import mongoose, { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const mealPlanRecipeSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4
    },

    mealPlanId: {
      type: String,
      ref: 'MealPlan',
      required: true
    },

    recipeId: {
      type: String,
      ref: 'Recipe',
      required: true
    }
  },
  {
    _id: false
  }
);

mealPlanRecipeSchema.index({ mealPlanId: 1 });
mealPlanRecipeSchema.index({ recipeId: 1 });
mealPlanRecipeSchema.index(
  { mealPlanId: 1, recipeId: 1 },
  { unique: true }
);

export const MealPlanRecipeModel =
  mongoose.models.MealPlanRecipe || mongoose.model('MealPlanRecipe', mealPlanRecipeSchema);
