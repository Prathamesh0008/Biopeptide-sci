import { buildCanonical } from "@/lib/seo";

export const metadata = {
  title: "Accessibility",
  description: "Learn about BioPeptide Sci’s accessibility commitment and support resources.",
  alternates: {
    canonical: buildCanonical("/accessibility"),
  },
};

export default function AccessibilityLayout({ children }) {
  return children;
}
