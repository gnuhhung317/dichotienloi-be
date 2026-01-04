import { UserModel } from '../../models/User';
import { RefreshTokenModel } from '../../models/RefreshToken';
import { hashPassword, comparePassword } from '../../utils/password';
import { signAccessToken, signRefreshToken } from '../../utils/token';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../../config/jwt';
import { AUTH_CODES } from '../../constants/response-codes';
import { throwError } from '../../utils/app-error';

export class AuthService {
  static async register(email: string, password: string, name: string) {
    const exist = await UserModel.findOne({ email });
    if (exist) throwError(AUTH_CODES.EMAIL_ALREADY_EXISTS);

    const user = await UserModel.create({
      email,
      passwordHash: await hashPassword(password),
      name,
    });

    const payload = { userId: user._id, role: user.role };
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    await RefreshTokenModel.create({
      userId: user._id,
      role: user.role,
      token: refreshToken,
      expiresAt: new Date(Date.now() + jwtConfig.refreshExpiresIn * 1000),
    });

    return {
      tokens: { accessToken, refreshToken },
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  static async login(email: string, password: string, device?: string) {
    const user = await UserModel.findOne({ email });
    if (!user) throwError(AUTH_CODES.LOGIN_EMAIL_NOT_FOUND);

    const ok = await comparePassword(password, user.passwordHash);
    if (!ok) throwError(AUTH_CODES.INVALID_LOGIN_CREDENTIALS);

    const payload = { userId: user._id, role: user.role };
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    await RefreshTokenModel.create({
      userId: user._id,
      role: user.role,
      token: refreshToken,
      device,
      expiresAt: new Date(Date.now() + jwtConfig.refreshExpiresIn * 1000),
    });

    return {
      tokens: { accessToken, refreshToken },
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  static async logout(refreshToken: string) {
    if (!refreshToken) throwError(AUTH_CODES.REFRESH_TOKEN_REQUIRED);
    await RefreshTokenModel.deleteOne({ token: refreshToken });
  }

  static async refresh(refreshToken: string) {
    if (!refreshToken) throwError(AUTH_CODES.REFRESH_TOKEN_REQUIRED);

    let payload: any;
    try {
      payload = jwt.verify(refreshToken, jwtConfig.refreshSecret);
    } catch {
      throwError(AUTH_CODES.INVALID_TOKEN);
    }

    const stored = await RefreshTokenModel.findOne({
      token: refreshToken,
      userId: payload.userId,
      expiresAt: { $gt: new Date() },
    });

    if (!stored) throwError(AUTH_CODES.TOKEN_EXPIRED);

    const newAccessToken = signAccessToken({
      userId: payload.userId,
      role: payload.role,
    });

    return { accessToken: newAccessToken };
  }
}
