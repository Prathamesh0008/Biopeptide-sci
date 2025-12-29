// "use client";

// import { LanguageProvider } from "@/contexts/LanguageContext";

// export default function Providers({ children }: { children: React.ReactNode }) {
//   return <LanguageProvider>{children}</LanguageProvider>;
// }




// 

import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";

export const metadata = {
  title: "BioPeptide",
  description: "Premium Research Peptides",
};

export default function RootLayout({children}) {
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
