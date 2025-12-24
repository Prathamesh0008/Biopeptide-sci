import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Suspense } from "react";
import SearchClient from "./SearchClient";

export default function SearchPage() {
  return (
    <>
      <Navbar />

      <Suspense
        fallback={
          <div className="min-h-[50vh] flex items-center justify-center text-gray-500">
            Loading search results…
          </div>
        }
      >
        <SearchClient />
      </Suspense>

      <Footer />
    </>
  );
}
