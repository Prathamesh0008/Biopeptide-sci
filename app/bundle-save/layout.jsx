// app/bundle-save/layout.jsx

import { PageJsonLd, createPageSchema } from "@/lib/pageSchema";

const title = "Research Peptide Bundle Deals USA | High-Purity Peptides";
const description =
  "Discover research peptide bundle deals in the USA. High-purity peptide combinations supplied for laboratory research and scientific development.";

export const metadata = {
  title,
  description,

  keywords: [
    "research peptide bundles",
    "peptide bundle deals usa",
    "peptide combo packs",
    "high purity research peptides",
    "peptide bundles for laboratory research",
    "scientific peptide combinations",
    "buy peptide bundles online",
    "usa peptide supplier",
    "research peptides usa",
  ],

  alternates: {
    canonical: "https://www.bio-peptides.com/bundle-save",
  },

  openGraph: {
    title,
    description,
    url: "https://www.bio-peptides.com/bundle-save",
    siteName: "BioPeptide",
    images: [
      {
        url: "https://www.bio-peptides.com/Biologofull.png",
        width: 1200,
        height: 630,
        alt: "Research Peptide Bundle Deals USA",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["https://www.bio-peptides.com/Biologofull.png"],
  },
};

export default function BundleSaveLayout({ children }) {
  const schema = createPageSchema({
    path: "/bundle-save",
    name: title,
    description,
    breadcrumbName: "Bundle Deals",
    pageType: "CollectionPage",
  });

  return (
    <>
      <PageJsonLd data={schema} />
      {children}
    </>
  );
}
