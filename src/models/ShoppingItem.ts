import mongoose, { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const shoppingItemSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4
    },

    shoppingListId: {
      type: String,
      ref: 'ShoppingList',
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

    assignedTo: {
      type: String,
      ref: 'User',
      default: null
    },

    is_bought: {
      type: Boolean,
      default: false
    }
  },
  {
    _id: false
  }
);

shoppingItemSchema.index({ shoppingListId: 1 });
shoppingItemSchema.index({ assignedTo: 1 });
shoppingItemSchema.index({ is_bought: 1 });

export const ShoppingItemModel =
  mongoose.models.ShoppingItem || mongoose.model('ShoppingItem', shoppingItemSchema);
