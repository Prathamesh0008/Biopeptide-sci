export const SITE_URL = "https://www.bio-peptides.com";

export function buildCanonical(path) {
  if (!path) return SITE_URL;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
}
