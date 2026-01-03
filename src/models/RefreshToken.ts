import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const refreshTokenSchema = new Schema(
  {
    _id: { type: String, default: uuidv4 },
    userId: { type: String, required: true, ref: "User" },
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    device: { type: String }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: false },
    _id: false
  }
);

export const RefreshTokenModel =
  mongoose.models.RefreshToken ||
  mongoose.model("RefreshToken", refreshTokenSchema);
