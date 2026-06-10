// app/about/layout.jsx

import { PageJsonLd, createPageSchema } from "@/lib/pageSchema";

const title = "About BioPeptide Sci | USA Research Peptides Supplier";
const description =
  "BioPeptide provides high-purity research peptides, proteins, and amino acid derivatives. Buy peptides online with confidence, verified quality, and trusted manufacturing standards.";

export const metadata = {
  title,

  description,

  keywords: [
    "about biopeptide sci",
    "research peptides supplier usa",
    "biopeptide research peptides",
    "high purity research peptides",
    "peptide manufacturer usa",
    "trusted peptide supplier",
    "laboratory research peptides",
    "biopeptide quality standards",
    "buy peptides online usa",
  ],

  alternates: {
    canonical: "https://www.bio-peptides.com/about",
  },

  openGraph: {
    title,
    description,
    url: "https://www.bio-peptides.com/about",
    siteName: "BioPeptide",
    images: [
      {
        url: "https://www.bio-peptides.com/Biologofull.png",
        width: 1200,
        height: 630,
        alt: "About BioPeptide Sci – USA Research Peptides Supplier",
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

export default function AboutLayout({ children }) {
  const schema = createPageSchema({
    path: "/about",
    name: title,
    description,
    breadcrumbName: "About",
    pageType: "AboutPage",
  });

  return (
    <>
      <PageJsonLd data={schema} />
      {children}
    </>
  );
}



