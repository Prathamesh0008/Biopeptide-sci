import { buildCanonical } from "@/lib/seo";

export const metadata = {
  title: "Confirm Order",
  description: "Review and confirm your BioPeptide Sci order before checkout.",
  alternates: {
    canonical: buildCanonical("/confirm-order"),
  },
};

export default function ConfirmOrderLayout({ children }) {
  return children;
}
