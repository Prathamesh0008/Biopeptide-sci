// app/bundle-save/layout.jsx

export const metadata = {
  title: "Research Peptide Bundle Deals USA | High-Purity Peptides",

  description:
    "Discover research peptide bundle deals in the USA. High-purity peptide combinations supplied for laboratory research and scientific development.",

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
    canonical: "https://biopeptide-sci.vercel.app/bundle-save",
  },

  openGraph: {
    title: "Research Peptide Bundle Deals USA | High-Purity Peptides",
    description:
      "Discover research peptide bundle deals in the USA. High-purity peptide combinations supplied for laboratory research and scientific development.",
    url: "https://biopeptide-sci.vercel.app/bundle-save",
    siteName: "BioPeptide",
    images: [
      {
        url: "https://biopeptide-sci.vercel.app/Biopeptidecolourlogo.png",
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
    title: "Research Peptide Bundle Deals USA | High-Purity Peptides",
    description:
      "Discover research peptide bundle deals in the USA. High-purity peptide combinations supplied for laboratory research and scientific development.",
    images: ["https://biopeptide-sci.vercel.app/Biopeptidecolourlogo.png"],
  },
};

export default function BundleSaveLayout({ children }) {
  return <>{children}</>;
}




// export const metadata = {
//   title: "Research Peptide Bundle Deals USA | High-Purity Peptides",
//   description:
//     "Discover research peptide bundle deals in the USA. High-purity peptide combinations supplied for laboratory research and scientific development.",
// };

// export default function BundleSaveLayout({ children }) {
//   return children;
// }
