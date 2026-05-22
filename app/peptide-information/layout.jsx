// app/peptide-information/layout.jsx

export const metadata = {
  title: "Peptide Information & Research Education | USA – BioPeptide",

  description:
    "Peptide Information. Learn about peptide bonds, purity, purification, reconstitution, solubility, storage, and synthesis, peptides versus proteins from BioPeptide",

  keywords: [
    "peptide information",
    "peptide research education",
    "peptide bonds",
    "peptide purity",
    "peptide purification",
    "peptide reconstitution",
    "peptide solubility",
    "peptide storage",
    "peptide synthesis",
    "peptides versus proteins",
    "research peptides usa",
    "biopeptide sci education",
  ],

  alternates: {
    canonical: "https://www.bio-peptides.com/peptide-information",
  },

  openGraph: {
    title: "Peptide Information & Research Education | USA – BioPeptide",
    description:
      "Peptide Information. Learn about peptide bonds, purity, purification, reconstitution, solubility, storage, and synthesis, peptides versus proteins from BioPeptide",
    url: "https://www.bio-peptides.com/peptide-information",
    siteName: "BioPeptide",
    images: [
      {
        url: "https://www.bio-peptides.com/Biologofull.png",
        width: 1200,
        height: 630,
        alt: "Peptide Information and Research Education USA - BioPeptide",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Peptide Information & Research Education | USA – BioPeptide",
    description:
      "Peptide Information. Learn about peptide bonds, purity, purification, reconstitution, solubility, storage, and synthesis, peptides versus proteins from BioPeptide",
    images: ["https://www.bio-peptides.com/Biologofull.png"],
  },
};

export default function PeptideInformationLayout({ children }) {
  return <>{children}</>;
}