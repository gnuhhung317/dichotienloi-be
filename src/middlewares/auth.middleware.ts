import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt";
import { COMMON_CODES } from '../constants/response-codes';
import { sendResponse } from '../utils/response';

export interface AuthRequest extends Request {
  user?: { userId: string; role: string };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    // return res.status(401).json({ message: "Unauthorized" });
    return sendResponse(res, COMMON_CODES.NO_TOKEN_PROVIDED);
  }

  try {
    const payload = jwt.verify(
      header.split(" ")[1],
      jwtConfig.accessSecret
    ) as any;

    req.user = payload;
    next();
  } catch {
    //res.status(401).json({ message: "Invalid token" });
    return sendResponse(res, COMMON_CODES.INVALID_TOKEN);
  }
};
