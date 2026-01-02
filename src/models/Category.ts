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
    }

  },
  {
    _id: false
  }
);

export const CategoryModel =
  mongoose.models.Category || mongoose.model('Category', categorySchema);
