import { buildCanonical } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { id } = await params;

  return {
    title: `Bundle ${id} | BioPeptide Sci`,
    description: `View the BioPeptide Sci bundle offer ${id} and its included products.`,
    alternates: {
      canonical: buildCanonical(`/bundle/${id}`),
    },
  };
}

export default function BundleIdLayout({ children }) {
  return children;
}
