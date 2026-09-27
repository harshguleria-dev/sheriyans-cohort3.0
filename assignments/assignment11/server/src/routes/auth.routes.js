import { Router } from "express";
import { login, register, refreshToken, getMe } from "../controller/user.controller.js";
import {
  loginValidator,
  registerValidator,
} from "../validators/auth.validator.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", registerValidator, register);

router.post("/login", loginValidator, login);

router.post("/refresh", refreshToken);

router.get("/me", authenticate, getMe)

export default router;
