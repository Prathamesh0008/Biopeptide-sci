import { buildCanonical } from "@/lib/seo";

export const metadata = {
  title: "Shopping Cart",
  description: "Review the items in your BioPeptide Sci shopping cart before checkout.",
  alternates: {
    canonical: buildCanonical("/cart"),
  },
};

export default function CartLayout({ children }) {
  return children;
}
