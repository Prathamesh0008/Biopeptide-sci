//peptides\components\PeptideInfoLeftSidebar.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";

export default function PeptideInfoLeftSidebar({
  title,
  searchValue,
  onSearchChange,
  items,
  ctaText,
  ctaHref,
}) {
  return (
    <aside className="lg:col-span-3 lg:sticky lg:top-28 p-0 m-0">

      {/* SEARCH */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1 border border-gray-300 rounded-md overflow-hidden">
          <input
            type="text"
            placeholder="Search peptides..."
            value={searchValue}
            onChange={onSearchChange}
            className="w-full px-3 py-2 outline-none text-sm"
          />
        </div>

        <button
          type="button"
          aria-label="Search"
          className="p-2 border border-gray-300 rounded-md text-gray-500 hover:text-bioBlue hover:border-bioBlue transition"
        >
          <FaSearch className="text-sm" />
        </button>
      </div>

      {/* TITLE */}
      <h3 className="text-lg font-semibold text-bioBlue mb-2">
        {title}
      </h3>

      {/* INDEX (NO BOTTOM MARGIN) */}
      <ul className="space-y-2 text-sm leading-relaxed m-0 p-0">
        {items.map(item => (
          <li key={item.id}>
            <Link
              href={`/peptide-information/${item.id}`}
              className="block text-gray-700 hover:text-bioBlue transition"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>

      {/* IMAGE — FLUSH, NO SPACE */}
   <div className="m-0 p-0 leading-none -ml-6 lg:-ml-12">
  <Image
    src="/images/combo.png"
    alt="Peptides Combo"
    width={500}
    height={500}
    className="block w-full h-auto object-cover"
    priority
  />
</div>


      {/* CTA */}
      <Link
        href={ctaHref}
        className="block mt-2 text-center bg-bioBlue text-white px-5 py-2 text-sm font-semibold rounded-md"
      >
        {ctaText}
      </Link>

    </aside>
  );
}



