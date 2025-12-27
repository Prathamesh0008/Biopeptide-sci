//app\peptide-research\page.jsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Suspense } from "react";
import PeptideResearchClient from "./PeptideResearchClient";
import Breadcrumbs from "../../components/Breadcrumbs";

export default function PeptideResearchPage() {
  return (
    <>
      <Navbar />
      <Breadcrumbs/>

      <Suspense
        fallback={
          <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
            Loading research content…
          </div>
        }
      >
        <PeptideResearchClient />
      </Suspense>

      <Footer />
    </>
  );
}
