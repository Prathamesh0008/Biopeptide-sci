import { buildCanonical } from "@/lib/seo";

export const metadata = {
  title: "My Profile",
  description: "Manage your BioPeptide Sci profile, saved shipping details, and account preferences.",
  alternates: {
    canonical: buildCanonical("/profile"),
  },
};

export default function ProfileLayout({ children }) {
  return children;
}
