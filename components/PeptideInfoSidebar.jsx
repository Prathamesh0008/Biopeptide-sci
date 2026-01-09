//peptides\components\PeptideInfoSidebar.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";

export default function PeptideInfoSidebar({
  title = "Peptide Glossary",
  items = [],
  query,
  onQueryChange,
  imageSrc = "/images/combo.png",
  buttonHref = "/all-peptides",
  buttonText = "All Peptides",
}) {
  return (
   <aside className="lg:col-span-3 lg:sticky lg:top-28 border-r border-gray-200 pr-6">

      {/* SEARCH */}
     <div className="flex items-center border border-gray-300 px-3 py-2 gap-2 mb-5">
        <FaSearch className="text-gray-400 text-sm" />
        <input
          type="text"
          placeholder="Search peptides..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
      className="w-full outline-none text-[13.5px] text-gray-700 placeholder:text-gray-400"
        />
      </div>

      {/* TITLE */}
      <h3 className="text-[15px] font-bold uppercase tracking-wide text-gray-900 mb-3">
        {title}
      </h3>

      {/* LIST */}
      <ul className="space-y-4 text-[14px] leading-[1.6] mb-3">
  {items.map(({ id, title }) => (
    <li
      key={id}
      className="pb-3 border-b border-gray-100 last:border-b-0"
    >
      <Link
        href={`/peptide-information/${id}`}
        className="
          block
          px-1
          py-1.5
          text-gray-700
          hover:text-bioBlue
          transition-colors
        "
      >
        {title}
      </Link>
    </li>
  ))}
</ul>


   <div className="border-t border-gray-200 my-4" />



      {/* IMAGE */}
 <Image
  src={imageSrc}
  alt="Peptides Combo"
  width={160}
  height={160}
  className="mx-auto opacity-80"
/>



      {/* BUTTON */}
     <Link
  href={buttonHref}
  className="
    inline-block mt-3
    border border-bioBlue
    text-bioBlue
    px-2.5 py-1
    text-[12px] font-medium
    hover:bg-bioBlue hover:text-white
    transition-colors
  "
>

        {buttonText}
      </Link>
    </aside>
  );
}
