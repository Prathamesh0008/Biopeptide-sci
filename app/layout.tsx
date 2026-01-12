// peptides/app/layout.tsx
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import type { ReactNode } from "react";
import { Atkinson_Hyperlegible_Mono } from "next/font/google";

const atkinsonMono = Atkinson_Hyperlegible_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-atkinson-mono",
  display: "swap",
  adjustFontFallback: false, // ✅ FIX WARNING
});


export const metadata = {
  title: "Buy Research Peptides Online | Peptides Supplier by BioPeptide",
  description:
    "Buy research peptides online in the USA. BioPeptide Sci offers high-purity bioactive peptides, peptide blends & research compounds for laboratory use.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/Biopeptidecolourlogo.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`
          ${atkinsonMono.variable}
          text-gray-900
          antialiased
        `}
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}




// // peptides/app/layout.tsx
// import "./globals.css";
// import { LanguageProvider } from "@/contexts/LanguageContext";
// import type { ReactNode } from "react";
// import { Atkinson_Hyperlegible_Mono } from "next/font/google";

// const atkinsonMono = Atkinson_Hyperlegible_Mono({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
//   variable: "--font-atkinson-mono",
//   display: "swap",
// });

// export const metadata = {
//   title: "BioPeptide",
//   description: "Premium Research Peptides",
//   icons: {
//     icon: "/favicon.ico",
//     shortcut: "/favicon.ico",
//     apple: "/Biopeptidecolourlogo.png",
//   },
// };

// export default function RootLayout({ children }: { children: ReactNode }) {
//   return (
//     <html lang="en">
//       <body
//         className={`
//           ${atkinsonMono.variable}
//           text-gray-900
//           antialiased
//         `}
//       >
//         <LanguageProvider>
//           {children}
//         </LanguageProvider>
//       </body>
//     </html>
//   );
// }





