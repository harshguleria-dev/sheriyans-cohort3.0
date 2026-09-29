import productModel from "../models/product.model.js";

const createProduct = async (req, res) => {
  console.log(req.body);
  console.log(req.files);

  res.status(201).json({ message: "Product created successfully" });
};

export { createProduct };
