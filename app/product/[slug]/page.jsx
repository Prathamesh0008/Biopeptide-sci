//app\product\[slug]\page.jsx
import { PRODUCTS } from "@/data/products";
import ProductClient from "./ProductClient";

export async function generateMetadata({ params }) {
  const product = PRODUCTS.find((p) => p.slug === params.slug);

  if (!product) return {};

  return {
    title: product.seo?.title || product.name,
    description: product.seo?.description,
    keywords: product.seo?.keywords,

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
      bingBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    alternates: {
      canonical: product.seo?.canonical,
    },

    openGraph: {
      title: product.seo?.title,
      description: product.seo?.description,
      url: product.seo?.canonical,
      images: [
        {
          url: product.image,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
  };
}

export default function Page() {
  return <ProductClient />;
}