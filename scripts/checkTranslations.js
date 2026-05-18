import { PRODUCTS } from "../data/products.js";
import languages from "../data2/languages/index.js";

const requiredLanguages = Object.keys(languages);

console.log("✅ Total products in data/products.js:", PRODUCTS.length);
console.log("✅ Languages loaded:", requiredLanguages.join(", "));
console.log("✅ Total languages:", requiredLanguages.length);

console.log("\n==============================");
console.log("Checking missing translations");
console.log("==============================");

for (const langCode of requiredLanguages) {
  const missing = PRODUCTS.filter(
    (product) => !languages[langCode]?.products?.[product.slug]
  ).map((product) => ({
    slug: product.slug,
    name: product.name,
  }));

  console.log(`\n${langCode}: missing ${missing.length} / ${PRODUCTS.length}`);

  if (missing.length > 0) {
    console.table(missing);
  }
}

console.log("\n✅ Translation check completed.");