// peptides/components/Breadcrumbs.jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";
import { PRODUCTS } from "@/data/products";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const { translations } = useLanguage();

  const [categoryPath, setCategoryPath] = useState(null);

  if (!pathname || !translations) return null;

  const segments = pathname.split("/").filter(Boolean);

  const t = (key) =>
    translations?.breadcrumbs?.[key] ||
    key.replace(/-/g, " ");

  // ✅ get last category (from navbar click)
  useEffect(() => {
    const last = sessionStorage.getItem("lastCategory");
    if (last) setCategoryPath(last);
  }, []);

  // ✅ detect product
  const isProductPage = segments[0] === "product";
  const productSlug = segments[1];
  const product = PRODUCTS.find((p) => p.slug === productSlug);

  return (
    <nav className="w-full bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3 text-sm text-gray-600">
        <ul className="flex items-center gap-2 flex-wrap">

          {/* HOME */}
          <li>
            <Link href="/" className="hover:text-black font-medium">
              {t("home")}
            </Link>
          </li>

          {/* ✅ PRODUCT PAGE LOGIC */}
          {isProductPage ? (
            <>
              {/* CATEGORY */}
              {categoryPath && (
                <li className="flex items-center gap-2">
                  <span>/</span>
                  <Link
                    href={categoryPath}
                    className="hover:text-black capitalize"
                  >
                    {t(categoryPath.replace("/", ""))}
                  </Link>
                </li>
              )}

              {/* PRODUCT NAME */}
              {product && (
                <li className="flex items-center gap-2">
                  <span>/</span>
                  <span className="text-black capitalize font-medium">
                    {product.name}
                  </span>
                </li>
              )}
            </>
          ) : (
            // ✅ NORMAL PAGES (your original logic)
            segments.map((segment, index) => {
              const href = "/" + segments.slice(0, index + 1).join("/");
              const isLast = index === segments.length - 1;

              return (
                <li key={href} className="flex items-center gap-2">
                  <span>/</span>

                  {isLast ? (
                    <span className="text-black capitalize">
                      {t(segment)}
                    </span>
                  ) : (
                    <Link href={href} className="hover:text-black capitalize">
                      {t(segment)}
                    </Link>
                  )}
                </li>
              );
            })
          )}
        </ul>
      </div>
    </nav>
  );
}