import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/app-error';
import { COMMON_CODES } from '../constants/response-codes';

export function errorMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof AppError) {
    return res.status(err.status).json({
      success: false,
      code: err.code,
      message: err.message,
    });
  }

  console.error(err);
  if (err.code && err.message && err.status) {
    return res.status(err.status).json({
      success: false,
      code: err.code,
      message: err.message,
    });
  }
  return res.status(500).json({
    success: false,
    code: COMMON_CODES.INTERNAL_SERVER_ERROR.code,
    message: COMMON_CODES.INTERNAL_SERVER_ERROR.message,
  });
}
