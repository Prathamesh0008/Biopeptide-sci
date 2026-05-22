import mongoose from "mongoose";
import dotenv from "dotenv";

import Product from "../models/Product.js";
import { PRODUCTS } from "../data/products.js";
import languages from "../data2/languages/index.js";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is missing in .env.local");
  process.exit(1);
}

function getTranslationsBySlug(slug) {
  const translations = {};

  for (const [langCode, langData] of Object.entries(languages)) {
    const translatedProduct = langData?.products?.[slug];

    if (translatedProduct) {
      translations[langCode] = translatedProduct;
    }
  }

  return translations;
}

async function seedProducts() {
  try {
    console.log("⏳ Connecting to MongoDB...");

    await mongoose.connect(MONGODB_URI);

    console.log("✅ MongoDB connected");

    const operations = PRODUCTS.map((product) => ({
      updateOne: {
        filter: { slug: product.slug },
        update: {
          $set: {
            ...product,
            translations: getTranslationsBySlug(product.slug),
            inStock: product.inStock ?? true,
          },
        },
        upsert: true,
      },
    }));

    const result = await Product.bulkWrite(operations);

    console.log("✅ Products seeded successfully");
    console.log("Total:", PRODUCTS.length);
    console.log("Inserted:", result.upsertedCount);
    console.log("Updated:", result.modifiedCount);
    console.log("Matched:", result.matchedCount);

    await mongoose.disconnect();
    console.log("✅ MongoDB disconnected");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seedProducts();