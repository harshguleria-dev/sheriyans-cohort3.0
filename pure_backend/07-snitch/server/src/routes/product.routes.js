import { Router } from "express";
import createProductValidator from "../validators/product.validator.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import {
  createProduct,
  listAllProducts,
} from "../controller/product.controller.js";
import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    files: 5,
    fileSize: 1 * 1024 * 1024, // 1MB
  },
});

const router = Router();

// * @POST /api/products
router.post(
  "/",
  authenticate,
  async (req, res, next) => {
    if (req.user.role !== "seller") {
      return res.status(403).json({
        message: "User is not authorize to create products",
      });
    }

    next();
  },
  upload.array("images"),
  (req, res, next) => {
    req.body?.price && (req.body.price = JSON.parse(req.body.price));
    req.body?.sizes && (req.body.sizes = JSON.parse(req.body.sizes));

    next();
  },
  createProductValidator,
  createProduct,
);

// * @GET /api/products
router.get("/", authenticate, listAllProducts);

// * GET /api/products/unlist/:id
router.post("/unlist:id", authenticate, (req, res, next) => {
  if (req.user.role !== "seller") {
    return res.status(403).json({
      message: "Forbidden access, only a seller can unlist ",
    });
  }
  next();
});

export default router;
