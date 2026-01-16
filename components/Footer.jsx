//peptides\components\Footer.jsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaTruck,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  const { translations } = useLanguage();

  const t = (path) => {
    try {
      return path
        .split(".")
        .reduce((obj, key) => obj?.[key], translations?.footer || {});
    } catch {
      return "";
    }
  };

  return (
    <footer className="relative bg-white text-gray-700 mt-16">
      {/* ================= NEWSLETTER ================= */}
<div className=" border-t  border-gray-200">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
    <div
      className="
        bg-white
        rounded-xl
        
        boder border-grey-200/80
        px-6 py-8 sm:px-10
        flex flex-col lg:flex-row
        items-center
        justify-between
        gap-6
      "
    >
      {/* LEFT CONTENT */}
      <div className="max-w-xl text-center lg:text-left">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          {t("newsletter.title")}
        </h2>
        <p className="mt-2 text-sm sm:text-base text-gray-600">
          {t("newsletter.subtitle")}
        </p>
      </div>

      {/* RIGHT FORM */}
      <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          placeholder={t("newsletter.placeholder")}
          className="
            w-full sm:w-80
            px-4 py-3
            text-sm
            border border-gray-300
            rounded-md
            focus:outline-none
            focus:ring-2
            focus:ring-[#65b4d7]
          "
        />

        <button
          className="
            px-6 py-3
            text-sm font-semibold
            text-white
            rounded-md
            bg-[linear-gradient(to_right,#145b2f,#559f45)]
            hover:brightness-110
            transition
            whitespace-nowrap
          "
        >
          {t("newsletter.button")}
        </button>
      </div>
    </div>
  </div>
</div>


      {/* ================= FOOTER CONTENT ================= */}
      <div className="border-t border-gray-200">
        <div
          className="
            max-w-6xl mx-auto
            px-4 sm:px-6 py-14
            grid grid-cols-1 lg:grid-cols-6
            gap-10 lg:gap-12
          "
        >
          {/* BRAND */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" aria-label="Go to homepage">
              <Image
                src="/images/Biologo1.svg"
                alt="BioPeptide Logo"
                width={240}
                height={64}
                className="object-contain"
                priority
              />
            </Link>

            <p className="text-sm text-gray-600 leading-relaxed max-w-md">
              {t("brand.description")}
            </p>
          </div>

          {/* LINKS GRID */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {/* INFORMATION */}
            <FooterColumn title={t("columns.information.title")}>
              <FooterLink text={t("columns.information.links.0")} href="/all-peptides" />
              <FooterLink text={t("columns.information.links.1")} href="/bundle-save" />
              <FooterLink text={t("columns.information.links.2")} href="/peptide-research" />
              <FooterLink text={t("columns.information.links.3")} href="/lab-testing" />
              <FooterLink text={t("columns.information.links.4")} href="/about" />
              <FooterLink text={t("columns.information.links.5")} href="/contact" />
            </FooterColumn>

            {/* SHOP */}
            <FooterColumn title={t("columns.shop.title")}>
              <FooterLink text={t("columns.shop.links.0")} href="/category/capsules" />
              <FooterLink text={t("columns.shop.links.1")} href="/category/blends" />
              <FooterLink text={t("columns.shop.links.2")} href="/category/igf-1-proteins" />
              <FooterLink text={t("columns.shop.links.3")} href="/category/melanotan" />
              <FooterLink text={t("columns.shop.links.4")} href="/category/bioregulators" />
              <FooterLink text={t("columns.shop.links.5")} href="/category/cosmetic-peptides" />
            </FooterColumn>

            {/* LEGAL */}
            <FooterColumn title={t("columns.legal.title")}>
              <FooterLink text={t("columns.legal.links.0")} href="/privacy-policy" />
              <FooterLink text={t("columns.legal.links.1")} href="/terms" />
              <FooterLink text={t("columns.legal.links.2")} href="/shipping-payments" />
              <FooterLink text={t("columns.legal.links.3")} href="/accessibility" />
              <FooterLink text={t("columns.legal.links.4")} href="/rewards-terms" />
            </FooterColumn>

            {/* CONTACT */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 uppercase text-sm">
                {t("columns.contact.title")}
              </h3>

              <div className="space-y-4 text-sm text-gray-700">
                <ContactRow icon={<FaPhoneAlt />} title={t("contact.phoneLabel")}>
                  <p>1-800-986-6401</p>
                  <p className="text-xs text-gray-500">{t("contact.hours")}</p>
                </ContactRow>

                {/* ✅ EMAIL (ADDED BACK) */}
                <ContactRow icon={<FaEnvelope />} title={t("contact.emailLabel")}>
                  <p>support@biopeptide.com</p>
                </ContactRow>

                <ContactRow icon={<FaTruck />} title={t("contact.shippingLabel")}>
                  <p>Mon–Fri (Except Holidays)</p>
                </ContactRow>

                <ContactRow icon={<FaMapMarkerAlt />} title={t("contact.addressLabel")}>
                  <p>{t("contact.company")}</p>
                  <p>{t("contact.location")}</p>
                </ContactRow>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= COPYRIGHT ================= */}
      <div className="border-t border-gray-200 py-8 px-4 sm:px-6 text-xs text-gray-500">
        <div className="max-w-6xl mx-auto space-y-3 text-center">
          <p className="font-medium text-gray-700">
            {t("disclaimer.copyrightLine")}
          </p>
          <p>{t("disclaimer.researchOnly")}</p>
          <p>{t("disclaimer.fda")}</p>
          <p>{t("disclaimer.legalStatus")}</p>
        </div>
      </div>
    </footer>
  );
}

/* ================= HELPERS ================= */

function FooterColumn({ title, children }) {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-gray-900 uppercase text-sm tracking-wide">
        {title}
      </h3>
      <ul className="space-y-2">{children}</ul>
    </div>
  );
}

function FooterLink({ text, href }) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-gray-600 hover:text-bioBlue transition"
      >
        {text}
      </Link>
    </li>
  );
}

function ContactRow({ icon, title, children }) {
  return (
    <div className="grid grid-cols-[20px_1fr] gap-3 items-start">
      <span className="text-bioBlue text-lg mt-1">
        {icon}
      </span>

      <div className="min-w-0">
        <p className="font-semibold leading-tight">{title}</p>

        <div className="text-sm text-gray-700 break-all sm:break-normal">
          {children}
        </div>
      </div>
    </div>
  );
}
















