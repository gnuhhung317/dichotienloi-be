import mongoose, { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const recipeSchema = new Schema(
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

    description: {
      type: String,
      required: true
    },

    ownerType: {
      type: String,
      enum: ['user', 'group', 'global'],
      required: true
    },

    ownerId: {
      type: String,
      ref: 'User',
      default: null
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

recipeSchema.index({ ownerType: 1 });
recipeSchema.index({ ownerId: 1 });
recipeSchema.index({ ownerType: 1, ownerId: 1 });

export const RecipeModel =
  mongoose.models.Recipe ||mongoose.model('Recipe', recipeSchema);
