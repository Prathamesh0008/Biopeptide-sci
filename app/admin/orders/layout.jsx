import { buildCanonical } from "@/lib/seo";

export const metadata = {
  title: "Admin Orders",
  description: "Manage BioPeptide Sci customer orders from the administrator dashboard.",
  alternates: {
    canonical: buildCanonical("/admin/orders"),
  },
};

export default function AdminOrdersLayout({ children }) {
  return children;
}
