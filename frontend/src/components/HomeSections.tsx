"use client";

import { useTranslations } from "next-intl";
import {
  Users,
  Phone,
  Mail,
  GraduationCap,
  BarChart3,
  MapPin,
} from "lucide-react";

export default function HomeSections() {
  const t = useTranslations("sections");

  return (
    <>
      <section id="aboutus" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Users className="w-10 h-10 text-sam-red mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold text-sam-gray-900 mb-4">
              {t("aboutUs")}
            </h2>
            <p className="text-sam-gray-500 leading-relaxed max-w-3xl mx-auto">
              {t("aboutUsText")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-sam-gray-50 rounded-2xl p-8 border border-sam-gray-100 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-sam-red-light mb-5">
                <GraduationCap className="w-6 h-6 text-sam-red" />
              </div>
              <h3 className="text-lg font-semibold text-sam-gray-900 mb-3">
                {t("training")}
              </h3>
              <p className="text-sm text-sam-gray-500 leading-relaxed">
                {t("trainingText")}
              </p>
            </div>

            <div className="bg-sam-gray-50 rounded-2xl p-8 border border-sam-gray-100 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-sam-green-light mb-5">
                <BarChart3 className="w-6 h-6 text-sam-green" />
              </div>
              <h3 className="text-lg font-semibold text-sam-gray-900 mb-3">
                {t("investments")}
              </h3>
              <p className="text-sm text-sam-gray-500 leading-relaxed">
                {t("investmentsText")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-16 sm:py-20 bg-sam-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-sam-gray-900 mb-6">
                {t("contactUs")}
              </h2>
              <p className="text-sam-gray-500 leading-relaxed mb-8 max-w-lg">
                {t("contactUsText")}
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sam-gray-700">
                  <div className="w-10 h-10 rounded-full bg-white border border-sam-gray-200 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-sam-red" />
                  </div>
                  <span className="text-sm">info@samassets.ae</span>
                </div>
                <div className="flex items-center gap-3 text-sam-gray-700">
                  <div className="w-10 h-10 rounded-full bg-white border border-sam-gray-200 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-sam-red" />
                  </div>
                  <span className="text-sm" dir="ltr">+971-6-XXX-XXXX</span>
                </div>
                {/* Location */}
                <div className="flex items-center gap-3 text-sam-gray-700">
                  <div className="w-10 h-10 rounded-full bg-white border border-sam-gray-200 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-sam-red" />
                  </div>
                  <span className="text-sm">Al Layyeh Suburb, Sharjah, UAE</span>
                </div>
              </div>
            </div>

            <div className="h-[300px] sm:h-[400px] rounded-2xl overflow-hidden shadow-lg border border-white/20">
              <iframe
                src="https://maps.google.com/maps?q=Sharjah%20Asset%20Management&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sharjah Asset Management Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
