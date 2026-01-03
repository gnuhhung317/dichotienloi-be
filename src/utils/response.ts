import { Response } from 'express';

export function sendResponse(
  res: Response,
  codeObj: { code: string; message: string; status: number },
  data?: any
) {
  return res.status(codeObj.status).json({
    success: codeObj.status < 400,
    code: codeObj.code,
    message: codeObj.message,
    ...(data && { data }),
  });
}

//KHÔNG dùng res.status().json() trực tiếp nữa