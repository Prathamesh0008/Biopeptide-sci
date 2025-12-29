// "use client";

// import { LanguageProvider } from "@/contexts/LanguageContext";

// export default function Providers({ children }: { children: React.ReactNode }) {
//   return <LanguageProvider>{children}</LanguageProvider>;
// }




// peptides\app\layout.tsx

import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import type { ReactNode } from "react";

export const metadata = {
  title: "BioPeptide",
  description: "Premium Research Peptides",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="text-gray-900 antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
