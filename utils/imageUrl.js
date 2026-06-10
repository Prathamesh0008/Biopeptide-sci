export function getSafeImageUrl(img, options = {}) {
  const { version, defaultPath = "/images/product.png" } = options;

  if (!img || typeof img !== "string") {
    return defaultPath;
  }

  const trimmed = img.trim();

  if (!trimmed) {
    return defaultPath;
  }

  if (trimmed.startsWith("http")) {
    if (!version) return trimmed;

    try {
      const url = new URL(trimmed);
      url.searchParams.set("v", String(version));
      return url.toString();
    } catch {
      return `${trimmed}${trimmed.includes("?") ? "&" : "?"}v=${version}`;
    }
  }

  const basePath = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;

  if (!version) {
    return basePath;
  }

  const separator = basePath.includes("?") ? "&" : "?";
  return `${basePath}${separator}v=${version}`;
}

export function getImageVersion(product) {
  return (
    product?.updatedAt ||
    product?.imageUpdatedAt ||
    product?._id ||
    product?.id ||
    Date.now()
  );
}
