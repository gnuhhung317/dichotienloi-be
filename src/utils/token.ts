import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt";

export const signAccessToken = (payload: object) =>
  jwt.sign(payload, jwtConfig.accessSecret, {
    expiresIn: jwtConfig.accessExpiresIn
  });
