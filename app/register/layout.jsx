import { buildCanonical } from "@/lib/seo";

export const metadata = {
  title: "Create Account",
  description: "Register for a BioPeptide Sci account to manage orders, addresses, and saved preferences.",
  alternates: {
    canonical: buildCanonical("/register"),
  },
};

export default function RegisterLayout({ children }) {
  return children;
}
