import { PRODUCTS } from "@/data/products";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const product = PRODUCTS.find(p => p.slug === slug);

  if (!product?.seo) {
    return {
      title: "Product | BioPeptide",
      description: "Premium research peptides from BioPeptide.",
      robots: "noindex",
    };
  }

  const { seo } = product;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    robots: seo.robots,
    alternates: {
      canonical: seo.canonical,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonical,
      images: [
        {
          url: product.image,
          width: 1200,
          height: 1200,
          alt: product.name,
        },
      ],
      type: "website", // ✅ FIXED
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [product.image],
    },
  };
}

export default function Layout({ children }) {
  return children;
}
