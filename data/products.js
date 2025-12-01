// peptides\data\products.js

// LEFT SIDEBAR GROUPS (Filter / Navigation)
export const CATEGORY_GROUPS = [
  {
    title: "Peptide Capsules",
    items: [
      "5-Amino-1MQ 50mg (60 Capsules)",
      "BPC-157 500mcg (60 Capsules)",
      "Dihexa 5mg (60 Capsules)",
      "Epitalon 3mg (60 Capsules)",
      "GHK-Cu 2mg (60 Capsules)",
      "NMN 500mg (60 Capsules)",
    ],
  },
  {
    title: "Purchase Peptides",
    items: [
      "Adipotide (FTPP) 10mg",
      "AOD9604 5mg",
      "BPC-157 5mg / 10mg",
      "CJC-1295 no DAC 2mg",
      "Ipamorelin 5mg / 10mg",
    ],
  },
];

// MAIN PRODUCT LIST
// You can add 500+ products here with same structure.
  export const PRODUCTS = [
  {
    id: "bpc-157-5mg",
    slug: "bpc-157-5mg",
    name: "BPC-157 5mg",
    category: "Popular Peptides",
    price: 140.0,
    strength: "High-purity research peptide.",
    cas: "137525-51-0",
    size: "5mg vial",
    purity: "≥ 99% (HPLC)",
    stock: true,
    badge: "Best Seller",
    description: "BPC-157 is used in regeneration research.",
    image:  "/images/product.png",
  },

  {
    id: "bpc-tb500-glow-blend",
    slug: "bpc-tb500-glow-blend",
    name: "Glow Blend (BPC-157 + TB-500)",
    category: "Peptide Blends",
    price: 315.0,
    strength: "Synergistic recovery blend for research use.",
    size: "20mg blend",
    purity: "≥ 99% (HPLC)",
    description: "Powerful dual-peptide blend for research.",
    image:  "/images/product.png",
  },

  {
    id: "5-amino-1mq-50mg",
    slug: "5-amino-1mq-50mg",
    name: "5-Amino-1MQ 50mg (60 Capsules)",
    category: "Peptide Capsules",
    price: 255.0,
    strength: "Metabolic research capsule formula.",
    size: "50mg x 60 capsules",
    purity: "≥ 98%",
    description: "NNMT inhibitor research compound.",
    image:  "/images/product.png",
  },

  {
    id: "aod9604-5mg",
    slug: "aod9604-5mg",
    name: "AOD9604 5mg",
    category: "Popular Peptides",
    price: 200.0,
    strength: "Fragment peptide for fat-loss research.",
    size: "5mg vial",
    purity: "≥ 99% (HPLC)",
    description: "HGH fragment peptide for fat metabolism studies.",
    image:  "/images/product.png",
  },

  {
    id: "ghk-cu-2mg",
    slug: "ghk-cu-2mg",
    name: "GHK-Cu 2mg",
    category: "Cosmetic Peptides",
    price: 180.0,
    strength: "Topical cosmetic peptide for skin research.",
    size: "2mg vial",
    purity: "≥ 98%",
    description: "Skincare and collagen-support research peptide.",
    image:  "/images/product.png",
  },

  {
    id: "ipamorelin-5mg",
    slug: "ipamorelin-5mg",
    name: "Ipamorelin 5mg",
    category: "IGF-1 Proteins",
    price: 220.0,
    strength: "Growth hormone secretagogue for research.",
    size: "5mg vial",
    purity: "≥ 99% (HPLC)",
    description: "Selective GH secretagogue research peptide.",
    image:  "/images/product.png",
  }
  
];

// TAB FILTERS ABOVE GRID (if you want to use them later)
export const PRODUCT_TABS = [
  "All",
  "Popular Peptides",
  "Peptide Capsules",
  "Peptide Blends",
  "IGF-1 Proteins",
  "Melanotan Peptides",
  "Bioregulators",
  "Cosmetic Peptides",
];
