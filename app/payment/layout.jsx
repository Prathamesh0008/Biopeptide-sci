import { buildCanonical } from "@/lib/seo";

export const metadata = {
  title: "Payment",
  description: "Complete the payment step for your BioPeptide Sci order safely and securely.",
  alternates: {
    canonical: buildCanonical("/payment"),
  },
};

export default function PaymentLayout({ children }) {
  return children;
}
