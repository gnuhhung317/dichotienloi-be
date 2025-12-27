import mongoose, { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const foodLogSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4
    },

    foodId: {
      type: String,
      ref: 'Food',
      required: true
    },

    groupId: {
      type: String,
      ref: 'Group',
      required: true
    },

    action: {
      type: String,
      enum: ['buy', 'consume', 'discard'],
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

foodLogSchema.index({ foodId: 1 });
foodLogSchema.index({ groupId: 1 });
foodLogSchema.index({ created_at: -1 });

export const FoodLogModel =
  mongoose.models.FoodLog ||mongoose.model('FoodLog', foodLogSchema);
