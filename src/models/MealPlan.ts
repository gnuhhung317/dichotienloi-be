import mongoose, { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const mealPlanSchema = new Schema(
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

mealPlanSchema.index({ groupId: 1 });
mealPlanSchema.index({ groupId: 1, date: 1 });
mealPlanSchema.index(
  { groupId: 1, date: 1, mealType: 1 },
  { unique: true }
);

export const MealPlanModel =
  mongoose.models.MealPlan ||mongoose.model('MealPlan', mealPlanSchema);
