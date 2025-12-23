//models\Product.js
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    id: String,
    slug: String,
    name: String,
    category: String,
    price: Number,
    strength: String,
    size: String,
    purity: String,

    stock: { type: Boolean, default: true },
    badge: String,

    description: String,
    components: [String],
    applications: [String],

    appearance: String,
    storage: String,
    researchStatus: String,

    image: String,
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
