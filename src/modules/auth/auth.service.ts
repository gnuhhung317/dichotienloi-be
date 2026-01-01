import { UserModel } from "../../models/User";
import { hashPassword, comparePassword } from "../../utils/password";
import { signAccessToken } from "../../utils/token";

export class AuthService {
  static async register(email: string, password: string, name: string) {
    const exist = await UserModel.findOne({ email });
    if (exist) throw new Error("Email already exists");

    const user = await UserModel.create({
      email,
      passwordHash: await hashPassword(password),
      name
    });

    return user;
  }

  static async login(email: string, password: string) {
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("Invalid credentials");

    const ok = await comparePassword(password, user.passwordHash);
    if (!ok) throw new Error("Invalid credentials");

    const token = signAccessToken({
      userId: user._id,
      role: user.role
    });

    return {
      accessToken: token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    };
  }
}
