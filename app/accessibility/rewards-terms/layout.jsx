import { buildCanonical } from "@/lib/seo";

export const metadata = {
  title: "Accessibility Rewards Terms",
  description: "Accessibility-focused rewards terms and details for BioPeptide Sci.",
  alternates: {
    canonical: buildCanonical("/accessibility/rewards-terms"),
  },
};

export default function AccessibilityRewardsTermsLayout({ children }) {
  return children;
}
