import { body, validationResult } from "express-validator";

export const createProductValidator = [
  body("title")
    .exists()
    .withMessage("Title is required")
    .bail()
    .isString()
    .withMessage("Title must be a string")
    .bail()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Title length must be between 2 to 100 charcters")
    .bail()
    .isAlpha("en-US", { ignore: " -" })
    .withMessage(
      "Title can only have english small case and capital case character",
    ),
  body("description")
    .exists()
    .withMessage("Description is required")
    .bail()
    .isString()
    .withMessage("Description must be a string")
    .bail()
    .trim()
    .isLength({ min: 20, max: 500 })
    .withMessage("Description length must be between 20 to 500 characters")
    .bail(),
  body("price.amount")
    .exists()
    .withMessage("price amount is required")
    .bail()
    .isFloat({ min: 0 })
    .withMessage(
      "price amount must be a floating number and must be greater than 0",
    )
    .bail(),
  body("price.currency")
    .exists()
    .withMessage("Currency is required")
    .bail()
    .isString()
    .withMessage("Currency must be a string value")
    .bail()
    .isIn(["INR", "USD"])
    .withMessage("Currency either be INR or USD"),
  body("sizes")
    .exists()
    .withMessage("Sizes are required")
    .bail()
    .isArray()
    .withMessage("Sizes must be array of object"),
  body("sizes.*.size")
    .exists()
    .withMessage("Sizes must be present in every entry of sizes array")
    .bail()
    .isString()
    .withMessage("Size must be a string value")
    .bail()
    .isIn(["XS", "S", "M", "L", "XL", "XXL"])
    .withMessage("Size can be one of these XS, S, M, L, XL, XXL"),
  body("sizes.*.stock")
    .exists()
    .withMessage("Stock must be present in evry entry of the sizes array")
    .bail()
    .isInt({ min: 0 })
    .withMessage("Stock must be a integer value")
    .bail(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid Request",
        errors: errors.array(),
      });
    }

    next();
  },
];

export const unlistProductValidator = [
  params("id")
    .exists()
    .withMessage("Product id is required in req params")
    .bail()
    .isMongoId()
    .withMessage("Product is must be a valid mongo object id"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid data",
        errors: errors.array(),
      });
    }

    next();
  },
];

export { createProductValidator, unlistProductValidator };
