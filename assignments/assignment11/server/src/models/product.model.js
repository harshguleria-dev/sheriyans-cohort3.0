import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 100,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minLength: 20,
    maxLength: 500,
  },
  images: {
    type: [String],
    validate: {
      validator: (images) => images.length >= 1 && images.length <= 5,
      message: "Please provide at least 1 and at most 5 images",
    },
  },
  price: {
    amount: { type: Number, required: true },
    currency: { type: String, enum: ["USD", "INR"], default: "INR" },
  },
  sizes: [
    {
      size: {
        type: String,
        enum: ["XS", "S", "M", "L", "XL", "XXL"],
        required: true,
      },
      stock: { type: Number, min: 0, default: 0 },
    },
  ],
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

const productModel = mongoose.model("products", productSchema);

export default productModel;
