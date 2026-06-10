import { buildCanonical } from "@/lib/seo";

export const metadata = {
  title: "Rewards Terms",
  description: "Read the rewards program terms and eligibility details for BioPeptide Sci customers.",
  alternates: {
    canonical: buildCanonical("/rewards-terms"),
  },
};

export default function RewardsTermsLayout({ children }) {
  return children;
}
