import mongoose, { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const fridgeItemLogSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4
    },

    fridgeItemId: {
      type: String,
      ref: 'FridgeItem',
      required: true
    },

    action: {
      type: String,
      enum: ['consumed', 'discarded', 'expired'],
      required: true
    },

    quantity: {
      type: Schema.Types.Decimal128,
      required: true
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: false
    },
    _id: false
  }
);

fridgeItemLogSchema.index({ fridgeItemId: 1 });
fridgeItemLogSchema.index({ action: 1 });
fridgeItemLogSchema.index({ fridgeItemId: 1, created_at: -1 });

export const FridgeItemLogModel =
  mongoose.models.FridgeItemLog ||mongoose.model('FridgeItemLog', fridgeItemLogSchema);
