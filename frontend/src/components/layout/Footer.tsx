"use client";

import { useTranslations, useLocale } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  return (
    <footer className="bg-sam-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="w-full flex justify-center items-center overflow-hidden bg-transparent">
          <img
            src="/logo/nojoom.png"
            alt="Nojoom Logo"
            className="h-96 w-auto object-contain"
          />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-sam-gray-300 w-full">
          <p className="textAlign-center md:text-left order-2 md:order-1">{t("rights")}</p>
          <p className="textAlign-center md:text-right order-1 md:order-2">{t("poweredBy")}</p>
        </div>
      </div>
    </footer>
  );
}
