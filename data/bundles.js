// peptides/data/bundles.js

export const BUNDLES = [
  {
    id: "research-starter",
    title: "Research Starter Bundle",
    discount: "Save 15%",
    description:
      "A perfect introductory mix of BioPeptide compounds for primary research workflows.",
    price: 149.99,
    original: 176.0,

    // match EXACT product id from products.js
    products: [
      "bpc-157-5mg",
      "ipamorelin-5mg",
      "aod9604-5mg",
    ],
  },

  {
    id: "advanced-pathway",
    title: "Advanced Pathway Analysis Bundle",
    discount: "Save 22%",
    description:
      "Designed for cell pathway stimulation, receptor binding and regenerative modeling.",
    price: 249.99,
    original: 320.0,

    products: [
      "ghk-cu-2mg",
      "bpc-tb500-glow-blend",
      "5-amino-1mq-50mg",
    ],
  },

  {
    id: "complete-lab-kit",
    title: "Complete Laboratory Research Kit",
    discount: "Save 30%",
    description:
      "The ultimate research-grade peptide kit for multi-pathway analysis and lab efficiency.",
    price: 399.99,
    original: 570.0,

    products: [
      "bpc-157-5mg",
      "ipamorelin-5mg",
      "aod9604-5mg",
      "ghk-cu-2mg",
    ],
  },
];
