import { Router } from "express";
import { register } from "../controller/user.controller.js";
import { registerValidator } from "../validators/auth.validator.js";

const router = Router();

router.post("/register", registerValidator, register);

export default router;
