//app\product\[slug]\page.jsx
import { notFound } from "next/navigation";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";
import ProductClient from "./ProductClient";

export const dynamic = "force-dynamic";

async function getProduct(slug) {
  await dbConnect();

  const product = await Product.findOne({ slug }).lean();

  if (!product) return null;

  return JSON.parse(JSON.stringify(product));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const product = await getProduct(slug);

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

    alternates: product.seo?.canonical
      ? {
          canonical: product.seo.canonical,
        }
      : undefined,

    openGraph: {
      title: product.seo?.title || product.name,
      description: product.seo?.description,
      url: product.seo?.canonical,
      images: product.image
        ? [
            {
              url: product.image,
              width: 1200,
              height: 630,
              alt: product.name,
            },
          ]
        : [],
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;

  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return <ProductClient product={product} />;
}