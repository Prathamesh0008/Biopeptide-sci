import { buildCanonical } from "@/lib/seo";

export const metadata = {
  title: "Edit Profile",
  description: "Update your BioPeptide Sci account profile and contact information.",
  alternates: {
    canonical: buildCanonical("/profile/edit"),
  },
};

export default function EditProfileLayout({ children }) {
  return children;
}
