import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service";
import { loginSchema, registerSchema, handleZodError } from "./auth.schema";
import { AUTH_CODES, USER_CODES } from '../../constants/response-codes';
import { sendResponse } from '../../utils/response';
import { ZodError } from 'zod';

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data = registerSchema.parse(req.body);
      const user = await AuthService.register(
        data.email,
        data.password,
        data.name
      );

      //res.status(201).json(user);
      return sendResponse(res, AUTH_CODES.REGISTER_SUCCESS, user);
    } catch (error: any) {
      if (error instanceof ZodError) {
        next(handleZodError(error));
      }
      next(error);
      // res.status(400).json({ message: error.message });
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const data = loginSchema.parse(req.body);
      const result = await AuthService.login(data.email, data.password);
      // res.json(result);
      return sendResponse(res, AUTH_CODES.LOGIN_SUCCESS, result);
    } catch (error: any) {
      if (error instanceof ZodError) {
        next(handleZodError(error));
      }
      next(error);
      // res.status(400).json({ message: error.message });
    }
  }

  static async me(req: any, res: Response, next: NextFunction) {
    try {
      // res.json(req.user);
      return sendResponse(res, USER_CODES.USER_INFO_FETCHED_SUCCESS, req.user);
    } catch (error: any) {
      // res.status(400).json({ message: error.message });
      next(error);
    }
  }

  static async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      const result = await AuthService.refresh(refreshToken);
      //res.json(result);
      return sendResponse(res, AUTH_CODES.TOKEN_REFRESH_SUCCESS, result);
    } catch (error: any) {
      // res.status(400).json({ message: error.message });
      next(error);
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      await AuthService.logout(req.body.refreshToken);
      //res.json({ message: "Logout successful" });
      return sendResponse(res, AUTH_CODES.LOGOUT_SUCCESS);
    } catch (error: any) {
      // res.status(400).json({ message: error.message });
      next(error);
    }
  }
}
