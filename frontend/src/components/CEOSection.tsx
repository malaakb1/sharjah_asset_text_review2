"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

export default function CEOSection() {
  const t = useTranslations("ceo");

  return (
    <section id="ceo" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-sam-gray-900 text-center mb-12">
          {t("sectionTitle")}
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-10 max-w-5xl mx-auto">
          {/* CEO Image */}
          <div className="flex-shrink-0">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden shadow-lg border-4 border-sam-gray-100">
              <Image
                src="/CEO/ceo.png"
                alt="CEO"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* CEO Message */}
          <div className="flex-1">
            <div className="relative">
              {/* Decorative quote mark */}
              <span className="absolute -top-6 -start-4 text-6xl text-sam-red/10 font-serif leading-none select-none">
                &ldquo;
              </span>
              <p className="text-sam-gray-700 leading-relaxed text-base sm:text-lg relative z-10">
                {t("text")}
              </p>
              <span className="absolute -bottom-4 end-0 text-6xl text-sam-red/10 font-serif leading-none select-none">
                &rdquo;
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
