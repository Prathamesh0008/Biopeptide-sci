import { buildCanonical } from "@/lib/seo";

export const metadata = {
  title: "Terms & Conditions",
  description: "Review the BioPeptide Sci terms and conditions for ordering, payment, and usage policies.",
  alternates: {
    canonical: buildCanonical("/terms"),
  },
};

export default function TermsLayout({ children }) {
  return children;
}
