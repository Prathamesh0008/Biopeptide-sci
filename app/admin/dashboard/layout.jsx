import { buildCanonical } from "@/lib/seo";

export const metadata = {
  title: "Admin Dashboard",
  description: "Administrative dashboard for BioPeptide Sci operations and overview.",
  alternates: {
    canonical: buildCanonical("/admin/dashboard"),
  },
};

export default function AdminDashboardLayout({ children }) {
  return children;
}
