import mongoose, { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const groupSchema = new Schema(
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

    ownerId: {
      type: String,
      ref: 'User',
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

groupSchema.index({ ownerId: 1 });

export const GroupModel =
  mongoose.models.Group || mongoose.model('Group', groupSchema);
