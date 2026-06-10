import { buildCanonical } from "@/lib/seo";

export const metadata = {
  title: "Search Peptides",
  description: "Search BioPeptide Sci’s research peptide catalog for peptides, blends, and compounds.",
  alternates: {
    canonical: buildCanonical("/search"),
  },
};

export default function SearchLayout({ children }) {
  return children;
}
