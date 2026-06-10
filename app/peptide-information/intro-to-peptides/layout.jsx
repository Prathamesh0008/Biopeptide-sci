import { buildCanonical } from "@/lib/seo";

export const metadata = {
  title: "Introduction to Peptides",
  description: "Learn the basics of peptides, their functions, and research applications through BioPeptide Sci.",
  alternates: {
    canonical: buildCanonical("/peptide-information/intro-to-peptides"),
  },
};

export default function IntroToPeptidesLayout({ children }) {
  return children;
}
