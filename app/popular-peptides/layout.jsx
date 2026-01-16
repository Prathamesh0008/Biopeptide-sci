// app/popular-peptides/layout.jsx

export const metadata = {
  title:
    "Popular Research Peptides in the USA | High-Purity Peptides – BioPeptide",

  description:
    "Explore popular research peptides in the USA including BPC-157, CJC-1295, AOD9604 and more. High-purity peptides for scientific research and laboratory use.",

  alternates: {
    canonical: "https://www.bio-peptides.com/popular-peptides",
  },

  openGraph: {
    title:
      "Popular Research Peptides in the USA | High-Purity Peptides – BioPeptide",
    description:
      "Explore popular research peptides in the USA including BPC-157, CJC-1295, AOD9604 and more. High-purity peptides for scientific research and laboratory use.",
    url: "https://www.bio-peptides.com/popular-peptides",
    siteName: "BioPeptide",
    images: [
      {
        url: "https://www.bio-peptides.com/Biopeptidecolourlogo.png",
        width: 1200,
        height: 630,
        alt: "Popular Research Peptides USA - BioPeptide",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Popular Research Peptides in the USA | High-Purity Peptides – BioPeptide",
    description:
      "Explore popular research peptides in the USA including BPC-157, CJC-1295, AOD9604 and more. High-purity peptides for scientific research and laboratory use.",
    images: ["https://www.bio-peptides.com/Biopeptidecolourlogo.png"],
  },
};

export default function PopularPeptidesLayout({ children }) {
  return <>{children}</>;
}





// export const metadata = {
//   title: "Popular Research Peptides in the USA | High-Purity Peptides – BioPeptide",
//   description:
//     "Explore popular research peptides in the USA including BPC-157, CJC-1295, AOD9604 and more. High-purity peptides for scientific research and laboratory use.",
// };

// export default function PopularPeptidesLayout({ children }) {
//   return children;
// }
