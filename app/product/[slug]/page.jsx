//app\product\[slug]\page.jsx
import { notFound } from "next/navigation";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";
import ProductClient from "./ProductClient";

export const dynamic = "force-dynamic";

const SITE_URL = "https://www.bio-peptides.com";

function absoluteUrl(value) {
  if (!value) return undefined;

  if (/^https?:\/\//i.test(value)) return value;

  return `${SITE_URL}${value.startsWith("/") ? value : `/${value}`}`;
}

function compactObject(value) {
  return Object.fromEntries(
    Object.entries(value).filter(([, entryValue]) => {
      if (entryValue === null || entryValue === undefined) return false;
      if (Array.isArray(entryValue) && entryValue.length === 0) return false;
      if (typeof entryValue === "string" && entryValue.trim() === "") {
        return false;
      }

      return true;
    })
  );
}

function getEnglishProduct(product) {
  return product?.translations?.en || {};
}

function getProductDescription(product) {
  const englishProduct = getEnglishProduct(product);
  const topDescription = englishProduct?.topDescription || {};

  return (
    product?.seo?.description ||
    topDescription.p0 ||
    product?.description ||
    (Array.isArray(product?.strength) ? product.strength[0] : product?.strength)
  );
}

function getProductStructuredData(product) {
  const englishProduct = getEnglishProduct(product);
  const content = englishProduct?.content || {};
  const chemicalProperties = content.chemicalProperties || {};
  const productUrl =
    product?.seo?.canonical || `${SITE_URL}/product/${product.slug}`;
  const additionalProperty = [
    product.cas && {
      "@type": "PropertyValue",
      name: "CAS Number",
      value: product.cas,
    },
    product.size && {
      "@type": "PropertyValue",
      name: "Size",
      value: product.size,
    },
    product.purity && {
      "@type": "PropertyValue",
      name: "Purity",
      value: product.purity,
    },
    ...Object.entries(chemicalProperties).map(([key, value]) => ({
      "@type": "PropertyValue",
      name: key.replace(/([A-Z])/g, " $1").trim(),
      value,
    })),
  ].filter(Boolean);

  return compactObject({
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${productUrl}#product`,
    name: englishProduct.name || product.name,
    image: [absoluteUrl(product.image)].filter(Boolean),
    description: getProductDescription(product),
    sku: product.id,
    mpn: product.id,
    brand: {
      "@type": "Brand",
      name: "BioPeptide",
    },
    category: product.category,
    keywords: product.seo?.keywords,
    url: productUrl,
    additionalProperty,
    offers: compactObject({
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "USD",
      price: product.price ? String(product.price.toFixed(2)) : undefined,
      availability:
        product.inStock === false
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: "BioPeptide",
      },
    }),
  });
}

function getFaqStructuredData(product) {
  const faqItems = getEnglishProduct(product)?.content?.faqItems;

  if (!Array.isArray(faqItems) || faqItems.length === 0) return null;

  const mainEntity = faqItems
    .filter((item) => item?.q && item?.a)
    .map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    }));

  if (mainEntity.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity,
  };
}

function getStructuredData(product) {
  return [getProductStructuredData(product), getFaqStructuredData(product)].filter(
    Boolean
  );
}

function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

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

  const structuredData = getStructuredData(product);

  return (
    <>
      {structuredData.map((data, index) => (
        <JsonLd key={index} data={data} />
      ))}
      <ProductClient product={product} />
    </>
  );
}
