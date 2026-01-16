// app/all-peptides/layout.jsx

export const metadata = {
  title: "U.S. Research Peptides Supplier for Scientific R&D | BioPeptide",

  description:
    "BioPeptide Sci supplies the United States with high-purity research peptides, peptide proteins and amino acid derivatives for laboratory research and development.",

  alternates: {
    canonical: "https://www.bio-peptides.com/all-peptides",
  },

  openGraph: {
    title: "U.S. Research Peptides Supplier for Scientific R&D | BioPeptide",
    description:
      "BioPeptide Sci supplies the United States with high-purity research peptides, peptide proteins and amino acid derivatives for laboratory research and development.",
    url: "https://www.bio-peptides.com/all-peptides",
    siteName: "BioPeptide",
    images: [
      {
        url: "https://www.bio-peptides.com/Biopeptidecolourlogo.png",
        width: 1200,
        height: 630,
        alt: "BioPeptide Research Peptides Supplier USA",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "U.S. Research Peptides Supplier for Scientific R&D | BioPeptide",
    description:
      "BioPeptide Sci supplies the United States with high-purity research peptides, peptide proteins and amino acid derivatives for laboratory research and development.",
    images: ["https://www.bio-peptides.com/Biopeptidecolourlogo.png"],
  },
};

export default function AllPeptidesLayout({ children }) {
  return <>{children}</>;
}





// export const metadata = {
//   title: "U.S. Research Peptides Supplier for Scientific R&D | BioPeptide",
//   description:
//     "BioPeptide Sci supplies the United States with high-purity research peptides, peptide proteins and amino acid derivatives for laboratory research and development.",
// };

// export default function AllPeptidesLayout({ children }) {
//   return children;
// }
