import mongoose, { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const groupMemberSchema = new Schema(
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

    userId: {
      type: String,
      ref: 'User',
      required: true
    },

    role: {
      type: String,
      enum: ['owner', 'member'],
      default: 'member',
      required: true
    },

    joined_at: {
      type: Date,
      default: Date.now,
      required: true
    }
  },
  {
    _id: false
  }
);

groupMemberSchema.index(
  { groupId: 1, userId: 1 },
  { unique: true }
);

groupMemberSchema.index({ groupId: 1 });
groupMemberSchema.index({ userId: 1 });

export const GroupMemberModel =
  mongoose.models.GroupMember || mongoose.model('GroupMember', groupMemberSchema);
