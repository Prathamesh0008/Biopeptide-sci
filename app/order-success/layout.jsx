import { buildCanonical } from "@/lib/seo";

export const metadata = {
  title: "Order Success",
  description: "Your BioPeptide Sci order was placed successfully.",
  alternates: {
    canonical: buildCanonical("/order-success"),
  },
};

export default function OrderSuccessLayout({ children }) {
  return children;
}
