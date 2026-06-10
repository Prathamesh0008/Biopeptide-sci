import { buildCanonical } from "@/lib/seo";

export const metadata = {
  title: "Admin Users",
  description: "Manage BioPeptide Sci user accounts from the administrator dashboard.",
  alternates: {
    canonical: buildCanonical("/admin/users"),
  },
};

export default function AdminUsersLayout({ children }) {
  return children;
}
