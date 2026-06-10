import { buildCanonical } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  return {
    title: `${slug.replace(/-/g, " ")} | BioPeptide Sci`,
    description: `Read more about ${slug.replace(/-/g, " ")} on BioPeptide Sci.`,
    alternates: {
      canonical: buildCanonical(`/peptide-information/${slug}`),
    },
  };
}

export default function PeptideInformationSlugLayout({ children }) {
  return children;
}
