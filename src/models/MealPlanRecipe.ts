import { group } from 'console';
import mongoose, { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const mealRecipeSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4
    },

    groupId: {
      type: String,
      ref: 'Group',
      required: true
    },

    recipeId: {
      type: String,
      ref: 'Recipe',
      required: true
    },

    date: {
      type: Date,
      required: true
    },

    mealType: {
      type: String,
      enum: ['breakfast', 'lunch', 'dinner'],
      required: true
    }
  },
  {
    _id: false
  }
);

mealRecipeSchema.index({ date: 1 });

mealRecipeSchema.index({ date: 1, mealType: 1 });

mealRecipeSchema.index(
  { recipeId: 1, date: 1, mealType: 1 },
  { unique: true }
);

export const MealRecipeModel =
  mongoose.models.MealRecipe ||mongoose.model('MealRecipe', mealRecipeSchema);
