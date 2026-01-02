import mongoose, { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const unitSchema = new Schema(
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

unitSchema.index({ scope: 1 });
unitSchema.index({ groupId: 1 });
unitSchema.index(
  { name: 1, scope: 1, groupId: 1 },
  { unique: true }
);

export const UnitModel =
  mongoose.models.Unit || mongoose.model('Unit', unitSchema);
