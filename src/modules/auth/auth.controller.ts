import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { loginSchema, registerSchema, handleZodError } from "./auth.schema";
import { ZodError } from "zod";

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const data = registerSchema.parse(req.body);
      const user = await AuthService.register(
        data.email,
        data.password,
        data.name
      );

      res.status(201).json(user);
    } catch (error: any) {
      if (error instanceof ZodError) {
        // Handle Zod validation errors
        return res.status(422).json({ message: handleZodError(error) });
      }
      if (error.message === "Email already exists") {
        return res.status(409).json({ message: error.message });
      }
      res.status(400).json({ message: error.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const data = loginSchema.parse(req.body);
      const result = await AuthService.login(data.email, data.password);
      res.json(result);
    } catch (error: any) {
      if (error instanceof ZodError) {
        // Handle Zod validation errors
        return res.status(422).json({ message: handleZodError(error) });
      }
      if (error.message === "Invalid credentials") {
        return res.status(401).json({ message: error.message });
      }
      res.status(400).json({ message: error.message });
    }
  }

  static async me(req: any, res: Response) {
    try {
      res.json(req.user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async refresh(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;
      const result = await AuthService.refresh(refreshToken);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async logout(req: Request, res: Response) {
    try {
      await AuthService.logout(req.body.refreshToken);
      res.json({ message: "Logout successful" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
