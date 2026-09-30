import { Router } from "express";
import {
  createProductValidator,
  unlistProductValidator,
  listProductValidator,
} from "../validators/product.validator.js";
import {
  authenticate,
  authenticateSeller,
} from "../middlewares/auth.middleware.js";
import {
  createProduct,
  listAllProducts,
  unlistProduct,
  listProduct,
  listAllProductsToSeller,
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
  authenticateSeller,
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

// * @GET /api/products/seller
router.get(
  "/seller",
  authenticate,
  authenticateSeller,
  listAllProductsToSeller,
);

// * GET /api/products/unlist/:id
router.post(
  "/unlist:id",
  authenticate,
  authenticateSeller,
  unlistProductValidator,
  unlistProduct,
);

// * GET /api/products/list/:id
router.post(
  "/unlist:id",
  authenticate,
  authenticateSeller,
  listProductValidator,
  listProduct,
);

export default router;
