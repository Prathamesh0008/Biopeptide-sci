// app/about/layout.jsx

export const metadata = {
  title: "About BioPeptide Sci | USA Research Peptides Supplier",

  description:
    "BioPeptide provides high-purity research peptides, proteins, and amino acid derivatives. Buy peptides online with confidence, verified quality, and trusted manufacturing standards.",

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
    title: "About BioPeptide Sci | USA Research Peptides Supplier",
    description:
      "BioPeptide provides high-purity research peptides, proteins, and amino acid derivatives. Buy peptides online with confidence, verified quality, and trusted manufacturing standards.",
    url: "https://www.bio-peptides.com/about",
    siteName: "BioPeptide",
    images: [
      {
        url: "https://www.bio-peptides.com/Biopeptidecolourlogo.png",
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
    title: "About BioPeptide Sci | USA Research Peptides Supplier",
    description:
      "BioPeptide provides high-purity research peptides, proteins, and amino acid derivatives. Buy peptides online with confidence, verified quality, and trusted manufacturing standards.",
    images: ["https://www.bio-peptides.com/Biopeptidecolourlogo.png"],
  },
};

export default function AboutLayout({ children }) {
  return <>{children}</>;
}



// export const metadata = {
//   title: "About BioPeptide Sci | USA Research Peptides Supplier",
//   description:
//     "BioPeptide provides high-purity research peptides, proteins, and amino acid derivatives. Buy peptides online with confidence, verified quality, and trusted manufacturing standards.",
// };

// export default function AboutLayout({ children }) {
//   return children;
// }
