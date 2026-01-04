import mongoose, { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const foodSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    categoryId: {
      type: String,
      ref: 'Category',
      required: true
    },

    unitId: {
      type: String,
      ref: 'Unit',
      required: true
    },

    groupId: {
      type: String,
      ref: 'Group',
      required: true
    },

    image: {
      type: String,
      required: false
    }
  },
  {
    _id: false
  }
);

foodSchema.index({ groupId: 1 });
foodSchema.index({ categoryId: 1 });

export const FoodModel =
  mongoose.models.Food || mongoose.model('Food', foodSchema);
