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

  console.log(product);

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

  console.log("selectedSize", selectedSize);

  const cart =
    (await cartModel.findOne({ user: req.user.userId })) ??
    (await cartModel.create({ user: req.user.userId }));

  console.log(req.user);

  console.log("Cart", cart);

  const productInCart = cart.products.find(
    (p) => p.product.toString() === productId && p.size === size,
  );

  if (productInCart) {
    if (productInCart.quantity + quantity > selectedSize) {
      return res.status(400).json({
        message: "Insufficient stock",
      });
    }
  }
}
