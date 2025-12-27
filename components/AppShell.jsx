"use client";

import Navbar from "./Navbar";
import Footer from "./Footer";
import Breadcrumbs from "./Breadcrumbs";

export default function AppShell({ children }) {
  return (
    <>
      <Navbar />
      <Breadcrumbs />
      {children}
      <Footer />
    </>
  );
}
