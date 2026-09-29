import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { createProduct } from "../controller/product.controller.js";

const router = Router();

router.post("/", authenticate, (req, res, next) => {
  if (req.user.role !== "seller") {
    return res
      .status(403)
      .json({ message: "Only sellers can create products" });
  }
  next()
}, createProduct);

export default router;
