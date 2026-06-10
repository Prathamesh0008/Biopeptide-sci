// app/contact/layout.jsx

import { PageJsonLd, createPageSchema } from "@/lib/pageSchema";

const title = "Contact BioPeptide | Buy Peptides Online & Research Support";
const description =
  "Get in touch with BioPeptide for research peptide inquiries, product support, or ordering assistance. Buy peptides online with expert guidance.";

export const metadata = {
  title,

  description,

  keywords: [
    "contact biopeptide",
    "research peptide support",
    "buy peptides online support",
    "peptide supplier contact usa",
    "biopeptide customer support",
    "research peptide inquiries",
    "peptide ordering assistance",
    "biopeptide sci contact",
  ],

  alternates: {
    canonical: "https://www.bio-peptides.com/contact",
  },

  openGraph: {
    title,
    description,
    url: "https://www.bio-peptides.com/contact",
    siteName: "BioPeptide",
    images: [
      {
        url: "https://www.bio-peptides.com/Biologofull.png",
        width: 1200,
        height: 630,
        alt: "Contact BioPeptide – Research Peptide Support USA",
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

export default function ContactLayout({ children }) {
  const schema = createPageSchema({
    path: "/contact",
    name: title,
    description,
    breadcrumbName: "Contact",
    pageType: "ContactPage",
  });

  return (
    <>
      <PageJsonLd data={schema} />
      {children}
    </>
  );
}
