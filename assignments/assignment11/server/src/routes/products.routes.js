import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { createProduct } from "../controller/product.controller.js";
import { createProductValidator } from "../validators/product.validator.js";

import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 1, // 1 MB
    files: 5,
  },
  fileFilter: (cb, file) => {
    const fileTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (fileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  },
});

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
  (req, res, next) => {
    const price = JSON.parse(req.body.price);
    const sizes = JSON.parse(req.body.sizes);

    req.body.price = price;
    req.body.sizes = sizes;
    next();
  },
  createProductValidator,
  createProduct,
);

export default router;
