// peptides/components/PeptideInfoSubNav.jsx
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
 {links.map((l) => {
  let isActive = false;

  if (l.href === "/peptide-information") {
    // ONLY exact match for glossary
    isActive = pathname === "/peptide-information";
  } else {
    // exact match OR nested
    isActive = pathname === l.href || pathname.startsWith(l.href);
  }

  return (
    <Link
      key={l.href}
      href={l.href}
      className={`relative pb-1 transition-all duration-200 ${
        isActive
          ? "text-bioBlue font-semibold"
          : "text-gray-700 hover:text-bioBlue"
      }`}
    >
      {l.label}

      {/* underline */}
      {isActive && (
        <span className="absolute left-0 bottom-0 w-full h-[2px] bg-bioBlue rounded-full" />
      )}
    </Link>
  );
})}
      </div>
    </div>
  );
}