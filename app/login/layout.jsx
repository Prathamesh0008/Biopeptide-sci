import { buildCanonical } from "@/lib/seo";

export const metadata = {
  title: "Login",
  description: "Sign in to your BioPeptide Sci account to view orders and manage your profile.",
  alternates: {
    canonical: buildCanonical("/login"),
  },
};

export default function LoginLayout({ children }) {
  return children;
}
