import { Router } from "express";
import { login, register, refreshToken } from "../controller/user.controller.js";
import {
  loginValidator,
  registerValidator,
} from "../validators/auth.validator.js";

const router = Router();

router.post("/register", registerValidator, register);

router.post("/login", loginValidator, login);

router.post("/refresh", refreshToken);

export default router;
