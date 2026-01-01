import { Router } from "express";
import { AuthController } from "../modules/auth/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

// PUBLIC
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

// PROTECTED
router.get("/me", authMiddleware, AuthController.me);
router.post("/logout", authMiddleware, AuthController.logout);

export default router;
