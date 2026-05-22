// //hooks\useProducts.js
// "use client";

// import { PRODUCT_TABS } from "@/data/products";

// export function useProducts() {
//   const products = Array.isArray(PRODUCT_TABS)
//     ? PRODUCT_TABS.flatMap((tab) => {
//         if (Array.isArray(tab.products)) return tab.products;
//         if (Array.isArray(tab.items)) return tab.items;
//         if (Array.isArray(tab.data)) return tab.data;
//         return [];
//       })
//     : [];

//   return {
//     products,
//   };
// }

"use client";

import { useEffect, useState } from "react";

let cachedProducts = null;
let productsPromise = null;

async function getProducts() {
  if (cachedProducts) return cachedProducts;

  if (!productsPromise) {
    productsPromise = fetch("/api/sidebar-products")
      .then((res) => res.json())
      .then((data) => {
        cachedProducts = Array.isArray(data.products) ? data.products : [];
        return cachedProducts;
      })
      .catch((error) => {
        productsPromise = null;
        throw error;
      });
  }

  return productsPromise;
}

export function useProducts() {
  const [products, setProducts] = useState(cachedProducts || []);
  const [loading, setLoading] = useState(!cachedProducts);

  useEffect(() => {
    let isMounted = true;

    getProducts()
      .then((items) => {
        if (isMounted) {
          setProducts(items);
        }
      })
      .catch((error) => {
        console.error("useProducts fetch error:", error);

        if (isMounted) {
          setProducts([]);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    products,
    loading,
  };
}
