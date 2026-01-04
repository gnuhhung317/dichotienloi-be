import { z } from "zod";
import { ZodError } from 'zod';
import { throwError } from '../../utils/app-error';
import { AUTH_CODES } from '../../constants/response-codes';

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(20),
  name: z.string().min(3).max(30),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(20),
});

export function handleZodError(error: ZodError) {
  const issue = error.issues[0];

  switch (issue.path[0]) {
    case 'email':
      return AUTH_CODES.INVALID_EMAIL_FORMAT;

    case 'password':
      return AUTH_CODES.INVALID_PASSWORD_LENGTH;

    case 'name':
      return AUTH_CODES.INVALID_NAME_LENGTH;

    default:
      return AUTH_CODES.AUTH_FIELDS_REQUIRED;
  }
}

// You can add more schemas as needed, such as for password reset, token refresh, etc.
// As well as cache the schemas if necessary for performance optimization.