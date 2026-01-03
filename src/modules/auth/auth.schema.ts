import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1)
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

// You can add more schemas as needed, such as for password reset, token refresh, etc.
// As well as cache the schemas if necessary for performance optimization.