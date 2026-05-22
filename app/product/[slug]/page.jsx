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

<<<<<<< HEAD
  const product = PRODUCTS.find((p) => p.slug === slug);
  const langProduct = productLang?.products?.[slug];

  if (!product || !langProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Product not found
      </div>
    );
  }

  const { name, cas, strength, topDescription, content } = langProduct;
const [activeTab, setActiveTab] = useState("chemical");
const [qty, setQty] = useState(1);

const handleAddToCart = () => {
  const userStr = localStorage.getItem("bio-user");
  const user = userStr ? JSON.parse(userStr) : null;

  const cartKey = user?.email
    ? `bio-cart-${user.email}`
    : "guest-cart";

  const cart = JSON.parse(localStorage.getItem(cartKey) || "[]");
  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      qty: qty,
      image: product.image,
      strength: product.size
    });
  }

  localStorage.setItem(cartKey, JSON.stringify(cart));
  window.dispatchEvent(new Event("bio-cart-updated"));

  // ✅ go to cart page
  // window.location.href = "/cart";
};


  return (
    <>
      <Navbar />
      <Breadcrumbs />
{/* BACK BUTTON */}
<div className="max-w-7xl mx-auto px-4 mt-4">
  <button
    onClick={() => router.back()}
    className="
      inline-flex items-center gap-2
      text-sm font-semibold
      text-gray-700
      hover:text-black
      transition
      cursor-pointer
    "
  >
    ← Back
  </button>
</div>

      <main className="bg-white min-h-screen">
        
        
{/* PRODUCT HERO */}
<section className="max-w-7xl mx-auto px-4 py-10">
  <div className="grid grid-cols-1 lg:grid-cols-[390px_1fr_320px] gap-10 items-start">

    {/* LEFT – PRODUCT IMAGE (NO BG) */}
    <div className="flex justify-center">
<div className="relative w-[390px] h-[390px] lg:w-[490px] lg:h-[490px]">
        <Image
          src={product.image}
          alt={name}
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>

    {/* MIDDLE – PRODUCT INFO */}
    <div className="space-y-6 pl-14">
      <h1 className="text-3xl font-bold text-gray-900">{name}</h1>

      <p className="text-sm text-gray-600">
        <b>CAS:</b> {cas}
      </p>

      <div className="space-y-2 text-sm leading-6 text-gray-700 max-w-[420px]">
        {Array.isArray(strength) &&
          strength.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
      </div>
    </div>

    {/* RIGHT – ADD TO CART */}
    <div className=" p-6 space-y-5 bg-white ">
      {/* PRICE */}
      <p className="text-3xl font-bold text-black-600">
        ${product.price.toFixed(2)}
      </p>

      {/* NOTE */}
      <div className="bg-gray-100 rounded-md p-3 text-xs text-gray-700">
        Products will arrive in a lyophilized (powder) form for maximum stability
      </div>

      {/* MG SELECT (UI ONLY FOR NOW) */}
      {/* <div className="space-y-2">
        <p className="text-sm font-semibold">Select mg:</p>
        <div className="flex gap-2">
          {["5mg", "10mg", "15mg"].map((mg) => (
            <button
              key={mg}
              className={`px-4 py-2 text-sm rounded-md border ${
                mg === product.size
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {mg}
            </button>
          ))}
        </div>
      </div> */}

      {/* QTY */}
     <div className="flex items-center border rounded-md w-fit">
  <button
    onClick={() => setQty((q) => Math.max(1, q - 1))}
    className="px-4 py-2 text-lg"
  >
    −
  </button>

  <span className="px-4">{qty}</span>

  <button
    onClick={() => setQty((q) => q + 1)}
    className="px-4 py-2 text-lg"
  >
    +
  </button>
</div>


      {/* ADD TO CART */}
 <button
  onClick={handleAddToCart}
  className="
    w-full
    bg-gradient-to-r from-[#52c3c6] via-[#0a79a8] to-[#0978a7]
    text-white text-sm font-semibold
    py-3 rounded-md
    transition-all duration-300
    cursor-pointer
  "
>
  Add to Cart
</button>



      <p className="text-xs text-gray-500 text-center">
        Research Use Only
      </p>
    </div>

  </div>
</section>


       

      {/* LOWER CONTENT AREA */}
<section className="max-w-7xl mx-auto px-4 mt-16 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">
  
  {/* LEFT SIDEBAR */}
  <Sidebar />

  {/* RIGHT CONTENT */}
  <div>
    {/* TABS */}
<div className="flex gap-8 border-b text-sm font-semibold uppercase">
  <button
    onClick={() => setActiveTab("chemical")}
    className={`pb-3 ${
      activeTab === "chemical"
        ? "border-b-2 border-black text-black  cursor-pointer"
        : "text-gray-500  cursor-pointer"
    }`}
  >
    Chemical Properties
  </button>

  <button
    onClick={() => setActiveTab("description")}
    className={`pb-3 ${
      activeTab === "description"
        ? "border-b-2 border-black text-black  cursor-pointer"
        : "text-gray-500  cursor-pointer"
    }`}
  >
    Description
  </button>

  <button
    onClick={() => setActiveTab("coa")}
    className={`pb-3 ${
      activeTab === "coa"
        ? "border-b-2 border-black text-black  cursor-pointer"
        : "text-gray-500  cursor-pointer"
    }`}
  >
    COA / HPLC / MS
  </button>
</div>

    {/* TAB CONTENT */}
    <div className="py-8 space-y-6 text-sm text-gray-700">
{activeTab === "chemical" && (
  <div className="mt-8">

    {/* CENTERED NARROW CONTAINER */}
    <div className="max-w-[760px] border rounded-md overflow-hidden">

     {content?.chemicalProperties &&
  Object.entries(content.chemicalProperties).map(
    ([key, value], index) => (
      <div
        key={key}
        className={`grid grid-cols-[240px_1fr] px-6 py-4 text-sm ${
          index % 2 === 0 ? "bg-white" : "bg-gray-50"
        }`}
      >
        {/* LABEL */}
        <div className="font-semibold text-gray-900">
          {key.replace(/([A-Z])/g, " $1")}
        </div>

        {/* VALUE */}
        <div className="text-gray-700 break-all leading-6">
          {value}
        </div>
      </div>
    )
  )}


    </div>

  </div>
)}



{activeTab === "description" && (
  <div className="space-y-6 mt-6 text-sm leading-6 text-gray-700">

    {/* OVERVIEW */}
    <h2 className="text-lg font-semibold">{content.overviewTitle}</h2>
    {content.overview.map((p, i) => <p key={i}>{p}</p>)}

    {/* SCIENTIFIC BACKGROUND */}
    <h2 className="text-lg font-semibold mt-6">
      {content.scientificBackgroundTitle}
    </h2>
    {content.scientificBackground.map((p, i) => <p key={i}>{p}</p>)}

    {/* MECHANISM */}
    <h2 className="text-lg font-semibold mt-6">
      {content.mechanismTitle}
    </h2>
    <ul className="list-disc pl-5 space-y-1">
      {content.mechanismPoints.map((m, i) => (
        <li key={i}>{m}</li>
      ))}
    </ul>

    {/* APPLICATIONS */}
    <h2 className="text-lg font-semibold mt-6">
      {content.applicationsTitle}
    </h2>
    {content.applications.map((a, i) => (
      <p key={i}><b>{a.title}:</b> {a.text}</p>
    ))}

    {/* MOLECULAR CHARACTERISTICS */}
    <h2 className="text-lg font-semibold mt-6">
      {content.molecularTitle}
    </h2>
    <ul className="list-disc pl-5 space-y-1">
      {content.molecularPoints.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>

    {/* STABILITY */}
    <h2 className="text-lg font-semibold mt-6">
      {content.stabilityTitle}
    </h2>
    <ul className="list-disc pl-5 space-y-1">
      {content.stabilityPoints.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>

    {/* SOLUBILITY */}
    <h2 className="text-lg font-semibold mt-6">
      {content.solubilityTitle}
    </h2>
    <ul className="list-disc pl-5 space-y-1">
      {content.solubilityPoints.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>

    {/* TECH SPECS */}
    <h2 className="text-lg font-semibold mt-6">
      {content.techSpecsTitle}
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
      {Object.entries(content.techSpecs).map(([key, value]) => (
        <div key={key} className="border rounded p-4 bg-gray-50">
          <p className="text-xs uppercase text-gray-500">
            {key.replace(/([A-Z])/g, " $1")}
          </p>
          <p className="font-semibold text-gray-900 mt-1">
            {value}
          </p>
        </div>
      ))}
    </div>

    {/* VALIDATION */}
    <h2 className="text-lg font-semibold mt-6">
      {content.validationTitle}
    </h2>
    <ul className="list-disc pl-5 space-y-1">
      {content.validationPoints.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>

    {/* WHY SOURCE */}
    <h2 className="text-lg font-semibold mt-6 cursor-pointer">
      {content.whyTitle}
    </h2>
    <p>{content.whyText}</p>

{/* FAQ */}
<h2 className="text-lg font-semibold mt-6">
  {content.faqTitle}
</h2>

<div className="space-y-3">
  {content.faqItems.map((f, i) => {
    const isOpen = openFaq === i;

    return (
      <div
        key={i}
        className="border-b py-3"
      >
        {/* QUESTION */}
        <button
          onClick={() => setOpenFaq(isOpen ? null : i)}
          className="w-full flex items-center justify-between text-left cursor-pointer"
        >
          <span className="font-semibold text-gray-900">
            {f.q}
          </span>

          {/* ARROW */}
          <span
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        </button>

        {/* ANSWER */}
        <div
          className={`grid transition-all duration-300 ease-in-out ${
            isOpen ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <p className="text-sm text-gray-700 leading-6">
              {f.a}
            </p>
          </div>
        </div>
      </div>
    );
  })}
</div>


  </div>
)}


{activeTab === "coa" && (
  <div className="flex justify-center mt-8">
    <div className="relative w-full max-w-4xl h-[750px] border rounded">
      <Image
        src={product.coaImage}
        alt={`${name} COA`}
        fill
        className="object-contain"
      />
    </div>
  </div>
)}
    </div>
  </div>
</section>

      </main>

      <Footer />
    </>
=======
      return true;
    })
>>>>>>> dde900b908d570418087d0752ad16a5a2fc9fd18
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
