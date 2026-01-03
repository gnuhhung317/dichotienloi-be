import mongoose, { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const fridgeItemSchema = new Schema(
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

    foodId: {
      type: String,
      ref: 'Food',
      required: true
    },

    unitId: {
      type: String,
      ref: 'Unit',
      required: true
    },

    quantity: {
      type: Schema.Types.Decimal128,
      required: true
    },

    expiredAt: {
      type: Date,
      required: true
    },

    storagePlace: {
      type: String,
      required: true,
      trim: true,
      default: 'fridge'
    },

    status: {
      type: String,
      enum: ['available', 'expired'],
      required: true
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
    _id: false
  }
);

fridgeItemSchema.index({ groupId: 1 });
fridgeItemSchema.index({ foodId: 1 });
fridgeItemSchema.index({ groupId: 1, status: 1 });
fridgeItemSchema.index({ groupId: 1, expiredAt: 1 });

export const FridgeItemModel =
  mongoose.models.FridgeItem ||mongoose.model('FridgeItem', fridgeItemSchema);
