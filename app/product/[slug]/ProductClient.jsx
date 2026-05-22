//app\product\[slug]\ProductClient.jsx
"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useLanguage } from "@/contexts/LanguageContext";

const normalizeLanguage = (lang) => {
  const allowed = [
    "en",
    "ar",
    "bg",
    "bs",
    "de",
    "el",
    "es",
    "fr",
    "hr",
    "ja",
    "mk",
    "nl",
    "pt",
    "ro",
    "sq",
    "sr",
    "zh",
  ];

  return allowed.includes(lang) ? lang : "en";
};

const isEmptyValue = (value) => {
  if (value === null || value === undefined) return true;
  if (typeof value === "string" && value.trim() === "") return true;
  if (Array.isArray(value) && value.length === 0) return true;

  if (
    typeof value === "object" &&
    !Array.isArray(value) &&
    Object.keys(value).length === 0
  ) {
    return true;
  }

  return false;
};

const deepMergeLanguage = (fallbackData = {}, selectedData = {}) => {
  const merged = { ...fallbackData };

  for (const key of Object.keys(selectedData || {})) {
    const selectedValue = selectedData[key];
    const fallbackValue = fallbackData[key];

    if (isEmptyValue(selectedValue)) continue;

    if (
      typeof selectedValue === "object" &&
      !Array.isArray(selectedValue) &&
      selectedValue !== null &&
      typeof fallbackValue === "object" &&
      !Array.isArray(fallbackValue) &&
      fallbackValue !== null
    ) {
      merged[key] = deepMergeLanguage(fallbackValue, selectedValue);
    } else {
      merged[key] = selectedValue;
    }
  }

  return merged;
};

const formatChemicalFormula = (formula = "") => {
  return String(formula)
    .split(/(\d+)/)
    .map((part, index) => {
      if (!isNaN(part) && part !== "") {
        return <sub key={index}>{part}</sub>;
      }

      return part;
    });
};

export default function ProductClient({ product }) {
  const router = useRouter();
const { language, translations } = useLanguage();

  const [openFaq, setOpenFaq] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [qty, setQty] = useState(1);

  const currentLanguage = normalizeLanguage(language);
  const isRTL = currentLanguage === "ar";

  const englishProduct = product?.translations?.en || {};
  const selectedLanguageProduct =
    product?.translations?.[currentLanguage] || {};

  const langProduct = deepMergeLanguage(
    englishProduct,
    selectedLanguageProduct
  );

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Product not found
      </div>
    );
  }

  const {
    name = product.name,
    cas = product.cas,
    strength = product.strength,
    content = {},
  } = langProduct;

  const hasCOA = product.coaImages && product.coaImages.length > 0;

  const labels = {
  back: translations?.productPage?.back || "Back",
  addToCart: translations?.productPage?.addToCart || "Add to Cart",
  description: translations?.productPage?.description || "Description",
  coa: translations?.productPage?.coa || "COA / HPLC / MS",
  chemicalProperties:
    translations?.productPage?.chemicalProperties || "Chemical Properties",

  // These will NOT translate
  cas: "CAS",
  researchUseOnly: "Research Use Only",
  powderNote:
    "Products will arrive in a lyophilized (powder) form for maximum stability",
};

  const handleAddToCart = () => {
    const userStr = localStorage.getItem("bio-user");
    const user = userStr ? JSON.parse(userStr) : null;

    const cartKey = user?.email ? `bio-cart-${user.email}` : "guest-cart";

    const cart = JSON.parse(localStorage.getItem(cartKey) || "[]");
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({
        id: product.id,
        name,
        price: product.price,
        qty,
        image: product.image,
        strength: product.size,
      });
    }

    localStorage.setItem(cartKey, JSON.stringify(cart));
    window.dispatchEvent(new Event("bio-cart-updated"));
  };

  const renderImage = (index) => {
    const img = product.descriptionImages?.[index];
    if (!img) return null;

    return (
      <div className="my-4">
        <div className="relative w-full max-w-2xl mx-auto h-[380px] lg:h-[460px]">
          <Image
            src={img}
            alt={`${name} image ${index + 1}`}
            fill
            className="object-contain "
          />
        </div>
      </div>
    );
  };
//   const renderImage = (index) => {
//   const img = product.descriptionImages?.[index];
//   if (!img) return null;

//   return (
//     <div className="my-0">
//       <div className="relative w-full h-[420px] lg:h-[560px]">
//         <Image
//           src={img}
//           alt={`${name} image ${index + 1}`}
//           fill
//           className="object-contain"
//           sizes="100vw"
//         />
//       </div>
//     </div>
//   );
// };

  return (
    <>
      <Navbar />
      <Breadcrumbs />

      <div className="max-w-7xl mx-auto px-4 mt-4">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-black transition cursor-pointer"
        >
          ← {labels.back}
        </button>
      </div>

      <main
        dir={isRTL ? "rtl" : "ltr"}
        className={`bg-white min-h-screen ${
          isRTL ? "text-right" : "text-left"
        }`}
      >
        {/* PRODUCT HERO */}
        <section className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-[390px_1fr_320px] gap-10 items-start">
            {/* LEFT IMAGE */}
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

            {/* MIDDLE INFO */}
            <div className={`space-y-6 ${isRTL ? "pr-14" : "pl-14"}`}>
              <h1 className="text-3xl font-bold text-gray-900">{name}</h1>

              <p className="text-sm text-gray-600">
                <b>{labels.cas}:</b> {cas}
              </p>

              <div className="space-y-2 text-sm leading-6 text-gray-700 max-w-[420px]">
                {Array.isArray(strength) ? (
                  strength.map((para, i) => <p key={i}>{para}</p>)
                ) : (
                  <p>{strength}</p>
                )}
              </div>
            </div>

            {/* RIGHT CART */}
            <div className="p-6 space-y-5 bg-white">
              <p className="text-3xl font-bold text-black">
                ${Number(product.price || 0).toFixed(2)}
              </p>

              <div className="bg-gray-100 rounded-md p-3 text-xs text-gray-700">
                {labels.powderNote}
              </div>

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

              <button
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-[#52c3c6] via-[#0a79a8] to-[#0978a7] text-white text-sm font-semibold py-3 rounded-md transition-all duration-300 cursor-pointer"
              >
                {labels.addToCart}
              </button>

              <p className="text-xs text-gray-500 text-center">
                {labels.researchUseOnly}
              </p>
            </div>
          </div>
        </section>

        {/* LOWER CONTENT */}
        <section className="max-w-7xl mx-auto px-4 mt-16 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">
          <Sidebar />

          <div>
            {/* TABS */}
            <div className="flex gap-8 border-b text-sm font-semibold uppercase">
              {!hasCOA && (
                <button
                  onClick={() => setActiveTab("chemical")}
                  className={`pb-3 cursor-pointer ${
                    activeTab === "chemical"
                      ? "border-b-2 border-black text-black"
                      : "text-gray-500"
                  }`}
                >
                  {labels.chemicalProperties}
                </button>
              )}

              <button
                onClick={() => setActiveTab("description")}
                className={`pb-3 cursor-pointer ${
                  activeTab === "description"
                    ? "border-b-2 border-black text-black"
                    : "text-gray-500"
                }`}
              >
                {labels.description}
              </button>

              {hasCOA && (
                <button
                  onClick={() => setActiveTab("coa")}
                  className={`pb-3 cursor-pointer ${
                    activeTab === "coa"
                      ? "border-b-2 border-black text-black"
                      : "text-gray-500"
                  }`}
                >
                  {labels.coa}
                </button>
              )}
            </div>

            {/* TAB CONTENT */}
            <div className="py-8 space-y-6 text-sm text-gray-700">
              {activeTab === "chemical" && content?.chemicalProperties && (
                <div className="mt-8">
                  <div className="max-w-[760px] border rounded-md overflow-hidden">
                    {Object.entries(content.chemicalProperties).map(
                      ([key, value], index) => (
                        <div
                          key={key}
                          className={`grid grid-cols-[240px_1fr] px-6 py-4 text-sm ${
                            index % 2 === 0 ? "bg-white" : "bg-gray-50"
                          }`}
                        >
                          <div className="font-semibold text-gray-900">
                            {key.replace(/([A-Z])/g, " $1")}
                          </div>

                          <div className="text-gray-700 break-all leading-6">
                            {key === "molecularFormula"
                              ? formatChemicalFormula(value)
                              : value}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {activeTab === "description" && (
                <div className="space-y-6 mt-6 text-sm leading-6 text-gray-700">
                  {content.overviewTitle && (
                    <h2 className="text-lg font-semibold">
                      {content.overviewTitle}
                    </h2>
                  )}

                  {Array.isArray(content.overview) &&
                    content.overview.map((p, i) => <p key={i}>{p}</p>)}

                  {renderImage(0)}

                  {content.scientificBackgroundTitle && (
                    <h2 className="text-lg font-semibold mt-6">
                      {content.scientificBackgroundTitle}
                    </h2>
                  )}

                  {Array.isArray(content.scientificBackground) &&
                    content.scientificBackground.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}

                  {renderImage(1)}

                  {content.mechanismTitle && (
                    <h2 className="text-lg font-semibold mt-6">
                      {content.mechanismTitle}
                    </h2>
                  )}

                  {Array.isArray(content.mechanismPoints) && (
                    <ul
                      className={`list-disc space-y-1 ${
                        isRTL ? "pr-5" : "pl-5"
                      }`}
                    >
                      {content.mechanismPoints.map((m, i) => (
                        <li key={i}>{m}</li>
                      ))}
                    </ul>
                  )}

                  {renderImage(2)}

                  {content.applicationsTitle && (
                    <h2 className="text-lg font-semibold mt-6">
                      {content.applicationsTitle}
                    </h2>
                  )}

                  {Array.isArray(content.applications) &&
                    content.applications.map((a, i) => (
                      <p key={i}>
                        <b>{a.title}:</b> {a.text}
                      </p>
                    ))}

                  {content.molecularTitle && (
                    <h2 className="text-lg font-semibold mt-6">
                      {content.molecularTitle}
                    </h2>
                  )}

                  {Array.isArray(content.molecularPoints) && (
                    <ul
                      className={`list-disc space-y-1 ${
                        isRTL ? "pr-5" : "pl-5"
                      }`}
                    >
                      {content.molecularPoints.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}

                  {renderImage(3)}

                  {content.stabilityTitle && (
                    <h2 className="text-lg font-semibold mt-6">
                      {content.stabilityTitle}
                    </h2>
                  )}

                  {Array.isArray(content.stabilityPoints) && (
                    <ul
                      className={`list-disc space-y-1 ${
                        isRTL ? "pr-5" : "pl-5"
                      }`}
                    >
                      {content.stabilityPoints.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}

                  {content.solubilityTitle && (
                    <h2 className="text-lg font-semibold mt-6">
                      {content.solubilityTitle}
                    </h2>
                  )}

                  {Array.isArray(content.solubilityPoints) && (
                    <ul
                      className={`list-disc space-y-1 ${
                        isRTL ? "pr-5" : "pl-5"
                      }`}
                    >
                      {content.solubilityPoints.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}

                  {content.techSpecsTitle && (
                    <h2 className="text-lg font-semibold mt-6">
                      {content.techSpecsTitle}
                    </h2>
                  )}

                  {content.techSpecs && (
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
                  )}

                  {content.validationTitle && (
                    <h2 className="text-lg font-semibold mt-6">
                      {content.validationTitle}
                    </h2>
                  )}

                  {Array.isArray(content.validationPoints) && (
                    <ul
                      className={`list-disc space-y-1 ${
                        isRTL ? "pr-5" : "pl-5"
                      }`}
                    >
                      {content.validationPoints.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}

                  {content.regulatoryTitle && (
                    <h2 className="text-lg font-semibold mt-6">
                      {content.regulatoryTitle}
                    </h2>
                  )}

                  {content.regulatoryText && <p>{content.regulatoryText}</p>}

                  {content.whyTitle && (
                    <h2 className="text-lg font-semibold mt-6">
                      {content.whyTitle}
                    </h2>
                  )}

                  {content.whyText && <p>{content.whyText}</p>}

                  {content.faqTitle && (
                    <h2 className="text-lg font-semibold mt-6">
                      {content.faqTitle}
                    </h2>
                  )}

                  {Array.isArray(content.faqItems) && (
                    <div className="space-y-3">
                      {content.faqItems.map((f, i) => {
                        const isOpen = openFaq === i;

                        return (
                          <div
                            key={i}
                            className="border-b pb-3 cursor-pointer"
                          >
                            <button
                              onClick={() => setOpenFaq(isOpen ? null : i)}
                              className="w-full flex items-center justify-between text-left cursor-pointer"
                            >
                              <span className="font-semibold text-gray-900">
                                {f.q}
                              </span>

                              <span
                                className={`transition-transform duration-300 ${
                                  isOpen ? "rotate-180" : "rotate-0"
                                }`}
                              >
                                ▼
                              </span>
                            </button>

                            <div
                              className={`overflow-hidden transition-all duration-300 ${
                                isOpen ? "max-h-40 mt-2" : "max-h-0"
                              }`}
                            >
                              <p className="text-sm text-gray-700 leading-6">
                                {f.a}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "coa" && product.coaImages?.length > 0 && (
                <div className="mt-8 flex flex-col gap-10 items-center">
                  {product.coaImages.map((img, index) => (
                    <div
                      key={index}
                      className="relative w-full max-w-4xl h-[750px] border rounded-lg overflow-hidden"
                    >
                      <Image
                        src={img}
                        alt={`${name} COA ${index + 1}`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}