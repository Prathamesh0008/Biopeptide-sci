// app/product/layout.jsx
import { PRODUCTS } from "@/data/products";

export async function generateMetadata({ params }) {
  const product = PRODUCTS.find(p => p.slug === params.slug);

  if (!product) {
    return {
      title: "BioPeptide Products",
      robots: "index, follow"
    };
  }

  const seo = product.seo || {
    title: product.name,
    description: product.description || "",
    canonical: `https://www.bio-peptides.com/product/${product.slug}`,
    keywords: [],
    robots: "index, follow"
  };

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    robots: seo.robots,

    alternates: {
      canonical: seo.canonical
    },

    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonical,
      images: [
        {
          url: `https://www.bio-peptides.com${product.image}`,
          width: 800,
          height: 800,
          alt: product.name
        }
      ]
    }
  };
}

export default function ProductLayout({ children }) {
  return children;
}









// //peptides\app\product\layout.jsx
// import { PRODUCTS } from "@/data/products";

// export async function generateMetadata({ params }) {
//   const product = PRODUCTS.find(p => p.slug === params.slug);

//   if (!product) {
//     return {
//   title: "Buy BPC-157 Peptide 5mg – CAS 137525-51-0 ",
//   description:
//     "Buy BPC-157 5mg research peptide (CAS 137525-51-0) from BioPeptide. ≥99% HPLC purity. Studied for angiogenic signaling, cytoprotection, nitric oxide pathways, and extracellular matrix remodeling in regenerative research. For Research Use Only.",
//   keywords: [
//     "BPC-157",
//     "BPC-157 peptide",
//     "BPC-157 5mg",
//     "CAS 137525-51-0",
//     "research peptide BPC-157",
//     "angiogenic signaling peptide",
//     "regenerative research peptide",
//     "high purity peptides",
//     "buy BPC-157 online"
//   ],
//   robots: "index, follow",
//   alternates: {
//     canonical: "https://www.bio-peptides.com/product/bpc-157-5mg"
//   }
// };

//   }

//   const seo = product.seo;

//   return {
//     title: seo.title,
//     description: seo.description,
//     keywords: seo.keywords,
//     robots: seo.robots,

//     alternates: {
//       canonical: seo.canonical
//     },

//     openGraph: {
//       title: seo.title,
//       description: seo.description,
//       url: seo.canonical,
//       images: [
//   {
//     url: `https://www.bio-peptides.com${product.image}`,
//     width: 800,
//     height: 800,
//     alt: product.name
//   }
// ]

//     }
//   };
// }

// export default function ProductLayout({ children }) {
//   return children;
// } 









// //peptides\app\product\layout.jsx
// import { PRODUCTS } from "@/data/products";

// export async function generateMetadata({ params }) {
//   const product = PRODUCTS.find(p => p.slug === params.slug);

//   if (!product) {
//     return {
//       title: "Buy BPC-157 Peptide 5mg – CAS 137525-51-0 | BioPeptide",
//       robots: "index, follow"
//     };
//   }

//   const seo = product.seo;

//   return {
//     title: seo.title,
//     description: seo.description,
//     keywords: seo.keywords,
//     robots: seo.robots,

//     alternates: {
//       canonical: seo.canonical
//     },

//     openGraph: {
//       title: seo.title,
//       description: seo.description,
//       url: seo.canonical,
//       images: [
//         {
//           url: product.image,
//           width: 800,
//           height: 800,
//           alt: product.name
//         }
//       ]
//     }
//   };
// }

// export default function ProductLayout({ children }) {
//   return children;
// }
