// app/page.tsx
"use client";

import { useState } from "react";

import Hero from "@/components/Hero";
import Sidebar from "@/components/Sidebar";
import ProductGrid from "@/components/ProductGrid";
import DrawerProducts from "@/components/DrawerProducts";
import AboutSection from "@/components/AboutSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const homePageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.bio-peptides.com/#organization",
      name: "Bio Peptides",
      url: "https://www.bio-peptides.com/",
      logo: "https://www.bio-peptides.com/images/Bio-logo-Final.svg",
      description:
        "Bio Peptides supplies research peptides and laboratory-use peptide formulations.",
      email: "info@bio-peptides.com",
      sameAs: [],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.bio-peptides.com/#website",
      url: "https://www.bio-peptides.com/",
      name: "Bio Peptides",
      publisher: {
        "@id": "https://www.bio-peptides.com/#organization",
      },
      potentialAction: {
        "@type": "SearchAction",
        target:
          "https://www.bio-peptides.com/search?query={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "WebPage",
      "@id": "https://www.bio-peptides.com/#webpage",
      url: "https://www.bio-peptides.com/",
      name: "Buy Research Peptides Online",
      isPartOf: {
        "@id": "https://www.bio-peptides.com/#website",
      },
      about: {
        "@id": "https://www.bio-peptides.com/#organization",
      },
      description:
        "Research-use peptide products and laboratory peptide solutions.",
      breadcrumb: {
        "@id": "https://www.bio-peptides.com/#breadcrumb",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.bio-peptides.com/#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.bio-peptides.com/",
        },
      ],
    },
    // {
    //   "@type": "CollectionPage",
    //   "@id": "https://www.bio-peptides.com/all-peptides/#collection",
    //   url: "https://www.bio-peptides.com/all-peptides/",
    //   name: "Research Peptides",
    //   description:
    //     "Browse laboratory research peptides available from Bio Peptides.",
    // },
    {
      "@type": "MedicalBusiness",
      "@id": "https://www.bio-peptides.com/#medicalbusiness",
      name: "Bio Peptides",
      url: "https://www.bio-peptides.com/",
      image: "https://www.bio-peptides.com/images/Bio-logo-Final.svg",
      description: "Supplier of research peptides for laboratory use only.",
      medicalSpecialty: "Pharmaceutical",
      email: "info@bio-peptides.com",
    },
  ],
};

export default function HomePage() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
<<<<<<< HEAD
    
    <Navbar/>


      {/* DESKTOP BUTTON */}
    
<button
  onClick={() => setDrawerOpen(true)}
  className="
    fixed right-0 top-1/2 -translate-y-1/2 z-50
    flex items-center justify-center
     bg-gradient-to-r from-[#52c3c6] via-[#0a79a8] to-[#0978a7]
    text-white shadow-lg
    cursor-pointer
    h-36 w-10 rounded-l-xl cursor-pointer
  "
>
  <span
    className="
      text-s font-semibold tracking-widest
      [writing-mode:vertical-rl]
    "
  >
    Product List
  </span>
</button>
=======
      {/* HOME PAGE JSON-LD SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homePageSchema),
        }}
      />
>>>>>>> dde900b908d570418087d0752ad16a5a2fc9fd18

      <Navbar />

      <Hero />

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <Sidebar />
          </div>

          <div className="lg:col-span-3">
            <ProductGrid onOpenFilter={() => setDrawerOpen(true)} />
          </div>
        </div>
      </section>

      <AboutSection />

      <DrawerProducts open={drawerOpen} setOpen={setDrawerOpen} />

      <Footer />
    </>
  );
}