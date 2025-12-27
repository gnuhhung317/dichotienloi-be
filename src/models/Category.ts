import mongoose, { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const categorySchema = new Schema(
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

    scope: {
      type: String,
      enum: ['global', 'group'],
      required: true
    },

    groupId: {
      type: String,
      ref: 'Group',
      default: null
    }
  },
  {
    _id: false
  }
);

categorySchema.index({ scope: 1 });
categorySchema.index({ groupId: 1 });
categorySchema.index(
  { name: 1, scope: 1, groupId: 1 },
  { unique: true }
);

export const CategoryModel =
  mongoose.models.Category || mongoose.model('Category', categorySchema);
