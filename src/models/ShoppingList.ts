import mongoose, { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const shoppingListSchema = new Schema(
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

    createdBy: {
      type: String,
      ref: 'User',
      required: true
    },

    status: {
      type: String,
      enum: ['active', 'done'],
      required: true
    }
  },
  {
    _id: false
  }
);

shoppingListSchema.index({ groupId: 1 });

shoppingListSchema.index({ createdBy: 1 });

export const ShoppingListModel =
  mongoose.models.ShoppingList || mongoose.model('ShoppingList', shoppingListSchema);
