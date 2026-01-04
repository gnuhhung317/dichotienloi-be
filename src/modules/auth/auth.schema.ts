import { z } from "zod";
import { ZodError } from "zod";

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
      return "Nhập thiếu hoặc email không hợp lệ";

    case 'password':
      return "Mật khẩu phải có ít nhất 6 ký tự và tối đa 20 ký tự";

    case 'name':
      return "Tên phải có ít nhất 3 ký tự và tối đa 30 ký tự";

    default:
      return "Các trường không hợp lệ";
  }
}

// You can add more schemas as needed, such as for password reset, token refresh, etc.
// As well as cache the schemas if necessary for performance optimization.