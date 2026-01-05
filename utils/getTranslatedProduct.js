export function getTranslatedProduct(product, translations) {
  if (!product) return null;

  const tp = translations?.products?.[product.id];

  if (!tp) return product; // fallback to English

  return {
    ...product,
    name: tp.name ?? product.name,
    strength: tp.strength ?? product.strength,
    description: tp.description ?? product.description,
    applications: tp.applications ?? product.applications,
    appearance: tp.appearance ?? product.appearance,
    storage: tp.storage ?? product.storage,
    researchStatus: tp.researchStatus ?? product.researchStatus,
    components: tp.components ?? product.components,
  };
}
