import mongoose, { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const expiryNotificationSchema = new Schema(
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

    notifyAt: {
      type: Date,
      required: true
    },

    sentAt: {
      type: Date,
      default: null
    },

    status: {
      type: String,
      enum: ['pending', 'sent', 'cancelled'],
      required: true
    }
  },
  {
    _id: false
  }
);

expiryNotificationSchema.index({ fridgeItemId: 1 });
expiryNotificationSchema.index({ status: 1 });
expiryNotificationSchema.index({ notifyAt: 1, status: 1 });

export const ExpiryNotificationModel =
  mongoose.models.ExpiryNotification || mongoose.model('ExpiryNotification', expiryNotificationSchema);
