// app/peptide-research/layout.jsx

export const metadata = {
  metadataBase: new URL("https://biopeptide-sci.vercel.app"),

  title: "Peptide Research & Scientific Development | USA – BioPeptide",

  description:
    "BioPeptide Sci specializes in peptide research compounds for scientific research. USA-focused supply of high-purity peptides for laboratory development.",

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
    title: "Peptide Research & Scientific Development | USA – BioPeptide",
    description:
      "BioPeptide Sci specializes in peptide research compounds for scientific research. USA-focused supply of high-purity peptides for laboratory development.",
    url: "/peptide-research",
    siteName: "BioPeptide",
    images: [
      {
        url: "/Biopeptidecolourlogo.png",
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
    title: "Peptide Research & Scientific Development | USA – BioPeptide",
    description:
      "BioPeptide Sci specializes in peptide research compounds for scientific research. USA-focused supply of high-purity peptides for laboratory development.",
    images: ["/Biopeptidecolourlogo.png"],
  },
};

export default function PeptideResearchLayout({ children }) {
  return <>{children}</>;
}
