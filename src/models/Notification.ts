import mongoose, { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const notificationSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4
    },

    type: {
      type: String,
      enum: ['expire_warning', 'system'],
      required: true
    },

    content: {
      type: String,
      required: true,
      trim: true
    },

    is_read: {
      type: Boolean,
      default: false,
      index: true
    },

    userId: {
      type: String,
      ref: 'User',
      required: true,
      index: true
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

notificationSchema.index(
  { userId: 1, is_read: 1, created_at: -1 }
);

export const NotificationModel =
  mongoose.models.Notification || mongoose.model('Notification', notificationSchema);
