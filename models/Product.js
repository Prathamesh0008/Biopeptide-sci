import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: String,
    slug: { type: String, unique: true },
    price: Number,
    category: String,
    strength: String,
    image: String,
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
