//peptides\components\PeptideInfoSubNav.jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PeptideInfoSubNav() {
  const pathname = usePathname();

  const links = [
    { label: "Glossary Home", href: "/peptide-information" },
    { label: "Intro to Peptides", href: "/peptide-information/intro-to-peptides" },
    { label: "Peptide Storage", href: "/peptide-information/peptide-storage" },
  ];

  return (
    <div className="w-full bg-gray-200 border-b border-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-center gap-10 text-sm">

        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            target="_blank"
            className={`hover:text-bioBlue ${
              pathname === l.href
                ? "text-bioBlue font-semibold"
                : "text-gray-700"
            }`}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
