import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { createProduct } from "../controller/product.controller.js";

import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

router.post(
  "/",
  authenticate,
  (req, res, next) => {
    if (req.user.role !== "seller") {
      return res
        .status(403)
        .json({ message: "Only seller can create product" });
    }
    next();
  },
  upload.array("images", 5),
  createProduct,
);

export default router;
