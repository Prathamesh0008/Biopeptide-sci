"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const { translations } = useLanguage();

  if (!pathname || !translations) return null;

  const segments = pathname.split("/").filter(Boolean);

  const t = (key) =>
    translations?.breadcrumbs?.[key] ||
    key.replace(/-/g, " ");

  return (
    <nav className="w-full bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3 text-sm text-gray-600">
        <ul className="flex items-center gap-2 flex-wrap">

          {/* HOME */}
          <li>
            <Link href="/" className="hover:text-black font-medium">
              {t("home")}
            </Link>
          </li>

          {segments.map((segment, index) => {
            const href = "/" + segments.slice(0, index + 1).join("/");
            const isLast = index === segments.length - 1;

            return (
              <li key={href} className="flex items-center gap-2">
                <span>/</span>

                {isLast ? (
                  <span className="text-black capitalize">
                    {t(segment)}
                  </span>
                ) : (
                  <Link href={href} className="hover:text-black capitalize">
                    {t(segment)}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}












// //peptides\components\Breadcrumbs.jsx
// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";

// export default function Breadcrumbs() {
//   const pathname = usePathname();
//   if (!pathname) return null;

//   const segments = pathname.split("/").filter(Boolean);

//   return (
//     <nav className="w-full bg-gray-50 border-b border-gray-200">
//       <div className="max-w-7xl mx-auto px-4 py-3 text-sm text-gray-600">
//         <ul className="flex items-center gap-2 flex-wrap">
//           <li>
//             <Link href="/" className="hover:text-black font-medium">
//               Home
//             </Link>
//           </li>

//           {segments.map((segment, index) => {
//             const href = "/" + segments.slice(0, index + 1).join("/");
//             const label = segment.replace(/-/g, " ");

//             return (
//               <li key={href} className="flex items-center gap-2">
//                 <span>/</span>
//                 {index === segments.length - 1 ? (
//                   <span className="text-black capitalize">{label}</span>
//                 ) : (
//                   <Link
//                     href={href}
//                     className="hover:text-black capitalize"
//                   >
//                     {label}
//                   </Link>
//                 )}
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     </nav>
//   );
// }
