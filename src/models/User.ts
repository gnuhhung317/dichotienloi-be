import mongoose, { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const userSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4
    },

    name: {
      type: String
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    passwordHash: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
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

export const UserModel =
  mongoose.models.User || mongoose.model('User', userSchema);
