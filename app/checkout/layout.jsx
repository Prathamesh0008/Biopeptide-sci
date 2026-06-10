import { buildCanonical } from "@/lib/seo";

export const metadata = {
  title: "Checkout",
  description: "Complete checkout for your BioPeptide Sci order with secure payment options.",
  alternates: {
    canonical: buildCanonical("/checkout"),
  },
};

export default function CheckoutLayout({ children }) {
  return children;
}
