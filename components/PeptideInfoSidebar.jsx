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
    <aside className="lg:col-span-2 lg:sticky lg:top-28">

      {/* SEARCH */}
      <div className="flex items-center border border-gray-300 px-3 py-2 gap-2 mb-6">
        <FaSearch className="text-gray-400 text-sm" />
        <input
          type="text"
          placeholder="Search peptides..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          className="w-full outline-none text-sm"
        />
      </div>

      {/* TITLE */}
      <h3 className="text-lg font-semibold text-bioBlue mb-4">
        {title}
      </h3>

      {/* LIST */}
      <ul className="space-y-2 text-sm leading-relaxed mb-6">
        {items.map(({ id, title }) => (
          <li key={id}>
            <Link
              href={`/peptide-information/${id}`}
              className="block text-gray-700 hover:text-bioBlue transition"
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>

      <div className="border-t border-gray-200 my-6" />

      {/* IMAGE */}
      <Image
        src={imageSrc}
        alt="Peptides Combo"
        width={240}
        height={240}
        className="mx-auto"
      />

      {/* BUTTON */}
      <Link
        href={buttonHref}
        className="block mt-4 text-center bg-bioBlue text-white px-5 py-2 text-sm font-semibold rounded-md"
      >
        {buttonText}
      </Link>
    </aside>
  );
}
