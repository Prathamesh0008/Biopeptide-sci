// peptides/app/layout.tsx

import "./globals.css";
import type { ReactNode } from "react";
import Script from "next/script";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Atkinson_Hyperlegible_Mono } from "next/font/google";

/* ===================== FONT ===================== */

const atkinsonMono = Atkinson_Hyperlegible_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-atkinson-mono",
  display: "swap",
  adjustFontFallback: false,
});

/* ===================== SEO METADATA ===================== */

export const metadata = {
  metadataBase: new URL("https://www.bio-peptides.com"),

  title: {
    default: "Buy Research Peptides Online | Peptides Supplier by BioPeptide",
    template: "%s | BioPeptide",
  },

  description:
    "Buy research peptides online in the USA. BioPeptide Sci offers high-purity bioactive peptides, peptide blends & research compounds for laboratory use.",

  keywords: [
    "buy research peptides",
    "research peptides online",
    "peptides supplier",
    "peptide supplier usa",
    "biopeptide sci",
    "bioactive peptides",
    "peptide blends",
    "laboratory research peptides",
    "high purity peptides",
    "research compounds",
    "pharmaceutical peptides",
  ],

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "https://www.bio-peptides.com/",
  },

  openGraph: {
    title: "Buy Research Peptides Online | Peptides Supplier by BioPeptide",
    description:
      "Buy research peptides online in the USA. BioPeptide Sci offers high-purity bioactive peptides, peptide blends & research compounds for laboratory use.",
    url: "https://www.bio-peptides.com/",
    siteName: "BioPeptide",
    images: [
      {
        url: "https://www.bio-peptides.com/Biopeptidecolourlogo.png",
        width: 1200,
        height: 630,
        alt: "BioPeptide Research Peptide Supplier",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Buy Research Peptides Online | Peptides Supplier by BioPeptide",
    description:
      "Buy research peptides online in the USA. High-purity bioactive peptides and research compounds by BioPeptide Sci.",
    images: ["https://www.bio-peptides.com/Biopeptidecolourlogo.png"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/Biopeptidecolourlogo.png",
  },
};

/* ===================== ROOT LAYOUT ===================== */

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="wORs3YhUeZvaUDVaOAfYk_yxtVLr8_6PHDZGo-dH4q4" />
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







