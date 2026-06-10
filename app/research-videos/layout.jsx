import { buildCanonical } from "@/lib/seo";

export const metadata = {
  title: "Research Videos",
  description: "Watch educational research videos and peptide-related content from BioPeptide Sci.",
  alternates: {
    canonical: buildCanonical("/research-videos"),
  },
};

export default function ResearchVideosLayout({ children }) {
  return children;
}
