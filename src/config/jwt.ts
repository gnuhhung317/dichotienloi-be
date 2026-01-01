import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.JWT_SECRET;
if (!secret) {
  throw new Error("JWT_SECRET environment variable is not set");
}

export const jwtConfig = {
  accessSecret: secret,
  accessExpiresIn: 86400 // 1 day in seconds

//   refreshSecret
//   refreshSecret: process.env.JWT_REFRESH_SECRET,
};
