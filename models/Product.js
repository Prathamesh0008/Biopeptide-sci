import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    id: String,

    name: String,

    slug: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },

    price: Number,
    category: String,
    strength: mongoose.Schema.Types.Mixed,

    image: String,
    galleryImages: [String],

    purity: String,
    size: String,
    cas: String,

    coaImages: [String],
    descriptionImages: [String],

    seo: mongoose.Schema.Types.Mixed,

    translations: mongoose.Schema.Types.Mixed,

    inStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);