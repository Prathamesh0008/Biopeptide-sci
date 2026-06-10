import { buildCanonical } from "@/lib/seo";

export const metadata = {
  title: "My Orders",
  description: "View your order history and track previous BioPeptide Sci purchases.",
  alternates: {
    canonical: buildCanonical("/orders"),
  },
};

export default function OrdersLayout({ children }) {
  return children;
}
