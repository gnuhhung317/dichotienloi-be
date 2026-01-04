import { UserModel } from "../../models/User";
import { hashPassword, comparePassword } from "../../utils/password";
import { signAccessToken, signRefreshToken } from "../../utils/token";
import { RefreshTokenModel } from "../../models/RefreshToken";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../../config/jwt";

export class AuthService {
  static async register(email: string, password: string, name: string) {
    const exist = await UserModel.findOne({ email });
    if (exist) throw new Error("Email already exists");

    const user = await UserModel.create({
      email,
      passwordHash: await hashPassword(password),
      name
    });

    // Tự động tạo tokens sau khi register
    const payload = { userId: user._id, role: user.role };
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    await RefreshTokenModel.create({
      userId: user._id,
      role: user.role,
      token: refreshToken,
      expiresAt: new Date(Date.now() + jwtConfig.refreshExpiresIn * 1000)
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    };
  }

  static async login(email: string, password: string, device?: string) {
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("Invalid credentials");

    const ok = await comparePassword(password, user.passwordHash);
    if (!ok) throw new Error("Invalid credentials");

    const payload = { userId: user._id, role: user.role };
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    await RefreshTokenModel.create({
      userId: user._id,
      role: user.role,
      token: refreshToken,
      device,
      expiresAt: new Date(Date.now() + jwtConfig.refreshExpiresIn * 1000) // 7 days
    });

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    };
  }

  static async logout(refreshToken: string) {
    await RefreshTokenModel.deleteOne({ token: refreshToken });
  }

  static async refresh(refreshToken: string) {
    const payload = jwt.verify(
      refreshToken,
      jwtConfig.refreshSecret
    ) as any;

    const stored = await RefreshTokenModel.findOne({
      token: refreshToken,
      userId: payload.userId,
      expiresAt: { $gt: new Date() }
    });

    if (!stored) throw new Error("Refresh token revoked or expired");

    const newAccessToken = signAccessToken({
      userId: payload.userId,
      role: payload.role
    });

    return { accessToken: newAccessToken };
  }

  static async getProfile(userId: string) {
    const user = await UserModel.findById(userId);
    if (!user) throw new Error("User not found");

    return {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role
    };
  }
}
