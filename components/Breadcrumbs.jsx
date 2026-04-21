// peptides/components/Breadcrumbs.jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { PRODUCTS } from "@/data/products";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const { translations } = useLanguage();
  const [categoryPath] = useState(() => {
    if (typeof window === "undefined") return null;
    return sessionStorage.getItem("lastCategory");
  });

  if (!pathname || !translations) return null;

  const segments = pathname.split("/").filter(Boolean);
  const t = (key) =>
    translations?.breadcrumbs?.[key] || key.replace(/-/g, " ");

  const isProductPage = segments[0] === "product";
  const productSlug = segments[1];
  const product = PRODUCTS.find((p) => p.slug === productSlug);

  return (
    <nav className="w-full bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3 text-sm text-gray-600">
        <ul className="flex items-center gap-2 flex-wrap">
          <li>
            <Link href="/" className="hover:text-black font-medium">
              {t("home")}
            </Link>
          </li>

          {isProductPage ? (
            <>
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
            segments.map((segment, index) => {
              const href = "/" + segments.slice(0, index + 1).join("/");
              const isLast = index === segments.length - 1;

              return (
                <li key={href} className="flex items-center gap-2">
                  <span>/</span>
                  {isLast ? (
                    <span className="text-black capitalize font-medium">
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
