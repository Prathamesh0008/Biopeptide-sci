// app/order-success/page.jsx
"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Suspense } from "react";
import OrderSuccessClient from "./OrderSuccessClient";

export default function OrderSuccessPage() {
  return (
    <>
      <Navbar />

      <Suspense
        fallback={
          <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
            Loading order details…
          </div>
        }
      >
        <OrderSuccessClient />
      </Suspense>

      <Footer />
    </>
  );
}











