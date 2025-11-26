import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import ProductContent from "@/components/ProductContent";

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-xl">
        Product Not Found
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white pt-10 pb-20">

      {/* BACK BUTTON */}
      <div className="max-w-7xl mx-auto px-6 mb-4">
        <Link href="/" className="text-bioBlue underline text-sm">
          ← Back to Products
        </Link>
      </div>

      {/* CLEAN, PROFESSIONAL HEADER WITH BIOPEPTIDE COLOR ACCENTS */}
<section className="max-w-7xl mx-auto px-6 mt-10">

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 
                  border border-gray-200 p-10 
                  bg-gradient-to-br from-white via-[#f3faff] to-[#eefcfc]">

    {/* LEFT — IMAGE + BADGES */}
    <div className="flex flex-col gap-6">

      {/* IMAGE */}
      <div className="flex items-center justify-center bg-white border p-6 shadow-sm">
        <Image
          src={product.image || "/images/product.png"}
          width={250}
          height={500}
          alt={product.name}
          className="object-contain"
        />
      </div>

      {/* BADGES */}
      <div className="flex flex-wrap gap-2 text-[11px] font-medium">
        <span className="px-3 py-1 border bg-[#e7f4ff] text-[#0d2d47]">HPLC Tested</span>
        <span className="px-3 py-1 border bg-[#e7f4ff] text-[#0d2d47]">{product.purity}</span>
        <span className="px-3 py-1 border bg-[#eefcfc] text-[#0097b8]">Research Grade</span>
        <span className="px-3 py-1 border bg-[#fff9e6] text-[#b88a00]">COA Available</span>
      </div>

    </div>

    {/* RIGHT — DETAILS */}
    <div className="flex flex-col gap-8">

      {/* TITLE */}
      <h1 className="text-4xl font-bold text-[#0d2d47] leading-tight">
        {product.name}
      </h1>

      {/* SUBTEXT LINE */}
      <p className="text-sm font-medium text-[#0d2d47]/60 border-l-4 border-[#0097b8] pl-3">
        Premium BioPeptide • High-Purity Scientific Research Material
      </p>

      {/* DESCRIPTION */}
      <p className="text-gray-700 text-sm leading-relaxed max-w-xl">
        {product.description}
        <br /><br />
        Developed using precision peptide synthesis technology, {product.name}
        undergoes high-resolution chromatographic purification to ensure molecular
        consistency, structural accuracy, and batch reproducibility.
        <br /><br />
        Designed for biochemical assays, pathway signaling models, cellular studies,
        receptor-binding analysis, and advanced controlled research environments.
      </p>

      {/* PRICE BOX — With BioPeptide colors */}
      <div className="border p-6 w-full max-w-xs bg-white shadow-sm">
        <p className="text-4xl font-semibold text-[#0d2d47]">${product.price}</p>
        <p className="text-xs text-gray-500">Research Use Only</p>

        <button className="mt-4 w-full py-3 font-semibold text-white 
                           bg-gradient-to-r from-[#0d2d47] to-[#0097b8]
                           hover:opacity-90 transition">
          Add to Cart
        </button>
      </div>

      {/* SPEC GRID */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        {[
          ["Category", product.category],
          ["Purity", product.purity],
          ["Unit Size", product.size],
          ["CAS", product.cas || "N/A"]
        ].map(([label, value]) => (
          <div key={label} className="border p-4 bg-[#f7fbff]">
            <p className="text-[11px] text-gray-500">{label}</p>
            <p className="font-semibold text-[#0d2d47]">{value}</p>
          </div>
        ))}
      </div>

    </div>

  </div>

</section>


      {/* BOTTOM CONTENT */}
      <ProductContent product={product} />

    </main>
  );
}
