import { buildCanonical } from "@/lib/seo";

export const metadata = {
  title: "Shipping & Payments",
  description: "Learn about shipping options, delivery timelines, and accepted payment methods at BioPeptide Sci.",
  alternates: {
    canonical: buildCanonical("/shipping-payments"),
  },
};

export default function ShippingPaymentsLayout({ children }) {
  return children;
}
