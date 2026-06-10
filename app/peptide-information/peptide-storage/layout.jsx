import { buildCanonical } from "@/lib/seo";

export const metadata = {
  title: "Peptide Storage",
  description: "Understand best practices for peptide storage, handling, and stability from BioPeptide Sci.",
  alternates: {
    canonical: buildCanonical("/peptide-information/peptide-storage"),
  },
};

export default function PeptideStorageLayout({ children }) {
  return children;
}
