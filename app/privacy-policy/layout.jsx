import { buildCanonical } from "@/lib/seo";

export const metadata = {
  title: "Privacy Policy",
  description: "Read BioPeptide Sci’s privacy policy for data collection, usage, and customer privacy details.",
  alternates: {
    canonical: buildCanonical("/privacy-policy"),
  },
};

export default function PrivacyPolicyLayout({ children }) {
  return children;
}
