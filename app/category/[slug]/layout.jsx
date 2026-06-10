import { buildCanonical } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  return {
    title: `${slug.replace(/-/g, " ")} | BioPeptide Sci`,
    description: `Browse ${slug.replace(/-/g, " ")} peptide products from BioPeptide Sci.`,
    alternates: {
      canonical: buildCanonical(`/category/${slug}`),
    },
  };
}

export default function CategorySlugLayout({ children }) {
  return children;
}
