// peptides/app/layout.tsx
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import type { ReactNode } from "react";
import { Atkinson_Hyperlegible_Mono } from "next/font/google";
import Script from "next/script";

const atkinsonMono = Atkinson_Hyperlegible_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-atkinson-mono",
  display: "swap",
  adjustFontFallback: false,
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
      <head>
        {/* ================= GOOGLE TAG MANAGER ================= */}
        <Script id="gtm-head" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];
            w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-W3WRFH2K');
          `}
        </Script>

        {/* ================= GOOGLE ANALYTICS (GA4) ================= */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-EGX0MJT9G4"
          strategy="afterInteractive"
        />

        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EGX0MJT9G4');
          `}
        </Script>
      </head>

      <body
        className={`
          ${atkinsonMono.variable}
          text-gray-900
          antialiased
        `}
      >
        {/* ================= GTM (noscript) ================= */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W3WRFH2K"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

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
//   adjustFontFallback: false, // ✅ FIX WARNING
// });


// export const metadata = {
//   title: "Buy Research Peptides Online | Peptides Supplier by BioPeptide",
//   description:
//     "Buy research peptides online in the USA. BioPeptide Sci offers high-purity bioactive peptides, peptide blends & research compounds for laboratory use.",
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
//         <LanguageProvider>{children}</LanguageProvider>
//       </body>
//     </html>
//   );
// }




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





