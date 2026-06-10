import { buildCanonical } from "@/lib/seo";

export const metadata = {
  title: "Maintenance",
  description: "BioPeptide Sci is currently undergoing maintenance. Please check back soon.",
  alternates: {
    canonical: buildCanonical("/maintenance"),
  },
};

export default function MaintenanceLayout({ children }) {
  return children;
}
