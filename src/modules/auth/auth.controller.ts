import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { loginSchema, registerSchema } from "./auth.schema";

export class AuthController {
  static async register(req: Request, res: Response) {
    const data = registerSchema.parse(req.body);
    const user = await AuthService.register(
      data.email,
      data.password,
      data.name
    );

    res.status(201).json(user);
  }

  static async login(req: Request, res: Response) {
    const data = loginSchema.parse(req.body);
    const result = await AuthService.login(data.email, data.password);
    res.json(result);
  }

  static async me(req: any, res: Response) {
    res.json(req.user);
  }

  static async logout(req: Request, res: Response) {
    res.json({ message: "Logout successful" });
  }
}
