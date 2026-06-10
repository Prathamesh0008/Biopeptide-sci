// app/all-peptides/layout.jsx

import { PageJsonLd, createPageSchema } from "@/lib/pageSchema";

const title = "U.S. Research Peptides Supplier for Scientific R&D | BioPeptide";
const description =
  "BioPeptide Sci supplies the United States with high-purity research peptides, peptide proteins and amino acid derivatives for laboratory research and development.";

export const metadata = {
  title,

  description,

  alternates: {
    canonical: "https://www.bio-peptides.com/all-peptides",
  },

  openGraph: {
    title,
    description,
    url: "https://www.bio-peptides.com/all-peptides",
    siteName: "BioPeptide",
    images: [
      {
        url: "https://www.bio-peptides.com/Biologofull.png",
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
    title,
    description,
    images: ["https://www.bio-peptides.com/Biologofull.png"],
  },
};

export default function AllPeptidesLayout({ children }) {
  const schema = createPageSchema({
    path: "/all-peptides",
    name: title,
    description,
    breadcrumbName: "All Peptides",
    pageType: "CollectionPage",
  });

  return (
    <>
      <PageJsonLd data={schema} />
      {children}
    </>
  );
}





// export const metadata = {
//   title: "U.S. Research Peptides Supplier for Scientific R&D | BioPeptide",
//   description:
//     "BioPeptide Sci supplies the United States with high-purity research peptides, peptide proteins and amino acid derivatives for laboratory research and development.",
// };

// export default function AllPeptidesLayout({ children }) {
//   return children;
// }
