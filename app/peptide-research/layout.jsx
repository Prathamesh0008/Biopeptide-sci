// app/peptide-research/layout.jsx

import { PageJsonLd, createPageSchema } from "@/lib/pageSchema";

const title = "Peptide Research & Scientific Development | USA - BioPeptide";
const description =
  "BioPeptide Sci specializes in peptide research compounds for scientific research. USA-focused supply of high-purity peptides for laboratory development.";

export const metadata = {
  metadataBase: new URL("https://www.bio-peptides.com"),

  title,

  description,

  keywords: [
    "peptide research",
    "scientific peptide development",
    "research peptide compounds",
    "laboratory peptides usa",
    "high purity peptides",
    "peptide research usa",
    "scientific peptides",
    "biopeptide sci research",
    "peptides for laboratory development",
  ],

  alternates: {
    canonical: "/peptide-research",
  },

  openGraph: {
    title,
    description,
    url: "/peptide-research",
    siteName: "BioPeptide",
    images: [
      {
        url: "/Biologofull.png",
        width: 1200,
        height: 630,
        alt: "Peptide Research and Scientific Development USA - BioPeptide",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/Biologofull.png"],
  },
};

export default function PeptideResearchLayout({ children }) {
  const schema = createPageSchema({
    path: "/peptide-research",
    name: title,
    description,
    breadcrumbName: "Peptide Research",
    pageType: "WebPage",
  });

  return (
    <>
      <PageJsonLd data={schema} />
      {children}
    </>
  );
}
