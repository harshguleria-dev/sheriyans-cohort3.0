import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";

export async function addToCart(req, res) {
  const { productId, quantity, size } = req.body;

  const product = await productModel.findById(productId);

  if (!product) {
    return res.status(400).json({
      message: "Product not found",
    });
  }

  const selectedSize = product.sizes.find((s) => s.size === size);

  if (!selectedSize) {
    return res.status(400).json({
      message: "Invalid size",
    });
  }

  if (selectedSize.stock < quantity) {
    return res.status(400).json({
      message: "Insufficient stock",
    });
  }
}
