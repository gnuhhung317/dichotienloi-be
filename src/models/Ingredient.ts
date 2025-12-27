import mongoose, { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const ingredientSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4
    },

    recipeId: {
      type: String,
      ref: 'Recipe',
      required: true
    },

    foodId: {
      type: String,
      ref: 'Food',
      required: true
    },

    quantity: {
      type: Schema.Types.Decimal128,
      required: true
    },

    unitId: {
      type: String,
      ref: 'Unit',
      required: true
    }
  },
  {
    _id: false
  }
);

ingredientSchema.index({ recipeId: 1 });
ingredientSchema.index({ foodId: 1 });
ingredientSchema.index(
  { recipeId: 1, foodId: 1 },
  { unique: true }
);

export const IngredientModel =
  mongoose.models.Ingredient ||mongoose.model('Ingredient', ingredientSchema);
