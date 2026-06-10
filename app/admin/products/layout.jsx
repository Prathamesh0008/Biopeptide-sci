import { buildCanonical } from "@/lib/seo";

export const metadata = {
  title: "Admin Products",
  description: "Manage BioPeptide Sci products from the administrator dashboard.",
  alternates: {
    canonical: buildCanonical("/admin/products"),
  },
};

export default function AdminProductsLayout({ children }) {
  return children;
}
