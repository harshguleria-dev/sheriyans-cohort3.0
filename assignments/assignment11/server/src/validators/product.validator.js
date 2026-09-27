import { body } from "express-validator";

export const createProductValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 20, max: 500 })
    .withMessage("Description must be between 20 and 500 characters"),
  body("images").custom((images) => {
    if (images.length < 1 || images.length > 5) {
      throw new Error("Please provide at least 1 and at most 5 images");
    }
    return true;
  }),
  body("price.amount").exists().withMessage("Amount is required").isFloat({min: 0}).withMessage("Amount must be a non-negative number"),
body("price.currency").exists().withMessage("Currency is required").isString().withMessage("Currency must be a string").isIn(["USD","INR"]).withMessage("Currency must be either USD or INR")
  body("sizes").custom((sizes) => {
    if (sizes.length < 1) {
      throw new Error("Please provide at least one size");
    }
    return true;
  }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
