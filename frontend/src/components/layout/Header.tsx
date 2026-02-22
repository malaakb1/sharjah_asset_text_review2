"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useState, useEffect, useCallback } from "react";
import { Bars3Icon, XMarkIcon, UserCircleIcon, ArrowRightOnRectangleIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/auth/LoginModal";

const SECTION_IDS = ["hero", "about", "ceo", "values", "steps", "timeline", "awards", "aboutus", "contact"];

export default function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);

  useEffect(() => {
    // Reset loading state if pathname changes to profile
    if (pathname === "/profile") {
      setIsLoadingProfile(false);
    }
  }, [pathname]);

  // ── Restore scroll position after locale change ──
  // Handled by inline script in layout.tsx <head> (runs before paint)
  // No client-side restore needed here.

  // ── Intersection Observer: track which section is visible ──
  useEffect(() => {
    if (!isHome) {
      setActiveSection("");
      return;
    }

    const observers: IntersectionObserver[] = [];

    const timeout = setTimeout(() => {
      SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const observer = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) {
                setActiveSection(id);
              }
            },
            { threshold: 0.2, rootMargin: "-80px 0px -40% 0px" }
          );
          observer.observe(el);
          observers.push(observer);
        }
      });
    }, 150);

    return () => {
      clearTimeout(timeout);
      observers.forEach((o) => o.disconnect());
    };
  }, [isHome, pathname]);

  // ── Language switch — stay in place ──
  const switchLocale = (target: "ar" | "en") => {
    if (target !== locale) {
      // Tell ScrollRestore to save current position
      window.dispatchEvent(new Event("__save_scroll"));
      router.replace(pathname + window.location.hash, { locale: target, scroll: false } as any);
    }
  };

  // ── Smooth-scroll to section (or navigate home first) ──
  const handleAnchorClick = useCallback(
    (e: React.MouseEvent, sectionId: string) => {
      if (isHome) {
        e.preventDefault();
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
      setMobileOpen(false);
    },
    [isHome]
  );

  // ── Build anchor href (same-page hash or cross-page) ──
  const getAnchorHref = (sectionId: string) => {
    if (isHome) return `#${sectionId}`;
    return `/${locale}#${sectionId}`;
  };

  // ── Nav items that scroll to page sections ──
  const anchorNavItems = [
    { id: "about", label: t("nav.aboutAward") },
    { id: "steps", label: t("nav.howToApply") },
    { id: "awards", label: t("nav.awards") },
    { id: "aboutus", label: t("nav.aboutUs") },
    { id: "contact", label: t("nav.contactUs") },
  ];

  const isAwardPage = pathname.startsWith("/award-selection");
  const isDashboardPage = pathname.startsWith("/dashboard");

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-sam-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* ── Logo ── */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo/logo.png"
              alt={t("common.siteName")}
              width={160}
              height={56}
              className="h-10 sm:h-14 w-auto"
              priority
            />
          </Link>

          {/* ── Desktop Navigation ── */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {/* Home */}
            <Link
              href="/"
              className={`relative px-3 py-2 text-sm font-medium transition-colors ${isHome && (activeSection === "hero" || !activeSection)
                ? "text-sam-red"
                : "text-sam-gray-700 hover:text-sam-red"
                }`}
            >
              {t("nav.home")}
              {isHome && (activeSection === "hero" || !activeSection) && (
                <span className="absolute bottom-0 inset-x-3 h-0.5 bg-sam-red rounded-full" />
              )}
            </Link>

            {/* Section anchor links */}
            {anchorNavItems.map((item) => {
              const isActive = isHome && activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={getAnchorHref(item.id)}
                  onClick={(e) => handleAnchorClick(e, item.id)}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors ${isActive
                    ? "text-sam-red"
                    : "text-sam-gray-700 hover:text-sam-red"
                    }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-3 h-0.5 bg-sam-red rounded-full" />
                  )}
                </a>
              );
            })}

            {/* Separator */}
            <div className="w-px h-6 bg-sam-gray-200 mx-2" />

            {/* Award Selection — unique CTA style */}
            <Link
              href="/award-selection"
              className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${isAwardPage
                ? "bg-sam-red text-white shadow-md shadow-sam-red/20"
                : "border-2 border-sam-red text-sam-red hover:bg-sam-red hover:text-white"
                }`}
            >
              {t("nav.awardSelection")}
            </Link>

            {/* Dashboard — admin only */}
            {user?.isAdmin && (
              <Link
                href="/dashboard"
                className={`flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${isDashboardPage
                  ? "bg-sam-red text-white shadow-md shadow-sam-red/20"
                  : "border-2 border-sam-gold text-sam-gold hover:bg-sam-gold hover:text-white"
                  }`}
              >
                <ShieldCheckIcon className="w-4 h-4" />
                {locale === "ar" ? "لوحة التحكم" : "Dashboard"}
              </Link>
            )}
          </nav>

          {/* ── Language Toggle + Auth + Mobile Hamburger ── */}
          <div className="flex items-center gap-3">
            {/* Language pills */}
            <div className="flex items-center border border-sam-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => switchLocale("ar")}
                className={`px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer ${locale === "ar"
                  ? "bg-sam-red text-white"
                  : "bg-white text-sam-gray-600 hover:bg-sam-gray-50"
                  }`}
              >
                عربي
              </button>
              <div className="w-px h-5 bg-sam-gray-300" />
              <button
                onClick={() => switchLocale("en")}
                className={`px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer ${locale === "en"
                  ? "bg-sam-red text-white"
                  : "bg-white text-sam-gray-600 hover:bg-sam-gray-50"
                  }`}
              >
                EN
              </button>
            </div>

            {/* Auth Button */}
            <div className="hidden lg:block">
              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-sam-gray-600 px-2">{user?.email}</span>
                  <Link
                    href="/profile"
                    className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-sam-gray-600 hover:text-sam-red transition-colors ${isLoadingProfile ? "opacity-50 pointer-events-none" : ""}`}
                    title="Profile"
                    onClick={() => setIsLoadingProfile(true)}
                  >
                    {isLoadingProfile ? (
                      <div className="w-5 h-5 border-2 border-sam-red border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <UserCircleIcon className="w-5 h-5" />
                    )}
                  </Link>
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-sam-gray-600 hover:text-sam-red transition-colors"
                    title={locale === "ar" ? "تسجيل الخروج" : "Logout"}
                  >
                    <ArrowRightOnRectangleIcon className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-white bg-sam-red rounded-lg hover:bg-sam-red-dark transition-colors"
                >
                  <UserCircleIcon className="w-5 h-5" />
                  <span>{locale === "ar" ? "تسجيل الدخول" : "Login"}</span>
                </button>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-sam-gray-700 hover:bg-sam-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Navigation ── */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-sam-gray-200 bg-white">
          <div className="px-4 py-3 space-y-1">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-sm font-medium ${isHome
                ? "text-sam-red bg-sam-red-light"
                : "text-sam-gray-700 hover:bg-sam-gray-50"
                }`}
            >
              {t("nav.home")}
            </Link>

            {anchorNavItems.map((item) => (
              <a
                key={item.id}
                href={getAnchorHref(item.id)}
                onClick={(e) => handleAnchorClick(e, item.id)}
                className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isHome && activeSection === item.id
                  ? "text-sam-red bg-sam-red-light"
                  : "text-sam-gray-700 hover:bg-sam-gray-50"
                  }`}
              >
                {item.label}
              </a>
            ))}

            <div className="border-t border-sam-gray-100 my-2" />

            <Link
              href="/award-selection"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-center bg-sam-red text-white"
            >
              {t("nav.awardSelection")}
            </Link>

            {user?.isAdmin && (
              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold bg-sam-gold text-white"
              >
                <ShieldCheckIcon className="w-4 h-4" />
                {locale === "ar" ? "لوحة التحكم" : "Dashboard"}
              </Link>
            )}

            <div className="border-t border-sam-gray-100 my-2" />

            {/* Auth Button for Mobile */}
            {isAuthenticated ? (
              <>
                <Link
                  href="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2 text-xs text-sam-gray-500 block hover:text-sam-red"
                >
                  {user?.email}
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="w-full text-start px-3 py-2.5 rounded-lg text-sm font-medium text-sam-gray-700 hover:bg-sam-gray-50"
                >
                  {locale === "ar" ? "تسجيل الخروج" : "Logout"}
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setShowLoginModal(true);
                  setMobileOpen(false);
                }}
                className="w-full px-3 py-2.5 rounded-lg text-sm font-semibold text-center bg-sam-green text-white"
              >
                {locale === "ar" ? "تسجيل الدخول" : "Login"}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </header>
  );
}
