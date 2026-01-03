import dotenv from 'dotenv';
dotenv.config();

const accessSecret = process.env.JWT_ACCESS_SECRET;
const refreshSecret = process.env.JWT_REFRESH_SECRET;

if (!accessSecret) {
  throw new Error("JWT_ACCESS_SECRET environment variable is not set");
}

if (!refreshSecret) {
  throw new Error("JWT_REFRESH_SECRET environment variable is not set");
}

export const jwtConfig = {
  accessSecret: accessSecret,
  refreshSecret: refreshSecret,
  accessExpiresIn: 86400, // 1 day in seconds
  refreshExpiresIn: 86400 * 7, // 30 days in seconds
};
